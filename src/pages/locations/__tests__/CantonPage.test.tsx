import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CantonPage from '../CantonPage'

// Mock the useJobberSubmission hook
vi.mock('../../../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: vi.fn()
  })
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('CantonPage', () => {
  it('renders the Canton location page with correct content', () => {
    renderWithRouter(<CantonPage />)
    
    // Check for Canton-specific content
    expect(screen.getByText(/Premium Pet Waste Removal Services in/)).toBeInTheDocument()
    expect(screen.getAllByText(/Canton, Georgia/)).toHaveLength(2) // Appears in title and description
    expect(screen.getByText('Proudly Serving Canton, GA')).toBeInTheDocument()
    
    // Check for service area information
    expect(screen.getByText(/Downtown Canton, Hickory Flat/)).toBeInTheDocument()
    
    // Check for testimonials section
    expect(screen.getByText('What Canton Customers Say')).toBeInTheDocument()
    expect(screen.getByText('Real reviews from your Canton neighbors')).toBeInTheDocument()
    
    // Check for local testimonials
    expect(screen.getByText('Jennifer M.')).toBeInTheDocument()
    expect(screen.getByText('Robert C.')).toBeInTheDocument()
    expect(screen.getByText('Amanda R.')).toBeInTheDocument()
    
    // Check for why choose us section
    expect(screen.getByText('Why Canton Chooses Field & Foyer')).toBeInTheDocument()
    expect(screen.getByText('Local expertise meets premium service standards')).toBeInTheDocument()
    
    // Check for contact form section
    expect(screen.getByText('Ready to Get Started in Canton?')).toBeInTheDocument()
  })

  it('displays Canton-specific service details', () => {
    renderWithRouter(<CantonPage />)
    
    // Check for Canton service details
    expect(screen.getByText('Canton Service Details')).toBeInTheDocument()
    expect(screen.getByText('Weekly and bi-weekly service options')).toBeInTheDocument()
    expect(screen.getByText('Eco-friendly sanitization methods')).toBeInTheDocument()
    expect(screen.getByText('Reliable service rain or shine')).toBeInTheDocument()
    expect(screen.getByText('Fully insured and bonded')).toBeInTheDocument()
  })

  it('displays local testimonials with correct information', () => {
    renderWithRouter(<CantonPage />)
    
    // Check for testimonial content
    expect(screen.getByText(/Field & Foyer has been a lifesaver!/)).toBeInTheDocument()
    expect(screen.getByText(/I was skeptical at first/)).toBeInTheDocument()
    expect(screen.getByText(/I love that they use eco-friendly methods/)).toBeInTheDocument()
    
    // Check for pet names
    expect(screen.getByText("Bella & Max's Parent")).toBeInTheDocument()
    expect(screen.getByText("Charlie's Parent")).toBeInTheDocument()
    expect(screen.getByText("Daisy's Parent")).toBeInTheDocument()
  })

  it('has proper navigation links', () => {
    renderWithRouter(<CantonPage />)
    
    // Check for CTA buttons
    expect(screen.getByRole('link', { name: /Get Free Quote/i })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: /View Pricing/i })).toHaveAttribute('href', '/pricing/pet-waste-removal')
  })
})
