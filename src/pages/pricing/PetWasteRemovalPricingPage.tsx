import { useState } from 'react'

const PetWasteRemovalPricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('weekly')

  const pricingPlans = [
    {
      id: 'weekly',
      name: 'Weekly Service',
      popular: true,
      description: 'Perfect for busy families with active dogs',
      basePrice: 25,
      features: [
        'Weekly yard cleanup',
        'All waste removed and disposed',
        'Yard deodorizing spray',
        'Gate left securely closed',
        'Service rain or shine',
        'Text notifications'
      ],
      pricing: {
        '1 dog': { small: 25, medium: 30, large: 35 },
        '2 dogs': { small: 30, medium: 35, large: 45 },
        '3 dogs': { small: 35, medium: 45, large: 55 },
        '4+ dogs': { small: 45, medium: 55, large: 65 }
      }
    },
    {
      id: 'biweekly',
      name: 'Bi-weekly Service',
      popular: false,
      description: 'Great balance of cleanliness and value',
      basePrice: 35,
      features: [
        'Every other week cleanup',
        'Thorough waste removal',
        'Yard deodorizing spray',
        'Gate security check',
        'Flexible scheduling',
        'Service updates'
      ],
      pricing: {
        '1 dog': { small: 35, medium: 40, large: 50 },
        '2 dogs': { small: 40, medium: 50, large: 60 },
        '3 dogs': { small: 50, medium: 60, large: 75 },
        '4+ dogs': { small: 60, medium: 75, large: 90 }
      }
    },
    {
      id: 'onetime',
      name: 'One-time Cleanup',
      popular: false,
      description: 'Perfect for special events or initial cleanup',
      basePrice: 75,
      features: [
        'Complete yard restoration',
        'Deep cleaning service',
        'Sanitization treatment',
        'Debris removal',
        'Same-day availability',
        'Satisfaction guarantee'
      ],
      pricing: {
        '1 dog': { small: 75, medium: 100, large: 125 },
        '2 dogs': { small: 100, medium: 125, large: 150 },
        '3 dogs': { small: 125, medium: 150, large: 200 },
        '4+ dogs': { small: 150, medium: 200, large: 250 }
      }
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-cream-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6">
              Pet Waste Removal Pricing
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Transparent, flat-rate pricing with no hidden fees. Choose the service frequency that works best for your family and pets.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full">
              <span className="text-sage-800 font-medium">✅ 100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-sage-600 to-sage-700 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-sage-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cream-400 text-sage-800 px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-sage-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-4 ${plan.popular ? 'text-sage-100' : 'text-sage-600'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-sage-900'}`}>
                      ${plan.basePrice}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-sage-100' : 'text-sage-600'}`}>
                      /visit
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${plan.popular ? 'text-sage-200' : 'text-sage-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={plan.popular ? 'text-sage-100' : 'text-sage-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-white text-sage-800 hover:bg-sage-50'
                      : 'bg-sage-600 text-white hover:bg-sage-700'
                  }`}
                >
                  View Detailed Pricing
                </button>
              </div>
            ))}
          </div>

          {/* Detailed Pricing Table */}
          <div className="bg-sage-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-sage-900 mb-6 text-center">
              Detailed Pricing for {pricingPlans.find(p => p.id === selectedPlan)?.name}
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sage-200">
                    <th className="text-left py-3 px-4 font-semibold text-sage-800">Number of Dogs</th>
                    <th className="text-center py-3 px-4 font-semibold text-sage-800">Small Yard<br/><span className="text-sm font-normal">(under 1/4 acre)</span></th>
                    <th className="text-center py-3 px-4 font-semibold text-sage-800">Medium Yard<br/><span className="text-sm font-normal">(1/4 - 1/2 acre)</span></th>
                    <th className="text-center py-3 px-4 font-semibold text-sage-800">Large Yard<br/><span className="text-sm font-normal">(over 1/2 acre)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(pricingPlans.find(p => p.id === selectedPlan)?.pricing || {}).map(([dogs, prices]) => (
                    <tr key={dogs} className="border-b border-sage-100">
                      <td className="py-3 px-4 font-medium text-sage-800">{dogs}</td>
                      <td className="text-center py-3 px-4 text-sage-700">${prices.small}</td>
                      <td className="text-center py-3 px-4 text-sage-700">${prices.medium}</td>
                      <td className="text-center py-3 px-4 text-sage-700">${prices.large}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sage-800 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-sage-100 mb-8 leading-relaxed">
              Get your free estimate today and join hundreds of satisfied customers who trust Field & Foyer for professional pet waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-sage-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-colors">
                Get Free Estimate
              </a>
              <a href="/services/pet-waste-removal" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sage-800 transition-colors">
                Learn More About Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PetWasteRemovalPricingPage
