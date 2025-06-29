export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  tags: string[]
  featuredImage?: string
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  showNewsletterPrompt: boolean
}

export interface NewsletterSubscription {
  email: string
  name?: string
  interests: string[]
  source: string // Which blog post or page triggered the subscription
}

export interface NewsletterFormData {
  email: string
  name?: string
  interests: string[]
}

// Extended Jobber types for newsletter subscribers
export interface NewsletterJobberData {
  name: string
  email: string
  interests: string[]
  source: string
  subscriptionDate: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
}
