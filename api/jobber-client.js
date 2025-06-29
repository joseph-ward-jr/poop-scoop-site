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
  const refreshToken = process.env.JOBBER_REFRESH_TOKEN
  const accessToken = process.env.JOBBER_ACCESS_TOKEN // Fallback for existing setup

  // Function to get a fresh access token using refresh token (proper OAuth2 flow)
  async function getFreshAccessToken() {
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('JOBBER_CLIENT_ID, JOBBER_CLIENT_SECRET, and JOBBER_REFRESH_TOKEN environment variables required')
    }

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

    // First, ensure we have custom fields for form data
    console.log('Step 1: Setting up custom fields for form data...')
    let contactPreferenceFieldId = null
    let additionalNotesFieldId = null
    let leadSourceFieldId = null

    try {
      // Check if custom fields already exist
      const checkFieldQuery = `
        query CheckCustomFields {
          customFieldConfigurations(first: 50) {
            nodes {
              ... on CustomFieldConfigurationText {
                id
                name
                valueType
                appliesTo
                readOnly
              }
            }
          }
        }
      `

      const checkResponse = await fetch('https://api.getjobber.com/api/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${validAccessToken}`,
          'Content-Type': 'application/json',
          'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
        },
        body: JSON.stringify({
          query: checkFieldQuery
        })
      })

      const checkResult = await checkResponse.json()
      console.log('Custom field check result:', JSON.stringify(checkResult, null, 2))

      // Look for existing custom fields
      if (checkResult.data?.customFieldConfigurations?.nodes) {
        const existingFields = checkResult.data.customFieldConfigurations.nodes

        // Find Contact Preference field
        const contactPrefField = existingFields.find(
          field => field.name === 'Contact Preference' && field.appliesTo === 'ALL_CLIENTS'
        )
        if (contactPrefField) {
          contactPreferenceFieldId = contactPrefField.id
          console.log('Found existing Contact Preference field:', contactPreferenceFieldId)
        }

        // Find Additional Notes field
        const additionalNotesField = existingFields.find(
          field => field.name === 'Additional Notes' && field.appliesTo === 'ALL_CLIENTS'
        )
        if (additionalNotesField) {
          additionalNotesFieldId = additionalNotesField.id
          console.log('Found existing Additional Notes field:', additionalNotesFieldId)
        }

        // Find Lead Source field
        const leadSourceField = existingFields.find(
          field => field.name === 'Lead Source' && field.appliesTo === 'ALL_CLIENTS'
        )
        if (leadSourceField) {
          leadSourceFieldId = leadSourceField.id
          console.log('Found existing Lead Source field:', leadSourceFieldId)
        }
      }

      // Create Contact Preference field if it doesn't exist
      if (!contactPreferenceFieldId) {
        console.log('Creating Contact Preference custom field...')

        const createContactPrefMutation = `
          mutation CreateContactPreferenceField {
            customFieldConfigurationCreateText(
              input: {
                appliesTo: ALL_CLIENTS
                name: "Contact Preference"
                transferable: false
                readOnly: true
                defaultValue: ""
              }
            ) {
              customFieldConfiguration {
                createdAt
                id
                name
                valueType
                appliesTo
                readOnly
              }
              userErrors {
                message
                path
              }
            }
          }
        `

        const createContactPrefResponse = await fetch('https://api.getjobber.com/api/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${validAccessToken}`,
            'Content-Type': 'application/json',
            'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
          },
          body: JSON.stringify({
            query: createContactPrefMutation
          })
        })

        const createContactPrefResult = await createContactPrefResponse.json()
        console.log('Create Contact Preference field result:', JSON.stringify(createContactPrefResult, null, 2))

        if (createContactPrefResult.data?.customFieldConfigurationCreateText.customFieldConfiguration) {
          contactPreferenceFieldId = createContactPrefResult.data.customFieldConfigurationCreateText.customFieldConfiguration.id
          console.log('Successfully created Contact Preference custom field:', contactPreferenceFieldId)
        }
      }

      // Create Additional Notes field if it doesn't exist
      if (!additionalNotesFieldId) {
        console.log('Creating Additional Notes custom field...')

        const createAdditionalNotesMutation = `
          mutation CreateAdditionalNotesField {
            customFieldConfigurationCreateText(
              input: {
                appliesTo: ALL_CLIENTS
                name: "Additional Notes"
                transferable: false
                readOnly: true
                defaultValue: ""
              }
            ) {
              customFieldConfiguration {
                createdAt
                id
                name
                valueType
                appliesTo
                readOnly
              }
              userErrors {
                message
                path
              }
            }
          }
        `

        const createAdditionalNotesResponse = await fetch('https://api.getjobber.com/api/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${validAccessToken}`,
            'Content-Type': 'application/json',
            'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
          },
          body: JSON.stringify({
            query: createAdditionalNotesMutation
          })
        })

        const createAdditionalNotesResult = await createAdditionalNotesResponse.json()
        console.log('Create Additional Notes field result:', JSON.stringify(createAdditionalNotesResult, null, 2))

        if (createAdditionalNotesResult.data?.customFieldConfigurationCreateText.customFieldConfiguration) {
          additionalNotesFieldId = createAdditionalNotesResult.data.customFieldConfigurationCreateText.customFieldConfiguration.id
          console.log('Successfully created Additional Notes custom field:', additionalNotesFieldId)
        }
      }

      // Create Lead Source field if it doesn't exist
      if (!leadSourceFieldId) {
        console.log('Creating Lead Source custom field...')

        const createLeadSourceMutation = `
          mutation CreateLeadSourceField {
            customFieldConfigurationCreateText(
              input: {
                appliesTo: ALL_CLIENTS
                name: "Lead Source"
                transferable: false
                readOnly: true
                defaultValue: ""
              }
            ) {
              customFieldConfiguration {
                createdAt
                id
                name
                valueType
                appliesTo
                readOnly
              }
              userErrors {
                message
                path
              }
            }
          }
        `

        const createLeadSourceResponse = await fetch('https://api.getjobber.com/api/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${validAccessToken}`,
            'Content-Type': 'application/json',
            'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
          },
          body: JSON.stringify({
            query: createLeadSourceMutation
          })
        })

        const createLeadSourceResult = await createLeadSourceResponse.json()
        console.log('Create Lead Source field result:', JSON.stringify(createLeadSourceResult, null, 2))

        if (createLeadSourceResult.data?.customFieldConfigurationCreateText.customFieldConfiguration) {
          leadSourceFieldId = createLeadSourceResult.data.customFieldConfigurationCreateText.customFieldConfiguration.id
          console.log('Successfully created Lead Source custom field:', leadSourceFieldId)
        }
      }
    } catch (fieldError) {
      console.error('Error setting up custom fields:', fieldError)
    }

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

    // Add custom fields to client input
    const customFields = []

    if (contactPreferenceFieldId) {
      console.log('Adding Contact Preference to client creation with field ID:', contactPreferenceFieldId)
      customFields.push({
        customFieldConfigurationId: contactPreferenceFieldId,
        valueText: contactPreference
      })
    }

    if (additionalNotesFieldId && additionalInfo.trim()) {
      console.log('Adding Additional Notes to client creation with field ID:', additionalNotesFieldId)
      customFields.push({
        customFieldConfigurationId: additionalNotesFieldId,
        valueText: additionalInfo.trim()
      })
    }

    if (leadSourceFieldId) {
      console.log('Adding Lead Source to client creation with field ID:', leadSourceFieldId)
      customFields.push({
        customFieldConfigurationId: leadSourceFieldId,
        valueText: 'Field & Foyer Website'
      })
    }

    if (customFields.length > 0) {
      clientInput.customFields = customFields
      console.log('Client will be created with', customFields.length, 'custom fields')
    } else {
      console.warn('No custom field IDs available - client will be created without custom fields')
    }

    // GraphQL mutation for creating client with custom fields
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
            customFields {
              ... on CustomFieldText {
                id
                customFieldConfiguration {
                  id
                  name
                }
                valueText
              }
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
      console.log('Successfully created client:', client.id)

      // Log custom field information if present
      if (client.customFields && client.customFields.length > 0) {
        console.log('Client created with custom fields:', client.customFields)
      } else {
        console.log('Client created without custom fields')
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
