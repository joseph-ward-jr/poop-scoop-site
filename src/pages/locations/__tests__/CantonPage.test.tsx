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
    
    // Check for video element
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
    
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

  it('displays video element with proper fallback', () => {
    renderWithRouter(<CantonPage />)

    // Check for video element
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', '/videos/locations/canton-hero.mp4')
    expect(video).toHaveProperty('autoplay', true)
    expect(video).toHaveProperty('loop', true)
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveProperty('playsInline', true)
  })

  it('has proper navigation links', () => {
    renderWithRouter(<CantonPage />)
    
    // Check for CTA buttons
    expect(screen.getByRole('link', { name: /Get Free Quote/i })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: /View Pricing/i })).toHaveAttribute('href', '/pricing/pet-waste-removal')
  })
})
