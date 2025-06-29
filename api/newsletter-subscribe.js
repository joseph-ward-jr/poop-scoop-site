// Enhanced Newsletter Subscription API with Vercel Postgres + Jobber
// Stores emails in database AND creates Jobber clients

const { sql } = require('@vercel/postgres')
const crypto = require('crypto')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, interests, source, subscriptionDate } = req.body

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        errors: ['Email is required for newsletter subscription']
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        errors: ['Please provide a valid email address']
      })
    }

    // 1. Store in Vercel Postgres Database
    const emailRecord = await storeEmailInDatabase({
      name: name || 'Newsletter Subscriber',
      email: email.toLowerCase().trim(),
      interests: interests || ['home-cleaning', 'lawn-maintenance'],
      source: source || 'Website',
      subscriptionDate: subscriptionDate || new Date().toISOString(),
      status: 'active'
    })

    // 2. Create Jobber Client (existing functionality)
    const jobberResult = await createJobberClient({
      name: name || 'Newsletter Subscriber',
      email: email.toLowerCase().trim(),
      interests,
      source,
      subscriptionDate
    })

    // Update database record with Jobber client ID if successful
    if (jobberResult.success && jobberResult.client?.id) {
      await sql`
        UPDATE newsletter_subscribers
        SET jobber_client_id = ${jobberResult.client.id}
        WHERE email = ${email.toLowerCase().trim()}
      `
    }

    // Return success even if Jobber fails (email is still stored)
    return res.status(200).json({
      success: true,
      subscriber: emailRecord,
      jobberResult,
      message: 'Newsletter subscription successful'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    // Check if it's a duplicate email error
    if (error.message?.includes('duplicate key value')) {
      return res.status(409).json({
        success: false,
        errors: ['This email is already subscribed to our newsletter']
      })
    }

    return res.status(500).json({
      success: false,
      errors: ['Failed to process newsletter subscription']
    })
  }
}

// Store email in Vercel Postgres database
async function storeEmailInDatabase(data) {
  try {
    // Generate unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex')

    // Insert into database
    const result = await sql`
      INSERT INTO newsletter_subscribers (
        name,
        email,
        interests,
        source,
        subscription_date,
        status,
        unsubscribe_token
      )
      VALUES (
        ${data.name},
        ${data.email},
        ${JSON.stringify(data.interests)}::jsonb,
        ${data.source},
        ${data.subscriptionDate}::timestamp,
        ${data.status},
        ${unsubscribeToken}
      )
      RETURNING id, name, email, interests, source, subscription_date, status, created_at
    `

    console.log('✅ Stored email in database:', data.email)
    return result.rows[0]

  } catch (error) {
    console.error('❌ Database storage failed:', error)
    throw error
  }
}

// Jobber client creation (calls existing API)
async function createJobberClient(data) {
  try {
    // Use the existing jobber-newsletter API
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/jobber-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    console.log('📋 Jobber client creation result:', result.success ? 'Success' : 'Failed')
    return result

  } catch (error) {
    console.error('❌ Jobber client creation failed:', error)
    return { success: false, error: error.message }
  }
}
