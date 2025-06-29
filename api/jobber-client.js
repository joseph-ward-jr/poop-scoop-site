// Vercel Serverless Function for Jobber Client Creation
// This keeps the access token secure on the server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get Jobber credentials from environment variables (server-side only)
  const clientId = process.env.JOBBER_CLIENT_ID
  const clientSecret = process.env.JOBBER_CLIENT_SECRET
  const accessToken = process.env.JOBBER_ACCESS_TOKEN // Fallback for existing setup

  // Function to get a fresh access token using client credentials
  async function getFreshAccessToken() {
    if (!clientId || !clientSecret) {
      throw new Error('JOBBER_CLIENT_ID and JOBBER_CLIENT_SECRET environment variables not set')
    }

    try {
      const tokenResponse = await fetch('https://api.getjobber.com/api/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          scope: 'read_clients write_clients'
        })
      })

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text()
        throw new Error(`Token request failed: ${tokenResponse.status} ${errorData}`)
      }

      const tokenData = await tokenResponse.json()
      return tokenData.access_token
    } catch (error) {
      console.error('Failed to get fresh access token:', error)
      throw error
    }
  }

  // Function to check if token is expired
  function isTokenExpired(token) {
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp && payload.exp < currentTime
    } catch (error) {
      console.warn('Could not parse token expiration:', error)
      return false // Assume valid if we can't parse
    }
  }

  // Get a valid access token
  let validAccessToken = accessToken

  // If we have client credentials, use them to get a fresh token
  if (clientId && clientSecret) {
    try {
      console.log('Using client credentials to get fresh access token...')
      validAccessToken = await getFreshAccessToken()
    } catch (error) {
      console.error('Failed to get fresh token with client credentials:', error)
      return res.status(500).json({
        success: false,
        errors: ['Failed to authenticate with Jobber API using client credentials']
      })
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
  } else {
    console.error('No Jobber credentials configured')
    return res.status(500).json({
      success: false,
      errors: ['Server configuration error - No Jobber credentials configured. Please set either JOBBER_ACCESS_TOKEN or JOBBER_CLIENT_ID/JOBBER_CLIENT_SECRET.']
    })
  }

  try {
    const { name, email, phone, address, contactPreference, additionalInfo } = req.body

    // Validate required fields
    if (!name || !email || !phone || !address || !contactPreference) {
      return res.status(400).json({
        success: false,
        errors: ['Missing required fields']
      })
    }

    // Parse name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Parse address into components
    const addressParts = address.split(',').map(part => part.trim())
    const street1 = addressParts[0] || ''
    const city = addressParts[1] || ''
    const stateZip = addressParts[2] || ''
    const [province, postalCode] = stateZip.split(' ').filter(Boolean)

    // Build notes
    const notes = [
      `Contact Preference: ${contactPreference}`,
      additionalInfo.trim() ? `Additional Information: ${additionalInfo}` : '',
      `Lead Source: Field & Foyer Website`,
      `Submitted: ${new Date().toLocaleString()}`
    ].filter(Boolean).join('\n\n')

    // Build client input for Jobber API
    const clientInput = {
      firstName,
      lastName: lastName || undefined,
      emails: [{
        description: 'MAIN',
        primary: true,
        address: email
      }],
      phones: [{
        description: 'MAIN',
        primary: true,
        number: phone
      }],
      billingAddress: {
        street1,
        city: city || undefined,
        province: province || undefined,
        postalCode: postalCode || undefined,
        country: 'US'
      }
    }

    // GraphQL mutation for creating client
    const mutation = `
      mutation CreateClient($input: ClientCreateInput!) {
        clientCreate(input: $input) {
          client {
            id
            firstName
            lastName
            companyName
            emails {
              id
              description
              primary
              address
            }
            phones {
              id
              description
              primary
              number
            }
            billingAddress {
              street1
              street2
              city
              province
              postalCode
              country
            }
          }
          userErrors {
            message
            path
          }
        }
      }
    `

    // Make request to Jobber API
    const response = await fetch('https://api.getjobber.com/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${validAccessToken}`,
        'Content-Type': 'application/json',
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: clientInput }
      })
    })

    const result = await response.json()

    // Handle GraphQL errors
    if (result.errors && result.errors.length > 0) {
      console.error('Jobber GraphQL errors:', result.errors)
      return res.status(400).json({
        success: false,
        errors: result.errors.map(error => error.message)
      })
    }

    // Handle user errors from the mutation
    if (result.data?.clientCreate.userErrors && result.data.clientCreate.userErrors.length > 0) {
      console.error('Jobber user errors:', result.data.clientCreate.userErrors)
      return res.status(400).json({
        success: false,
        errors: result.data.clientCreate.userErrors.map(error => error.message)
      })
    }

    // Success case
    if (result.data?.clientCreate.client) {
      const client = result.data.clientCreate.client

      // Try to add a note with form details (optional)
      try {
        const noteMutation = `
          mutation AddClientNote($input: ClientNoteCreateInput!) {
            clientNoteCreate(input: $input) {
              clientNote {
                id
                note
              }
              userErrors {
                message
                path
              }
            }
          }
        `

        await fetch('https://api.getjobber.com/api/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${validAccessToken}`,
            'Content-Type': 'application/json',
            'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
          },
          body: JSON.stringify({
            query: noteMutation,
            variables: {
              input: {
                clientId: client.id,
                note: notes
              }
            }
          })
        })
      } catch (noteError) {
        console.warn('Failed to add client note:', noteError)
        // Don't fail the entire operation if note creation fails
      }

      return res.status(200).json({
        success: true,
        client: client
      })
    }

    // Fallback error
    return res.status(500).json({
      success: false,
      errors: ['Unknown error occurred while creating client']
    })

  } catch (error) {
    console.error('Error creating Jobber client:', error)
    return res.status(500).json({
      success: false,
      errors: ['Network error occurred']
    })
  }
}
