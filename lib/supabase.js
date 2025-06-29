// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Newsletter subscriber functions
export const newsletterService = {
  // Add a new subscriber
  async addSubscriber(data) {
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        name: data.name || 'Newsletter Subscriber',
        email: data.email.toLowerCase().trim(),
        interests: data.interests || ['home-cleaning', 'lawn-maintenance'],
        source: data.source || 'Website',
        status: 'active'
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('This email is already subscribed to our newsletter')
      }
      throw error
    }

    return subscriber
  },

  // Get all active subscribers
  async getActiveSubscribers(filters = {}) {
    let query = supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.interests) {
      query = query.contains('interests', [filters.interests])
    }
    
    if (filters.source) {
      query = query.eq('source', filters.source)
    }

    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  // Get subscriber count
  async getSubscriberCount() {
    const { count, error } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    if (error) throw error
    return count
  },

  // Update subscriber status (for unsubscribes)
  async updateSubscriberStatus(email, status) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ status })
      .eq('email', email)
      .select()

    if (error) throw error
    return data
  }
}
