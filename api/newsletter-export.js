// Newsletter Export API for Email Campaigns
// Provides various export formats for email marketing tools

const { sql } = require('@vercel/postgres')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      format = 'json', 
      status = 'active', 
      interests, 
      source,
      limit = 1000,
      offset = 0 
    } = req.query

    // Build query based on filters
    let query = `
      SELECT 
        id,
        name,
        email,
        interests,
        source,
        subscription_date,
        status
      FROM newsletter_subscribers 
      WHERE status = $1
    `
    
    const params = [status]
    let paramCount = 1

    // Add interest filter
    if (interests) {
      paramCount++
      query += ` AND interests @> $${paramCount}::jsonb`
      params.push(JSON.stringify([interests]))
    }

    // Add source filter
    if (source) {
      paramCount++
      query += ` AND source = $${paramCount}`
      params.push(source)
    }

    // Add ordering and pagination
    query += ` ORDER BY subscription_date DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
    params.push(parseInt(limit), parseInt(offset))

    // Execute query
    const result = await sql.query(query, params)
    const subscribers = result.rows

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM newsletter_subscribers WHERE status = $1`
    const countParams = [status]
    let countParamCount = 1

    if (interests) {
      countParamCount++
      countQuery += ` AND interests @> $${countParamCount}::jsonb`
      countParams.push(JSON.stringify([interests]))
    }

    if (source) {
      countParamCount++
      countQuery += ` AND source = $${countParamCount}`
      countParams.push(source)
    }

    const countResult = await sql.query(countQuery, countParams)
    const total = parseInt(countResult.rows[0].total)

    // Format response based on requested format
    switch (format.toLowerCase()) {
      case 'csv':
        return handleCSVExport(res, subscribers)
      
      case 'mailchimp':
        return handleMailchimpExport(res, subscribers)
      
      case 'emails-only':
        return res.status(200).json({
          emails: subscribers.map(s => s.email),
          total,
          count: subscribers.length
        })
      
      default: // json
        return res.status(200).json({
          subscribers,
          pagination: {
            total,
            count: subscribers.length,
            limit: parseInt(limit),
            offset: parseInt(offset),
            hasMore: (parseInt(offset) + subscribers.length) < total
          }
        })
    }

  } catch (error) {
    console.error('Newsletter export error:', error)
    return res.status(500).json({
      error: 'Failed to export newsletter subscribers'
    })
  }
}

// CSV Export Handler
function handleCSVExport(res, subscribers) {
  const csvHeader = 'Name,Email,Interests,Source,Subscription Date,Status\n'
  const csvRows = subscribers.map(sub => {
    const interests = Array.isArray(sub.interests) 
      ? sub.interests.join(';') 
      : JSON.stringify(sub.interests)
    
    return `"${sub.name || ''}","${sub.email}","${interests}","${sub.source}","${sub.subscription_date}","${sub.status}"`
  }).join('\n')

  const csv = csvHeader + csvRows

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="newsletter-subscribers.csv"')
  return res.status(200).send(csv)
}

// Mailchimp Format Export
function handleMailchimpExport(res, subscribers) {
  const mailchimpData = subscribers.map(sub => ({
    email_address: sub.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: sub.name ? sub.name.split(' ')[0] : '',
      LNAME: sub.name ? sub.name.split(' ').slice(1).join(' ') : '',
      SOURCE: sub.source,
      INTERESTS: Array.isArray(sub.interests) 
        ? sub.interests.join(', ') 
        : JSON.stringify(sub.interests)
    },
    tags: sub.interests || []
  }))

  return res.status(200).json({
    members: mailchimpData,
    total: mailchimpData.length
  })
}
