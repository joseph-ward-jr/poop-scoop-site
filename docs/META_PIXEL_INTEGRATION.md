# Meta Pixel Integration

This document describes the Meta Pixel implementation for tracking user interactions and conversions on the Field & Foyer website.

## Overview

The Meta Pixel (Facebook Pixel) is integrated to track:
- Page views across all pages
- Contact form submissions
- Lead conversions
- Custom events for business insights

## Implementation Details

### 1. Base Pixel Code (Standard Implementation)

The Meta Pixel base code is added to `index.html` in the `<head>` section. This follows Facebook's standard implementation pattern for maximum compatibility:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1387106492582276');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1387106492582276&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

**Pixel ID**: `1387106492582276`

**Detection Compatibility**: This standard implementation ensures Facebook's detection tools (Pixel Helper, Events Manager) can properly identify the pixel on your website.

### 2. React Components

#### MetaPixel Component (`src/components/MetaPixel.tsx`)

A React component designed for Single Page Applications that:
- Tracks route changes (initial page load handled by base code)
- Automatically tracks page views when users navigate between pages
- Provides utility functions for custom event tracking
- Handles graceful fallbacks when pixel is not available

#### Key Features:
- **Route Change Tracking**: Handles page views for SPA navigation
- **No Double Tracking**: Skips initial page load (handled by base code)
- **Detection Compatible**: Works with Facebook's standard detection tools
- **TypeScript Support**: Full type definitions for events and parameters
- **Error Handling**: Graceful handling when fbq is not available
- **Console Logging**: Development-friendly logging for debugging

### 3. Event Tracking

#### Automatic Events:
- **PageView**: Tracked automatically on initial page load AND every route change (SPA-optimized)
- **ViewContent**: Automatically tracked for key pages (services, pricing, about)

#### Custom Events:
- **Contact**: Tracked when contact forms are submitted and phone links are clicked
- **Lead**: Tracked when successful lead conversions occur
- **InitiateCheckout**: Tracked when users click "Get In Touch" or "Get Free Quote" buttons

#### Contact Form Integration:
The `ContactForm` component automatically tracks:
1. **Contact Event**: When form is submitted (regardless of success)
2. **Lead Event**: When form submission is successful and creates a Jobber client

### 4. Available Utility Functions

```typescript
// Track custom events
trackMetaPixelEvent('Lead', { value: 100, currency: 'USD' })

// Specific tracking functions
trackLead({ content_name: 'Contact Form', value: 50, currency: 'USD' })
trackContact({ content_category: 'Pet Waste Removal' })
trackViewContent({ content_name: 'Services Page', content_type: 'service_overview' })
trackSearch('pet waste removal atlanta')
trackInitiateCheckout({ content_name: 'Get In Touch Button' })
trackPhoneCall({ content_name: 'Footer Phone Link' })
trackSchedule({ content_name: 'Service Booking', value: 100 })
```

## File Structure

```
src/
├── components/
│   └── MetaPixel.tsx          # Main Meta Pixel component
├── types/
│   └── meta-pixel.ts          # TypeScript type definitions
├── test/
│   └── MetaPixel.test.tsx     # Component tests
└── App.tsx                    # MetaPixel component integration
```

## Usage Examples

### Basic Setup (Already Implemented)

The MetaPixel component is already integrated in `App.tsx`:

```tsx
import MetaPixel from './components/MetaPixel'

function App() {
  return (
    <Router>
      <MetaPixel />
      {/* Rest of app */}
    </Router>
  )
}
```

### Custom Event Tracking

```tsx
import { trackLead, trackContact, trackViewContent } from '../components/MetaPixel'

// Track when user views pricing
trackViewContent({
  content_name: 'Pricing Page',
  content_category: 'Pet Waste Removal'
})

// Track newsletter signup
trackLead({
  content_name: 'Newsletter Signup',
  value: 1
})

// Track phone call button click
trackContact({
  content_name: 'Phone Call Button',
  content_category: 'Contact'
})
```

