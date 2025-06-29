import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useJobberSubmission } from '../useJobberSubmission'
import { ContactFormData, JobberSubmissionResult } from '../../types/jobber'

// Mock the jobberApi service
vi.mock('../../services/jobberApi', () => ({
  jobberApi: {
    createClientFromForm: vi.fn()
  }
}))

import { jobberApi } from '../../services/jobberApi'

describe('useJobberSubmission', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockFormData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Atlanta, GA 30309',
    contactPreference: 'email',
    additionalInfo: 'Test submission'
  }

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useJobberSubmission())

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toBe(null)
    expect(typeof result.current.submitToJobber).toBe('function')
  })

  it('handles successful submission', async () => {
    const mockSuccessResult = {
      success: true,
      client: {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        emails: [],
        phones: []
      }
    }

    ;(jobberApi.createClientFromForm as any).mockResolvedValueOnce(mockSuccessResult)

    const { result } = renderHook(() => useJobberSubmission())

    let submissionResult: JobberSubmissionResult | undefined
    await act(async () => {
      submissionResult = await result.current.submitToJobber(mockFormData)
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toEqual(mockSuccessResult)
    expect(submissionResult).toEqual(mockSuccessResult)
  })

  it('handles failed submission', async () => {
    const mockErrorResult = {
      success: false,
      errors: ['Email address is invalid']
    }

    ;(jobberApi.createClientFromForm as any).mockResolvedValueOnce(mockErrorResult)

    const { result } = renderHook(() => useJobberSubmission())

    let submissionResult: JobberSubmissionResult | undefined
    await act(async () => {
      submissionResult = await result.current.submitToJobber(mockFormData)
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult).toEqual(mockErrorResult)
    expect(submissionResult).toEqual(mockErrorResult)
  })

  it('handles API service exceptions', async () => {
    const mockError = new Error('Network error')
    ;(jobberApi.createClientFromForm as any).mockRejectedValueOnce(mockError)

    const { result } = renderHook(() => useJobberSubmission())

    let submissionResult: JobberSubmissionResult | undefined
    await act(async () => {
      submissionResult = await result.current.submitToJobber(mockFormData)
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.lastResult?.success).toBe(false)
    expect(result.current.lastResult?.errors).toContain('Network error')
    expect(submissionResult?.success).toBe(false)
  })

  it('sets isSubmitting to true during submission', async () => {
    let resolvePromise: (value: any) => void
    const mockPromise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    ;(jobberApi.createClientFromForm as any).mockReturnValueOnce(mockPromise)

    const { result } = renderHook(() => useJobberSubmission())

    // Start submission
    act(() => {
      result.current.submitToJobber(mockFormData)
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
