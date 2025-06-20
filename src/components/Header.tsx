import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-offwhite-50/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-offwhite-200">
      <nav className="container-max">
        <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-sage-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-offwhite-50 font-bold text-xl">🌿</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-sage-800 tracking-tight">Field & Foyer</span>
                <span className="text-xs text-sage-600 font-medium tracking-wide uppercase">Pet Care Services</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-300 relative ${
                  isActive(item.href)
                    ? 'text-sage-700'
                    : 'text-sage-600 hover:text-sage-700'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full"></div>
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary ml-4"
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
