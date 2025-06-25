import { useState } from 'react'
import ContactForm from '../components/ContactForm'

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      image: '/images/icons/phone.svg',
      title: 'Phone',
      details: '(123) 456-7890',
      description: 'Call us Monday-Friday, 8am-6pm'
    },
    {
      image: '/images/icons/email.svg',
      title: 'Email',
      details: 'hello@fieldandfoyer.com',
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
        <ContactForm variant="contact" onSubmit={handleFormSubmit} />
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
              <ContactForm variant="contact" onSubmit={handleFormSubmit} />
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
