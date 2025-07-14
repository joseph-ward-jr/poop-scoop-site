import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import MetaPixel from './components/MetaPixel'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

// Blog pages
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

// Service-specific pages
import PetWasteRemovalPage from './pages/services/PetWasteRemovalPage'
import LawnMaintenancePage from './pages/services/LawnMaintenancePage'
import HouseCleaningPage from './pages/services/HouseCleaningPage'

// Pricing-specific pages
import PetWasteRemovalPricingPage from './pages/pricing/PetWasteRemovalPricingPage'
import LawnCarePricingPage from './pages/pricing/LawnCarePricingPage'
import HouseCleaningPricingPage from './pages/pricing/HouseCleaningPricingPage'

// Location pages
import CantonPage from './pages/locations/CantonPage'
import BallgroundPage from './pages/locations/BallgroundPage'
import HollySpringsPage from './pages/locations/HollySpringsPage'
import MiltonPage from './pages/locations/MiltonPage'
import WoodstockPage from './pages/locations/WoodstockPage'

// Test pages
import JobberTestPage from './pages/JobberTestPage'

// OAuth pages
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import OAuthSuccessPage from './pages/OAuthSuccessPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MetaPixel />
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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Main pricing overview */}
          <Route path="/pricing" element={<PricingPage />} />

          {/* Individual pricing pages */}
          <Route path="/pricing/pet-waste-removal" element={<PetWasteRemovalPricingPage />} />
          <Route path="/pricing/lawn-care" element={<LawnCarePricingPage />} />
          <Route path="/pricing/house-cleaning" element={<HouseCleaningPricingPage />} />

          {/* Location pages */}
          <Route path="/locations/canton" element={<CantonPage />} />
          <Route path="/locations/ballground" element={<BallgroundPage />} />
          <Route path="/locations/holly-springs" element={<HollySpringsPage />} />
          <Route path="/locations/milton" element={<MiltonPage />} />
          <Route path="/locations/woodstock" element={<WoodstockPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />

          {/* Test pages */}
          <Route path="/test/jobber" element={<JobberTestPage />} />

          {/* OAuth pages */}
          <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
          <Route path="/oauth/success" element={<OAuthSuccessPage />} />
        </Routes>
        </Layout>
    </Router>
  )
}

export default App
