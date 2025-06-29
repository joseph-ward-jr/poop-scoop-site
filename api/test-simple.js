// Simple test API to isolate 500 error issues
// This minimal endpoint helps identify if the problem is with the environment or specific code

export default async function handler(req, res) {
  try {
    console.log('=== SIMPLE TEST API CALLED ===')
    console.log('Method:', req.method)
    console.log('Headers:', req.headers)
    console.log('Body:', req.body)
    
    // Test environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasJobberClientId: !!process.env.JOBBER_CLIENT_ID,
      hasJobberSecret: !!process.env.JOBBER_CLIENT_SECRET,
      hasJobberRefresh: !!process.env.JOBBER_REFRESH_TOKEN,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
    
    console.log('Environment check:', envCheck)
    
    // Test basic operations
    if (req.method === 'POST') {
      const { email, name } = req.body || {}
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required',
          envCheck
        })
      }
      
      // Test Supabase connection if configured
      let supabaseTest = null
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
          const { createClient } = require('@supabase/supabase-js')
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          )
          
          // Test a simple query
          const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('count')
            .limit(1)
          
          supabaseTest = {
            success: !error,
            error: error?.message,
            hasData: !!data
          }
        } catch (supabaseError) {
          supabaseTest = {
            success: false,
            error: supabaseError.message,
            type: supabaseError.constructor.name
          }
        }
      }
      
      return res.status(200).json({
        success: true,
        message: 'Simple test API working',
        data: {
          email,
          name: name || 'Test User',
          timestamp: new Date().toISOString()
        },
        envCheck,
        supabaseTest
      })
    }
    
    // GET request
    return res.status(200).json({
      success: true,
      message: 'Simple test API is working',
      method: req.method,
      envCheck
    })
    
  } catch (error) {
    console.error('=== SIMPLE TEST API ERROR ===')
    console.error('Error:', error)
    console.error('Stack:', error.stack)
    
    return res.status(500).json({
      success: false,
      error: 'Test API failed',
      details: {
        message: error.message,
        type: error.constructor.name,
        stack: error.stack
      }
    })
  }
}
