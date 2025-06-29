import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNewsletterSubscription } from '../useNewsletterSubscription'
import { NewsletterFormData } from '../../types/blog'

// Mock the jobber API
vi.mock('../../services/jobberApi', () => ({
  jobberApi: {
    createClientFromNewsletter: vi.fn()
  }
}))

import { jobberApi } from '../../services/jobberApi'

describe('useNewsletterSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useNewsletterSubscription())

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toBe(null)
    expect(typeof result.current.submitNewsletter).toBe('function')
  })

  it('successfully submits newsletter subscription', async () => {
    const mockResult = {
      success: true,
      client: {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        emails: [{ id: '1', address: 'john@example.com', primary: true, description: 'MAIN' }],
        phones: []
      }
    }

    vi.mocked(jobberApi.createClientFromNewsletter).mockResolvedValue(mockResult)

    const { result } = renderHook(() => useNewsletterSubscription())

    const formData: NewsletterFormData = {
      email: 'john@example.com',
      name: 'John Doe',
      interests: ['home-cleaning', 'lawn-maintenance']
    }

    let submissionResult
    await act(async () => {
      submissionResult = await result.current.submitNewsletter(formData, 'Test Blog Post')
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toEqual(mockResult)
    expect(submissionResult).toEqual(mockResult)

    // Verify the API was called with correct data
    expect(jobberApi.createClientFromNewsletter).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      interests: ['home-cleaning', 'lawn-maintenance'],
      source: 'Test Blog Post',
      subscriptionDate: expect.any(String)
    })
  })

  it('handles submission with missing name', async () => {
    const mockResult = {
      success: true,
      client: {
        id: '123',
        firstName: 'Newsletter',
        lastName: 'Subscriber',
        emails: [{ id: '1', address: 'test@example.com', primary: true, description: 'MAIN' }],
        phones: []
      }
    }

    vi.mocked(jobberApi.createClientFromNewsletter).mockResolvedValue(mockResult)

    const { result } = renderHook(() => useNewsletterSubscription())

    const formData: NewsletterFormData = {
      email: 'test@example.com',
      interests: ['eco-friendly']
    }

    await act(async () => {
      await result.current.submitNewsletter(formData, 'Test Source')
    })

    // Verify the API was called with default name
    expect(jobberApi.createClientFromNewsletter).toHaveBeenCalledWith({
      name: 'Newsletter Subscriber',
      email: 'test@example.com',
      interests: ['eco-friendly'],
      source: 'Test Source',
      subscriptionDate: expect.any(String)
    })
  })

  it('handles API errors gracefully', async () => {
    const mockError = new Error('API Error')
    vi.mocked(jobberApi.createClientFromNewsletter).mockRejectedValue(mockError)

    const { result } = renderHook(() => useNewsletterSubscription())

    const formData: NewsletterFormData = {
      email: 'error@example.com',
      name: 'Error Test',
      interests: ['home-cleaning']
    }

    let submissionResult
    await act(async () => {
      submissionResult = await result.current.submitNewsletter(formData, 'Error Test Source')
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toEqual({
      success: false,
      errors: ['API Error']
    })
    expect(submissionResult).toEqual({
      success: false,
      errors: ['API Error']
    })
  })

  it('handles non-Error exceptions', async () => {
    vi.mocked(jobberApi.createClientFromNewsletter).mockRejectedValue('String error')

    const { result } = renderHook(() => useNewsletterSubscription())

    const formData: NewsletterFormData = {
      email: 'test@example.com',
      interests: ['pet-care']
    }

    await act(async () => {
      await result.current.submitNewsletter(formData, 'Test')
    })

    expect(result.current.lastResult).toEqual({
      success: false,
      errors: ['An unexpected error occurred']
    })
  })

  it('sets isSubmitting to true during submission', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    vi.mocked(jobberApi.createClientFromNewsletter).mockReturnValue(promise as any)

    const { result } = renderHook(() => useNewsletterSubscription())

    const formData: NewsletterFormData = {
      email: 'test@example.com',
      interests: ['home-cleaning']
    }

    // Start submission
    act(() => {
      result.current.submitNewsletter(formData, 'Test')
    })

    // Should be submitting
    expect(result.current.isSubmitting).toBe(true)

    // Resolve the promise
    await act(async () => {
      resolvePromise!({ success: true })
    })

    // Should no longer be submitting
    expect(result.current.isSubmitting).toBe(false)
  })
})
