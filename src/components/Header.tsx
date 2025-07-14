import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { trackInitiateCheckout } from './MetaPixel'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false)
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  const services = [
    {
      name: 'Pet Waste Removal',
      href: '/services/pet-waste-removal',
      description: 'Professional pet waste management',
      status: 'Available Now'
    },
    {
      name: 'Indoor House Cleaning',
      href: '/services/house-cleaning',
      description: 'Premium residential cleaning',
      status: 'Coming 2025'
    },
    {
      name: 'Lawn Maintenance',
      href: '/services/lawn-maintenance',
      description: 'Complete lawn care services',
      status: 'Coming 2026'
    }
  ]

  const pricingOptions = [
    {
      name: 'Pet Waste Removal Pricing',
      href: '/pricing/pet-waste-removal',
      description: 'Transparent pricing for pet services',
      status: 'Available Now'
    },
    {
      name: 'House Cleaning Pricing',
      href: '/pricing/house-cleaning',
      description: 'Premium cleaning service rates',
      status: 'Coming 2025'
    },
    {
      name: 'Lawn Care Pricing',
      href: '/pricing/lawn-care',
      description: 'Competitive lawn maintenance rates',
      status: 'Coming 2026'
    }
  ]

  const locations = [
    {
      name: 'Canton, GA',
      href: '/locations/canton'
    },
    {
      name: 'Ballground, GA',
      href: '/locations/ballground'
    },
    {
      name: 'Holly Springs, GA',
      href: '/locations/holly-springs'
    },
    {
      name: 'Milton, GA',
      href: '/locations/milton'
    },
    {
      name: 'Woodstock, GA',
      href: '/locations/woodstock'
    }
  ]

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const closeAllDropdowns = () => {
    setServicesDropdownOpen(false)
    setPricingDropdownOpen(false)
    setLocationsDropdownOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllDropdowns()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdowns when route changes
  useEffect(() => {
    closeAllDropdowns()
  }, [location.pathname])

  return (
    <header ref={headerRef} className="bg-offwhite-50/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-sage-200/30 transition-all duration-300">
      <nav className="container-max">
        <div className="flex justify-between items-center py-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="w-14 h-14 rounded-3xl overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/images/logo/field-foyer-logo.png"
                  alt="Field & Foyer Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-black text-sage-800">Field & Foyer</span>
                <span className="text-xs text-sage-600 font-semibold uppercase tracking-wider"></span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-semibold text-md transition-all duration-500 relative group ${
                  isActive(item.href)
                    ? 'text-sage-800'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
                onClick={closeAllDropdowns}
              >
                {item.name}
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300 ${
                  isActive(item.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen)
                  setPricingDropdownOpen(false)
                  setLocationsDropdownOpen(false)
                }}
                className={`font-semibold text-md transition-all duration-500 relative group flex items-center ${
                  isActive('/services')
                    ? 'text-sage-800'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Services
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300 ${
                  isActive('/services') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-sage-100 py-4 z-50">
                  <div className="px-4 py-2 border-b border-sage-100">
                    <Link
                      to="/services"
                      className="text-sage-800 font-semibold hover:text-sage-600 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      All Services Overview
                    </Link>
                  </div>
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block px-4 py-3 hover:bg-sage-50 transition-colors group"
                      onClick={closeAllDropdowns}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-sage-800 group-hover:text-sage-600">
                            {service.name}
                          </div>
                          <div className="text-sm text-sage-600 mt-1">
                            {service.description}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          service.status === 'Available Now'
                            ? 'bg-sage-100 text-sage-700'
                            : 'bg-cream-100 text-sage-600'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setPricingDropdownOpen(!pricingDropdownOpen)
                  setServicesDropdownOpen(false)
                  setLocationsDropdownOpen(false)
                }}
                className={`font-semibold text-md transition-all duration-500 relative group flex items-center ${
                  isActive('/pricing')
                    ? 'text-sage-800'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Pricing
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300 ${
                  isActive('/pricing') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
              </button>

              {pricingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-sage-100 py-4 z-50">
                  <div className="px-4 py-2 border-b border-sage-100">
                    <Link
                      to="/pricing"
                      className="text-sage-800 font-semibold hover:text-sage-600 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      All Pricing Overview
                    </Link>
                  </div>
                  {pricingOptions.map((pricing) => (
                    <Link
                      key={pricing.name}
                      to={pricing.href}
                      className="block px-4 py-3 hover:bg-sage-50 transition-colors group"
                      onClick={closeAllDropdowns}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-sage-800 group-hover:text-sage-600">
                            {pricing.name}
                          </div>
                          <div className="text-sm text-sage-600 mt-1">
                            {pricing.description}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          pricing.status === 'Available Now'
                            ? 'bg-sage-100 text-sage-700'
                            : 'bg-cream-100 text-sage-600'
                        }`}>
                          {pricing.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLocationsDropdownOpen(!locationsDropdownOpen)
                  setServicesDropdownOpen(false)
                  setPricingDropdownOpen(false)
                }}
                className={`font-semibold text-md transition-all duration-500 relative group flex items-center ${
                  isActive('/locations')
                    ? 'text-sage-800'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Locations
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300 ${
                  isActive('/locations') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
              </button>

              {locationsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-sage-100 py-2 z-50">
                  {locations.map((location) => (
                    <Link
                      key={location.name}
                      to={location.href}
                      className="block px-4 py-3 hover:bg-sage-50 transition-colors group"
                      onClick={closeAllDropdowns}
                    >
                      <div className="font-semibold text-sage-800 group-hover:text-sage-600">
                        {location.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact?form=true"
              className="bg-sage-800 hover:bg-sage-900 btn-primary ml-8 text-md"
              onClick={() => {
                closeAllDropdowns();
                trackInitiateCheckout({ content_name: 'Header Get In Touch Button' });
              }}
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sage-600 hover:text-sage-700 focus:outline-none focus:text-sage-700 p-2 rounded-xl hover:bg-sage-50 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-offwhite-50 border-t border-offwhite-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-sage-700 bg-sage-100'
                      : 'text-sage-600 hover:text-sage-700 hover:bg-sage-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Services Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-sage-800 font-semibold text-sm uppercase tracking-wide">
                  Services
                </div>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 text-sage-600 hover:text-sage-700 hover:bg-sage-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{service.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        service.status === 'Available Now'
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-cream-100 text-sage-600'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Pricing Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-sage-800 font-semibold text-sm uppercase tracking-wide">
                  Pricing
                </div>
                {pricingOptions.map((pricing) => (
                  <Link
                    key={pricing.name}
                    to={pricing.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 text-sage-600 hover:text-sage-700 hover:bg-sage-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{pricing.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        pricing.status === 'Available Now'
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-cream-100 text-sage-600'
                      }`}>
                        {pricing.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Locations Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-sage-800 font-semibold text-sm uppercase tracking-wide">
                  Locations
                </div>
                {locations.map((location) => (
                  <Link
                    key={location.name}
                    to={location.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 text-sage-600 hover:text-sage-700 hover:bg-sage-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{location.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/contact?quote=true"
                  className="btn-primary w-full text-center block"
                  onClick={() => {
                    setIsMenuOpen(false);
                    trackInitiateCheckout({ content_name: 'Mobile Get Free Quote Button' });
                  }}
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
