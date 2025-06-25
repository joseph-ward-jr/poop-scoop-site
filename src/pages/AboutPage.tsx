const AboutPage = () => {
  const reasons = [
    'Family-owned and operated business with over 5 years of experience',
    'Fully insured and bonded for your peace of mind',
    'Eco-conscious methods that protect your lawn ecosystem',
    'Flexible scheduling to fit your busy lifestyle',
    'Transparent pricing with no hidden fees or surprises',
    'Reliable service - we show up when scheduled, rain or shine',
    'Lawn-safe products and sanitization methods',
    'Local business expanding to serve all your outdoor needs'
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
            Field & Foyer was founded on a simple philosophy: that caring for your home should be a sophisticated yet seamless experience. Our journey begins with perfecting your outdoor sanctuary through meticulous pet care and waste management. From this foundation, we will soon extend our signature standard of quality to detailed indoor services and comprehensive lawn maintenance, becoming your single, trusted partner in home stewardship.
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
                Field & Foyer began as a conversation between two best friends, Joey and Robb, who shared a single belief: homeowners deserve better. We looked at the home services industry and saw a lack of personal touch and a true commitment to quality. We knew we could create a different kind of company—one founded on trust, friendship, and an uncompromisingly high standard for every task.

In 2025, we turned that vision into a reality. As a family-owned business, we bring that personal-level commitment to our clients, starting with a service fundamental to a pristine yard: premium pet waste management. Our mission is to elevate this essential service, proving that even the most necessary tasks can be performed with a boutique-like feel, absolute discretion, and an extraordinary level of care.

What starts with premium pet care is the first step on our journey. We are deliberately growing to become your single, trusted partner for complete home stewardship, soon expanding to include comprehensive lawn maintenance and meticulous indoor cleaning. As we grow, our core promise remains the same: we only accept extraordinary work from our employees, because our standards are higher than anyone else's. That is the Field & Foyer difference.
                </p>
              </div>
            </div>
            <div className="bg-sage-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src="/images/icons/house.svg"
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
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
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
