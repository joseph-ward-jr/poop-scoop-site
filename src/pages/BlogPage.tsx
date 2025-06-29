import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blogPosts'
import { useGlobalNewsletterContext } from '../components/GlobalNewsletterProvider'
import { testNewsletterEndpoints } from '../utils/apiTest'

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [hasShownNewsletter, setHasShownNewsletter] = useState(false)
  const { openNewsletter } = useGlobalNewsletterContext()

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts

  const featuredPost = blogPosts[0] // First post is featured

  // Show newsletter popup after user has been on blog page for a bit
  useEffect(() => {
    if (!hasShownNewsletter) {
      const timer = setTimeout(() => {
        openNewsletter('Blog Page Visit')
        setHasShownNewsletter(true)
      }, 15000) // Show after 15 seconds

      return () => clearTimeout(timer)
    }
  }, [hasShownNewsletter, openNewsletter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite-50 to-cream-50">
      {/* Hero Section */}
      <section className="bg-sage-800 text-white py-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home & Yard Insights
            </h1>
            {/* Temporary API test button */}
            <button
              onClick={() => {
                console.log('🧪 Testing API endpoints...')
                testNewsletterEndpoints()
              }}
              className="bg-red-600 text-white px-4 py-2 rounded mb-4 text-sm"
            >
              🧪 Test API Endpoints (Check Console)
            </button>
            <p className="text-xl text-sage-200 mb-8 leading-relaxed">
              Expert tips, eco-friendly solutions, and professional insights for maintaining 
              a beautiful, safe, and healthy home environment.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-sage-700 rounded-full text-sm">Weekly Tips</span>
              <span className="px-4 py-2 bg-sage-700 rounded-full text-sm">Eco-Friendly</span>
              <span className="px-4 py-2 bg-sage-700 rounded-full text-sm">Professional Advice</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-sage-800">Featured Article</h2>
              <div className="ml-4 h-px bg-sage-200 flex-1"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <BlogCard post={featuredPost} variant="featured" />
            </div>
          </section>
        )}

        {/* Tag Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h3 className="text-lg font-semibold text-sage-800">Filter by Topic:</h3>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-sage-600 text-white'
                  : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
              }`}
            >
              All Articles
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-sage-600 text-white'
                    : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-2">No Articles Found</h3>
              <p className="text-sage-600 mb-6">
                No articles match the selected filter. Try selecting a different topic.
              </p>
              <button
                onClick={() => setSelectedTag(null)}
                className="btn-primary"
              >
                View All Articles
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-sage-800">
                  {selectedTag ? `Articles about ${selectedTag}` : 'Latest Articles'}
                </h2>
                <span className="text-sage-600">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-sage-600 to-sage-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">📧 Subscribe to Our Newsletter</h2>
            <p className="text-sage-100 mb-8 max-w-2xl mx-auto">
              Get weekly tips and insights delivered straight to your inbox.
              Learn about eco-friendly cleaning, lawn maintenance, and creating a healthier home environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => openNewsletter('Blog Page CTA')}
                className="bg-white text-sage-700 px-8 py-4 rounded-xl font-semibold hover:bg-sage-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Subscribe Now
              </button>
              <span className="text-sage-200 text-sm">
                Join 50+ homeowners getting weekly tips
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogPage
