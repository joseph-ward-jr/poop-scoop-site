import { createContext, useContext, ReactNode } from 'react'
import { useGlobalNewsletter } from '../hooks/useGlobalNewsletter'
import NewsletterPopup from './NewsletterPopup'

interface GlobalNewsletterContextType {
  openNewsletter: (source?: string) => void
  closeNewsletter: () => void
  isNewsletterOpen: boolean
}

const GlobalNewsletterContext = createContext<GlobalNewsletterContextType | undefined>(undefined)

interface GlobalNewsletterProviderProps {
  children: ReactNode
}

export const GlobalNewsletterProvider = ({ children }: GlobalNewsletterProviderProps) => {
  const { isNewsletterOpen, openNewsletter, closeNewsletter, newsletterSource } = useGlobalNewsletter()

  return (
    <GlobalNewsletterContext.Provider value={{ openNewsletter, closeNewsletter, isNewsletterOpen }}>
      {children}
      <NewsletterPopup
        isOpen={isNewsletterOpen}
        onClose={closeNewsletter}
        source={newsletterSource}
      />
    </GlobalNewsletterContext.Provider>
  )
}

export const useGlobalNewsletterContext = () => {
  const context = useContext(GlobalNewsletterContext)
  if (context === undefined) {
    throw new Error('useGlobalNewsletterContext must be used within a GlobalNewsletterProvider')
  }
  return context
}
