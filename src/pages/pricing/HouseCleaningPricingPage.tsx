const HouseCleaningPricingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-cream-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-sage-700 rounded-full text-sm font-medium mb-6">
              Future Service
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-sage-900 mb-6">
              House Cleaning Pricing
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Competitive residential cleaning rates with the same transparent pricing approach.
              Premium indoor cleaning services launching soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact?form=true" className="btn-primary text-lg">
                Join Waitlist
              </a>
              <a href="/pricing/pet-waste-removal" className="btn-secondary text-lg">
                Current Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-sage-900 mb-6">
              Transparent Pricing Coming Soon
            </h2>
            <p className="text-lg text-sage-700 leading-relaxed">
              Just like our pet waste removal services, our house cleaning pricing will be transparent, 
              competitive, and tailored to your specific needs. Join our waitlist to receive 
              pricing information as soon as it's available.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HouseCleaningPricingPage
