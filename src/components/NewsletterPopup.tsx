import { useState, useEffect } from 'react'
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription'
import { NewsletterFormData } from '../types/blog'

interface NewsletterPopupProps {
  isOpen: boolean
  onClose: () => void
  source: string
}

const NewsletterPopup = ({ isOpen, onClose, source }: NewsletterPopupProps) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const { isSubmitting, submitNewsletter } = useNewsletterSubscription()

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false)
      setSubmitError(null)
      setEmail('')
      setName('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!email.trim()) {
      setSubmitError('Email address is required')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitError('Please enter a valid email address')
      return
    }

    try {
      const formData: NewsletterFormData = {
        email: email.trim(),
        name: name.trim() || undefined,
        interests: ['home-cleaning', 'lawn-maintenance'] // Default interests for general signup
      }

      const result = await submitNewsletter(formData, source)
      
      if (result.success) {
        console.log('Newsletter subscription successful:', result.client)
        setIsSubmitted(true)
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        const errorMessage = result.errors?.join(', ') || 'Failed to subscribe to newsletter'
        setSubmitError(errorMessage)
        console.error('Newsletter subscription failed:', result.errors)
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.')
      console.error('Newsletter subscription error:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-sage-800 mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-sage-600">
                Get weekly tips for home cleaning and lawn maintenance delivered to your inbox!
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-sage-400 hover:text-sage-600 transition-colors ml-4 flex-shrink-0"
              aria-label="Close newsletter popup"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-2">
                Welcome to Our Newsletter!
              </h3>
              <p className="text-sage-600 mb-4">
                Thank you for subscribing! You'll receive weekly tips and insights for maintaining a beautiful, clean home and yard.
              </p>
              <p className="text-sm text-sage-500">This window will close automatically...</p>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="popup-email" className="block text-sm font-medium text-sage-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="popup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="popup-name" className="block text-sm font-medium text-sage-700 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="popup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div className="bg-sage-50 p-4 rounded-lg">
                <p className="text-sm text-sage-700 mb-2">
                  <strong>What you'll get:</strong>
                </p>
                <ul className="text-sm text-sage-600 space-y-1">
                  <li>• Weekly home cleaning tips and tricks</li>
                  <li>• Lawn maintenance and yard care advice</li>
                  <li>• Eco-friendly cleaning solutions</li>
                  <li>• Seasonal maintenance reminders</li>
                </ul>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-sage-300 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Maybe Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="flex-1 bg-sage-600 text-white px-4 py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              <p className="text-xs text-sage-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsletterPopup
