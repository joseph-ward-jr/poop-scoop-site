import { useState } from 'react'

interface ContactFormProps {
  variant?: 'homepage' | 'contact'
  onSubmit?: (data: FormData) => void
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  contactPreference: string
  additionalInfo: string
}

const ContactForm = ({ variant = 'homepage', onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPreference: '',
    additionalInfo: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Form submitted:', formData)
      if (typeof window !== 'undefined') {
        alert('Thank you! We\'ll contact you within 24 hours with your personalized service plan.')
      }
    }
    
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
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
        className="bg-offwhite-50 rounded-[2rem] p-12 shadow-2xl border border-sage-200 hover:shadow-3xl transition-all duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-sage-800 mb-4">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-sage-800 mb-4">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <label htmlFor="phone" className="block text-lg font-semibold text-sage-800 mb-4">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-lg font-semibold text-sage-800 mb-4">
              Home or Commercial Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </div>

        <div className="mb-10">
          <label htmlFor="contactPreference" className="block text-lg font-semibold text-sage-800 mb-4">
            How would you like to be contacted? *
          </label>
          <select
            id="contactPreference"
            name="contactPreference"
            value={formData.contactPreference}
            onChange={handleInputChange}
            required
            className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
          >
            <option value="">Select contact method</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div className="mb-12">
          <label htmlFor="additionalInfo" className="block text-lg font-semibold text-sage-800 mb-4">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
            placeholder="Tell us about any special requirements, access instructions, or questions you have..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sage-600 hover:bg-sage-700 text-offwhite-50 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 group"
        >
          <span>Begin My Journey</span>
          <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
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
          placeholder="Tell us about any special requirements, access instructions, or questions you have..."
        />
      </div>

      <button
        type="submit"
        className="w-full btn-primary text-lg py-4"
      >
        Request My Free Estimate
      </button>
    </form>
  )
}

export default ContactForm
