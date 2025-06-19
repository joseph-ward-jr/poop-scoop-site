import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🐕</span>
                </div>
                <span className="text-xl font-bold">Poop Scoop Pro</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Professional pet waste removal service keeping your yard clean and fresh. 
                Reliable, affordable, and eco-friendly solutions for pet owners.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">
                  📞 <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors">(123) 456-7890</a>
                </p>
                <p className="text-gray-300">
                  ✉️ <a href="mailto:info@poopscooppro.com" className="hover:text-primary-400 transition-colors">info@poopscooppro.com</a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Weekly Cleanup</li>
                <li>Bi-weekly Service</li>
                <li>One-time Cleanup</li>
                <li>Emergency Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {currentYear} Poop Scoop Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
