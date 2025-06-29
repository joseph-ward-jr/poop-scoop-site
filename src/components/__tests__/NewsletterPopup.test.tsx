import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterPopup from '../NewsletterPopup'

// Mock the newsletter subscription hook
vi.mock('../../hooks/useNewsletterSubscription', () => ({
  useNewsletterSubscription: () => ({
    isSubmitting: false,
    submitNewsletter: vi.fn().mockResolvedValue({ success: true }),
    lastResult: null
  })
}))

describe('NewsletterPopup', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    source: 'Test Source'
  }

  it('renders when open', () => {
    render(<NewsletterPopup {...defaultProps} />)
    
    expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Get weekly tips for home cleaning and lawn maintenance delivered to your inbox!')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<NewsletterPopup {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Subscribe to Our Newsletter')).not.toBeInTheDocument()
  })

  it('handles email input changes', async () => {
    const user = userEvent.setup()
    render(<NewsletterPopup {...defaultProps} />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('handles name input changes', async () => {
    const user = userEvent.setup()
    render(<NewsletterPopup {...defaultProps} />)
    
    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'John Doe')
    
    expect(nameInput).toHaveValue('John Doe')
  })

  it('shows error when email is empty', async () => {
    const user = userEvent.setup()
    render(<NewsletterPopup {...defaultProps} />)

    const submitButton = screen.getByText('Subscribe')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument()
    })
  })

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<NewsletterPopup {...defaultProps} />)

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByText('Subscribe')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<NewsletterPopup {...defaultProps} onClose={onClose} />)
    
    const closeButton = screen.getByLabelText(/close newsletter popup/i)
    await user.click(closeButton)
    
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when "Maybe Later" is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<NewsletterPopup {...defaultProps} onClose={onClose} />)
    
    const maybeLaterButton = screen.getByText('Maybe Later')
    await user.click(maybeLaterButton)
    
    expect(onClose).toHaveBeenCalled()
  })

  it('disables submit button when email is empty', () => {
    render(<NewsletterPopup {...defaultProps} />)
    
    const submitButton = screen.getByText('Subscribe')
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when valid email is entered', async () => {
    const user = userEvent.setup()
    render(<NewsletterPopup {...defaultProps} />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')
    
    const submitButton = screen.getByText('Subscribe')
    expect(submitButton).not.toBeDisabled()
  })

  it('displays benefits list', () => {
    render(<NewsletterPopup {...defaultProps} />)
    
    expect(screen.getByText('What you\'ll get:')).toBeInTheDocument()
    expect(screen.getByText(/Weekly home cleaning tips/)).toBeInTheDocument()
    expect(screen.getByText(/Lawn maintenance and yard care/)).toBeInTheDocument()
    expect(screen.getByText(/Eco-friendly cleaning solutions/)).toBeInTheDocument()
    expect(screen.getByText(/Seasonal maintenance reminders/)).toBeInTheDocument()
  })

  it('shows privacy notice', () => {
    render(<NewsletterPopup {...defaultProps} />)
    
    expect(screen.getByText('We respect your privacy. Unsubscribe at any time.')).toBeInTheDocument()
  })
})
