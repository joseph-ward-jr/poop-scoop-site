const HouseCleaningPage = () => {
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
              Indoor House Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Premium residential cleaning services bringing the same attention to detail indoors. 
              Complete home care from outdoor to indoor spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact?form=true" className="btn-primary text-lg">
                Join Waitlist
              </a>
              <a href="/services" className="btn-secondary text-lg">
                Current Services
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
              Complete Home Care Vision
            </h2>
            <p className="text-lg text-sage-700 leading-relaxed">
              Our ultimate goal is to provide complete home care services, from outdoor pet waste removal
              and comprehensive lawn maintenance to premium indoor cleaning. Join our waitlist to be part of our
              complete home care journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HouseCleaningPage
