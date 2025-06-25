import { Link } from 'react-router-dom'

const ServicesPage = () => {
  const currentServices = [
    {
      id: 'pet-waste-removal',
      name: 'Pet Waste Removal',
      image: '/images/services/pet-waste-removal.jpg',
      status: 'Available Now',
      description: 'Professional pet waste management that transforms your outdoor space into a pristine haven.',
      features: [
        'Weekly and bi-weekly maintenance schedules',
        'One-time restoration services',
        'Eco-conscious disposal methods',
        'Lawn-safe sanitization',
        'Discreet, professional service',
        'Rain or shine reliability'
      ],
      pricing: 'Starting at $25/visit',
      cta: 'Learn More',
      link: '/pricing'
    }
  ]

  const comingSoonServices = [
    {
      name: 'Indoor House Cleaning',
      image: '/images/services/house-cleaning.jpg',
      description: 'Premium residential cleaning services bringing the same attention to detail indoors.',
      status: 'Coming 2025'
    },
    {
      name: 'Lawn Maintenance',
      image: '/images/services/lawn-maintenance.jpg',
      description: 'Professional lawn care, mowing, edging, and seasonal yard maintenance to keep your outdoor space pristine.',
      status: 'Coming 2026'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-sage-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Field & Foyer offers premium home and lawn services designed to enhance your complete living experience.
              Starting with pet waste removal, expanding to indoor cleaning, then bringing our expertise to lawn service.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full">
              <img src="/images/icons/leaf-icon.svg" alt="Service" className="w-5 h-5 mr-2" />
              <span className="text-sage-800 font-medium">Currently Serving: Pet Waste Removal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Current Services */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Available Now
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Our first flagship service, setting the standard for thoughtful outdoor care.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {currentServices.map((service) => (
              <div key={service.id} className="card-modern group hover:-translate-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 mr-6 group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover rounded-2xl shadow-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-sage-800 mb-2">{service.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-sage-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <Link
                        to={service.link}
                        className="btn-primary text-center"
                      >
                        {service.cta}
                      </Link>
                      <Link
                        to="/contact"
                        className="btn-secondary text-center"
                      >
                        Get Quote
                      </Link>
                    </div>

                    <div className="text-sage-700 font-semibold text-lg">
                      {service.pricing}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-sage-800 mb-6">Service Features</h4>
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center mt-1 mr-3">
                            <svg className="w-4 h-4 text-offwhite-50" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sage-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Services */}
      <section className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Our Growth Journey
            </h2>
            <p className="text-xl text-sage-700 max-w-4xl mx-auto">
              We're strategically expanding our services: starting with outdoor pet care, growing into complete lawn and yard maintenance,
              then bringing our premium standards indoors. Here's our roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonServices.map((service, index) => (
              <div key={index} className="card-modern text-center group opacity-75 hover:opacity-90 transition-opacity duration-300">
                <div className="w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-sage-800 mb-4">{service.name}</h3>
                <p className="text-sage-600 mb-6 leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center px-4 py-2 bg-cream-200 text-sage-700 rounded-full text-sm font-medium">
                  {service.status}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-sage-700 mb-6">
              Interested in being notified when new services launch?
            </p>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              Join Our Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Field & Foyer */}
      <section className="section-padding bg-sage-600">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite-50 mb-8">
            Why Choose Field & Foyer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src="/images/icons/premium-quality.svg" alt="Premium Quality" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Premium Quality</h3>
              <p className="text-sage-200">Boutique service standards with attention to every detail</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src="/images/icons/eco-conscious.svg" alt="Eco-Conscious" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Eco-Conscious</h3>
              <p className="text-sage-200">Sustainable practices that protect your lawn ecosystem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src="/images/icons/trusted-partner.svg" alt="Trusted Partner" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-offwhite-50 mb-3">Trusted Partner</h3>
              <p className="text-sage-200">Building long-term relationships with homeowners and businesses</p>
            </div>
          </div>
          <Link
            to="/about"
            className="bg-offwhite-50 text-sage-700 hover:bg-offwhite-100 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Learn About Our Company
          </Link>
        </div>
      </section>

      {/* Commercial Services Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-sage-200">
              <div className="w-16 h-16 mx-auto mb-6">
                <img src="/images/icons/trusted-partner.svg" alt="Commercial Services" className="w-full h-full" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
                Commercial & Property Management Services
              </h2>
              <p className="text-xl text-sage-700 mb-8 leading-relaxed">
                Looking for commercial pet waste removal, property management solutions, or large-scale services?
                We work with businesses, property managers, HOAs, and commercial properties to provide
                customized solutions that meet your specific needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="space-y-3">
                  <h3 className="font-bold text-sage-800 text-lg">Commercial Properties</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• Office complexes with outdoor areas</li>
                    <li>• Retail centers and shopping plazas</li>
                    <li>• Hotels and hospitality properties</li>
                    <li>• Multi-unit residential complexes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-sage-800 text-lg">Property Management</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• HOA community services</li>
                    <li>• Apartment complex maintenance</li>
                    <li>• Property management companies</li>
                    <li>• Large residential developments</li>
                  </ul>
                </div>
              </div>
              <div className="bg-sage-100 rounded-xl p-6 mb-8">
                <p className="text-sage-800 font-medium text-lg">
                  <img src="/images/icons/checkmark.svg" alt="Custom Solutions" className="w-5 h-5 inline mr-2" />
                  Custom pricing, flexible scheduling, and tailored service plans available
                </p>
              </div>
              <Link
                to="/contact"
                className="btn-primary text-lg"
              >
                Request Commercial Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-xl text-sage-700 mb-8 max-w-3xl mx-auto">
            Start with our pet waste removal service and experience the Field & Foyer difference.
            Your outdoor sanctuary awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="btn-primary text-lg"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/pricing"
              className="btn-secondary text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
