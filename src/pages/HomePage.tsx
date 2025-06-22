import { Link } from 'react-router-dom'

const HomePage = () => {
  const benefits = [
    {
      icon: '🌿',
      title: 'Thoughtful',
      description: 'Meticulous attention to detail with a gentle approach that respects your outdoor sanctuary.'
    },
    {
      icon: '✨',
      title: 'Premium',
      description: 'Boutique service tailored to discerning pet owners who value quality and discretion.'
    },
    {
      icon: '🍃',
      title: 'Sustainable',
      description: 'Eco-conscious methods that protect your garden ecosystem and the environment.'
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-sage-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-cream-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

        <div className="container-max relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase">
                    🌿 Premium Home & Garden Services
                  </div>
                  <h1 className="hero-text text-sage-900">
                    Pristine<br />
                    <span className="text-gradient">Spaces.</span><br />
                    <span className="text-sage-700 text-5xl md:text-6xl lg:text-7xl">Pure Joy.</span>
                  </h1>
                </div>
                <p className="text-2xl md:text-3xl text-sage-600 leading-relaxed max-w-2xl font-light">
                  Transform your outdoor sanctuary with our boutique services.
                  <span className="font-medium text-sage-800"> Starting with premium pet waste management.</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-8">
                <button
                  onClick={scrollToContact}
                  className="btn-primary text-xl group"
                >
                  <span>Schedule Consultation</span>
                  <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <Link
                  to="/services"
                  className="btn-secondary text-xl text-center group"
                >
                  <span>Explore Services</span>
                  <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <div className="bg-gradient-to-br from-sage-100 to-cream-100 rounded-[3rem] p-16 text-center shadow-2xl border border-sage-200 transform hover:scale-105 transition-transform duration-700">
                  <div className="text-[8rem] mb-8 animate-bounce">🌿</div>
                  <h3 className="text-3xl font-bold text-sage-800 mb-6">Field & Foyer</h3>
                  <p className="text-sage-600 font-medium text-xl leading-relaxed">
                    Where pristine gardens<br />meet happy pets
                  </p>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-sage-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cream-200 rounded-full opacity-40 animate-pulse delay-500"></div>
                <div className="absolute top-1/2 -right-16 w-20 h-20 bg-sage-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-sage-600">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-offwhite-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-sage-300 to-transparent"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-32">
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
              ✨ The Field & Foyer Difference
            </div>
            <h2 className="section-title text-sage-900 mb-8">
              Why Choose<br />
              <span className="text-gradient">Field & Foyer?</span>
            </h2>
            <p className="text-2xl text-sage-600 max-w-5xl mx-auto leading-relaxed font-light">
              We're redefining home and garden services with a boutique approach.
              <span className="font-medium text-sage-800"> Starting with premium pet waste management, expanding to transform your entire outdoor sanctuary.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="card-modern text-center h-full">
                  <div className="text-7xl mb-8 group-hover:scale-125 transition-all duration-700">{benefit.icon}</div>
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

      {/* CTA Section */}
      <section className="relative section-padding bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sage-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sage-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sage-300 rounded-full opacity-5 animate-pulse delay-500"></div>
        </div>

        <div className="container-max text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-sage-500 rounded-full text-offwhite-50 font-medium text-sm tracking-wide uppercase mb-8">
              🚀 Transform Your Space
            </div>
            <h2 className="section-title text-offwhite-50 mb-12">
              Ready for Your<br />
              <span className="bg-gradient-to-r from-cream-200 to-offwhite-100 bg-clip-text text-transparent">Garden Transformation?</span>
            </h2>
            <p className="text-2xl text-sage-100 mb-16 leading-relaxed font-light max-w-4xl mx-auto">
              Join discerning homeowners who trust Field & Foyer to maintain their outdoor sanctuaries.
              <span className="font-medium text-offwhite-50"> Experience the difference of premium home and garden services.</span>
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

        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full text-sage-800 font-medium text-sm tracking-wide uppercase mb-8">
                🌱 Start Your Journey
              </div>
              <h2 className="section-title text-sage-900 mb-8">
                Begin Your<br />
                <span className="text-gradient">Garden Journey</span>
              </h2>
              <p className="text-2xl text-sage-600 leading-relaxed font-light max-w-3xl mx-auto">
                Share your vision with us and we'll craft a personalized service plan within 24 hours.
                <span className="font-medium text-sage-800"> Your outdoor sanctuary awaits.</span>
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const data = Object.fromEntries(formData.entries())
                console.log('Form submitted:', data)
                alert('Thank you! We\'ll contact you within 24 hours with your personalized service plan.')
              }}
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
                    required
                    className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label htmlFor="address" className="block text-lg font-semibold text-sage-800 mb-4">
                  Address or ZIP Code *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
                  placeholder="123 Main St or 12345"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div>
                  <label htmlFor="dogs" className="block text-lg font-semibold text-sage-800 mb-4">
                    Number of Pets *
                  </label>
                  <select
                    id="dogs"
                    name="dogs"
                    required
                    className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
                  >
                    <option value="">Select number</option>
                    <option value="1">1 pet</option>
                    <option value="2">2 pets</option>
                    <option value="3">3 pets</option>
                    <option value="4+">4+ pets</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="yardSize" className="block text-lg font-semibold text-sage-800 mb-4">
                    Garden Size *
                  </label>
                  <select
                    id="yardSize"
                    name="yardSize"
                    required
                    className="w-full px-6 py-5 border-2 border-sage-200 rounded-2xl focus:ring-4 focus:ring-sage-300 focus:border-sage-500 transition-all duration-300 bg-cream-50 text-lg hover:border-sage-300"
                  >
                    <option value="">Select size</option>
                    <option value="small">Intimate (under 1/4 acre)</option>
                    <option value="medium">Spacious (1/4 - 1/2 acre)</option>
                    <option value="large">Expansive (over 1/2 acre)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sage-600 hover:bg-sage-700 text-offwhite-50 font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 group"
              >
                <span>Begin My Garden Journey</span>
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
