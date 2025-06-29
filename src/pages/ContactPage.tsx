import { useState } from 'react'
import ContactForm from '../components/ContactForm'
import { useJobberSubmission } from '../hooks/useJobberSubmission'
import { ContactFormData } from '../types/jobber'

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { isSubmitting, submitToJobber } = useJobberSubmission()

  const handleFormSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data)
    setSubmitError(null)

    // Check if we're in development (has VITE_ token) or production (needs serverless API)
    const isDevelopment = !!(import.meta as any).env?.VITE_JOBBER_ACCESS_TOKEN

    if (isDevelopment) {
      // Development: Use direct API (same as test page)
      try {
        console.log('Development mode: Using direct Jobber API...')
        const result = await submitToJobber(data)

        if (result.success) {
          console.log('Successfully created Jobber client via direct API:', result.client)
          setIsSubmitted(true)
        } else {
          const errorMessage = result.errors?.join(', ') || 'Failed to submit to Jobber'
          setSubmitError(errorMessage)
          console.error('Direct API submission failed:', result.errors)
          setIsSubmitted(true)
        }
      } catch (error) {
        console.error('Development API error:', error)
        setSubmitError('An unexpected error occurred while submitting.')
        setIsSubmitted(true)
      }
    } else {
      // Production: Use secure serverless API
      try {
        console.log('Production mode: Using secure serverless API....')
        const response = await fetch('/api/jobber-client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })

        const result = await response.json()

        if (result.success) {
          console.log('Successfully created Jobber client via serverless API:', result.client)
          setIsSubmitted(true)
        } else {
          const errorMessage = result.errors?.join(', ') || 'Failed to submit to Jobber'
          setSubmitError(errorMessage)
          console.error('Serverless API submission failed:', result.errors)
          setIsSubmitted(true)
        }
      } catch (error) {
        console.error('Production API error:', error)
        setSubmitError('An unexpected error occurred while submitting.')
        setIsSubmitted(true)
      }
    }

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setSubmitError(null)
    }, 5000)
  }

  const contactInfo = [
    {
      image: '/images/icons/phone.svg',
      title: 'Phone',
      details: '(770) 547-8457',
      description: 'Call us Monday-Friday, 8am-6pm'
    },
    {
      image: '/images/icons/email.svg',
      title: 'Email',
      details: 'support@fieldandfoyer.com',
      description: 'We respond within 24 hours'
    },
    {
      image: '/images/icons/location.svg',
      title: 'Service Area',
      details: 'Greater Metro Area',
      description: 'Serving 5+ neighborhoods'
    },
    {
      image: '/images/icons/clock.svg',
      title: 'Hours',
      details: 'Mon-Fri: 9am-5pm',
      description: 'Weekend service available'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            We've received your request and will contact you within 24 hours with your personalized service plan.
          </p>
          {submitError && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> There was a technical issue with our system, but we've still received your request.
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Technical details: {submitError}
              </p>
            </div>
          )}
          <div className="text-sm text-gray-500">
            Redirecting back to form in a few seconds...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Begin the Conversation
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
            The first step toward a more seamless home care experience is a simple conversation. Let’s discuss your needs, beginning with our thoughtful outdoor pet care solutions. Contact us to schedule your personalized consultation and discover the Field & Foyer standard of service.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4">
                  <img src={info.image} alt={info.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-primary-600 font-semibold mb-2">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-gray-50" data-form-section>
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Request Your Free Estimate
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Get your personalized quote within 24 hours. No obligations, just honest pricing for premium service.
            </p>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <ContactForm
                variant="contact"
                onSubmit={handleFormSubmit}
                enableJobberIntegration={false}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our simple 3-step process gets you from quote to clean yard in no time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-600 text-black rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">We Review Your Request</h3>
                <p className="text-gray-600 leading-relaxed">Our team carefully reviews your information and service needs to prepare your personalized quote.</p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-600 text-black rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">We Contact You</h3>
                <p className="text-gray-600 leading-relaxed">We'll reach out within 24 hours using your preferred contact method with your custom quote.</p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-600 text-black rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Service</h3>
                <p className="text-gray-600 leading-relaxed">If you're happy with the quote, we'll schedule your first visit at your convenience.</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-primary-600 text-gray rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Field & Foyer?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">100% Satisfaction Guarantee</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">Fully Insured & Bonded</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">Eco-Friendly Methods</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">Local Family Business</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
