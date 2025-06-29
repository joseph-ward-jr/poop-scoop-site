// Enhanced Newsletter Subscription API with Database Storage
// Stores emails in database AND creates Jobber clients

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

    // 1. Store in Database (you'll need to set up a database)
    const emailRecord = await storeEmailInDatabase({
      name: name || 'Newsletter Subscriber',
      email,
      interests: interests || ['home-cleaning', 'lawn-maintenance'],
      source: source || 'Website',
      subscriptionDate: subscriptionDate || new Date().toISOString(),
      status: 'active'
    })

    // 2. Create Jobber Client (existing functionality)
    const jobberResult = await createJobberClient({
      name: name || 'Newsletter Subscriber',
      email,
      interests,
      source,
      subscriptionDate
    })

    // Return success even if Jobber fails (email is still stored)
    return res.status(200).json({
      success: true,
      emailRecord,
      jobberResult,
      message: 'Newsletter subscription successful'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({
      success: false,
      errors: ['Failed to process newsletter subscription']
    })
  }
}

// Database storage function (implement based on your chosen database)
async function storeEmailInDatabase(data) {
  // Option 1: Vercel Postgres
  // const { sql } = require('@vercel/postgres')
  // return await sql`
  //   INSERT INTO newsletter_subscribers (name, email, interests, source, subscription_date, status)
  //   VALUES (${data.name}, ${data.email}, ${JSON.stringify(data.interests)}, ${data.source}, ${data.subscriptionDate}, ${data.status})
  //   RETURNING *
  // `

  // Option 2: Vercel KV (Redis)
  // const { kv } = require('@vercel/kv')
  // const key = `newsletter:${data.email}`
  // await kv.set(key, data)
  // return data

  // Option 3: External service like Airtable, Notion, or Google Sheets
  // Implementation depends on chosen service

  // For now, return the data (you'll implement actual storage)
  console.log('Would store in database:', data)
  return { id: Date.now(), ...data }
}

// Jobber client creation (calls existing API)
async function createJobberClient(data) {
  try {
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/jobber-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    return await response.json()
  } catch (error) {
    console.error('Jobber client creation failed:', error)
    return { success: false, error: error.message }
  }
}
