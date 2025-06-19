import { Link } from 'react-router-dom'

const HomePage = () => {
  const benefits = [
    {
      icon: '✅',
      title: 'Reliable',
      description: 'Consistent weekly or bi-weekly service you can count on. We show up rain or shine.'
    },
    {
      icon: '💰',
      title: 'Affordable',
      description: 'Competitive pricing with no hidden fees. Get more time to enjoy with your pets.'
    },
    {
      icon: '🌱',
      title: 'Eco-Friendly',
      description: 'Environmentally responsible disposal methods that keep your neighborhood clean.'
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
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Pet Waste Gone. <br />
                <span className="text-primary-600">Yard Fresh.</span> <br />
                Guaranteed.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional pet waste removal service that keeps your yard clean and safe. 
                More time for you to enjoy with your furry friends, less time dealing with the mess.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContact}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get a Free Quote
                </button>
                <Link
                  to="/pricing"
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-200 rounded-2xl p-8 text-center">
                <div className="text-8xl mb-4">🐕</div>
                <p className="text-gray-700 font-medium">
                  Happy dogs, clean yards, satisfied owners!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Poop Scoop Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another pet service – we're your neighbors who understand 
              the importance of a clean, safe yard for your family and pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for a Cleaner Yard?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us with their pet waste removal needs. 
            Get your free estimate today!
          </p>
          <button
            onClick={scrollToContact}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Get Your Free Quote Now
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Estimate
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your yard and we'll provide a custom quote within 24 hours.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const data = Object.fromEntries(formData.entries())
                console.log('Form submitted:', data)
                alert('Thank you! We\'ll contact you within 24 hours with your free estimate.')
              }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address or ZIP Code *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="123 Main St or 12345"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="dogs" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dogs *
                  </label>
                  <select
                    id="dogs"
                    name="dogs"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select number</option>
                    <option value="1">1 dog</option>
                    <option value="2">2 dogs</option>
                    <option value="3">3 dogs</option>
                    <option value="4+">4+ dogs</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="yardSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Yard Size *
                  </label>
                  <select
                    id="yardSize"
                    name="yardSize"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (under 1/4 acre)</option>
                    <option value="medium">Medium (1/4 - 1/2 acre)</option>
                    <option value="large">Large (over 1/2 acre)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Request My Free Estimate
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
