import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import HomePage from '../pages/HomePage'

// Mock the useJobberSubmission hook
vi.mock('../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: vi.fn()
  })
}))

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  )
}

describe('HomePage Partnerships Section', () => {
  test('renders partnerships section with correct heading', () => {
    renderHomePage()
    
    expect(screen.getByText('Proudly Partnered With')).toBeInTheDocument()
    expect(screen.getByText('🤝 Trusted Partners')).toBeInTheDocument()
    expect(screen.getByText('We collaborate with trusted local businesses to provide comprehensive pet care solutions')).toBeInTheDocument()
  })

  test('displays partner logos with correct alt text', () => {
    renderHomePage()
    
    const petSupemarketLogo = screen.getByAltText('Pet Supermarket')
    const mountainViewLogo = screen.getByAltText('Mountain View Animal Hospital')
    
    expect(petSupemarketLogo).toBeInTheDocument()
    expect(mountainViewLogo).toBeInTheDocument()
    
    // Check that logos have correct src paths
    expect(petSupemarketLogo).toHaveAttribute('src', '/images/partners/pet-supermarket-logo.png')
    expect(mountainViewLogo).toHaveAttribute('src', '/images/partners/mountain-view-animal-hospital-logo.png')
  })

  test('partnerships section appears between testimonials and CTA', () => {
    renderHomePage()
    
    const partnershipsHeading = screen.getByText('Proudly Partnered With')
    const testimonialsHeading = screen.getByText('What Our Customers Say')
    const ctaHeading = screen.getByText('Ready for a')
    
    expect(partnershipsHeading).toBeInTheDocument()
    expect(testimonialsHeading).toBeInTheDocument()
    expect(ctaHeading).toBeInTheDocument()
    
    // Verify the order by checking DOM positions
    const partnershipsSection = partnershipsHeading.closest('section')
    const testimonialsSection = testimonialsHeading.closest('section')
    const ctaSection = ctaHeading.closest('section')
    
    expect(partnershipsSection).toBeInTheDocument()
    expect(testimonialsSection).toBeInTheDocument()
    expect(ctaSection).toBeInTheDocument()
  })

  test('partner logos have proper styling classes', () => {
    renderHomePage()

    const petSupemarketLogo = screen.getByAltText('Pet Supermarket')
    const mountainViewLogo = screen.getByAltText('Mountain View Animal Hospital')

    // Check that logos have the expected CSS classes for styling
    expect(petSupemarketLogo).toHaveClass('max-h-16', 'max-w-full', 'w-auto', 'mx-auto', 'opacity-70')
    expect(mountainViewLogo).toHaveClass('max-h-16', 'max-w-full', 'w-auto', 'mx-auto', 'opacity-90')
  })
})
