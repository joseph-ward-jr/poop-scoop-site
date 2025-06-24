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
      description: 'Serving 15+ neighborhoods'
    },
    {
      image: '/images/icons/clock.svg',
      title: 'Hours',
      details: 'Mon-Fri: 8am-6pm',
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
              Get Your Free Estimate
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
              Ready to experience complete home and garden care? Contact us today for your
              personalized quote and join hundreds of satisfied customers across all our services.
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
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Request Your Free Estimate
                </h2>
                <ContactForm variant="contact" onSubmit={handleFormSubmit} />
              </div>

              {/* Info Sidebar */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">We Review Your Request</h4>
                        <p className="text-gray-600 text-sm">Our team reviews your information and service needs.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">We Contact You</h4>
                        <p className="text-gray-600 text-sm">We'll call or email within 24 hours with your custom quote.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Schedule Service</h4>
                        <p className="text-gray-600 text-sm">If you're happy with the quote, we'll schedule your first visit.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-600 text-white rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>100% Satisfaction Guarantee</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Fully Insured & Bonded</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Eco-Friendly Methods</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Local Family Business</span>
                    </li>
                  </ul>
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
