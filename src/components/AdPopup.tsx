import { useState, useEffect } from 'react'

interface AdPopupProps {
  isOpen: boolean
  onClose: () => void
}

const AdPopup = ({ isOpen, onClose }: AdPopupProps) => {
  useEffect(() => {
    if (!isOpen) return

    // Handle keyboard events
    const handleKeyDown = (event: KeyboardEvent) => {
      onClose() // Close on any key press
    }

    // Handle escape key specifically (optional, since any key closes it)
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown)
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Handle click outside to close
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close advertisement"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Advertisement content */}
        <div className="relative">
          <img
            src="/images/ad/ad-popup.jpg"
            alt="Special Offer"
            className="w-full h-auto object-cover"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement
              target.src = "/images/ad/ad-popup.png"
              target.onerror = () => {
                // If PNG also doesn't exist, show placeholder
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="flex items-center justify-center h-96 bg-gradient-to-br from-sage-100 to-sage-200">
                      <div class="text-center p-8">
                        <div class="w-16 h-16 bg-sage-300 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg class="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-sage-800 mb-2">Advertisement Placeholder</h3>
                        <p class="text-sage-600">Add your advertisement image to:</p>
                        <code class="text-sm bg-sage-100 px-2 py-1 rounded mt-2 inline-block">public/images/ad/ad-popup.jpg</code>
                      </div>
                    </div>
                  `
                }
              }
            }}
          />
        </div>

        {/* Optional: Add a small instruction text */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-gray-500 bg-white bg-opacity-90 px-3 py-1 rounded-full">
            Press any key or click outside to close
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdPopup
