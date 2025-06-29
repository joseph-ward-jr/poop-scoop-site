import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sage-900 text-offwhite-100">
      <div className="container-max">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/images/logo/field-foyer-logo.png"
                    alt="Field & Foyer Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-offwhite-50">Field & Foyer</span>
                  <span className="text-xs text-sage-300 font-medium tracking-wide uppercase"></span>
                </div>
              </div>
              <p className="text-sage-200 mb-6 max-w-md leading-relaxed">
              A higher standard of home solutions for homeowners. We offer thoughtful outdoor pet care, with comprehensive lawn and indoor services coming soon.
              </p>
              <div className="space-y-3">
                <p className="text-sage-200 flex items-center">
                  <img src="/images/icons/phone.svg" alt="Phone" className="w-4 h-4 mr-3" />
                  <a href="tel:+111111111" className="hover:text-sage-300 transition-colors">(770) 547-8457</a>
                </p>
                <p className="text-sage-200 flex items-center">
                  <img src="/images/icons/email.svg" alt="Email" className="w-4 h-4 mr-3" />
                  <a href="mailto:hello@fieldandfoyer.com" className="hover:text-sage-300 transition-colors">support@fieldandfoyer.com</a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-offwhite-50">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sage-200 hover:text-sage-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sage-200 hover:text-sage-300 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sage-200 hover:text-sage-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sage-200 hover:text-sage-300 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sage-200 hover:text-sage-300 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sage-200 hover:text-sage-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-offwhite-50">Our Services</h3>
              <ul className="text-sm space-y-3 text-sage-200">
                <li>Pet Waste Removal</li>
                <li>Indoor House Cleaning (Coming Soon)</li>
                <li>Lawn Maintenance (Coming Soon)</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sage-300">
                © {currentYear} Field & Foyer. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-sage-300 hover:text-sage-200 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sage-300 hover:text-sage-200 transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
