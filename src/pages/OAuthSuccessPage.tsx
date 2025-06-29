import { useNavigate } from 'react-router-dom'

const OAuthSuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-green-900 mb-4">
            🎉 Jobber Integration Complete!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your Field & Foyer website is now successfully connected to your Jobber account with automatic token refresh.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-900 mb-4">✅ What's Working Now:</h2>
            <ul className="text-left space-y-2 text-green-800">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Contact form submissions automatically create clients in Jobber
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Automatic token refresh - no more 60-minute expiration issues
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 reliable operation without manual intervention
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Lead source tracking and contact preferences in client notes
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">🧪 Test Your Integration:</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Test Contact Form → Create Jobber Client
              </button>
              <button
                onClick={() => navigate('/test/jobber')}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Advanced Testing Interface
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Next Steps:</h2>
            <ol className="text-left space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                Test the contact form to ensure clients are created in Jobber
              </li>
              <li className="flex items-start">
                <span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                Check your Jobber account for new clients with proper information
              </li>
              <li className="flex items-start">
                <span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                Monitor the integration for a few days to ensure reliability
              </li>
              <li className="flex items-start">
                <span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                Enjoy automated lead management! 🎉
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Contact Form
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OAuthSuccessPage
