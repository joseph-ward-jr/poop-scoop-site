import { Link } from 'react-router-dom'
import ContactForm from '../../components/ContactForm'
import { useState } from 'react'
import { useJobberSubmission } from '../../hooks/useJobberSubmission'
import { ContactFormData } from '../../types/jobber'

const HollySpringsPage = () => {
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
                Professional Pet Waste Removal in Holly Springs, GA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Premium Pet Waste Removal Services in <span className="text-gradient">Holly Springs, Georgia</span>
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed mb-8">
              Serving Holly Springs homeowners with professional pet waste removal and lawn sanitization services. 
              Maintaining the pristine standards that make Holly Springs one of Georgia's most desirable communities.
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
                Proudly Serving Holly Springs, GA
              </h2>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>
                  Holly Springs, Georgia is known for its beautiful neighborhoods, excellent schools, and 
                  family-friendly atmosphere. Field & Foyer is proud to serve this vibrant Cherokee County 
                  community with premium pet waste removal services that match the area's high standards.
                </p>
                <p>
                  Our team understands that Holly Springs residents expect excellence in every aspect of 
                  home maintenance. We deliver consistent, professional service that keeps your outdoor 
                  spaces pristine and safe for your family and pets to enjoy.
                </p>
                <p>
                  <strong>Service Areas in Holly Springs include:</strong> Holly Springs Town Center area, 
                  Bridgemill, Harmony on the Lakes, Riverstone, and all surrounding neighborhoods.
                </p>
              </div>
              <div className="mt-8 p-6 bg-sage-50 rounded-xl border border-sage-200">
                <h3 className="font-semibold text-sage-800 mb-3">Holly Springs Service Details</h3>
                <ul className="space-y-2 text-sage-700">
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Premium service matching community standards
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Discreet, professional team members
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    Consistent weekly and bi-weekly schedules
                  </li>
                  <li className="flex items-center">
                    <span className="text-sage-600 mr-2">✓</span>
                    HOA-compliant service practices
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-100 rounded-2xl overflow-hidden">
                <img
                  src="/images/locations/holly-springs-hero.jpg"
                  alt="Holly Springs, GA - Premium Pet Waste Removal Service"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center p-8">
                            <div class="text-6xl mb-4">🌸</div>
                            <h3 class="text-2xl font-bold text-sage-800 mb-2">Holly Springs, GA</h3>
                            <p class="text-sage-600">Premium Community Service</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose Us for Holly Springs */}
      <section className="section-padding bg-sage-600">
        <div className="container-max">
          <div className="text-center text-offwhite-50 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Holly Springs Chooses Field & Foyer
            </h2>
            <p className="text-xl text-sage-100 max-w-3xl mx-auto">
              Premium service for a premium community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Premium Standards</h3>
              <p className="text-sage-100">Service quality that matches Holly Springs' high community standards</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤫</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Discreet Service</h3>
              <p className="text-sage-100">Professional, quiet service that respects your neighborhood</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">HOA Compliant</h3>
              <p className="text-sage-100">Service practices that meet homeowners association requirements</p>
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
                Ready to Get Started in Holly Springs?
              </h2>
              <p className="text-xl text-sage-700 leading-relaxed max-w-3xl mx-auto">
                Join your Holly Springs neighbors who trust Field & Foyer for professional pet waste removal. 
                Premium service for a premium community!
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
                      schedule your free estimate in Holly Springs.
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

export default HollySpringsPage
