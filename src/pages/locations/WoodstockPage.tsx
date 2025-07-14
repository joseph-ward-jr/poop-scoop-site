import { Link } from 'react-router-dom'
import ContactForm from '../../components/ContactForm'
import { useState } from 'react'
import { useJobberSubmission } from '../../hooks/useJobberSubmission'
import { ContactFormData } from '../../types/jobber'

const WoodstockPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { isSubmitting, submitToJobber } = useJobberSubmission()

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      setSubmitError(null)
      const result = await submitToJobber(formData)
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.error || 'Failed to submit form. Please try again.')
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.')
    }
  }



  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-sage-100/50 rounded-full mb-6">
              <span className="text-sage-700 font-medium text-xs tracking-[0.2em] uppercase">
                Professional Pet Waste Removal in Woodstock, GA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Premium Pet Waste Removal Services in <span className="text-gradient">Woodstock, Georgia</span>
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed mb-8">
              Serving Woodstock homeowners with professional pet waste removal and lawn sanitization services. 
              Supporting the vibrant community spirit that makes Woodstock a wonderful place to call home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-lg"
              >
                Get Free Quote
              </Link>
              <Link
                to="/pricing/pet-waste-removal"
                className="btn-secondary text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Area */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
                Proudly Serving Woodstock, GA
              </h2>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>
                  Woodstock, Georgia combines small-town charm with modern amenities, creating a perfect 
                  environment for families and their pets. Field & Foyer is proud to serve this vibrant 
                  Cherokee County community with reliable pet waste removal services.
                </p>
                <p>
                  Our team understands the community values that make Woodstock special - from the historic 
                  downtown area to the family-friendly neighborhoods. We provide consistent, professional 
                  service that helps maintain the clean, welcoming atmosphere Woodstock is known for.
                </p>
                <p>
                  <strong>Service Areas in Woodstock include:</strong> Historic downtown Woodstock, 
                  Towne Lake, Eagle Watch, Dupree Road area, and all surrounding neighborhoods.
                </p>
              </div>
              <div className="mt-8 p-6 bg-sage-50 rounded-xl border border-sage-200">
                <h3 className="font-semibold text-sage-800 mb-3">Woodstock Service Details</h3>
                <ul className="space-y-2 text-sage-700">
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Community-focused service approach
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Family-friendly, reliable team
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Consistent weekly and bi-weekly service
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Supporting local Woodstock families
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-100 rounded-2xl overflow-hidden shadow-lg">
                <video
                  src="/videos/locations/woodstock-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if video doesn't exist
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center p-8">
                            <div class="text-6xl mb-4">🌳</div>
                            <h3 class="text-2xl font-bold text-sage-800 mb-2">Woodstock, GA</h3>
                            <p class="text-sage-600">Community-Focused Service</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                >
                  {/* Fallback for browsers that don't support video */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🌳</div>
                      <h3 className="text-2xl font-bold text-sage-800 mb-2">Woodstock, GA</h3>
                      <p className="text-sage-600">Community-Focused Service</p>
                    </div>
                  </div>
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose Us for Woodstock */}
      <section className="section-padding bg-sage-600">
        <div className="container-max">
          <div className="text-center text-offwhite-50 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Woodstock Chooses Field & Foyer
            </h2>
            <p className="text-xl text-sage-100 max-w-3xl mx-auto">
              Community values meet professional service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Community Focused</h3>
              <p className="text-sage-100">Local service that understands and supports Woodstock values</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Family Friendly</h3>
              <p className="text-sage-100">Safe, reliable service that busy Woodstock families can trust</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Neighbor to Neighbor</h3>
              <p className="text-sage-100">Personal service that treats your property like our own</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-gradient-to-br from-cream-50 to-offwhite-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
                Ready to Get Started in Woodstock?
              </h2>
              <p className="text-xl text-sage-700 leading-relaxed max-w-3xl mx-auto">
                Join your Woodstock neighbors who trust Field & Foyer for professional pet waste removal. 
                Community-focused service you can depend on!
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center">
                <div className="bg-sage-100 border border-sage-300 rounded-lg p-8">
                  <div className="text-sage-800">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-lg mb-4">
                      We've received your request and will contact you within 24 hours to 
                      schedule your free estimate in Woodstock.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ContactForm
                variant="location"
                onSubmit={handleFormSubmit}
                enableJobberIntegration={true}
                isLoading={isSubmitting}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WoodstockPage
