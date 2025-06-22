const AboutPage = () => {
  const reasons = [
    'Family-owned and operated business with over 5 years of experience',
    'Fully insured and bonded for your peace of mind',
    'Eco-conscious methods that protect your garden ecosystem',
    'Flexible scheduling to fit your busy lifestyle',
    'Transparent pricing with no hidden fees or surprises',
    'Reliable service - we show up when scheduled, rain or shine',
    'Garden-safe products and sanitization methods',
    'Local business expanding to serve all your outdoor needs'
  ]

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Visionary behind Field & Foyer, passionate about elevating outdoor living spaces to interior design standards.',
      emoji: '👩‍💼'
    },
    {
      name: 'Mike Thompson',
      role: 'Operations Director',
      description: 'Former landscape professional ensuring every service meets our premium quality standards.',
      emoji: '👨‍🔧'
    },
    {
      name: 'Lisa Chen',
      role: 'Client Relations',
      description: 'Dedicated to providing exceptional customer experiences across all our home and garden services.',
      emoji: '👩‍💻'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              About Field & Foyer
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
              We're a family-owned home and garden services company dedicated to creating pristine outdoor sanctuaries.
              Starting with premium pet waste management, we're expanding to serve all your outdoor living needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>
                  Field & Foyer was born out of a vision to elevate outdoor living spaces to the same standard
                  as interior design. As homeowners and pet lovers ourselves, we understand that your garden
                  is an extension of your home – a sanctuary that deserves thoughtful, professional care.
                </p>
                <p>
                  Founded in 2019 by Sarah Johnson, a lifelong advocate for beautiful outdoor spaces and mother
                  of three rescue pups, our mission began with premium pet waste management. We saw an opportunity
                  to transform a necessary service into something elegant and discreet.
                </p>
                <p>
                  What started as boutique pet waste removal has evolved into a comprehensive home and garden
                  services company. We're expanding our offerings to include landscape maintenance, garden design,
                  and outdoor space enhancement – all with the same attention to detail that made our pet services exceptional.
                </p>
              </div>
            </div>
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold text-sage-900 mb-4">Family Business</h3>
              <p className="text-sage-700">
                We treat every garden like our own and every home like family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              Why Our Clients Love Us
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Here's what sets us apart as a premium home and garden services company:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-offwhite-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sage-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-sage-700">
              The dedicated professionals behind your pristine outdoor spaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-sage-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-sage-900 mb-2">{member.name}</h3>
                <p className="text-sage-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sage-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sage-600">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite-50 mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
            Experience the difference of working with a local, family-owned business
            that truly cares about your home and outdoor spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-offwhite-50 text-sage-600 hover:bg-offwhite-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
            >
              Get Your Free Quote
            </a>
            <a
              href="/testimonials"
              className="border-2 border-offwhite-50 text-offwhite-50 hover:bg-offwhite-50 hover:text-sage-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Read Customer Reviews
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
