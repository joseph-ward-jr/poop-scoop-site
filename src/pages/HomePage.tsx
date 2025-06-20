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
      <section className="bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50 section-padding min-h-[90vh] flex items-center">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-sage-900 leading-tight">
                  Pristine Spaces. <br />
                  <span className="text-gradient">Pure Joy.</span> <br />
                  <span className="text-4xl md:text-5xl lg:text-6xl text-sage-700">Guaranteed.</span>
                </h1>
                <p className="text-xl md:text-2xl text-sage-700 leading-relaxed max-w-xl">
                  Boutique pet waste management that transforms your outdoor sanctuary into a pristine haven.
                  Thoughtful service for discerning pet owners.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={scrollToContact}
                  className="btn-primary text-lg"
                >
                  Schedule Consultation
                </button>
                <Link
                  to="/pricing"
                  className="btn-secondary text-lg text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-sage-100 to-cream-100 rounded-3xl p-12 text-center shadow-xl border border-sage-200">
                <div className="text-9xl mb-6">🌿</div>
                <h3 className="text-2xl font-bold text-sage-800 mb-4">Field & Foyer</h3>
                <p className="text-sage-600 font-medium text-lg leading-relaxed">
                  Where pristine gardens meet happy pets
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cream-200 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Why Choose Field & Foyer?
            </h2>
            <p className="text-xl text-sage-700 max-w-4xl mx-auto leading-relaxed">
              We're not just another service – we're curators of outdoor elegance who understand
              that your garden deserves the same attention as your home's interior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card-modern text-center group hover:-translate-y-2"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-sage-800 mb-6">{benefit.title}</h3>
                <p className="text-sage-600 leading-relaxed text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-sage-600 to-sage-700">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite-50 mb-8">
            Ready for Your Garden Transformation?
          </h2>
          <p className="text-xl text-sage-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join discerning pet owners who trust Field & Foyer to maintain their outdoor sanctuaries.
            Experience the difference of boutique pet care service.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-offwhite-50 text-sage-700 hover:bg-offwhite-100 font-semibold py-5 px-10 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Schedule Your Consultation
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
                Begin Your Garden Journey
              </h2>
              <p className="text-xl text-sage-700 leading-relaxed">
                Share your vision with us and we'll craft a personalized service plan within 24 hours.
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
              className="card-modern shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-sage-800 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-all duration-200 bg-offwhite-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-sage-800 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-all duration-200 bg-offwhite-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="address" className="block text-sm font-semibold text-sage-800 mb-3">
                  Address or ZIP Code *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-5 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-all duration-200 bg-offwhite-50"
                  placeholder="123 Main St or 12345"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label htmlFor="dogs" className="block text-sm font-semibold text-sage-800 mb-3">
                    Number of Pets *
                  </label>
                  <select
                    id="dogs"
                    name="dogs"
                    required
                    className="w-full px-5 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-all duration-200 bg-offwhite-50"
                  >
                    <option value="">Select number</option>
                    <option value="1">1 pet</option>
                    <option value="2">2 pets</option>
                    <option value="3">3 pets</option>
                    <option value="4+">4+ pets</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="yardSize" className="block text-sm font-semibold text-sage-800 mb-3">
                    Garden Size *
                  </label>
                  <select
                    id="yardSize"
                    name="yardSize"
                    required
                    className="w-full px-5 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-all duration-200 bg-offwhite-50"
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
                className="w-full btn-primary text-lg py-5"
              >
                Begin My Garden Journey
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
