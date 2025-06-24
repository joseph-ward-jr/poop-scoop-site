import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'

const HomePage = () => {
  const benefits = [
    {
      image: '/images/benefits/thoughtful-service.jpg',
      title: 'Thoughtful',
      description: 'Meticulous attention to detail with a gentle approach that respects your outdoor sanctuary.'
    },
    {
      image: '/images/benefits/premium-quality.jpg',
      title: 'Premium',
      description: 'Boutique service tailored to discerning homeowners who value quality and discretion.'
    },
    {
      image: '/images/benefits/sustainable-practices.jpg',
      title: 'Sustainable',
      description: 'Eco-conscious methods that protect your lawn ecosystem and the environment.'
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
      <section className="relative min-h-screen flex items-center bg-offwhite-50">
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center min-h-screen py-20">
            {/* Left Side - Content */}
            <div className="lg:col-span-7 space-y-12">
              {/* Top Tag */}
              <div className="inline-flex items-center px-4 py-2 bg-sage-100/50 rounded-full">
                <span className="text-sage-700 font-medium text-xs tracking-[0.2em] uppercase">
                  Premium Home & Lawn Services
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-sage-900 leading-[0.9] tracking-tight">
                Your Standards.<br />
                Our Priority.
              </h1>

              {/* Body Paragraph */}
              <p className="text-xl md:text-2xl text-sage-600 leading-relaxed max-w-2xl font-light">
                Elevating your lifestyle with premium home and lawn services that exceed expectations.
                From outdoor pet care to comprehensive property maintenance coming soon, we deliver excellence in every detail.
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
            </div>
            {/* Right Side - Designated Space for Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square max-w-lg mx-auto">
                {/* Rounded corner graphic element space */}
                <div className="w-full h-full bg-gradient-to-br from-sage-100/20 to-cream-100/20 rounded-3xl border border-sage-200/30 flex items-center justify-center">
                  {/* Placeholder for graphic element - replace with your chosen image */}
                  <div className="w-90 h-90 rounded-2xl overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm border border-sage-200/50">
                    <img
                      src="/images/hero/garden-sanctuary.jpg"
                      alt="Beautiful Lawn Sanctuary"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>
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
            Field & Foyer was founded on the belief that you deserve a higher standard of home care without the complexity of managing multiple providers. We deliver one unwavering standard of excellence for every service—from meticulous lawn care to comprehensive interior solutions—all managed through a single, trusted point of contact. 
              <span className="font-medium text-sage-800"> This integrated approach is about more than just completing tasks; it’s about providing thoughtful, complete home stewardship that gives you true peace of mind.</span>
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
              Transform Your Space
            </div>
            <h2 className="section-title text-offwhite-50 mb-12">
              Ready for Your<br />
              <span className="bg-gradient-to-r from-cream-200 to-offwhite-100 bg-clip-text text-transparent">Lawn Transformation?</span>
            </h2>
            <p className="text-2xl text-sage-100 mb-16 leading-relaxed font-light max-w-4xl mx-auto">
              Join discerning homeowners who trust
              <span className="font-medium text-offwhite-50"> Field & Foyer </span>
              for their complete home and lawn needs.
              <span className="font-medium text-offwhite-50"> Experience our growing suite of premium services.</span>
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
                <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-2xl text-sage-600 leading-relaxed font-light max-w-3xl mx-auto">
                Share your vision with us and we'll craft a personalized service plan within 24 hours.
                <span className="font-medium text-sage-800"> Your sanctuary awaits.</span>
              </p>
            </div>

            <ContactForm variant="homepage" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
