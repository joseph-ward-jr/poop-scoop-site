import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [tokenInfo, setTokenInfo] = useState<any>(null)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get authorization code from URL parameters
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
          setStatus('error')
          setMessage(`Authorization failed: ${error}`)
          return
        }

        if (!code) {
          setStatus('error')
          setMessage('No authorization code received from Jobber')
          return
        }

        console.log('Received authorization code:', code)
        console.log('State parameter:', state)

        // Exchange authorization code for tokens
        setMessage('Exchanging authorization code for tokens...')
        
        const response = await fetch('/api/oauth-exchange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            state
          })
        })

        const result = await response.json()

        if (result.success) {
          setStatus('success')
          setMessage('Successfully obtained access token and refresh token!')
          setTokenInfo(result.tokens)

          // Store refresh token in localStorage for the success page
          if (result.tokens.refresh_token) {
            localStorage.setItem('jobber_refresh_token', result.tokens.refresh_token)
          }

          // Redirect to success page after 3 seconds
          setTimeout(() => {
            navigate('/oauth/success')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(`Token exchange failed: ${result.errors?.join(', ') || 'Unknown error'}`)
        }

      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        setMessage(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    handleOAuthCallback()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Processing Authorization...</h1>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-900 mb-4">Authorization Successful!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              
              {tokenInfo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-900 mb-2">Token Information:</h3>
                  <div className="text-left text-sm space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Refresh Token (COPY THIS):</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(tokenInfo.refresh_token)
                            alert('Refresh token copied to clipboard!')
                          }}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="font-mono text-xs bg-white border border-green-300 px-2 py-2 rounded break-all">
                        {tokenInfo.refresh_token}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Access Token:</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(tokenInfo.access_token)
                            alert('Access token copied to clipboard!')
                          }}
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="font-mono text-xs bg-white border border-green-300 px-2 py-2 rounded break-all">
                        {tokenInfo.access_token}
                      </div>
                    </div>
                    {tokenInfo.expires_at && (
                      <div>
                        <span className="font-medium">Expires:</span>
                        <span className="ml-2">{new Date(tokenInfo.expires_at).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500">Redirecting to success page in 3 seconds...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-red-900 mb-4">Authorization Failed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-900 mb-2">What to do next:</h3>
                <ul className="text-left text-sm space-y-1">
                  <li>• Check that your Jobber app is configured correctly</li>
                  <li>• Verify the redirect URI matches exactly</li>
                  <li>• Try the authorization process again</li>
                  <li>• Contact support if the problem persists</li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Return to Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OAuthCallbackPage
