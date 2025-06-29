// API endpoint testing utility
export const testApiEndpoint = async (endpoint: string) => {
  try {
    console.log(`Testing API endpoint: ${endpoint}`)
    
    // First, try a simple GET request to see if the endpoint exists
    const getResponse = await fetch(endpoint, {
      method: 'GET',
    })
    
    console.log(`GET ${endpoint} response:`, {
      status: getResponse.status,
      statusText: getResponse.statusText,
      headers: Object.fromEntries(getResponse.headers.entries()),
      url: getResponse.url
    })
    
    // Then try a POST request
    const postResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'API Test',
        source: 'API Test'
      })
    })
    
    console.log(`POST ${endpoint} response:`, {
      status: postResponse.status,
      statusText: postResponse.statusText,
      headers: Object.fromEntries(postResponse.headers.entries()),
      url: postResponse.url
    })
    
    if (postResponse.ok) {
      const data = await postResponse.json()
      console.log(`POST ${endpoint} data:`, data)
      return { success: true, data }
    } else {
      const errorText = await postResponse.text()
      console.log(`POST ${endpoint} error text:`, errorText)
      return { success: false, error: errorText, status: postResponse.status }
    }
    
  } catch (error) {
    console.error(`API test failed for ${endpoint}:`, error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Test all newsletter-related endpoints
export const testNewsletterEndpoints = async () => {
  console.log('🧪 Testing newsletter API endpoints...')
  
  const endpoints = [
    '/api/jobber-newsletter',
    '/api/newsletter-supabase',
    '/api/newsletter-subscribe'
  ]
  
  for (const endpoint of endpoints) {
    await testApiEndpoint(endpoint)
    console.log('---')
  }
}
