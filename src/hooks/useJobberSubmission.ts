import { useState } from 'react'
import { jobberApi } from '../services/jobberApi'
import { ContactFormData, JobberSubmissionResult } from '../types/jobber'

interface UseJobberSubmissionReturn {
  isSubmitting: boolean
  submitToJobber: (formData: ContactFormData) => Promise<JobberSubmissionResult>
  lastResult: JobberSubmissionResult | null
}

export const useJobberSubmission = (): UseJobberSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastResult, setLastResult] = useState<JobberSubmissionResult | null>(null)

  const submitToJobber = async (formData: ContactFormData): Promise<JobberSubmissionResult> => {
    setIsSubmitting(true)
    
    try {
      const result = await jobberApi.createClientFromForm(formData)
      setLastResult(result)
      return result
    } catch (error) {
      const errorResult: JobberSubmissionResult = {
        success: false,
        errors: [error instanceof Error ? error.message : 'An unexpected error occurred']
      }
      setLastResult(errorResult)
      return errorResult
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitToJobber,
    lastResult
  }
}
