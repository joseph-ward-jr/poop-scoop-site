import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getBlogPostBySlug } from '../data/blogPosts'
import NewsletterModal from '../components/NewsletterModal'
import { BlogPost } from '../types/blog'

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [hasShownModal, setHasShownModal] = useState(false)

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug)
      setPost(foundPost || null)
    }
  }, [slug])

  // Show newsletter modal after user has read for a bit (if enabled for this post)
  useEffect(() => {
    if (post?.showNewsletterPrompt && !hasShownModal) {
      const timer = setTimeout(() => {
        setShowNewsletterModal(true)
        setHasShownModal(true)
      }, 30000) // Show after 30 seconds

      return () => clearTimeout(timer)
    }
  }, [post, hasShownModal])

  if (!slug) {
    return <Navigate to="/blog" replace />
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-offwhite-50 to-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sage-800 mb-4">Article Not Found</h1>
          <p className="text-sage-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Convert markdown-style content to HTML (basic conversion)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return `<h1 key="${index}" class="text-4xl font-bold text-sage-800 mb-6 mt-8">${line.substring(2)}</h1>`
        }
        if (line.startsWith('## ')) {
          return `<h2 key="${index}" class="text-3xl font-bold text-sage-800 mb-4 mt-8">${line.substring(3)}</h2>`
        }
        if (line.startsWith('### ')) {
          return `<h3 key="${index}" class="text-2xl font-semibold text-sage-800 mb-3 mt-6">${line.substring(4)}</h3>`
        }
        
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-sage-800">$1</strong>')
        
        // Italic text
        line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        
        // Lists
        if (line.startsWith('- ')) {
          return `<li key="${index}" class="mb-2 text-sage-700">${line.substring(2)}</li>`
        }
        
        // Empty lines
        if (line.trim() === '') {
          return `<br key="${index}" />`
        }
        
        // Regular paragraphs
        return `<p key="${index}" class="mb-4 text-sage-700 leading-relaxed">${line}</p>`
      })
      .join('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite-50 to-cream-50">
      {/* Article Header */}
      <header className="bg-white border-b border-sage-200">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <nav className="mb-6">
            <Link 
              to="/blog" 
              className="text-sage-600 hover:text-sage-800 flex items-center space-x-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Blog</span>
            </Link>
          </nav>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center space-x-4 mb-6 text-sm text-sage-600">
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-sage-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="container-max px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
          
          {/* Newsletter CTA */}
          {post.showNewsletterPrompt && (
            <div className="mt-16 p-8 bg-gradient-to-r from-sage-50 to-cream-50 rounded-2xl border border-sage-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-sage-800 mb-4">
                  Want More Tips Like This?
                </h3>
                <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter for weekly insights on home cleaning, 
                  lawn maintenance, and eco-friendly solutions.
                </p>
                <button
                  onClick={() => setShowNewsletterModal(true)}
                  className="bg-sage-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sage-700 transition-colors"
                >
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        source={`Blog Post: ${post.title}`}
        title="Get Weekly Home & Yard Tips!"
      />
    </div>
  )
}

export default BlogPostPage
