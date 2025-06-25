import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // Check if we're navigating to contact page with form intent
    const isContactFormNavigation = pathname === '/contact' && (
      search.includes('form=true') || 
      search.includes('quote=true') ||
      search.includes('estimate=true')
    )

    if (isContactFormNavigation) {
      // Scroll to the form section on contact page
      setTimeout(() => {
        const formSection = document.querySelector('form') || 
                           document.querySelector('[data-form-section]') ||
                           document.querySelector('h2')
        if (formSection) {
          formSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 100) // Small delay to ensure page is rendered
    } else {
      // Default behavior: scroll to top
      window.scrollTo(0, 0)
    }
  }, [pathname, search])

  return null
}

export default ScrollToTop
