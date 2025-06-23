const LawnMaintenancePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-cream-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 bg-cream-200 text-sage-700 rounded-full text-sm font-medium mb-6">
              Coming 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6">
              Lawn & Yard Maintenance
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Professional lawn care, mowing, edging, and seasonal yard maintenance to keep your outdoor space pristine. 
              Expanding our services to provide complete yard care solutions.
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
              Complete Lawn Care Solutions
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Building on our pet waste removal expertise, we're expanding to offer comprehensive lawn and yard maintenance services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Mowing',
                description: 'Regular mowing with precision cutting heights for optimal lawn health and appearance.',
                icon: '🌿'
              },
              {
                title: 'Edging & Trimming',
                description: 'Clean, professional edges around walkways, driveways, and landscape features.',
                icon: '✂️'
              },
              {
                title: 'Seasonal Cleanup',
                description: 'Spring and fall cleanup services including leaf removal and debris clearing.',
                icon: '🍂'
              },
              {
                title: 'Fertilization Programs',
                description: 'Customized fertilization schedules to promote healthy, lush lawn growth.',
                icon: '🌱'
              },
              {
                title: 'Weed Control',
                description: 'Eco-friendly weed prevention and removal to maintain pristine lawn appearance.',
                icon: '🚫'
              },
              {
                title: 'Integrated Pet Care',
                description: 'Seamless integration with our pet waste removal for complete yard maintenance.',
                icon: '🐕'
              }
            ].map((feature, index) => (
              <div key={index} className="card-modern text-center opacity-75">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-sage-800 mb-3">{feature.title}</h3>
                <p className="text-sage-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Service Launch Timeline
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              We're strategically expanding our services to provide comprehensive home and garden care.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  period: 'Now - 2024',
                  title: 'Pet Waste Removal',
                  description: 'Establishing our reputation with premium pet waste management services.',
                  status: 'active'
                },
                {
                  period: 'Early 2025',
                  title: 'Lawn & Yard Maintenance',
                  description: 'Launching comprehensive lawn care services for existing and new customers.',
                  status: 'upcoming'
                },
                {
                  period: 'Mid 2025',
                  title: 'Landscape Design',
                  description: 'Adding custom landscape design and installation services.',
                  status: 'planned'
                },
                {
                  period: '2026',
                  title: 'Indoor House Cleaning',
                  description: 'Expanding indoors with premium residential cleaning services.',
                  status: 'future'
                }
              ].map((phase, index) => (
                <div key={index} className={`flex items-center space-x-6 p-6 rounded-xl ${
                  phase.status === 'active' ? 'bg-sage-100' : 
                  phase.status === 'upcoming' ? 'bg-cream-100' : 'bg-gray-50'
                }`}>
                  <div className={`w-4 h-4 rounded-full ${
                    phase.status === 'active' ? 'bg-sage-600' : 
                    phase.status === 'upcoming' ? 'bg-cream-600' : 'bg-gray-400'
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
              Be First to Experience Our Lawn Care
            </h2>
            <p className="text-xl text-sage-100 mb-8 leading-relaxed">
              Join our waitlist to be among the first customers when we launch lawn and yard maintenance services in 2025. 
              Current pet waste removal customers get priority access.
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

export default LawnMaintenancePage
