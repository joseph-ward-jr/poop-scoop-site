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

      // Track ViewContent for initial page load if it's a key page
      trackViewContentForPage(location.pathname);
      return;
    }

    // Track subsequent route changes only
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
        console.log('Meta Pixel: Route change PageView tracked for', location.pathname);

        // Track ViewContent for key pages
        trackViewContentForPage(location.pathname);
      } else {
        console.warn('Meta Pixel: fbq not available for route change tracking');
      }
    };

    trackPageView();
  }, [location.pathname]);

  // Helper function to track ViewContent for specific pages
  const trackViewContentForPage = (pathname: string) => {
    const pageMapping: Record<string, { content_type: string; content_id: string; content_name: string; content_category: string; value?: number }> = {
      '/services': {
        content_type: 'service_overview',
        content_id: 'services-page',
        content_name: 'Services Overview',
        content_category: 'Pet Waste Removal',
        value: 10
      },
      '/services/pet-waste-removal': {
        content_type: 'service_detail',
        content_id: 'pet-waste-removal-service',
        content_name: 'Pet Waste Removal Service',
        content_category: 'Pet Waste Removal',
        value: 25
      },
      '/pricing': {
        content_type: 'pricing',
        content_id: 'pricing-page',
        content_name: 'Pricing Information',
        content_category: 'Pet Waste Removal',
        value: 30
      },
      '/about': {
        content_type: 'company_info',
        content_id: 'about-page',
        content_name: 'About Field & Foyer',
        content_category: 'Company Information',
        value: 5
      }
    };

    const pageData = pageMapping[pathname];
    if (pageData) {
      trackViewContent({
        ...pageData,
        currency: 'USD'
      });
    }
  };

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
    content_type: 'search',
    content_category: 'Pet Waste Removal',
    ...parameters
  });
};

// Track when someone starts the booking/inquiry process
export const trackInitiateCheckout = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('InitiateCheckout', {
    content_type: 'service_booking',
    content_id: 'pet-waste-removal-booking',
    content_name: 'Pet Waste Removal Booking',
    content_category: 'Pet Waste Removal',
    currency: 'USD',
    ...parameters
  });
};

// Track when someone completes registration/signup
export const trackCompleteRegistration = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('CompleteRegistration', {
    content_type: 'registration',
    content_category: 'Pet Waste Removal',
    currency: 'USD',
    ...parameters
  });
};

// Track when someone schedules a service
export const trackSchedule = (parameters?: MetaPixelParameters) => {
  trackMetaPixelEvent('Schedule', {
    content_type: 'service_schedule',
    content_id: 'pet-waste-removal-schedule',
    content_name: 'Pet Waste Removal Schedule',
    content_category: 'Pet Waste Removal',
    currency: 'USD',
    ...parameters
  });
};

// Track phone call button clicks
export const trackPhoneCall = (parameters?: MetaPixelParameters) => {
  trackContact({
    content_type: 'phone_call',
    content_id: 'phone-call-button',
    content_name: 'Phone Call Button Click',
    content_category: 'Contact',
    value: 15,
    currency: 'USD',
    ...parameters
  });
};

export default MetaPixel;
