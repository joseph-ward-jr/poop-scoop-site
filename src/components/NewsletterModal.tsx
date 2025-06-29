import { useState, useEffect } from 'react'
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription'
import { NewsletterFormData } from '../types/blog'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  source: string
  title?: string
}

const NewsletterModal = ({ isOpen, onClose, source, title = "Stay Updated with Home & Yard Tips!" }: NewsletterModalProps) => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    name: '',
    interests: ['home-cleaning', 'lawn-maintenance']
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const { isSubmitting, submitNewsletter } = useNewsletterSubscription()

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false)
      setSubmitError(null)
      setFormData({
        email: '',
        name: '',
        interests: ['home-cleaning', 'lawn-maintenance']
      })
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.email) {
      setSubmitError('Email address is required')
      return
    }

    if (formData.interests.length === 0) {
      setSubmitError('Please select at least one area of interest')
      return
    }

    try {
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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-sage-800 mb-2">{title}</h2>
              <p className="text-sage-600">Get weekly tips and tricks for home cleaning and lawn maintenance</p>
            </div>
            <button
              onClick={onClose}
              className="text-sage-400 hover:text-sage-600 transition-colors"
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
              <h3 className="text-xl font-semibold text-sage-800 mb-2">Welcome to Our Newsletter!</h3>
              <p className="text-sage-600 mb-4">
                Thank you for subscribing! You'll receive weekly tips and tricks for maintaining a beautiful, clean home and yard.
              </p>
              <p className="text-sm text-sage-500">This window will close automatically...</p>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-3">
                  Areas of Interest *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes('home-cleaning')}
                      onChange={(e) => handleInterestChange('home-cleaning', e.target.checked)}
                      className="rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                    />
                    <span className="ml-2 text-sage-700">Home Cleaning Tips</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes('lawn-maintenance')}
                      onChange={(e) => handleInterestChange('lawn-maintenance', e.target.checked)}
                      className="rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                    />
                    <span className="ml-2 text-sage-700">Lawn Maintenance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes('pet-care')}
                      onChange={(e) => handleInterestChange('pet-care', e.target.checked)}
                      className="rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                    />
                    <span className="ml-2 text-sage-700">Pet Waste Management</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes('eco-friendly')}
                      onChange={(e) => handleInterestChange('eco-friendly', e.target.checked)}
                      className="rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                    />
                    <span className="ml-2 text-sage-700">Eco-Friendly Solutions</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-sage-300 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-sage-600 text-white px-4 py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsletterModal
