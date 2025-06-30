import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactPage from '../ContactPage'

// Mock the Jobber submission hook
vi.mock('../../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: vi.fn()
  })
}))

// Mock the ContactForm component
vi.mock('../../components/ContactForm', () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>
}))

describe('ContactPage Enhanced Cards', () => {
  it('renders enhanced contact cards with modern styling', () => {
    render(<ContactPage />)
    
    // Check that the contact info section has the new gradient background
    const contactSection = screen.getByText('Phone').closest('section')
    expect(contactSection).toHaveClass('bg-gradient-to-br', 'from-offwhite-50', 'to-sage-50')
    
    // Check that all four contact cards are present
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Service Area')).toBeInTheDocument()
    expect(screen.getByText('Hours')).toBeInTheDocument()
    
    // Check contact details
    expect(screen.getByText('(770) 547-8457')).toBeInTheDocument()
    expect(screen.getByText('support@fieldandfoyer.com')).toBeInTheDocument()
    expect(screen.getByText('Greater Metro Area')).toBeInTheDocument()
    expect(screen.getByText('Mon-Fri: 9am-5pm')).toBeInTheDocument()
    
    // Check descriptions
    expect(screen.getByText('Call us Monday-Friday, 8am-6pm')).toBeInTheDocument()
    expect(screen.getByText('We respond within 24 hours')).toBeInTheDocument()
    expect(screen.getByText('Serving 5+ neighborhoods')).toBeInTheDocument()
    expect(screen.getByText('Weekend service available')).toBeInTheDocument()
  })

  it('applies enhanced styling classes to contact cards', () => {
    render(<ContactPage />)
    
    const phoneCard = screen.getByText('Phone').closest('div')
    const emailCard = screen.getByText('Email').closest('div')
    
    // Check that cards have the enhanced styling
    expect(phoneCard).toHaveClass('group', 'relative', 'text-center', 'p-8')
    expect(phoneCard).toHaveClass('bg-gradient-to-br')
    expect(phoneCard).toHaveClass('rounded-2xl')
    expect(phoneCard).toHaveClass('hover:shadow-2xl')
    expect(phoneCard).toHaveClass('transition-all', 'duration-500')
    expect(phoneCard).toHaveClass('hover:-translate-y-2', 'hover:scale-105')
    
    expect(emailCard).toHaveClass('group', 'relative', 'text-center', 'p-8')
    expect(emailCard).toHaveClass('bg-gradient-to-br')
    expect(emailCard).toHaveClass('rounded-2xl')
  })

  it('has proper icon containers with enhanced styling', () => {
    render(<ContactPage />)
    
    // Find all icon containers (they should have the enhanced icon styling)
    const phoneTitle = screen.getByText('Phone')
    const phoneCard = phoneTitle.closest('div')
    
    // Check that the icon container exists with proper classes
    const iconContainer = phoneCard?.querySelector('.w-20.h-20')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('rounded-2xl', 'flex', 'items-center', 'justify-center', 'shadow-lg')
  })
})
