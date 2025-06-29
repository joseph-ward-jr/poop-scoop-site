import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import BlogPage from '../BlogPage'
import { GlobalNewsletterProvider } from '../../components/GlobalNewsletterProvider'

// Mock the newsletter subscription hook
vi.mock('../../hooks/useNewsletterSubscription', () => ({
  useNewsletterSubscription: () => ({
    isSubmitting: false,
    submitNewsletter: vi.fn().mockResolvedValue({ success: true }),
    lastResult: null
  })
}))

// Mock blog posts data
vi.mock('../../data/blogPosts', () => ({
  blogPosts: [
    {
      id: '1',
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      excerpt: 'This is a test blog post excerpt.',
      content: 'This is the full content.',
      author: 'Test Author',
      publishedAt: '2024-01-15',
      readTime: 5,
      tags: ['Test', 'Blog'],
      seo: {
        metaTitle: 'Test Blog Post',
        metaDescription: 'This is a test blog post.',
        keywords: ['test', 'blog']
      },
      showNewsletterPrompt: true
    }
  ]
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <GlobalNewsletterProvider>
        {component}
      </GlobalNewsletterProvider>
    </BrowserRouter>
  )
}

describe('BlogPage Newsletter Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders blog page with newsletter CTA', () => {
    renderWithProviders(<BlogPage />)
    
    expect(screen.getByText('📧 Subscribe to Our Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    expect(screen.getByText('Join 500+ homeowners getting weekly tips')).toBeInTheDocument()
  })

  it('opens newsletter popup when CTA button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProviders(<BlogPage />)
    
    const subscribeButton = screen.getByText('Subscribe Now')
    await user.click(subscribeButton)
    
    expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Get weekly tips for home cleaning and lawn maintenance delivered to your inbox!')).toBeInTheDocument()
  })

  it('automatically shows newsletter popup after 15 seconds', async () => {
    renderWithProviders(<BlogPage />)
    
    // Initially, the newsletter popup should not be visible
    expect(screen.queryByText('Get weekly tips for home cleaning and lawn maintenance delivered to your inbox!')).not.toBeInTheDocument()
    
    // Fast-forward time by 15 seconds
    vi.advanceTimersByTime(15000)
    
    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument()
    })
  })

  it('does not show automatic popup twice', async () => {
    renderWithProviders(<BlogPage />)
    
    // Fast-forward time by 15 seconds to trigger first popup
    vi.advanceTimersByTime(15000)
    
    await waitFor(() => {
      expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument()
    })
    
    // Close the popup
    const closeButton = screen.getByLabelText(/close newsletter popup/i)
    await userEvent.click(closeButton)
    
    // Fast-forward time again
    vi.advanceTimersByTime(15000)
    
    // Popup should not appear again automatically
    await waitFor(() => {
      expect(screen.queryByText('Get weekly tips for home cleaning and lawn maintenance delivered to your inbox!')).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('displays featured blog post', () => {
    renderWithProviders(<BlogPage />)
    
    expect(screen.getByText('Featured Article')).toBeInTheDocument()
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post excerpt.')).toBeInTheDocument()
  })

  it('displays tag filtering functionality', () => {
    renderWithProviders(<BlogPage />)
    
    expect(screen.getByText('Filter by Topic:')).toBeInTheDocument()
    expect(screen.getByText('All Articles')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('filters posts by tag when tag is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<BlogPage />)
    
    const testTagButton = screen.getByRole('button', { name: 'Test' })
    await user.click(testTagButton)
    
    expect(screen.getByText('Articles about Test')).toBeInTheDocument()
  })
})
