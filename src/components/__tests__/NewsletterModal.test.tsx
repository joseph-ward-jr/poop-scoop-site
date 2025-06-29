import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterModal from '../NewsletterModal'

// Mock the newsletter subscription hook
vi.mock('../../hooks/useNewsletterSubscription', () => ({
  useNewsletterSubscription: () => ({
    isSubmitting: false,
    submitNewsletter: vi.fn().mockResolvedValue({ success: true }),
    lastResult: null
  })
}))

describe('NewsletterModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    source: 'Test Blog Post'
  }

  it('renders when open', () => {
    render(<NewsletterModal {...defaultProps} />)
    
    expect(screen.getByText('Stay Updated with Home & Yard Tips!')).toBeInTheDocument()
    expect(screen.getByText('Get weekly tips and tricks for home cleaning and lawn maintenance')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<NewsletterModal {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Stay Updated with Home & Yard Tips!')).not.toBeInTheDocument()
  })

  it('renders custom title when provided', () => {
    render(<NewsletterModal {...defaultProps} title="Custom Newsletter Title" />)
    
    expect(screen.getByText('Custom Newsletter Title')).toBeInTheDocument()
  })

  it('handles form input changes', async () => {
    const user = userEvent.setup()
    render(<NewsletterModal {...defaultProps} />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const nameInput = screen.getByLabelText(/name/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(nameInput, 'John Doe')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(nameInput).toHaveValue('John Doe')
  })

  it('handles interest checkbox changes', async () => {
    const user = userEvent.setup()
    render(<NewsletterModal {...defaultProps} />)
    
    const homeCleaningCheckbox = screen.getByLabelText(/home cleaning tips/i)
    const petCareCheckbox = screen.getByLabelText(/pet waste management/i)
    
    // Home cleaning should be checked by default
    expect(homeCleaningCheckbox).toBeChecked()
    
    // Check pet care
    await user.click(petCareCheckbox)
    expect(petCareCheckbox).toBeChecked()
    
    // Uncheck home cleaning
    await user.click(homeCleaningCheckbox)
    expect(homeCleaningCheckbox).not.toBeChecked()
  })

  it('shows error when email is missing', async () => {
    const user = userEvent.setup()
    render(<NewsletterModal {...defaultProps} />)
    
    const submitButton = screen.getByText('Subscribe')
    await user.click(submitButton)
    
    expect(screen.getByText('Email address is required')).toBeInTheDocument()
  })

  it('shows error when no interests are selected', async () => {
    const user = userEvent.setup()
    render(<NewsletterModal {...defaultProps} />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')
    
    // Uncheck all default interests
    const homeCleaningCheckbox = screen.getByLabelText(/home cleaning tips/i)
    const lawnMaintenanceCheckbox = screen.getByLabelText(/lawn maintenance/i)
    
    await user.click(homeCleaningCheckbox)
    await user.click(lawnMaintenanceCheckbox)
    
    const submitButton = screen.getByText('Subscribe')
    await user.click(submitButton)
    
    expect(screen.getByText('Please select at least one area of interest')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<NewsletterModal {...defaultProps} onClose={onClose} />)
    
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)
    
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when "Maybe Later" is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<NewsletterModal {...defaultProps} onClose={onClose} />)
    
    const maybeLaterButton = screen.getByText('Maybe Later')
    await user.click(maybeLaterButton)
    
    expect(onClose).toHaveBeenCalled()
  })
})
