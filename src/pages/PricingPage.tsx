import { useState } from 'react'

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const pricingPlans = [
    {
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
      name: 'Bi-Weekly Service',
      popular: false,
      description: 'Great for smaller dogs or less active yards',
      basePrice: 35,
      features: [
        'Every other week cleanup',
        'Thorough waste removal',
        'Yard inspection',
        'Gate security check',
        'Flexible scheduling',
        'Email reminders'
      ],
      pricing: {
        '1 dog': { small: 35, medium: 40, large: 45 },
        '2 dogs': { small: 40, medium: 45, large: 55 },
        '3 dogs': { small: 45, medium: 55, large: 65 },
        '4+ dogs': { small: 55, medium: 65, large: 75 }
      }
    },
    {
      name: 'One-Time Cleanup',
      popular: false,
      description: 'Perfect for spring cleaning or special occasions',
      basePrice: 75,
      features: [
        'Complete yard restoration',
        'Deep cleaning service',
        'Sanitization treatment',
        'Before/after photos',
        'Same-day service available',
        'No commitment required'
      ],
      pricing: {
        '1 dog': { small: 75, medium: 85, large: 100 },
        '2 dogs': { small: 85, medium: 100, large: 125 },
        '3 dogs': { small: 100, medium: 125, large: 150 },
        '4+ dogs': { small: 125, medium: 150, large: 200 }
      }
    }
  ]

  const faqs = [
    {
      question: 'How does pricing work?',
      answer: 'Our pricing is based on the number of dogs you have and your yard size. We offer transparent, flat-rate pricing with no hidden fees. The more frequent your service, the better value you get per visit.'
    },
    {
      question: 'What if I have more than 4 dogs?',
      answer: 'We love big dog families! For households with more than 4 dogs, we provide custom pricing based on your specific needs. Contact us for a personalized quote.'
    },
    {
      question: 'Do you offer discounts?',
      answer: 'Yes! We offer a 10% discount for seniors (65+), military personnel, and first responders. We also have referral bonuses when you refer friends and neighbors.'
    },
    {
      question: 'What happens if you miss a scheduled visit?',
      answer: 'If we miss a scheduled visit due to our error, we\'ll provide your next service free of charge. We take reliability seriously and this rarely happens.'
    },
    {
      question: 'Can I pause or cancel my service?',
      answer: 'Absolutely! You can pause your service for vacations or cancel anytime with 24 hours notice. We understand life happens and we\'re flexible with our customers.'
    },
    {
      question: 'Do you clean up other pet waste besides dogs?',
      answer: 'We specialize in dog waste removal, but we can also handle cat waste from outdoor areas. Contact us to discuss your specific needs.'
    },
    {
      question: 'What if my dog is aggressive or protective?',
      answer: 'Safety first! We can work with you to schedule service when you\'re home to manage your dog, or we can provide tips for temporary containment during our visit.'
    },
    {
      question: 'Do you provide your own equipment?',
      answer: 'Yes, we bring all necessary equipment including bags, scoops, sanitizer, and deodorizer. You don\'t need to provide anything.'
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
              Choose the pet waste removal service that fits your needs and budget. No contracts,
              no hidden fees, just pristine gardens and happy pets.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-sage-600 text-offwhite-50 shadow-2xl scale-105'
                    : 'bg-offwhite-50 border-2 border-sage-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cream-500 text-sage-800 px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-offwhite-50' : 'text-sage-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-4 ${plan.popular ? 'text-sage-100' : 'text-sage-600'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-offwhite-50' : 'text-sage-900'}`}>
                      ${plan.basePrice}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-sage-100' : 'text-sage-600'}`}>
                      /visit
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 ${plan.popular ? 'text-sage-200' : 'text-sage-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={plan.popular ? 'text-sage-100' : 'text-sage-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-offwhite-50 text-sage-600 hover:bg-offwhite-100'
                      : 'bg-sage-600 text-offwhite-50 hover:bg-sage-700'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Pricing Table */}
      <section className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              Detailed Pricing Guide
            </h2>
            <p className="text-xl text-sage-700">
              Exact pricing based on your number of pets and garden size
            </p>
          </div>

          <div className="space-y-8">
            {pricingPlans.map((plan, planIndex) => (
              <div key={planIndex} className="bg-offwhite-50 rounded-xl shadow-lg overflow-hidden border border-sage-200">
                <div className="bg-sage-600 text-offwhite-50 p-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-sage-900">
                            Number of Pets
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-sage-900">
                            Small Garden<br />
                            <span className="text-sm font-normal text-sage-600">(under 1/4 acre)</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-sage-900">
                            Medium Garden<br />
                            <span className="text-sm font-normal text-sage-600">(1/4 - 1/2 acre)</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-sage-900">
                            Large Garden<br />
                            <span className="text-sm font-normal text-sage-600">(over 1/2 acre)</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(plan.pricing).map(([dogs, prices]) => (
                          <tr key={dogs} className="border-b border-sage-200 hover:bg-sage-50">
                            <td className="py-3 px-4 font-medium text-sage-900">{dogs}</td>
                            <td className="py-3 px-4 text-center text-sage-600 font-bold">
                              ${prices.small}
                            </td>
                            <td className="py-3 px-4 text-center text-sage-600 font-bold">
                              ${prices.medium}
                            </td>
                            <td className="py-3 px-4 text-center text-sage-600 font-bold">
                              ${prices.large}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and service
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 text-left flex justify-between items-center hover:text-primary-600 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
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
                  Commercial & Property Management Pricing
                </h2>
                <p className="text-xl text-sage-700 leading-relaxed">
                  We offer specialized pricing for commercial properties, property management companies,
                  HOAs, and large-scale residential developments. Contact us for custom solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-sage-50 rounded-xl">
                  <h3 className="text-lg font-bold text-sage-800 mb-3">Property Management</h3>
                  <p className="text-sage-600 text-sm">Multi-unit residential complexes and apartment communities</p>
                </div>
                <div className="text-center p-6 bg-cream-50 rounded-xl">
                  <h3 className="text-lg font-bold text-sage-800 mb-3">Commercial Properties</h3>
                  <p className="text-sage-600 text-sm">Office complexes, retail centers, and business parks</p>
                </div>
                <div className="text-center p-6 bg-sage-50 rounded-xl">
                  <h3 className="text-lg font-bold text-sage-800 mb-3">HOA Communities</h3>
                  <p className="text-sage-600 text-sm">Homeowner associations and community common areas</p>
                </div>
              </div>

              <div className="bg-sage-100 rounded-xl p-6 text-center">
                <p className="text-sage-800 font-medium text-lg mb-4">
                  <img src="/images/icons/checkmark.svg" alt="Commercial Solutions" className="w-5 h-5 inline mr-2" />
                  Volume discounts, flexible billing, and custom service plans available
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
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get your personalized quote today and join hundreds of satisfied customers 
            who trust us with their pet waste removal needs.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Get Your Free Quote Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
