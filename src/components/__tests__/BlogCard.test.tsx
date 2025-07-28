import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogCard from '../BlogCard'
import { BlogPost } from '../../types/blog'
import { blogPosts } from '../../data/blogPosts'

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

describe('Dog Food Blog Post Integration', () => {
  it('should include the new dog food blog post in the blog posts array', () => {
    const dogFoodPost = blogPosts.find(post => post.id === '5')

    expect(dogFoodPost).toBeDefined()
    expect(dogFoodPost?.title).toBe('The Ultimate Guide to High-Quality Dog Food: Why Premium Ingredients Matter for Your Pet\'s Health')
    expect(dogFoodPost?.author).toBe('Joey Ward')
    expect(dogFoodPost?.publishedAt).toBe('2025-07-28')
    expect(dogFoodPost?.readTime).toBe(6)
    expect(dogFoodPost?.slug).toBe('high-quality-dog-food-premium-ingredients-guide')
  })

  it('should render the dog food blog post correctly', () => {
    const dogFoodPost = blogPosts.find(post => post.id === '5')

    if (dogFoodPost) {
      renderWithRouter(<BlogCard post={dogFoodPost} />)

      expect(screen.getByText(/Ultimate Guide to High-Quality Dog Food/)).toBeInTheDocument()
      expect(screen.getByText('6 min read')).toBeInTheDocument()
      expect(screen.getByText(/premium dog food with high-quality ingredients/)).toBeInTheDocument()
      expect(screen.getByText('Pet Health')).toBeInTheDocument()
      expect(screen.getByText('Dog Nutrition')).toBeInTheDocument()
    }
  })
})
