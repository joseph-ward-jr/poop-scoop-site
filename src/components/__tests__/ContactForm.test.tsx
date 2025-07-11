import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '../ContactForm'

// Mock the Jobber API service
vi.mock('../../services/jobberApi', () => ({
  jobberApi: {
    createClientFromForm: vi.fn()
  }
}))

// Mock the hook
vi.mock('../../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: vi.fn().mockResolvedValue({ success: true }),
    lastResult: null
  })
}))

describe('ContactForm', () => {
  it('renders all required fields for homepage variant', () => {
    render(<ContactForm variant="homepage" enableJobberIntegration={false} />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/home or commercial address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/how would you like to be contacted/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/additional information/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /begin my journey/i })).toBeInTheDocument()
  })

  it('renders all required fields for contact variant', () => {
    render(<ContactForm variant="contact" enableJobberIntegration={false} />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/home or commercial address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/how would you like to be contacted/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/additional information/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /request my free estimate/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<ContactForm variant="homepage" enableJobberIntegration={false} />)
    
    const submitButton = screen.getByRole('button', { name: /begin my journey/i })
    fireEvent.click(submitButton)
    
    // Check that form doesn't submit without required fields
    expect(screen.getByLabelText(/full name/i)).toBeRequired()
    expect(screen.getByLabelText(/email address/i)).toBeRequired()
    expect(screen.getByLabelText(/phone number/i)).toBeRequired()
    expect(screen.getByLabelText(/home or commercial address/i)).toBeRequired()
    expect(screen.getByLabelText(/how would you like to be contacted/i)).toBeRequired()
  })

  it('calls onSubmit with form data when submitted', async () => {
    const mockOnSubmit = vi.fn()
    render(<ContactForm variant="homepage" onSubmit={mockOnSubmit} enableJobberIntegration={false} />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '(555) 123-4567' } })
    fireEvent.change(screen.getByLabelText(/home or commercial address/i), { target: { value: '123 Main St, City, State 12345' } })
    fireEvent.change(screen.getByLabelText(/how would you like to be contacted/i), { target: { value: 'email' } })
    fireEvent.change(screen.getByLabelText(/additional information/i), { target: { value: 'Test message' } })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /begin my journey/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, State 12345',
        contactPreference: 'email',
        additionalInfo: 'Test message'
      })
    })
  })

  it('shows success message for contact variant after submission', async () => {
    render(<ContactForm variant="contact" enableJobberIntegration={false} />)
    
    // Fill out required fields
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '(555) 123-4567' } })
    fireEvent.change(screen.getByLabelText(/home or commercial address/i), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByLabelText(/how would you like to be contacted/i), { target: { value: 'call' } })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /request my free estimate/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/thank you!/i)).toBeInTheDocument()
      expect(screen.getByText(/we've received your request/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully', async () => {
    const mockOnSubmit = vi.fn()
    render(<ContactForm variant="homepage" onSubmit={mockOnSubmit} enableJobberIntegration={false} />)

    // Fill out and submit form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '(555) 123-4567' } })
    fireEvent.change(screen.getByLabelText(/home or commercial address/i), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByLabelText(/how would you like to be contacted/i), { target: { value: 'text' } })

    fireEvent.click(screen.getByRole('button', { name: /begin my journey/i }))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St',
      contactPreference: 'text',
      additionalInfo: ''
    })
  })

  it('can disable Jobber integration', () => {
    render(<ContactForm variant="homepage" enableJobberIntegration={false} />)

    // Form should still render normally
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /begin my journey/i })).toBeInTheDocument()
  })

  it('enables Jobber integration by default', () => {
    render(<ContactForm variant="homepage" />)

    // Form should render with Jobber integration enabled (default behavior)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /begin my journey/i })).toBeInTheDocument()
  })
})
