import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import HouseCleaningPricingPage from '../HouseCleaningPricingPage'

// Wrapper component to provide router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('HouseCleaningPricingPage', () => {
  it('renders the page title correctly', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    expect(screen.getByRole('heading', { name: /house cleaning pricing/i })).toBeInTheDocument()
  })

  it('displays the coming soon badge with correct timeline', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    expect(screen.getByText(/coming fall 2025/i)).toBeInTheDocument()
  })

  it('shows the main description about competitive rates', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    expect(screen.getByText(/competitive residential cleaning rates/i)).toBeInTheDocument()
    expect(screen.getByText(/premium indoor cleaning services launching fall 2025/i)).toBeInTheDocument()
  })

  it('displays the transparent pricing section', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    expect(screen.getByRole('heading', { name: /transparent pricing coming soon/i })).toBeInTheDocument()
    expect(screen.getByText(/just like our pet waste removal services/i)).toBeInTheDocument()
  })

  it('has join waitlist button with correct link', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    const joinWaitlistButton = screen.getByRole('link', { name: /join waitlist/i })
    expect(joinWaitlistButton).toBeInTheDocument()
    expect(joinWaitlistButton).toHaveAttribute('href', '/contact?form=true')
  })

  it('has current pricing button with correct link', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )
    
    const currentPricingButton = screen.getByRole('link', { name: /current pricing/i })
    expect(currentPricingButton).toBeInTheDocument()
    expect(currentPricingButton).toHaveAttribute('href', '/pricing/pet-waste-removal')
  })

  it('applies correct CSS classes for styling', () => {
    render(
      <RouterWrapper>
        <HouseCleaningPricingPage />
      </RouterWrapper>
    )

    // Check for key styling classes using the heading specifically
    const heroHeading = screen.getByRole('heading', { name: /house cleaning pricing/i })
    const heroSection = heroHeading.closest('section')
    expect(heroSection).toHaveClass('bg-gradient-to-br', 'from-sage-50', 'to-cream-50')

    const comingSoonBadge = screen.getByText(/coming fall 2025/i)
    expect(comingSoonBadge).toHaveClass('bg-gray-200', 'text-sage-700')
  })
})
