// Enhanced Newsletter API with Supabase + Jobber Integration
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

module.exports = async function handler(req, res) {
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

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Store in Supabase Database
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        name: name || 'Newsletter Subscriber',
        email: email.toLowerCase().trim(),
        interests: interests || ['home-cleaning', 'lawn-maintenance'],
        source: source || 'Website',
        status: 'active'
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({
          success: false,
          errors: ['This email is already subscribed to our newsletter']
        })
      }
      throw error
    }

    console.log('✅ Stored email in Supabase:', email)

    // Create Jobber Client (existing functionality)
    const jobberResult = await createJobberClient({
      name: name || 'Newsletter Subscriber',
      email: email.toLowerCase().trim(),
      interests,
      source,
      subscriptionDate
    })

    // Update Supabase record with Jobber client ID if successful
    if (jobberResult.success && jobberResult.client?.id) {
      await supabase
        .from('newsletter_subscribers')
        .update({ jobber_client_id: jobberResult.client.id })
        .eq('email', email.toLowerCase().trim())
    }

    console.log('📋 Jobber result:', jobberResult.success ? 'Success' : 'Failed')

    // Return success even if Jobber fails (email is still stored)
    return res.status(200).json({
      success: true,
      subscriber,
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

// Jobber client creation (calls existing API)
async function createJobberClient(data) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/jobber-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    return result

  } catch (error) {
    console.error('❌ Jobber client creation failed:', error)
    return { success: false, error: error.message }
  }
}
