import { useState, useCallback } from 'react'

interface UseGlobalNewsletterReturn {
  isNewsletterOpen: boolean
  openNewsletter: (source?: string) => void
  closeNewsletter: () => void
  newsletterSource: string
}

export const useGlobalNewsletter = (): UseGlobalNewsletterReturn => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [newsletterSource, setNewsletterSource] = useState('Website')

  const openNewsletter = useCallback((source: string = 'Website') => {
    setNewsletterSource(source)
    setIsNewsletterOpen(true)
  }, [])

  const closeNewsletter = useCallback(() => {
    setIsNewsletterOpen(false)
  }, [])

  return {
    isNewsletterOpen,
    openNewsletter,
    closeNewsletter,
    newsletterSource
  }
}
