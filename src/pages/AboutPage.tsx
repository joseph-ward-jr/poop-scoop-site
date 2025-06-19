const AboutPage = () => {
  const reasons = [
    'Family-owned and operated business with over 5 years of experience',
    'Fully insured and bonded for your peace of mind',
    'Eco-friendly disposal methods that protect the environment',
    'Flexible scheduling to fit your busy lifestyle',
    'Competitive pricing with no hidden fees or surprises',
    'Rain or shine service - we show up when scheduled',
    'Pet-safe cleaning products and sanitization',
    'Local business that cares about our community'
  ]

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Owner',
      description: 'Dog lover with 3 rescue pups of her own. Started Poop Scoop Pro to help fellow pet owners.',
      emoji: '👩‍💼'
    },
    {
      name: 'Mike Thompson',
      role: 'Lead Technician',
      description: 'Former veterinary assistant with expertise in pet health and yard safety.',
      emoji: '👨‍🔧'
    },
    {
      name: 'Lisa Chen',
      role: 'Customer Service',
      description: 'Ensures every customer has an amazing experience with our service.',
      emoji: '👩‍💻'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Poop Scoop Pro
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're a family-owned pet waste removal service dedicated to keeping your yard clean, 
              safe, and enjoyable for you and your furry family members.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Poop Scoop Pro was born out of love for pets and frustration with messy yards. 
                  As dog owners ourselves, we understand the joy our furry friends bring to our lives – 
                  and the not-so-fun cleanup that comes with it.
                </p>
                <p>
                  Founded in 2019 by Sarah Johnson, a lifelong dog lover and mother of three rescue pups, 
                  our mission is simple: give pet owners more time to enjoy their pets and less time 
                  worrying about yard maintenance.
                </p>
                <p>
                  What started as helping neighbors has grown into a trusted service for hundreds of 
                  families across our community. We're proud to be the go-to solution for busy pet 
                  owners who want a clean, safe yard without the hassle.
                </p>
              </div>
            </div>
            <div className="bg-primary-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Family Business</h3>
              <p className="text-gray-700">
                We treat every yard like our own and every pet like family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Our Clients Love Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what sets us apart from other pet waste removal services:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The friendly faces behind your clean yard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Experience the difference of working with a local, family-owned business 
            that truly cares about you and your pets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
            >
              Get Your Free Quote
            </a>
            <a
              href="/testimonials"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
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
