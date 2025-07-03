import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MetaPixel, { trackMetaPixelEvent, trackLead, trackContact } from '../components/MetaPixel';

// Mock window.fbq
const mockFbq = vi.fn();

beforeEach(() => {
  // Reset mocks
  vi.clearAllMocks();
  
  // Mock window.fbq
  Object.defineProperty(window, 'fbq', {
    value: mockFbq,
    writable: true,
  });
});

describe('MetaPixel Component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <MetaPixel />
      </BrowserRouter>
    );
  });

  it('should track PageView on initial mount (SPA behavior)', () => {
    render(
      <BrowserRouter>
        <MetaPixel />
      </BrowserRouter>
    );

    // Should track PageView immediately for SPA
    expect(mockFbq).toHaveBeenCalledWith('track', 'PageView');
  });

  it('should handle fbq not being immediately available', () => {
    // Set fbq to undefined to simulate it not being loaded yet
    const originalFbq = window.fbq;
    (window as any).fbq = undefined;

    // Should not throw error when fbq is not available
    expect(() => {
      render(
        <BrowserRouter>
          <MetaPixel />
        </BrowserRouter>
      );
    }).not.toThrow();

    // Restore original fbq
    (window as any).fbq = originalFbq;
  });
});

describe('Meta Pixel Utility Functions', () => {
  it('should track custom events', () => {
    trackMetaPixelEvent('Lead', { value: 100, currency: 'USD' });
    
    expect(mockFbq).toHaveBeenCalledWith('track', 'Lead', {
      value: 100,
      currency: 'USD'
    });
  });

  it('should track Lead events', () => {
    trackLead({ content_name: 'Contact Form' });
    
    expect(mockFbq).toHaveBeenCalledWith('track', 'Lead', {
      content_name: 'Contact Form'
    });
  });

  it('should track Contact events', () => {
    trackContact({ content_category: 'Pet Waste Removal' });
    
    expect(mockFbq).toHaveBeenCalledWith('track', 'Contact', {
      content_category: 'Pet Waste Removal'
    });
  });

  it('should handle missing fbq gracefully', () => {
    // Set fbq to undefined
    (window as any).fbq = undefined;

    // Should not throw error
    expect(() => {
      trackMetaPixelEvent('PageView');
    }).not.toThrow();
  });
});