## Testing

### Running Tests

```bash
npm test -- MetaPixel.test.tsx
```

### Test Coverage

The test suite covers:
- Component rendering without errors
- Automatic page view tracking
- Custom event tracking functions
- Error handling for missing fbq

### Manual Testing

1. **Development Environment**:
   - Open browser developer tools
   - Navigate to Console tab
   - Look for "Meta Pixel: PageView tracked for [route]" messages
   - Submit contact forms and verify tracking events

2. **Facebook Events Manager**:
   - Visit [Facebook Events Manager](https://www.facebook.com/events_manager)
   - Select your pixel (ID: 1387106492582276)
   - Use "Test Events" to verify real-time tracking

## Single Page Application (SPA) Implementation

This implementation balances Facebook's detection requirements with SPA functionality:

### Detection vs SPA Optimization

**Facebook's Detection Tools**: Expect to see the standard implementation pattern with `fbq('track', 'PageView')` in the base code for proper pixel detection.

**SPA Requirements**: Need to track route changes without double-tracking the initial page load.

### Our Hybrid Solution

1. **Base Code**: Standard implementation with `fbq('init', 'PIXEL_ID')` AND `fbq('track', 'PageView')`
2. **React Component**: Handles route changes only, skipping initial page load

### SPA Tracking Flow

```
1. User visits site → Base code initializes pixel AND tracks initial PageView
2. React loads → MetaPixel component skips initial tracking (already handled)
3. User navigates → MetaPixel component tracks route change PageView
4. Repeat step 3 for all navigation
```

This ensures:
- ✅ Facebook detection tools can identify the pixel
- ✅ Initial page load is tracked once
- ✅ Route changes are tracked properly
- ✅ No double-tracking occurs

## Configuration

### Pixel ID

The pixel ID is currently hardcoded as `1387106492582276`. To change it:

1. Update `index.html` (line with `fbq('init', 'NEW_PIXEL_ID')`)
2. Update `MetaPixel.tsx` default pixelId prop if needed

### Environment-Specific Configuration

For different environments, you can:

1. Use environment variables in a build process
2. Create different builds for staging/production
3. Use conditional pixel IDs based on hostname

## Privacy and Compliance

### GDPR/CCPA Considerations

- The pixel tracks user behavior automatically
- Consider implementing consent management
- Provide clear privacy policy information
- Allow users to opt-out if required by law

### Data Collected

The pixel collects:
- Page views and navigation patterns
- Form submission events (without personal data)
- Custom conversion events
- Standard web analytics data

## Troubleshooting

### Common Issues

1. **Pixel Not Loading**:
   - Check browser console for JavaScript errors
   - Verify pixel ID is correct
   - Ensure no ad blockers are interfering

2. **Events Not Tracking**:
   - Check console for "Meta Pixel: Event tracked" messages
   - Verify fbq function is available
   - Use Facebook Pixel Helper browser extension

3. **Development vs Production**:
   - Events tracked in development will appear in Facebook Events Manager
   - Use test events feature for development testing
   - Consider using different pixels for different environments

### Debug Mode

Enable debug logging by checking browser console for Meta Pixel messages. All tracking events are logged with details.

## Future Enhancements

### Potential Additions

1. **Enhanced E-commerce Tracking**: Track service selections and pricing views
2. **Custom Audiences**: Create audiences based on page visits and interactions
3. **Conversion Optimization**: Set up conversion campaigns based on tracked events
4. **A/B Testing**: Use pixel data for testing different page variants

### Advanced Events

Consider implementing:
- `InitiateCheckout`: When users start service booking process
- `Purchase`: When services are actually purchased
- `ViewContent`: For specific service page views
- `Search`: When users use site search functionality

## Support

For issues with Meta Pixel integration:
1. Check this documentation
2. Review test files for usage examples
3. Consult Facebook Pixel documentation
4. Use Facebook Pixel Helper browser extension for debugging
