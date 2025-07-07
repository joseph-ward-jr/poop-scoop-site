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
        'Gate left securely closed',
        'Service rain or shine',
        'Text notifications',
        'Professional service guarantee'
      ],
      pricing: {
        '1-2 dogs': { standard: 25, large: 40 },
        '3+ dogs': { standard: 35, large: 50 }
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
        'Gate security check',
        'Flexible scheduling',
        'Service updates'
      ],
      pricing: {
        '1-2 dogs': { standard: 35, large: 50 },
        '3+ dogs': { standard: 50, large: 65 }
      }
    },
    {
      id: 'onetime',
      name: 'One-time Cleanup',
      popular: false,
      description: 'Perfect for special events or initial cleanup',
      basePrice: 125,
      features: [
        'Complete yard restoration',
        'Deep cleaning service',
        'Debris removal',
        'Satisfaction guarantee'
      ],
      pricing: {
        '1-2 dogs': { standard: 125, large: 140 },
        '3+ dogs': { standard: 175, large: 190 }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
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
                    <div className={`text-sm font-medium mb-1 ${plan.popular ? 'text-sage-200' : 'text-sage-600'}`}>
                      starting at
                    </div>
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-sage-900'}`}>
                      ${plan.basePrice}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-sage-100' : 'text-sage-600'}`}>
                      /visit
                    </span>
                    <div className={`text-xs mt-2 ${plan.popular ? 'text-sage-200' : 'text-sage-500'}`}>
                      $20 minimum charge applies
                    </div>
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
                    <th className="text-center py-3 px-4 font-semibold text-sage-800">Standard Yard<br/><span className="text-sm font-normal">(1/4 - 1 acre)</span></th>
                    <th className="text-center py-3 px-4 font-semibold text-sage-800">Large Yard<br/><span className="text-sm font-normal">(1+ acre)*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(pricingPlans.find(p => p.id === selectedPlan)?.pricing || {}).map(([dogs, prices]) => (
                    <tr key={dogs} className="border-b border-sage-100">
                      <td className="py-3 px-4 font-medium text-sage-800">{dogs}</td>
                      <td className="text-center py-3 px-4 text-sage-700">${prices.standard}</td>
                      <td className="text-center py-3 px-4 text-sage-700">${prices.large}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-sage-50 rounded-lg border border-sage-200">
              <p className="text-sm text-sage-700">
                <span className="font-semibold">*Large Yard Pricing:</span> Base price shown is for 1+ acre properties.
                Additional $15 charge applies for each additional 1/4 acre beyond the first acre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-On Services Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                Optional Add-On Services
              </h2>
              <p className="text-xl text-sage-700 leading-relaxed">
                Enhance your service with our premium add-ons for the ultimate yard care experience
              </p>
            </div>

            <div className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl p-8 md:p-12 shadow-lg border border-sage-200">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 mb-6 md:mb-0 md:mr-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-sage-900">
                      Deodorizing & Sanitization Treatment
                    </h3>
                  </div>
                  <p className="text-sage-700 text-lg leading-relaxed mb-4">
                    Professional-grade deodorizing spray and sanitization treatment to eliminate odors and bacteria,
                    leaving your yard fresh and hygienic for your family and pets.
                  </p>
                  <ul className="space-y-2 text-sage-600">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Eliminates pet odors and bacteria
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Safe for pets and children
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Long-lasting freshness
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Eco-friendly formula
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
                    <div className="text-sm font-medium text-sage-600 mb-2">Add-on Price</div>
                    <div className="text-4xl font-bold text-sage-900 mb-2">$15</div>
                    <div className="text-sm text-sage-600 mb-4">per visit</div>
                    <div className="bg-sage-100 rounded-lg p-3">
                      <p className="text-sm text-sage-700 font-medium">
                        Available with any service plan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sage-600 mb-4">
                Want to add deodorizing & sanitization to your service?
              </p>
              <a href="/contact?addon=deodorizing" className="btn-primary">
                Request Add-On Service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Pricing Section */}
      <section className="section-padding bg-sage-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-sage-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
                  Commercial & Volume Pricing
                </h2>
                <p className="text-xl text-sage-700 leading-relaxed">
                  Property managers, HOAs, and commercial properties receive special volume pricing
                  and customized service plans tailored to your specific needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="bg-sage-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-sage-800 mb-4">Volume Discounts Available</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• 10+ units: 15% discount</li>
                    <li>• 25+ units: 20% discount</li>
                    <li>• 50+ units: 25% discount</li>
                    <li>• 100+ units: Custom pricing</li>
                  </ul>
                </div>
                <div className="bg-cream-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-sage-800 mb-4">Commercial Benefits</h3>
                  <ul className="space-y-2 text-sage-600">
                    <li>• Flexible billing options</li>
                    <li>• Priority scheduling</li>
                    <li>• Dedicated account manager</li>
                    <li>• Detailed service reporting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-sage-100 rounded-xl p-6 text-center">
                <p className="text-sage-800 font-medium text-lg mb-4">
                  Custom quotes available for properties with unique requirements
                </p>
                <a href="/contact?quote=true" className="btn-primary">
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-sage-100 mb-8 leading-relaxed">
              Get your free estimate today and join hundreds of satisfied customers who trust Field & Foyer for professional pet waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact?estimate=true" className="bg-white text-sage-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-colors">
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
