// Vercel Serverless Function for Jobber Newsletter Subscription
// Uses the same refresh token flow as the contact form

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get Jobber credentials from environment variables (server-side only)
  const clientId = process.env.JOBBER_CLIENT_ID
  const clientSecret = process.env.JOBBER_CLIENT_SECRET
  const refreshToken = process.env.JOBBER_REFRESH_TOKEN
  const accessToken = process.env.JOBBER_ACCESS_TOKEN // Fallback for existing setup

  // Function to get fresh access token using refresh token
  const getFreshAccessToken = async () => {
    console.log('Getting fresh access token using refresh token...')

    try {
      // Use refresh token flow as documented by Jobber
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken
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
        console.error('Refresh token request failed:', {
          status: tokenResponse.status,
          statusText: tokenResponse.statusText,
          body: errorData
        })
        throw new Error(`Refresh token request failed: ${tokenResponse.status} ${errorData}`)
      }

      const tokenData = await tokenResponse.json()
      console.log('Successfully refreshed access token using refresh token')

      // Note: The response may include a new refresh token if rotation is enabled
      if (tokenData.refresh_token && tokenData.refresh_token !== refreshToken) {
        console.warn('New refresh token received - you may need to update JOBBER_REFRESH_TOKEN environment variable')
      }

      return tokenData.access_token
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      throw error
    }
  }

  // Function to check if JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp && payload.exp < currentTime
    } catch (error) {
      console.warn('Could not parse token expiration:', error)
      return false // Assume valid if we can't parse
    }
  }

  // Determine which access token to use
  let validAccessToken = null

  // If we have refresh token credentials, use them to get a fresh token
  if (clientId && clientSecret && refreshToken) {
    try {
      console.log('Using refresh token to get fresh access token...')
      validAccessToken = await getFreshAccessToken()
    } catch (error) {
      console.error('Refresh token failed, falling back to access token:', error)

      // Fall back to access token if refresh token doesn't work
      if (accessToken && !isTokenExpired(accessToken)) {
        console.log('Using fallback access token...')
        validAccessToken = accessToken
      } else {
        return res.status(500).json({
          success: false,
          errors: [
            'Failed to refresh access token using refresh token.',
            'Your refresh token may be expired or invalid.',
            'Please re-authorize your Jobber app or use a permanent access token.',
            'Error details: ' + error.message
          ]
        })
      }
    }
  } else if (accessToken) {
    // Fallback to existing access token, but check if expired
    if (isTokenExpired(accessToken)) {
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())
      const expDate = new Date(payload.exp * 1000)
      console.error(`Jobber access token expired at ${expDate.toISOString()}`)
      return res.status(500).json({
        success: false,
        errors: [`Jobber access token expired at ${expDate.toLocaleString()}. Please set up client credentials (JOBBER_CLIENT_ID and JOBBER_CLIENT_SECRET) for automatic token refresh.`]
      })
    }
    validAccessToken = accessToken
  } else {
    console.error('No Jobber credentials configured')
    return res.status(500).json({
      success: false,
      errors: [
        'Server configuration error - No Jobber credentials configured.',
        'Please set either:',
        '1. JOBBER_ACCESS_TOKEN (permanent token), or',
        '2. JOBBER_CLIENT_ID + JOBBER_CLIENT_SECRET + JOBBER_REFRESH_TOKEN (OAuth2 flow)'
      ]
    })
  }

  try {
    const { name, email, interests, source, subscriptionDate } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        errors: ['Name and email are required for newsletter subscription']
      })
    }

    // Parse name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Build notes for the client
    const notes = []
    notes.push('Newsletter Subscription')
    if (interests && interests.length > 0) {
      notes.push(`Interests: ${interests.join(', ')}`)
    }
    if (source) {
      notes.push(`Source: ${source}`)
    }
    if (subscriptionDate) {
      notes.push(`Subscribed: ${subscriptionDate}`)
    }
    notes.push('Lead Source: Field & Foyer Newsletter')

    // Create the GraphQL mutation for creating a client
    const mutation = `
      mutation CreateNewsletterClient($input: ClientCreateInput!) {
        clientCreate(input: $input) {
          client {
            id
            firstName
            lastName
            emails {
              id
              address
              primary
              description
            }
          }
          userErrors {
            message
            path
          }
        }
      }
    `

    const variables = {
      input: {
        firstName,
        lastName: lastName || undefined,
        emails: [{
          description: 'MAIN',
          primary: true,
          address: email
        }],
        notes: notes.join('\n\n')
      }
    }

    console.log('Creating newsletter subscriber in Jobber:', {
      firstName,
      lastName,
      email,
      source,
      interests
    })

    // Make the GraphQL request to Jobber
    const response = await fetch('https://api.getjobber.com/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${validAccessToken}`,
        'Content-Type': 'application/json',
        'X-JOBBER-GRAPHQL-VERSION': '2023-11-15'
      },
      body: JSON.stringify({
        query: mutation,
        variables
      })
    })

    if (!response.ok) {
      console.error('Jobber API request failed:', {
        status: response.status,
        statusText: response.statusText
      })
      return res.status(500).json({
        success: false,
        errors: [`Jobber API request failed: ${response.status} ${response.statusText}`]
      })
    }

    const result = await response.json()

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      console.error('Jobber GraphQL errors:', result.errors)
      return res.status(500).json({
        success: false,
        errors: result.errors.map(error => error.message)
      })
    }

    // Check for user errors in the mutation response
    if (result.data?.clientCreate?.userErrors && result.data.clientCreate.userErrors.length > 0) {
      console.error('Jobber client creation errors:', result.data.clientCreate.userErrors)
      return res.status(400).json({
        success: false,
        errors: result.data.clientCreate.userErrors.map(error => error.message)
      })
    }

    // Check if client was created successfully
    if (!result.data?.clientCreate?.client) {
      console.error('No client data returned from Jobber')
      return res.status(500).json({
        success: false,
        errors: ['Failed to create client - no client data returned']
      })
    }

    const client = result.data.clientCreate.client
    console.log('Successfully created newsletter subscriber in Jobber:', {
      clientId: client.id,
      name: `${client.firstName} ${client.lastName}`,
      email: client.emails?.[0]?.address
    })

    return res.status(200).json({
      success: true,
      client: client,
      message: 'Newsletter subscriber successfully added to Jobber'
    })

  } catch (error) {
    console.error('Unexpected error in newsletter subscription:', error)
    return res.status(500).json({
      success: false,
      errors: ['Unexpected error occurred: ' + error.message]
    })
  }
}
