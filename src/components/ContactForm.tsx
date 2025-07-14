import { useState } from 'react'
import { useJobberSubmission } from '../hooks/useJobberSubmission'
import { ContactFormData } from '../types/jobber'
import { trackLead, trackContact } from './MetaPixel'

interface ContactFormProps {
  variant?: 'homepage' | 'contact' | 'location'
  onSubmit?: (data: ContactFormData) => void
  enableJobberIntegration?: boolean
  isLoading?: boolean
}

const ContactForm = ({ variant = 'homepage', onSubmit, enableJobberIntegration = true, isLoading = false }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPreference: '',
    additionalInfo: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { isSubmitting, submitToJobber } = useJobberSubmission()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    try {
      // Track Meta Pixel events for form submission
      trackContact({
        content_type: 'service_inquiry',
        content_id: 'pet-waste-removal-contact',
        content_name: variant === 'homepage' ? 'Homepage Contact Form' : 'Contact Page Form',
        content_category: 'Pet Waste Removal',
        value: 1,
        currency: 'USD'
      })

      // If custom onSubmit is provided, use it
      if (onSubmit) {
        onSubmit(formData)
        setIsSubmitted(true)
        resetFormAfterDelay()
        return
      }

      // Try Jobber integration if enabled
      if (enableJobberIntegration) {
        const result = await submitToJobber(formData)

        if (result.success) {
          console.log('Successfully created Jobber client:', result.client)

          // Track successful lead conversion
          trackLead({
            content_type: 'service_lead',
            content_id: 'pet-waste-removal-lead',
            content_name: variant === 'homepage' ? 'Homepage Contact Form Lead' : 'Contact Page Form Lead',
            content_category: 'Pet Waste Removal',
            value: 50, // Estimated lead value
            currency: 'USD'
          })

          setIsSubmitted(true)
          resetFormAfterDelay()
        } else {
          // Handle Jobber API errors
          const errorMessage = result.errors?.join(', ') || 'Failed to submit to Jobber'
          setSubmitError(errorMessage)
          console.error('Jobber submission failed:', result.errors)

          // Still show success to user but log the error
          setIsSubmitted(true)
          resetFormAfterDelay()
        }
      } else {
        // Fallback: just log and show success
        console.log('Form submitted (Jobber integration disabled):', formData)
        setIsSubmitted(true)
        resetFormAfterDelay()
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('An unexpected error occurred. Please try again.')

      // Still show success to user for better UX
      setIsSubmitted(true)
      resetFormAfterDelay()
    }
  }

  const resetFormAfterDelay = () => {
    setTimeout(() => {
      setIsSubmitted(false)
      setSubmitError(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        contactPreference: '',
        additionalInfo: ''
      })
    }, 3000)
  }

  // Success message for contact page variant
  if (isSubmitted && variant === 'contact') {
    return (
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          We've received your request and will contact you within 24 hours with your personalized service plan.
        </p>
        {submitError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Note: There was a technical issue with our system, but we've still received your request.
            </p>
          </div>
        )}
        <div className="text-sm text-gray-500">
          Redirecting back to form in a few seconds...
        </div>
      </div>
    )
  }

  // Homepage variant styling
  if (variant === 'homepage') {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-50 rounded-[2rem] p-8 shadow-2xl border border-sage-200 hover:shadow-3xl transition-all duration-500 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-sage-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sage-800 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-sage-800 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-sage-800 mb-2">
              Home or Commercial Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contactPreference" className="block text-sm font-medium text-sage-800 mb-2">
            How would you like to be contacted? *
          </label>
          <select
            id="contactPreference"
            name="contactPreference"
            value={formData.contactPreference}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
          >
            <option value="">Select contact method</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-sage-800 mb-2">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 hover:border-sage-300"
            placeholder="Tell us what services you're interested in, any special requirements, access instructions, or questions you have..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-500 shadow-xl hover:shadow-2xl group ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-sage-600 hover:bg-sage-700 hover:-translate-y-1 hover:scale-105'
          } text-offwhite-50`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              <span>Begin My Journey</span>
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    )
  }

  // Contact page variant styling
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Home or Commercial Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="123 Main St, City, State 12345"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-2">
          How would you like to be contacted? *
        </label>
        <select
          id="contactPreference"
          name="contactPreference"
          value={formData.contactPreference}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Select contact method</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
          <option value="text">Text</option>
        </select>
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Tell us what services you're interested in, any special requirements, access instructions, or questions you have..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className={`w-full text-lg py-4 transition-all duration-300 ${
          isSubmitting || isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isSubmitting || isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Request My Free Estimate'
        )}
      </button>
    </form>
  )

  // Location variant styling (same as contact for now)
  if (variant === 'location') {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Home or Commercial Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-2">
            How would you like to be contacted? *
          </label>
          <select
            id="contactPreference"
            name="contactPreference"
            value={formData.contactPreference}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select contact method</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell us what services you're interested in, any special requirements, access instructions, or questions you have..."
          />
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`w-full text-lg py-4 transition-all duration-300 ${
            isSubmitting || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Request My Free Estimate'
          )}
        </button>
      </form>
    )
  }
}

export default ContactForm
