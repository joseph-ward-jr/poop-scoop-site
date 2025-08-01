import { useState } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { useJobberSubmission } from '../hooks/useJobberSubmission'
import { ContactFormData } from '../types/jobber'

const HomePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { isSubmitting, submitToJobber } = useJobberSubmission()

  const handleFormSubmit = async (data: ContactFormData) => {
    console.log('Form submitted from homepage:', data)
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
        console.log('Production mode: Using secure serverless API...')
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

  const benefits = [
    {
      image: '/images/benefits/thoughtful-service.jpg',
      title: 'Thoughtful',
      description: 'It’s in the details. Our service is defined by a proactive and considerate approach—from remembering to close a gate to ensuring your pet\'s comfort. We care for your home as if it were our own.'
    },
    {
      image: '/images/benefits/premium-quality.jpg',
      title: 'Premium',
      description: 'A single, high standard of service tailored to the quality-focused homeowner. Expect meticulous results, absolute discretion, and a seamless client experience from a team that values quality above all else.'
    },
    {
      image: '/images/benefits/sustainable-practices.jpg',
      title: 'Sustainable',
      description: 'Protecting your family, pets, and property\'s ecosystem is fundamental. We exclusively use highly effective, eco-conscious products and sustainable practices that are safe for a thriving environment.'
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Premium Minimalist Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-offwhite-50">
        <div className="container-max px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh] py-8">
            {/* Left Side - Content */}
            <div className="lg:col-span-6 space-y-8">
              {/* Top Tag */}
              <div className="inline-flex items-center px-4 py-2 bg-sage-100/50 rounded-full">
                <span className="text-sage-700 font-medium text-xs tracking-[0.2em] uppercase">
                  Premium Pet Waste Removal & Lawn Sanitization Services
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-sage-900 leading-[0.9] tracking-tight">
                Beyond Scooping.<br />
                <span className="text-sage-700">True Protection.</span>
              </h1>

              {/* Services Status */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sage-700 font-medium">Available Now:</span>
                  <span className="text-sage-600">Pet Waste Removal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sage-700 font-medium">Future Services:</span>
                  <span className="text-sage-600">House Cleaning • Lawn Care</span>
                </div>
              </div>

              {/* Body Paragraph */}
              <p className="text-xl md:text-2xl text-sage-600 leading-relaxed max-w-2xl font-light">
                <span className="font-semibold text-sage-800">Scooping waste is just the beginning.</span> Dangerous bacteria, parasites, and pathogens remain embedded in your yard soil—and every day your dog tracks these invisible threats directly into your home on their paws. Our comprehensive sanitization service eliminates what simple removal leaves behind, protecting the spaces where your family lives and walks barefoot.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button
                  onClick={scrollToContact}
                  className="bg-sage-800 hover:bg-sage-900 text-offwhite-50 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Schedule Consultation
                </button>
                <Link
                  to="/services"
                  className="border-2 border-sage-800 text-sage-800 hover:bg-sage-800 hover:text-offwhite-50 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>

              {/* Blog CTA */}
              <div className="bg-sage-50 border border-sage-200 rounded-2xl p-6 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-sage-800 mb-1">
                      Expert Home & Yard Tips
                    </h3>
                    <p className="text-sage-600 text-sm">
                      Read our latest insights on eco-friendly cleaning and maintenance
                    </p>
                  </div>
                  <Link
                    to="/blog"
                    className="bg-sage-600 hover:bg-sage-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <span>📖</span>
                    <span>Read Blog</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Right Side - Designated Space for Graphic */}
            <div className="lg:col-span-6 relative flex items-start justify-center">
              <div className="aspect-square max-w-4xl mx-auto relative -top-16">
                {/* Rounded corner graphic element space */}
                <div className="w-full h-full bg-gradient-to-br from-sage-100/20 to-cream-100/20 rounded-3xl border border-sage-200/30 flex items-center justify-center">
                  {/* Hero video element */}
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm border border-sage-200/50">
                    <video
                      src="/videos/hero/sanitization-demo.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                    >
                      {/* Fallback for browsers that don't support video */}
                      <div className="w-full h-full bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center">
                        <div className="text-sage-700 text-center">
                          <div className="text-4xl mb-2">🌿</div>
                          <div className="text-lg font-medium">Professional Yard Sanitization</div>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-offwhite-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-sage-300 to-transparent"></div>
        </div>

        <div className="container-max px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
              ✨ The Field & Foyer Difference
            </div>
            <h2 className="section-title text-sage-900 mb-8">
              Why Choose<br />
              <span className="text-gradient">Field & Foyer?</span>
            </h2>
            <p className="text-2xl text-sage-600 max-w-5xl mx-auto leading-relaxed font-light">
            Field & Foyer was founded on the belief that you deserve a higher standard of pet waste removal and lawn sanitization services. We deliver one unwavering standard of excellence, transforming your outdoor space into a pristine, safe environment for your family and pets.
              <span className="font-medium text-sage-800"> Our specialized approach is about more than just waste removal; it's about providing thoughtful, professional lawn sanitization that gives you true peace of mind.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="card-modern text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-8 group-hover:scale-125 transition-all duration-700">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-sage-800 mb-8">{benefit.title}</h3>
                  <p className="text-sage-600 leading-relaxed text-xl font-light">{benefit.description}</p>
                </div>
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-cream-100 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
              ⭐ Customer Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              We believe the most authentic measure of our work is the satisfaction of the homeowners we serve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {[
              {
                id: 1,
                name: 'Brandon R.',
                rating: 5,
                text: 'Awesome service! Joey is professional, reliable and takes care of the dirty work so we didn\'t have to. Very friendly and showed up on time, highly recommend!',
                verified: true
              },
              {
                id: 2,
                name: 'Klane P.',
                rating: 5,
                text: 'First time using such a service, so not sure what to expect. Extremely pleased with the results and exceeded my expectations. I would definitely recommend.',
                verified: true
              },
              {
                id: 3,
                name: 'Rebecca C.',
                rating: 5,
                text: 'They were fantastic taking care of our pup waste. We were a little hesitant on trying a pet waste service st first, but the guys at Field and Foyer were top notch!!! They didn\'t leave a single stone unturned! They are thorough, friendly, on time, professional and awesome! I highly recommend them!!!',
                verified: true
              },
              {
                id: 4,
                name: 'Deborah C.',
                rating: 5,
                text: 'Field and Foyer is a great service! They left my yard poop free! The team was courteous and friendly!',
                verified: true
              },
              {
                id: 5,
                name: 'Judith D.',
                rating: 5,
                text: 'Field and Foyer do not disappoint. Timely, thorough, leaving our yard neat and relieved of poop 😊',
                verified: true
              },
              {
                id: 6,
                name: 'Jul L.',
                rating: 5,
                text: 'Outstanding service backed by an even more exceptional team. Everyone was knowledgeable, approachable, and genuinely helpful. Their rates were more competitive than any I\'ve come across in the past. Highly recommend!',
                verified: true
              }
            ].map((testimonial) => (
              <div
                key={testimonial.id}
                className="card-modern hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div className="flex items-center text-blue-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Google Verified
                    </div>
                  )}
                </div>
                <blockquote className="text-sage-700 mb-6 leading-relaxed flex-grow">
                  "{testimonial.text}"
                </blockquote>
                <div className="border-t border-sage-200 pt-4 mt-auto">
                  <p className="font-bold text-sage-900">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage-800 mb-2">50+</div>
                <p className="text-sage-600">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage-800 mb-2">100+</div>
                <p className="text-sage-600">Services Completed</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-sage-800 mb-2">99%</div>
                <p className="text-sage-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
              🤝 Trusted Partners
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              Proudly Partnered With
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              We collaborate with trusted local businesses to provide comprehensive pet care solutions
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            {/* Pet Supermarket */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="h-30 w-70 flex items-center justify-center">
                  <img
                    src="/images/partners/pet-supermarket-logo.png"
                    alt="Pet Supermarket"
                    className="h-24 w-64 object-contain mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Mountain View Animal Hospital */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="h-30 w-70 flex items-center justify-center bg-gradient-to-br from-sage-50 to-sage-100 rounded-xl">
                  <img
                    src="/images/partners/mountain-view-animal-hospital-logo.png"
                    alt="Mountain View Animal Hospital"
                    className="h-24 w-64 object-contain mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sage-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sage-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sage-300 rounded-full opacity-5 animate-pulse delay-500"></div>
        </div>

        <div className="container-max px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-sage-500 rounded-full text-offwhite-50 font-medium text-sm tracking-wide uppercase mb-8">
              Transform Your Space
            </div>
            <h2 className="section-title text-offwhite-50 mb-12">
              Ready for a<br />
              <span className="bg-gradient-to-r from-cream-200 to-offwhite-100 bg-clip-text text-transparent">Pristine Lawn?</span>
            </h2>
            <p className="text-2xl text-sage-100 mb-10 leading-relaxed font-light max-w-4xl mx-auto">
              Join quality-conscious homeowners who trust
              <span className="font-medium text-offwhite-50"> Field & Foyer </span>
              for professional pet waste removal and lawn sanitization.
              <span className="font-medium text-offwhite-50"> Experience the difference of a truly pristine outdoor space.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-offwhite-50 text-sage-700 hover:bg-offwhite-100 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:scale-105 group"
              >
                <span>Schedule Your Consultation</span>
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                to="/services"
                className="border-2 border-offwhite-50 text-offwhite-50 hover:bg-offwhite-50 hover:text-sage-700 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-gradient-to-br from-cream-50 to-offwhite-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-sage-300 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-cream-300 rounded-full"></div>
        </div>

        <div className="container-max px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
                🌱 Start Your Journey
              </div>
              <h2 className="section-title text-sage-900 mb-8">
                Begin Your<br />
                <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-2xl text-sage-600 leading-relaxed font-light max-w-3xl mx-auto">
                Share your vision with us and we'll craft a personalized service plan within 24 hours.
                <span className="font-medium text-sage-800"> Your sanctuary awaits.</span>
              </p>
            </div>

            {isSubmitted ? (
              // Success page - matches contact page design
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
                    <p className="text-xs text-yellow-700 mt-1">
                      <strong>Technical details:</strong> {submitError}
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    What happens next?
                  </p>
                  <div className="text-left space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">1</span>
                      We review your request and service area
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">2</span>
                      We contact you within 24 hours
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">3</span>
                      Schedule your free estimate
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setSubmitError(null)
                  }}
                  className="mt-6 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <ContactForm
                variant="homepage"
                onSubmit={handleFormSubmit}
                enableJobberIntegration={false}
                isLoading={isSubmitting}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
