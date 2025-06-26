const PetWasteRemovalPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-cream-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
              Available Now
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6">
              Pet Waste Removal
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Professional pet waste management that transforms your outdoor sanctuary into a pristine haven. 
              Reliable, discreet, and eco-conscious service for discerning pet owners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-lg">
                Get Free Estimate
              </a>
              <a href="/pricing/pet-waste-removal" className="btn-secondary text-lg">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Complete Pet Waste Management
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Our comprehensive service ensures your outdoor space remains clean, safe, and enjoyable for your family and pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Weekly & Bi-weekly Service',
                description: 'Regular maintenance schedules that keep your yard consistently clean and odor-free.',
                image: '/images/services/weekly-pet-waste-removal.jpg'
              },
              {
                title: 'One-time Restoration',
                description: 'Complete yard cleanup for special events or when starting fresh with our service.',
                image: '/images/services/one-time-restoration.jpg'
              },
              {
                title: 'Eco-conscious Disposal',
                description: 'Environmentally responsible waste disposal methods that protect local ecosystems.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Garden-safe Sanitization',
                description: 'Pet and plant-safe sanitizing treatments that eliminate harmful bacteria.',
                image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Discreet Professional Service',
                description: 'Quiet, efficient service that respects your privacy and neighborhood.',
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&auto=format'
              },
              {
                title: 'Rain or Shine Reliability',
                description: 'Consistent service regardless of weather conditions with flexible rescheduling.',
                image: '/images/services/rain-or-shine.jpg'
              }
            ].map((feature, index) => (
              <div key={index} className="card-modern text-center">
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

      {/* Process Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Our Simple Process
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              From initial consultation to ongoing maintenance, we make pet waste management effortless for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Free Consultation',
                description: 'We assess your yard and discuss your specific needs and schedule preferences.'
              },
              {
                step: '2',
                title: 'Custom Plan',
                description: 'Receive a tailored service plan with transparent pricing and scheduling options.'
              },
              {
                step: '3',
                title: 'Regular Service',
                description: 'Enjoy consistent, professional waste removal on your chosen schedule.'
              },
              {
                step: '4',
                title: 'Ongoing Care',
                description: 'Continuous service with quality checks and customer satisfaction follow-ups.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sage-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-sage-800 mb-3">{step.title}</h3>
                <p className="text-sage-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Services Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-sage-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                  Commercial Pet Waste Management
                </h2>
                <p className="text-xl text-sage-700 leading-relaxed">
                  Property managers, HOAs, and commercial properties trust us for reliable,
                  professional pet waste removal services at scale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-sage-800 mb-4">Perfect For:</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• Apartment complexes and condominiums</li>
                    <li>• HOA communities with dog parks</li>
                    <li>• Property management companies</li>
                    <li>• Commercial properties with outdoor areas</li>
                    <li>• Pet-friendly businesses and hotels</li>
                    <li>• Large residential developments</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sage-800 mb-4">Commercial Benefits:</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• Volume pricing for multiple units</li>
                    <li>• Flexible scheduling around residents</li>
                    <li>• Professional, uniformed service teams</li>
                    <li>• Detailed service reporting</li>
                    <li>• Liability insurance and bonding</li>
                    <li>• Emergency and on-call services</li>
                  </ul>
                </div>
              </div>

              <div className="bg-sage-100 rounded-xl p-6 text-center">
                <p className="text-sage-800 font-medium text-lg mb-4">
                  Custom commercial solutions with competitive pricing
                </p>
                <a href="/contact" className="btn-primary">
                  Request Commercial Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sage-800 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for a Cleaner Yard?
            </h2>
            <p className="text-xl text-sage-100 mb-8 leading-relaxed">
              Join hundreds of satisfied customers who trust Field & Foyer for professional pet waste management.
              Get your free estimate today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-sage-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-colors">
                Get Free Estimate
              </a>
              <a href="/testimonials" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sage-800 transition-colors">
                Read Customer Reviews
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PetWasteRemovalPage
