import { useState, useEffect } from 'react'
import { jobberApi } from '../services/jobberApi'
import { useJobberSubmission } from '../hooks/useJobberSubmission'
import { ContactFormData } from '../types/jobber'

const JobberTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing')
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [testResults, setTestResults] = useState<string[]>([])
  const { isSubmitting, submitToJobber } = useJobberSubmission()

  // Test form data
  const [formData, setFormData] = useState<ContactFormData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Atlanta, GA 30309',
    contactPreference: 'Email',
    additionalInfo: 'This is a test submission from the OAuth2 test page'
  })

  // Test connection on page load
  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus('testing')
    addTestResult('🔍 Testing Jobber API connection...')
    
    try {
      const isConnected = await jobberApi.testConnection()
      
      if (isConnected) {
        setConnectionStatus('connected')
        addTestResult('✅ Connection successful!')
        
        // Try to get account info for verification
        try {
          const accountInfo = await jobberApi.getAccountInfo()
          if (accountInfo) {
            setAccountInfo(accountInfo)
            addTestResult(`📊 Connected to account: ${accountInfo.name}`)
          }
        } catch (error) {
          addTestResult('⚠️ Connected but could not fetch account details')
        }
      } else {
        setConnectionStatus('failed')
        addTestResult('❌ Connection failed')
      }
    } catch (error) {
      setConnectionStatus('failed')
      addTestResult(`❌ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTestSubmission = async () => {
    addTestResult('🚀 Starting test form submission...')
    
    try {
      const result = await submitToJobber(formData)
      
      if (result.success) {
        addTestResult('✅ Form submission successful!')
        if (result.client) {
          addTestResult(`👤 Created client: ${result.client.firstName} ${result.client.lastName || ''} (ID: ${result.client.id})`)
          addTestResult('🎉 Check your Jobber account to verify the client was created!')
        }
      } else {
        addTestResult('❌ Form submission failed')
        if (result.errors) {
          result.errors.forEach(error => addTestResult(`   Error: ${error}`))
        }
      }
    } catch (error) {
      addTestResult(`❌ Submission error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Jobber OAuth2 Integration Test
          </h1>

          {/* Connection Status */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <div className="flex items-center space-x-3">
              {connectionStatus === 'testing' && (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-600">Testing connection...</span>
                </>
              )}
              {connectionStatus === 'connected' && (
                <>
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-green-600 font-semibold">Connected to Jobber API</span>
                </>
              )}
              {connectionStatus === 'failed' && (
                <>
                  <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-600 font-semibold">Connection Failed</span>
                </>
              )}
            </div>
            
            {accountInfo && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Account Information:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li><strong>Name:</strong> {accountInfo.name}</li>
                  <li><strong>ID:</strong> {accountInfo.id}</li>
                  <li><strong>Industry:</strong> {accountInfo.industry || 'Not specified'}</li>
                  <li><strong>Created:</strong> {new Date(accountInfo.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
            )}

            <button
              onClick={testConnection}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>

          {/* Test Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Test Form Submission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Preference
                </label>
                <select
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select preference</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Text">Text</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleTestSubmission}
              disabled={isSubmitting || connectionStatus !== 'connected'}
              className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isSubmitting ? 'Submitting to Jobber...' : 'Test Form Submission'}
            </button>
          </div>

          {/* Test Results */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Test Results</h2>
              <button
                onClick={clearResults}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Clear Results
              </button>
            </div>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="text-gray-500">No test results yet...</div>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Testing Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Ensure your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file contains your Jobber access token</li>
              <li>Verify the connection status shows "Connected to Jobber API"</li>
              <li>Fill out the test form with your information (or use the pre-filled test data)</li>
              <li>Click "Test Form Submission" to create a client in your Jobber account</li>
              <li>Check your Jobber account to verify the client was created successfully</li>
              <li>Review the test results console for detailed feedback</li>
            </ol>
            
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500">
              <p className="text-yellow-800">
                <strong>Note:</strong> This test page creates real clients in your Jobber account. 
                You may want to delete test clients after verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobberTestPage
