import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MetaPixelEvent, MetaPixelParameters } from '../types/meta-pixel';

interface MetaPixelProps {
  pixelId?: string;
}

const MetaPixel = ({ pixelId = '1387106492582276' }: MetaPixelProps) => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Meta Pixel: PageView tracked for', location.pathname);
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
