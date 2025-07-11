import { Link } from 'react-router-dom'
import { BlogPost } from '../types/blog'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
}

const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isVideo = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')
  }

  const renderMedia = (url: string, alt: string, className: string) => {
    if (isVideo(url)) {
      return (
        <video
          src={url}
          className={className}
          autoPlay
          loop
          muted
          playsInline
        />
      )
    }
    return (
      <img
        src={url}
        alt={alt}
        className={className}
      />
    )
  }

  if (variant === 'featured') {
    return (
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
        {post.featuredImage && (
          <div className="aspect-video overflow-hidden">
            {renderMedia(
              post.featuredImage,
              post.title,
              "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            )}
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-sage-600">{formatDate(post.publishedAt)}</span>
            <span className="text-sm text-sage-500">•</span>
            <span className="text-sm text-sage-600">{post.readTime} min read</span>
          </div>
          
          <h2 className="text-2xl font-bold text-sage-800 mb-4 group-hover:text-sage-600 transition-colors">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          
          <p className="text-sage-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Link
              to={`/blog/${post.slug}`}
              className="text-sage-600 hover:text-sage-800 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>Read More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          {renderMedia(
            post.featuredImage,
            post.title,
            "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-xs text-sage-600">{formatDate(post.publishedAt)}</span>
          <span className="text-xs text-sage-500">•</span>
          <span className="text-xs text-sage-600">{post.readTime} min read</span>
        </div>
        
        <h3 className="text-lg font-semibold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-sage-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-sage-50 text-sage-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Link
            to={`/blog/${post.slug}`}
            className="text-sage-600 hover:text-sage-800 text-sm font-medium flex items-center space-x-1 transition-colors"
          >
            <span>Read</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
