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
