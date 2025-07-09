import { useState } from 'react'

interface GoogleMapsEmbedProps {
  className?: string
}

const GoogleMapsEmbed = ({ className = '' }: GoogleMapsEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sage-600 font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/images/icons/location.svg" alt="Location" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Map Unavailable</h3>
            <p className="text-gray-600 text-sm">
              Unable to load the map. Please visit us at our location or contact us directly.
            </p>
          </div>
        </div>
      )}

      {/* Google Maps iframe */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-sage-200 bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211210.48889832562!2d-84.65752837681731!3d34.19328876499098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa19e43832bac3fad%3A0xd14272dd4f7d30e2!2sField%20and%20Foyer!5e0!3m2!1sen!2sus!4v1752070601546!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Field and Foyer Location"
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
        />
      </div>

      {/* Map overlay with business info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-sage-200/50 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center">
            <img src="/images/icons/location.svg" alt="Location" className="w-5 h-5 filter brightness-0 invert" />
          </div>
          <div>
            <h4 className="font-semibold text-sage-800">Field and Foyer</h4>
            <p className="text-sm text-sage-600">Professional Pet Waste Removal Service</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleMapsEmbed
