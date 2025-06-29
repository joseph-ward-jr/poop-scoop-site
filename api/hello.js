// Absolute minimal API test - no dependencies, no imports, no environment variables
// If this fails with 500, there's a fundamental Vercel configuration issue

export default function handler(req, res) {
  try {
    console.log('Hello API called')
    
    return res.status(200).json({
      success: true,
      message: 'Hello World - Basic API works',
      method: req.method,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Even hello API failed:', error)
    return res.status(500).json({
      success: false,
      error: 'Hello API failed: ' + error.message
    })
  }
}
