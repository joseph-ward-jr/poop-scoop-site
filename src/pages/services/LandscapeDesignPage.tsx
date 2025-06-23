const LandscapeDesignPage = () => {
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
              Landscape Design & Installation
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 leading-relaxed mb-8">
              Custom landscape design and installation services to transform your outdoor vision into reality. 
              Professional design expertise combined with quality installation.
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

      {/* Coming Soon Message */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-sage-900 mb-6">
              Expanding Our Expertise in 2025
            </h2>
            <p className="text-lg text-sage-700 leading-relaxed">
              Building on our success in pet waste removal and upcoming lawn maintenance services, 
              we're excited to offer custom landscape design and installation. Join our waitlist to be 
              among the first to experience our comprehensive outdoor transformation services.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandscapeDesignPage
