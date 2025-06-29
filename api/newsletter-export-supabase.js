// Newsletter Export API using Supabase
import { newsletterService } from '../lib/supabase.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      format = 'json', 
      interests, 
      source,
      limit = 1000 
    } = req.query

    // Get subscribers with filters
    const filters = {}
    if (interests) filters.interests = interests
    if (source) filters.source = source
    if (limit) filters.limit = parseInt(limit)

    const subscribers = await newsletterService.getActiveSubscribers(filters)
    const total = await newsletterService.getSubscriberCount()

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
          total,
          count: subscribers.length
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
    
    return `"${sub.name || ''}","${sub.email}","${interests}","${sub.source}","${sub.created_at}","${sub.status}"`
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
