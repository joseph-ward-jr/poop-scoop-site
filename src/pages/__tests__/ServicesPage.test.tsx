import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ServicesPage from '../ServicesPage'

// Mock the router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ServicesPage', () => {
  test('renders the services page with updated header text', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check for the updated header text that clarifies current vs future services
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText(/Field & Foyer currently specializes in professional pet waste removal services/)).toBeInTheDocument()
    expect(screen.getByText(/We're building toward a complete home and lawn care experience/)).toBeInTheDocument()
  })

  test('displays current service status clearly', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check for the current service indicator
    expect(screen.getByText('Available Now: Pet Waste Removal')).toBeInTheDocument()
    expect(screen.getByText('Coming Soon: Home & Lawn Care')).toBeInTheDocument()
  })

  test('shows future services section with clear unavailability warning', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check for the updated future services section
    expect(screen.getByText('Future Services in Development')).toBeInTheDocument()
    expect(screen.getByText(/These services are currently in development and not yet available for booking/)).toBeInTheDocument()
    expect(screen.getByText(/These services are not currently available - Pet waste removal is our only active service/)).toBeInTheDocument()
  })

  test('displays future services with "NOT AVAILABLE" badges', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check for the "NOT AVAILABLE" badges on future services
    const notAvailableBadges = screen.getAllByText('NOT AVAILABLE')
    expect(notAvailableBadges).toHaveLength(2) // One for each future service
    
    // Check for the updated status text
    const developmentStatus = screen.getAllByText('In Development - Not Available for Booking')
    expect(developmentStatus).toHaveLength(2) // One for each future service
  })

  test('shows updated CTA section focused on current service', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check for the updated CTA text
    expect(screen.getByText('Ready for Professional Pet Waste Removal?')).toBeInTheDocument()
    expect(screen.getByText(/Experience our premium pet waste removal service today/)).toBeInTheDocument()
    expect(screen.getByText(/Additional services coming soon!/)).toBeInTheDocument()
  })

  test('displays current service as available', () => {
    renderWithRouter(<ServicesPage />)

    // Check that the current service shows as available
    expect(screen.getByText('Pet Waste Removal')).toBeInTheDocument()
    expect(screen.getAllByText('Available Now')).toHaveLength(2) // Header section and service card
  })

  test('shows future services with proper development status', () => {
    renderWithRouter(<ServicesPage />)
    
    // Check that future services show development status
    expect(screen.getByText('Home Maintenance Services')).toBeInTheDocument()
    expect(screen.getByText('Lawn Care Services')).toBeInTheDocument()
    
    // Check for updated descriptions that mention future availability
    expect(screen.getByText(/Premium home maintenance and cleaning services are planned for the future/)).toBeInTheDocument()
    expect(screen.getByText(/Professional lawn care, mowing, edging, and seasonal maintenance services are being developed for future availability/)).toBeInTheDocument()
  })
})
