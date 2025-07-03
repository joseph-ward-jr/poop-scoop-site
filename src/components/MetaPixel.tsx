import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MetaPixelEvent, MetaPixelParameters } from '../types/meta-pixel';

const MetaPixel = () => {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip tracking on initial load since base code already tracks it
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      console.log('Meta Pixel: Initial PageView handled by base code for', location.pathname);
      return;
    }

    // Track subsequent route changes only
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
        console.log('Meta Pixel: Route change PageView tracked for', location.pathname);
      } else {
        console.warn('Meta Pixel: fbq not available for route change tracking');
      }
    };

    trackPageView();
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
