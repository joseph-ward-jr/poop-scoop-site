import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ContactPage from '../ContactPage'

// Mock the Jobber submission hook
const mockSubmitToJobber = vi.fn()
vi.mock('../../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: mockSubmitToJobber
  })
}))

// Mock the ContactForm component
vi.mock('../../components/ContactForm', () => ({
  default: ({ onSubmit, isLoading }: any) => (
    <div data-testid="contact-form">
      <button
        onClick={() => onSubmit({
          name: 'Test User',
          email: 'test@example.com',
          phone: '(555) 123-4567',
          address: '123 Test St, Atlanta, GA 30309',
          contactPreference: 'Email',
          additionalInfo: 'Test submission'
        })}
        disabled={isLoading}
        data-testid="submit-button"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}))

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the contact page with form', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Begin the Conversation')).toBeInTheDocument()
    expect(screen.getByText('Request Your Free Estimate')).toBeInTheDocument()
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  it('submits form data to Jobber successfully', async () => {
    mockSubmitToJobber.mockResolvedValueOnce({
      success: true,
      client: {
        id: '123',
        firstName: 'Test',
        lastName: 'User',
        emails: [],
        phones: []
      }
    })

    render(<ContactPage />)
    
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitToJobber).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        phone: '(555) 123-4567',
        address: '123 Test St, Atlanta, GA 30309',
        contactPreference: 'Email',
        additionalInfo: 'Test submission'
      })
    })

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument()
    })
  })

  it('handles Jobber submission errors gracefully', async () => {
    mockSubmitToJobber.mockResolvedValueOnce({
      success: false,
      errors: ['Invalid email format', 'Missing required field']
    })

    render(<ContactPage />)
    
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitToJobber).toHaveBeenCalled()
    })

    // Should still show success message but with error details
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument()
      expect(screen.getByText(/There was a technical issue/)).toBeInTheDocument()
    })
  })

  it('handles network errors gracefully', async () => {
    mockSubmitToJobber.mockRejectedValueOnce(new Error('Network error'))

    render(<ContactPage />)
    
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitToJobber).toHaveBeenCalled()
    })

    // Should still show success message but with error details
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument()
      expect(screen.getByText(/There was a technical issue/)).toBeInTheDocument()
    })
  })

  it('shows contact information cards', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('(770) 547-8457')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('support@fieldandfoyer.com')).toBeInTheDocument()
    expect(screen.getByText('Service Area')).toBeInTheDocument()
    expect(screen.getByText('Hours')).toBeInTheDocument()
  })

  it('shows what happens next section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('What Happens Next?')).toBeInTheDocument()
    expect(screen.getByText('We Review Your Request')).toBeInTheDocument()
    expect(screen.getByText('We Contact You')).toBeInTheDocument()
    expect(screen.getByText('Schedule Service')).toBeInTheDocument()
  })

  it('shows why choose us section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Why Choose Field & Foyer?')).toBeInTheDocument()
    expect(screen.getByText('100% Satisfaction Guarantee')).toBeInTheDocument()
    expect(screen.getByText('Fully Insured & Bonded')).toBeInTheDocument()
    expect(screen.getByText('Eco-Friendly Methods')).toBeInTheDocument()
    expect(screen.getByText('Local Family Business')).toBeInTheDocument()
  })
})
