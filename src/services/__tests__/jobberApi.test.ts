import { describe, it, expect, vi, beforeEach } from 'vitest'
import { jobberApi } from '../jobberApi'
import { ContactFormData } from '../../types/jobber'

// Mock fetch globally
globalThis.fetch = vi.fn()

describe('JobberApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset the access token
    jobberApi.setAccessToken('test-token')
  })

  describe('createClientFromForm', () => {
    const mockFormData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Atlanta, GA 30309',
      contactPreference: 'email',
      additionalInfo: 'Interested in weekly service'
    }

    it('successfully creates a client', async () => {
      const mockResponse = {
        data: {
          clientCreate: {
            client: {
              id: '123',
              firstName: 'John',
              lastName: 'Doe',
              emails: [{ id: '1', description: 'MAIN', primary: true, address: 'john@example.com' }],
              phones: [{ id: '2', description: 'MAIN', primary: true, number: '(555) 123-4567' }],
              billingAddress: {
                id: '3',
                street1: '123 Main St',
                city: 'Atlanta',
                province: 'GA',
                postalCode: '30309',
                country: 'US'
              }
            },
            userErrors: []
          }
        }
      }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await jobberApi.createClientFromForm(mockFormData)

      expect(result.success).toBe(true)
      expect(result.client).toBeDefined()
      expect(result.client?.firstName).toBe('John')
      expect(result.client?.lastName).toBe('Doe')
    })

    it('handles user errors from Jobber API', async () => {
      const mockResponse = {
        data: {
          clientCreate: {
            client: null,
            userErrors: [
              { message: 'Email address is invalid', path: ['emails', 0, 'address'] }
            ]
          }
        }
      }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await jobberApi.createClientFromForm(mockFormData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Email address is invalid')
    })

    it('handles GraphQL errors', async () => {
      const mockResponse = {
        errors: [
          { message: 'Authentication failed' }
        ]
      }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await jobberApi.createClientFromForm(mockFormData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Authentication failed')
    })

    it('handles network errors', async () => {
      ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await jobberApi.createClientFromForm(mockFormData)

      expect(result.success).toBe(false)
      expect(result.errors).toContain('Network error')
    })

    it('handles HTTP errors', async () => {
      ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401
      })

      const result = await jobberApi.createClientFromForm(mockFormData)

      expect(result.success).toBe(false)
      expect(result.errors?.[0]).toContain('HTTP error')
    })

    it('parses name correctly', async () => {
      const formDataWithLongName = {
        ...mockFormData,
        name: 'John Michael Doe Jr.'
      }

      const mockResponse = {
        data: {
          clientCreate: {
            client: {
              id: '123',
              firstName: 'John',
              lastName: 'Michael Doe Jr.',
              emails: [],
              phones: []
            },
            userErrors: []
          }
        }
      }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      await jobberApi.createClientFromForm(formDataWithLongName)

      const fetchCall = (fetch as any).mock.calls[0]
      const requestBody = JSON.parse(fetchCall[1].body)
      
      expect(requestBody.variables.input.firstName).toBe('John')
      expect(requestBody.variables.input.lastName).toBe('Michael Doe Jr.')
    })

    it('builds notes correctly', async () => {
      const mockResponse = {
        data: {
          clientCreate: {
            client: { id: '123', firstName: 'John', emails: [], phones: [] },
            userErrors: []
          }
        }
      }

      // Mock both the client creation call and the note creation call
      ;(fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { clientNoteCreate: { clientNote: { id: 'note123' }, userErrors: [] } } })
        })

      await jobberApi.createClientFromForm(mockFormData)

      // Check that fetch was called twice (client creation + note creation)
      expect(fetch).toHaveBeenCalledTimes(2)

      // Check the first call (client creation) - should NOT have notes in input
      const clientCreateCall = (fetch as any).mock.calls[0]
      const clientCreateBody = JSON.parse(clientCreateCall[1].body)
      expect(clientCreateBody.variables.input.notes).toBeUndefined()

      // Check the second call (note creation) - should have the note content
      const noteCreateCall = (fetch as any).mock.calls[1]
      const noteCreateBody = JSON.parse(noteCreateCall[1].body)
      const noteContent = noteCreateBody.variables.input.note

      expect(noteContent).toContain('Contact Preference: email')
      expect(noteContent).toContain('Additional Information: Interested in weekly service')
      expect(noteContent).toContain('Lead Source: Field & Foyer Website')
    })
  })

  describe('testConnection', () => {
    it('returns true for successful connection', async () => {
      const mockResponse = {
        data: {
          account: {
            id: '123',
            name: 'Test Account'
          }
        }
      }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })

      const result = await jobberApi.testConnection()
      expect(result).toBe(true)
    })

    it('returns false for failed connection', async () => {
      ;(fetch as any).mockRejectedValueOnce(new Error('Connection failed'))

      const result = await jobberApi.testConnection()
      expect(result).toBe(false)
    })
  })

  describe('setAccessToken', () => {
    it('sets the access token', () => {
      jobberApi.setAccessToken('new-token')
      // We can't directly test the private property, but we can test that subsequent API calls work
      expect(() => jobberApi.setAccessToken('new-token')).not.toThrow()
    })
  })
})
