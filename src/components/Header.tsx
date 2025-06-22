import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-offwhite-50/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-sage-200/30 transition-all duration-300">
      <nav className="container-max">
        <div className="flex justify-between items-center py-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="w-14 h-14 rounded-3xl overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/images/logo/field-foyer-logo.svg"
                  alt="Field & Foyer Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-sage-800 tracking-tight">Field & Foyer</span>
                <span className="text-xs text-sage-600 font-semibold tracking-wider uppercase">Complete Home & Garden Care</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-semibold text-lg transition-all duration-500 relative group ${
                  isActive(item.href)
                    ? 'text-sage-800'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                {item.name}
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300 ${
                  isActive(item.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`}></div>
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary ml-6 text-lg"
            >
              Get Free Quote
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
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMenuOpen(false)}
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
