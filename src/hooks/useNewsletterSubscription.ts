import { useState } from 'react'
import { jobberApi } from '../services/jobberApi'
import { NewsletterSubscriptionData, NewsletterJobberSubmissionResult } from '../types/jobber'
import { NewsletterFormData } from '../types/blog'

interface UseNewsletterSubscriptionReturn {
  isSubmitting: boolean
  submitNewsletter: (formData: NewsletterFormData, source: string) => Promise<NewsletterJobberSubmissionResult>
  lastResult: NewsletterJobberSubmissionResult | null
}

export const useNewsletterSubscription = (): UseNewsletterSubscriptionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastResult, setLastResult] = useState<NewsletterJobberSubmissionResult | null>(null)

  const submitNewsletter = async (formData: NewsletterFormData, source: string): Promise<NewsletterJobberSubmissionResult> => {
    setIsSubmitting(true)
    
    try {
      // Transform form data to Jobber subscription data
      const subscriptionData: NewsletterSubscriptionData = {
        name: formData.name || 'Newsletter Subscriber',
        email: formData.email,
        interests: formData.interests,
        source: source,
        subscriptionDate: new Date().toISOString()
      }

      const result = await jobberApi.createClientFromNewsletter(subscriptionData)
      setLastResult(result)
      return result
    } catch (error) {
      const errorResult: NewsletterJobberSubmissionResult = {
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
    submitNewsletter,
    lastResult
  }
}
