const AboutPage = () => {
  const reasons = [
    'Family-owned and operated',
    'Fully insured for your peace of mind',
    'Eco-conscious methods that protect your lawn ecosystem',
    'Flexible scheduling to fit your busy lifestyle',
    'Transparent pricing with no hidden fees or surprises',
    'Reliable service - we show up when scheduled, rain or shine',
    'Lawn-safe products and sanitization methods',
    'Local business expanding to serve all your lawn and home care needs'
  ]

  const teamMembers = [
    {
      name: 'Joey Ward',
      role: 'Founder & Co-Owner',
      description: 'As the visionary leader of Field & Foyer, Joey is focused on the strategic growth and future direction of the company. He is dedicated to expanding our services and ensuring our founding commitment to a higher standard of home care is realized.',
      image: '/images/team/joey-ward.jpg'
    },
    {
      name: 'Robb Dreher',
      role: 'Founder & Co-Owner',
      description: 'Robb is the operational heart of the company, meticulously managing our day-to-day services and professional team. His focus is on ensuring every task is performed with unparalleled efficiency and the extraordinary quality our clients expect.',
      image: '/images/team/robb-dreher.jpg'
    },
    {
      name: 'Meagan Ward',
      role: 'Creative & Marketing Director',
      description: 'Meagan is the steward of the Field & Foyer brand, shaping the story and aesthetic that defines our boutique client experience. She leads all marketing and social media initiatives, ensuring our message of thoughtful, premium service resonates with homeowners.',
      image: '/images/team/meagan-ward.jpg'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
            A Thoughtful Approach to Modern Home Care
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
            Field & Foyer was founded on a simple philosophy: that caring for your home should be a sophisticated yet seamless experience. Our journey begins with perfecting your property through meticulous pet care and waste management. From this foundation, we will soon extend our signature standard of quality to comprehensive lawn care and detailed home maintenance services, becoming your single, trusted partner in home stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - Moved to top to emphasize family-owned business */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-sage-700">
              The dedicated professionals behind your pristine lawn and home care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-sage-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-sage-900 mb-2">{member.name}</h3>
                <p className="text-sage-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sage-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>
                Field & Foyer began as a conversation between two best friends, Joey and Robb, who shared a single belief: homeowners deserve better. We looked at the home services industry and saw a lack of personal touch and a true commitment to quality. We knew we could create a different kind of company—one founded on trust, friendship, and an uncompromisingly high standard for every task.

In 2025, we turned that vision into a reality. As a family-owned business, we bring that personal-level commitment to our clients, starting with a service fundamental to a pristine yard: premium pet waste management. Our mission is to elevate this essential service, proving that even the most necessary tasks can be performed with a boutique-like feel, absolute discretion, and an extraordinary level of care.

What starts with premium pet care is the first step on our journey. We are deliberately growing to become your single, trusted partner for complete home stewardship, soon expanding to include comprehensive lawn care and meticulous home maintenance services. As we grow, our core promise remains the same: we only accept extraordinary work from our employees, because our standards are higher than anyone else's. That is the Field & Foyer difference.
                </p>
              </div>
            </div>
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <div className="w-128 h-128 mx-auto mb-6">
                <img
                  src="/images/icons/house.jpg"
                  alt="Family Business"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-sage-900 mb-4">Family Business</h3>
              <p className="text-sage-700">
                We treat every property like our own and every home like family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-8">
              Our Vision
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-sage-100">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-xl md:text-2xl text-sage-700 leading-relaxed font-light">
                Our vision reaches far beyond today's offerings: we are crafting a comprehensive home care experience that will encompass premium house cleaning and meticulous lawn maintenance, each delivered with the same uncompromising standard of excellence and attention to detail.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <h3 className="font-semibold text-sage-800 mb-2">Available Now</h3>
                  <p className="text-sage-600 text-sm">Pet Waste Removal</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-amber-600 font-bold">2025</span>
                  </div>
                  <h3 className="font-semibold text-sage-800 mb-2">Coming Soon</h3>
                  <p className="text-sage-600 text-sm">Premium House Cleaning</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2026</span>
                  </div>
                  <h3 className="font-semibold text-sage-800 mb-2">Future</h3>
                  <p className="text-sage-600 text-sm">Meticulous Lawn Maintenance</p>
                </div>
              </div>
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
              Here's what sets us apart as a premium home and lawn services company:
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



      {/* CTA Section */}
      <section className="section-padding bg-sage-600">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite-50 mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
            Experience the difference of working with a local, family-owned business
            that truly cares about your lawn and home care needs.
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
