// Vercel Serverless Function for OAuth2 Authorization Code Exchange
// Exchanges authorization code for access token + refresh token

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get OAuth credentials from environment variables
  const clientId = process.env.JOBBER_CLIENT_ID
  const clientSecret = process.env.JOBBER_CLIENT_SECRET
  const redirectUri = process.env.JOBBER_REDIRECT_URI || 'https://www.fieldandfoyer.com/oauth/callback'

  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials')
    return res.status(500).json({
      success: false,
      errors: ['Server configuration error - OAuth credentials not configured']
    })
  }

  try {
    const { code, state } = req.body

    if (!code) {
      return res.status(400).json({
        success: false,
        errors: ['Authorization code is required']
      })
    }

    console.log('Exchanging authorization code for tokens...')
    console.log('Code:', code.substring(0, 10) + '...')
    console.log('State:', state)
    console.log('Redirect URI:', redirectUri)

    // Exchange authorization code for tokens
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri
    })

    const tokenResponse = await fetch('https://api.getjobber.com/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        body: errorData
      })
      return res.status(400).json({
        success: false,
        errors: [`Token exchange failed: ${tokenResponse.status} ${errorData}`]
      })
    }

    const tokenData = await tokenResponse.json()
    console.log('Successfully obtained tokens from Jobber')

    // Calculate expiration time
    const expiresAt = tokenData.expires_in 
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null

    // Log token information (without exposing full tokens)
    console.log('Token exchange successful:', {
      access_token_length: tokenData.access_token?.length,
      refresh_token_length: tokenData.refresh_token?.length,
      expires_in: tokenData.expires_in,
      expires_at: expiresAt,
      token_type: tokenData.token_type,
      scope: tokenData.scope
    })

    // Return success with token information
    return res.status(200).json({
      success: true,
      message: 'Successfully obtained access token and refresh token',
      tokens: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        expires_at: expiresAt,
        token_type: tokenData.token_type,
        scope: tokenData.scope
      },
      instructions: {
        next_steps: [
          'Copy the refresh token from this response',
          'Add it to your Vercel environment variables as JOBBER_REFRESH_TOKEN',
          'Your contact form will now use automatic token refresh',
          'Test the contact form to verify the integration works'
        ],
        environment_variables: {
          JOBBER_CLIENT_ID: 'Already configured',
          JOBBER_CLIENT_SECRET: 'Already configured',
          JOBBER_REFRESH_TOKEN: 'ADD THIS: ' + tokenData.refresh_token?.substring(0, 20) + '...'
        }
      }
    })

  } catch (error) {
    console.error('OAuth exchange error:', error)
    return res.status(500).json({
      success: false,
      errors: ['Unexpected error during token exchange: ' + error.message]
    })
  }
}
