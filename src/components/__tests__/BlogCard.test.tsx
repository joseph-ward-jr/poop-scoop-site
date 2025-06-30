import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogCard from '../BlogCard'
import { BlogPost } from '../../types/blog'

const mockPost: BlogPost = {
  id: '1',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test blog post excerpt.',
  content: 'This is the full content of the test blog post.',
  author: 'Test Author',
  publishedAt: '2024-01-15',
  readTime: 5,
  tags: ['Test', 'Blog'],
  seo: {
    metaTitle: 'Test Blog Post',
    metaDescription: 'This is a test blog post.',
    keywords: ['test', 'blog']
  }
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('BlogCard', () => {
  it('renders blog post information correctly', () => {
    renderWithRouter(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post excerpt.')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders featured variant correctly', () => {
    renderWithRouter(<BlogCard post={mockPost} variant="featured" />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('Read More')).toBeInTheDocument()
  })

  it('formats date correctly', () => {
    renderWithRouter(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })

  it('creates correct link to blog post', () => {
    renderWithRouter(<BlogCard post={mockPost} />)
    
    const link = screen.getByRole('link', { name: /test blog post/i })
    expect(link).toHaveAttribute('href', '/blog/test-blog-post')
  })
})
