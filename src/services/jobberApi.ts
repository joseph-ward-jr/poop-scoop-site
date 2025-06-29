import {
  JobberClientInput,
  JobberClientCreateResponse,
  JobberApiResponse,
  JobberSubmissionResult,
  ContactFormData,
  JobberEmailInput,
  JobberPhoneInput,
  JobberAddressInput
} from '../types/jobber'

class JobberApiService {
  private readonly apiUrl = 'https://api.getjobber.com/api/graphql'
  private readonly apiVersion = '2023-11-15'
  private accessToken: string | null = null

  constructor() {
    // Get access token from environment variables
    this.accessToken = ((import.meta as any).env?.VITE_JOBBER_ACCESS_TOKEN as string) || null
  }

  /**
   * Set the access token for API requests
   */
  setAccessToken(token: string) {
    this.accessToken = token
  }

  /**
   * Make a GraphQL request to Jobber API
   */
  private async makeRequest<T>(query: string, variables?: any): Promise<JobberApiResponse<T>> {
    if (!this.accessToken) {
      throw new Error('Jobber access token not configured')
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
          'X-JOBBER-GRAPHQL-VERSION': this.apiVersion
        },
        body: JSON.stringify({
          query,
          variables
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: JobberApiResponse<T> = await response.json()
      return data
    } catch (error) {
      console.error('Jobber API request failed:', error)
      throw error
    }
  }

  /**
   * Create a client in Jobber from contact form data
   */
  async createClientFromForm(formData: ContactFormData): Promise<JobberSubmissionResult> {
    try {
      // Parse name into first and last name
      const nameParts = formData.name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Parse address into components (basic parsing)
      const addressParts = formData.address.split(',').map(part => part.trim())
      const street1 = addressParts[0] || ''
      const city = addressParts[1] || ''
      const stateZip = addressParts[2] || ''
      const [province, postalCode] = stateZip.split(' ').filter(Boolean)

      // Build client input
      const clientInput: JobberClientInput = {
        firstName,
        lastName: lastName || undefined,
        emails: [{
          description: 'MAIN',
          primary: true,
          address: formData.email
        }] as JobberEmailInput[],
        phones: [{
          description: 'MAIN',
          primary: true,
          number: formData.phone
        }] as JobberPhoneInput[],
        billingAddress: {
          street1,
          city: city || undefined,
          province: province || undefined,
          postalCode: postalCode || undefined,
          country: 'US' // Default to US, could be made configurable
        } as JobberAddressInput,
        notes: this.buildNotesFromForm(formData)
      }

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
                id
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

      const response = await this.makeRequest<JobberClientCreateResponse>(mutation, {
        input: clientInput
      })

      // Handle GraphQL errors
      if (response.errors && response.errors.length > 0) {
        return {
          success: false,
          errors: response.errors.map(error => error.message)
        }
      }

      // Handle user errors from the mutation
      if (response.data?.clientCreate.userErrors && response.data.clientCreate.userErrors.length > 0) {
        return {
          success: false,
          errors: response.data.clientCreate.userErrors.map(error => error.message)
        }
      }

      // Success case
      if (response.data?.clientCreate.client) {
        return {
          success: true,
          client: response.data.clientCreate.client
        }
      }

      // Fallback error
      return {
        success: false,
        errors: ['Unknown error occurred while creating client']
      }

    } catch (error) {
      console.error('Error creating Jobber client:', error)
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Network error occurred']
      }
    }
  }

  /**
   * Build notes field from form data
   */
  private buildNotesFromForm(formData: ContactFormData): string {
    const notes = []
    
    notes.push(`Contact Preference: ${formData.contactPreference}`)
    
    if (formData.additionalInfo.trim()) {
      notes.push(`Additional Information: ${formData.additionalInfo}`)
    }
    
    notes.push(`Lead Source: Field & Foyer Website`)
    notes.push(`Submitted: ${new Date().toLocaleString()}`)
    
    return notes.join('\n\n')
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const query = `
        query TestConnection {
          account {
            id
            name
          }
        }
      `

      const response = await this.makeRequest(query)
      return !response.errors && !!response.data
    } catch (error) {
      console.error('Jobber API connection test failed:', error)
      return false
    }
  }

  /**
   * Get account information for testing purposes
   */
  async getAccountInfo(): Promise<any> {
    try {
      const query = `
        query GetAccount {
          account {
            id
            name
            industry
            createdAt
          }
        }
      `

      const response = await this.makeRequest<{ account: any }>(query)
      return response.data?.account || null
    } catch (error) {
      console.error('Failed to get account info:', error)
      return null
    }
  }
}

// Export singleton instance
export const jobberApi = new JobberApiService()
export default jobberApi
