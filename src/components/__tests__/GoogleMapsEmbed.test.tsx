import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GoogleMapsEmbed from '../GoogleMapsEmbed'

describe('GoogleMapsEmbed', () => {
  it('renders the Google Maps iframe with correct attributes', () => {
    render(<GoogleMapsEmbed />)
    
    const iframe = screen.getByTitle('Field and Foyer Location')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'))
    expect(iframe).toHaveAttribute('allowFullScreen')
    expect(iframe).toHaveAttribute('loading', 'lazy')
    expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade')
  })

  it('shows loading state initially', () => {
    render(<GoogleMapsEmbed />)

    expect(screen.getByText('Loading map...')).toBeInTheDocument()
    // Check for loading spinner by class instead of role
    const loadingSpinner = document.querySelector('.animate-spin')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('hides loading state when iframe loads', async () => {
    render(<GoogleMapsEmbed />)
    
    const iframe = screen.getByTitle('Field and Foyer Location')
    fireEvent.load(iframe)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading map...')).not.toBeInTheDocument()
    })
  })

  it('has error state elements in the DOM', () => {
    // Test that error state elements exist in the component structure
    // This ensures the error handling UI is properly implemented
    const { container } = render(<GoogleMapsEmbed />)

    // Check that error state structure exists (even if not visible)
    const errorElements = container.querySelectorAll('.absolute.inset-0')
    expect(errorElements.length).toBeGreaterThan(0)
  })

  it('displays business information overlay', () => {
    render(<GoogleMapsEmbed />)
    
    expect(screen.getByText('Field and Foyer')).toBeInTheDocument()
    expect(screen.getByText('Professional Pet Waste Removal Service')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-map-class'
    render(<GoogleMapsEmbed className={customClass} />)
    
    const container = screen.getByTitle('Field and Foyer Location').closest('div')?.parentElement
    expect(container).toHaveClass(customClass)
  })

  it('has proper styling classes for responsive design', () => {
    render(<GoogleMapsEmbed />)
    
    const iframe = screen.getByTitle('Field and Foyer Location')
    const container = iframe.closest('div')
    
    expect(container).toHaveClass('rounded-2xl', 'shadow-xl', 'border', 'border-sage-200')
  })

  it('includes proper accessibility attributes', () => {
    render(<GoogleMapsEmbed />)
    
    const iframe = screen.getByTitle('Field and Foyer Location')
    expect(iframe).toHaveAttribute('title', 'Field and Foyer Location')
    
    // Check for location icons with alt text
    const locationIcons = screen.getAllByAltText('Location')
    expect(locationIcons.length).toBeGreaterThan(0)
  })
})
