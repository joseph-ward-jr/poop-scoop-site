import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MetaPixelEvent, MetaPixelParameters } from '../types/meta-pixel';

interface MetaPixelProps {
  pixelId?: string;
}

const MetaPixel = ({ pixelId = '1387106492582276' }: MetaPixelProps) => {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Wait for fbq to be available
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
        console.log('Meta Pixel: PageView tracked for', location.pathname);
      } else {
        // If fbq is not ready, wait a bit and try again
        setTimeout(trackPageView, 100);
      }
    };

    // For SPA, we need to track ALL page views including the initial one
    // since the base code doesn't include PageView tracking
    if (isInitialLoad.current) {
      // Track initial page load
      trackPageView();
      isInitialLoad.current = false;
    } else {
      // Track subsequent route changes
      trackPageView();
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

// Utility function to track custom events
export const trackMetaPixelEvent = (
  event: MetaPixelEvent, 
  parameters?: MetaPixelParameters
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (parameters) {
      window.fbq('track', event, parameters);
    } else {
      window.fbq('track', event);
    }
    console.log('Meta Pixel: Event tracked -', event, parameters || '');
  } else {
    console.warn('Meta Pixel: fbq not available');
  }
};

// Specific tracking functions for common events
export const trackLead = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('Lead', parameters);
};

export const trackContact = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('Contact', parameters);
};

export const trackViewContent = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('ViewContent', parameters);
};

export const trackSearch = (searchString: string, parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('Search', {
    search_string: searchString,
    ...parameters
  });
};

export default MetaPixel;
