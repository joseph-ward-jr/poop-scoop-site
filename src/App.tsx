import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import TestimonialsPage from './pages/TestimonialsPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'

// Service-specific pages
import PetWasteRemovalPage from './pages/services/PetWasteRemovalPage'
import LawnMaintenancePage from './pages/services/LawnMaintenancePage'
import HouseCleaningPage from './pages/services/HouseCleaningPage'

// Pricing-specific pages
import PetWasteRemovalPricingPage from './pages/pricing/PetWasteRemovalPricingPage'
import LawnCarePricingPage from './pages/pricing/LawnCarePricingPage'
import HouseCleaningPricingPage from './pages/pricing/HouseCleaningPricingPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Main service overview */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Individual service pages */}
          <Route path="/services/pet-waste-removal" element={<PetWasteRemovalPage />} />
          <Route path="/services/lawn-maintenance" element={<LawnMaintenancePage />} />
          <Route path="/services/house-cleaning" element={<HouseCleaningPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />

          {/* Main pricing overview */}
          <Route path="/pricing" element={<PricingPage />} />

          {/* Individual pricing pages */}
          <Route path="/pricing/pet-waste-removal" element={<PetWasteRemovalPricingPage />} />
          <Route path="/pricing/lawn-care" element={<LawnCarePricingPage />} />
          <Route path="/pricing/house-cleaning" element={<HouseCleaningPricingPage />} />

          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
