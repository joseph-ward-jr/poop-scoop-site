// Vercel Serverless Function for Jobber Client Creation
// This keeps the access token secure on the server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get the Jobber access token from environment variables (server-side only)
  const accessToken = process.env.JOBBER_ACCESS_TOKEN
  
  if (!accessToken) {
    console.error('JOBBER_ACCESS_TOKEN environment variable not set')
    return res.status(500).json({ 
      success: false, 
      errors: ['Server configuration error'] 
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
        'Authorization': `Bearer ${accessToken}`,
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
            'Authorization': `Bearer ${accessToken}`,
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
