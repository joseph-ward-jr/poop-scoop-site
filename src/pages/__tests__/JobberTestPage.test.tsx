import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import JobberTestPage from '../JobberTestPage'

// Mock the Jobber API service
vi.mock('../../services/jobberApi', () => ({
  jobberApi: {
    testConnection: vi.fn(),
    getAccountInfo: vi.fn()
  }
}))

// Mock the hook
vi.mock('../../hooks/useJobberSubmission', () => ({
  useJobberSubmission: () => ({
    isSubmitting: false,
    submitToJobber: vi.fn(),
    lastResult: null
  })
}))

import { jobberApi } from '../../services/jobberApi'
import { useJobberSubmission } from '../../hooks/useJobberSubmission'

describe('JobberTestPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset mocks to default implementations
    vi.mocked(jobberApi.testConnection).mockResolvedValue(true)
    vi.mocked(jobberApi.getAccountInfo).mockResolvedValue(null)
  })

  it('renders the test page with all sections', () => {
    render(<JobberTestPage />)
    
    expect(screen.getByText('Jobber OAuth2 Integration Test')).toBeInTheDocument()
    expect(screen.getByText('Connection Status')).toBeInTheDocument()
    expect(screen.getByText('Test Form Submission')).toBeInTheDocument()
    expect(screen.getByText('Test Results')).toBeInTheDocument()
    expect(screen.getByText('Testing Instructions')).toBeInTheDocument()
  })

  it('shows testing connection status initially', () => {
    render(<JobberTestPage />)
    
    expect(screen.getByText('Testing connection...')).toBeInTheDocument()
  })

  it('displays connection success when API connection works', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(true)
    vi.mocked(jobberApi.getAccountInfo).mockResolvedValueOnce({
      id: '123',
      name: 'Test Account',
      industry: 'Landscaping',
      createdAt: '2023-01-01T00:00:00Z'
    })

    render(<JobberTestPage />)

    await waitFor(() => {
      expect(screen.getByText('Connected to Jobber API')).toBeInTheDocument()
    })

    expect(screen.getByText('Account Information:')).toBeInTheDocument()
    expect(screen.getByText('Test Account')).toBeInTheDocument()
  })

  it('displays connection failure when API connection fails', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(false)

    render(<JobberTestPage />)

    await waitFor(() => {
      expect(screen.getByText('Connection Failed')).toBeInTheDocument()
    })
  })

  it('allows form input changes', () => {
    render(<JobberTestPage />)
    
    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } })
    
    expect(nameInput).toHaveValue('Jane Smith')
  })

  it('handles test form submission successfully', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(true)

    // Create a mock for the hook's submitToJobber function
    const mockSubmitToJobber = vi.fn().mockResolvedValueOnce({
      success: true,
      client: {
        id: '456',
        firstName: 'John',
        lastName: 'Doe',
        emails: [],
        phones: []
      }
    })

    // Mock the hook to return our mock function
    vi.mocked(useJobberSubmission).mockReturnValue({
      isSubmitting: false,
      submitToJobber: mockSubmitToJobber,
      lastResult: null
    })

    render(<JobberTestPage />)

    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected to Jobber API')).toBeInTheDocument()
    })

    const submitButton = screen.getByText('Test Form Submission')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitToJobber).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, Atlanta, GA 30309',
        contactPreference: 'Email',
        additionalInfo: 'This is a test submission from the OAuth2 test page'
      })
    })
  })

  it('handles test form submission failure', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(true)

    const mockSubmitToJobber = vi.fn().mockResolvedValueOnce({
      success: false,
      errors: ['Invalid email format']
    })

    vi.mocked(useJobberSubmission).mockReturnValue({
      isSubmitting: false,
      submitToJobber: mockSubmitToJobber,
      lastResult: null
    })

    render(<JobberTestPage />)

    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected to Jobber API')).toBeInTheDocument()
    })

    const submitButton = screen.getByText('Test Form Submission')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitToJobber).toHaveBeenCalled()
    })
  })

  it('disables submit button when not connected', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(false)

    render(<JobberTestPage />)

    await waitFor(() => {
      expect(screen.getByText('Connection Failed')).toBeInTheDocument()
    })

    const submitButton = screen.getByText('Test Form Submission')
    expect(submitButton).toBeDisabled()
  })

  it('allows retrying connection', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(false)

    render(<JobberTestPage />)

    await waitFor(() => {
      expect(screen.getByText('Connection Failed')).toBeInTheDocument()
    })

    const retryButton = screen.getByText('Retry Connection')
    fireEvent.click(retryButton)

    expect(jobberApi.testConnection).toHaveBeenCalledTimes(2)
  })

  it('clears test results when clear button is clicked', async () => {
    vi.mocked(jobberApi.testConnection).mockResolvedValueOnce(true)

    render(<JobberTestPage />)

    await waitFor(() => {
      expect(screen.getByText('Connected to Jobber API')).toBeInTheDocument()
    })

    const clearButton = screen.getByText('Clear Results')
    fireEvent.click(clearButton)

    expect(screen.getByText('No test results yet...')).toBeInTheDocument()
  })

  it('shows pre-filled test data in form fields', () => {
    render(<JobberTestPage />)
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('(555) 123-4567')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123 Main St, Atlanta, GA 30309')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Email')).toBeInTheDocument()
    expect(screen.getByDisplayValue('This is a test submission from the OAuth2 test page')).toBeInTheDocument()
  })

  it('displays testing instructions', () => {
    render(<JobberTestPage />)
    
    expect(screen.getByText('Testing Instructions')).toBeInTheDocument()
    expect(screen.getByText(/Ensure your.*\.env\.local.*file contains/)).toBeInTheDocument()
    expect(screen.getByText(/Check your Jobber account to verify/)).toBeInTheDocument()
  })
})
