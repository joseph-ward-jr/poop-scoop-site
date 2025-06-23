const HouseCleaningPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-cream-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-sage-700 rounded-full text-sm font-medium mb-6">
              Coming 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6">
              Indoor House Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Premium residential cleaning services bringing the same attention to detail indoors. 
              Complete home care from outdoor to indoor spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-lg">
                Join Waitlist
              </a>
              <a href="/services" className="btn-secondary text-lg">
                Current Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Premium Indoor Cleaning Services
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Our ultimate goal is to provide complete home care services, bringing the same premium standards
              from outdoor to indoor spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Deep House Cleaning',
                description: 'Comprehensive interior cleaning with the same attention to detail as our outdoor services.',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Regular Maintenance',
                description: 'Weekly and bi-weekly cleaning schedules to keep your home consistently pristine.',
                image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Eco-Friendly Products',
                description: 'Safe, non-toxic cleaning products that protect your family and pets.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Kitchen & Bathroom',
                description: 'Specialized cleaning for high-use areas with sanitization and deep cleaning.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Move-in/Move-out',
                description: 'Complete home preparation for transitions with thorough cleaning services.',
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Integrated Service',
                description: 'Seamless coordination with our outdoor services for complete home care.',
                image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop&auto=format'
              }
            ].map((feature, index) => (
              <div key={index} className="card-modern text-center opacity-75">
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-sage-800 mb-3">{feature.title}</h3>
                <p className="text-sage-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Home Care Vision */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Complete Home Care Journey
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Our vision is to be your single source for all home and garden care needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  period: 'Now - 2024',
                  title: 'Pet Waste Removal',
                  description: 'Building trust and establishing our premium service standards outdoors.',
                  status: 'active'
                },
                {
                  period: 'Early 2025',
                  title: 'Lawn & Yard Maintenance',
                  description: 'Expanding outdoor services with comprehensive lawn and yard care.',
                  status: 'upcoming'
                },
                {
                  period: 'Mid 2025',
                  title: 'Landscape Design',
                  description: 'Adding custom landscape design and installation for complete outdoor transformation.',
                  status: 'planned'
                },
                {
                  period: '2026',
                  title: 'Indoor House Cleaning',
                  description: 'Bringing our premium standards indoors for complete home care.',
                  status: 'future'
                }
              ].map((phase, index) => (
                <div key={index} className={`flex items-center space-x-6 p-6 rounded-xl ${
                  phase.status === 'active' ? 'bg-sage-100' :
                  phase.status === 'upcoming' ? 'bg-cream-100' :
                  phase.status === 'planned' ? 'bg-cream-200' : 'bg-gray-100'
                }`}>
                  <div className={`w-4 h-4 rounded-full ${
                    phase.status === 'active' ? 'bg-sage-600' :
                    phase.status === 'upcoming' ? 'bg-cream-600' :
                    phase.status === 'planned' ? 'bg-cream-700' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm font-semibold text-sage-600">{phase.period}</span>
                      <h3 className="text-xl font-bold text-sage-800">{phase.title}</h3>
                    </div>
                    <p className="text-sage-600">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sage-800 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Be Part of Our Complete Home Care Vision
            </h2>
            <p className="text-xl text-sage-100 mb-8 leading-relaxed">
              Join our waitlist to be among the first customers when we launch indoor house cleaning services in 2026.
              Experience the evolution from outdoor to complete home care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-sage-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-colors">
                Join Waitlist
              </a>
              <a href="/services/pet-waste-removal" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sage-800 transition-colors">
                Current Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HouseCleaningPage
