import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PetWasteRemovalPricingPage from '../PetWasteRemovalPricingPage'

describe('PetWasteRemovalPricingPage', () => {
  it('renders the page title correctly', () => {
    render(<PetWasteRemovalPricingPage />)
    
    expect(screen.getByText('Pet Waste Removal Pricing')).toBeInTheDocument()
    expect(screen.getByText(/Transparent, flat-rate pricing/)).toBeInTheDocument()
  })

  it('displays all three pricing plans', () => {
    render(<PetWasteRemovalPricingPage />)
    
    expect(screen.getByText('Weekly Service')).toBeInTheDocument()
    expect(screen.getByText('Bi-weekly Service')).toBeInTheDocument()
    expect(screen.getByText('One-time Cleanup')).toBeInTheDocument()
  })

  it('shows updated one-time cleanup base price of $125', () => {
    render(<PetWasteRemovalPricingPage />)
    
    // Find the one-time cleanup card and check its base price
    const oneTimeCard = screen.getByText('One-time Cleanup').closest('div')
    expect(oneTimeCard).toContainHTML('$125')
  })

  it('does not show deodorizing features in service cards', () => {
    render(<PetWasteRemovalPricingPage />)
    
    // Check that deodorizing spray is not in the weekly service features
    expect(screen.queryByText('Yard deodorizing spray')).not.toBeInTheDocument()
    
    // Check that sanitization treatment is not in the one-time cleanup features
    expect(screen.queryByText('Sanitization treatment')).not.toBeInTheDocument()
  })

  it('displays the deodorizing & sanitization add-on section', () => {
    render(<PetWasteRemovalPricingPage />)
    
    expect(screen.getByText('Optional Add-On Services')).toBeInTheDocument()
    expect(screen.getByText('Deodorizing & Sanitization Treatment')).toBeInTheDocument()
    expect(screen.getByText('$15')).toBeInTheDocument()
    expect(screen.getByText('per visit')).toBeInTheDocument()
  })

  it('shows add-on features correctly', () => {
    render(<PetWasteRemovalPricingPage />)
    
    expect(screen.getByText('Eliminates pet odors and bacteria')).toBeInTheDocument()
    expect(screen.getByText('Safe for pets and children')).toBeInTheDocument()
    expect(screen.getByText('Long-lasting freshness')).toBeInTheDocument()
    expect(screen.getByText('Eco-friendly formula')).toBeInTheDocument()
  })

  it('has request add-on service button', () => {
    render(<PetWasteRemovalPricingPage />)
    
    const addOnButton = screen.getByText('Request Add-On Service')
    expect(addOnButton).toBeInTheDocument()
    expect(addOnButton.closest('a')).toHaveAttribute('href', '/contact?addon=deodorizing')
  })

  it('shows updated features for weekly service', () => {
    render(<PetWasteRemovalPricingPage />)
    
    expect(screen.getByText('Weekly yard cleanup')).toBeInTheDocument()
    expect(screen.getByText('All waste removed and disposed')).toBeInTheDocument()
    expect(screen.getByText('Gate left securely closed')).toBeInTheDocument()
    expect(screen.getByText('Service rain or shine')).toBeInTheDocument()
    expect(screen.getByText('Text notifications')).toBeInTheDocument()
    expect(screen.getByText('Professional service guarantee')).toBeInTheDocument()
  })

  it('shows updated features for bi-weekly service', () => {
    render(<PetWasteRemovalPricingPage />)

    expect(screen.getByText('Every other week cleanup')).toBeInTheDocument()
    expect(screen.getByText('Thorough waste removal')).toBeInTheDocument()
    expect(screen.getByText('Gate security check')).toBeInTheDocument()
    expect(screen.getByText('Flexible scheduling')).toBeInTheDocument()
    expect(screen.getByText('Service updates')).toBeInTheDocument()
  })

  it('shows updated features for one-time cleanup', () => {
    render(<PetWasteRemovalPricingPage />)

    expect(screen.getByText('Complete yard restoration')).toBeInTheDocument()
    expect(screen.getByText('Deep cleaning service')).toBeInTheDocument()
    expect(screen.getByText('Debris removal')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction guarantee')).toBeInTheDocument()
  })

  it('shows detailed pricing table with default weekly service', () => {
    render(<PetWasteRemovalPricingPage />)

    // Check that the detailed pricing table shows weekly service by default
    expect(screen.getByText('Detailed Pricing for Weekly Service')).toBeInTheDocument()

    // Check that pricing table headers are present
    expect(screen.getByText('Number of Dogs')).toBeInTheDocument()
    expect(screen.getByText(/Standard Yard/)).toBeInTheDocument()
    // Use getAllByText to handle multiple "Large Yard" occurrences
    const largeYardElements = screen.getAllByText(/Large Yard/)
    expect(largeYardElements.length).toBeGreaterThan(0)
  })

  it('displays $20 minimum charge on all pricing cards', () => {
    render(<PetWasteRemovalPricingPage />)

    // Check that all three cards show the $20 minimum charge
    const minimumChargeTexts = screen.getAllByText('$20 minimum charge applies')
    expect(minimumChargeTexts).toHaveLength(3)
  })

  it('shows updated yard size ranges in table headers', () => {
    render(<PetWasteRemovalPricingPage />)

    // Check for updated yard size ranges
    expect(screen.getByText('(1/4 - 1 acre)')).toBeInTheDocument()
    expect(screen.getByText('(1+ acre)*')).toBeInTheDocument()
  })

  it('displays large yard pricing explanation', () => {
    render(<PetWasteRemovalPricingPage />)

    // Check for the large yard pricing explanation
    expect(screen.getByText(/Large Yard Pricing:/)).toBeInTheDocument()
    expect(screen.getByText(/Additional \$15 charge applies for each additional 1\/4 acre/)).toBeInTheDocument()
  })
})
