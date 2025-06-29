# Jobber API Integration

This document outlines the integration of Jobber API into the Field & Foyer website for automated client creation from contact form submissions.

## Overview

The integration automatically creates clients in Jobber when users submit contact forms on the website. This streamlines the lead management process by eliminating manual data entry.

## Architecture

### Components

1. **JobberApiService** (`src/services/jobberApi.ts`)
   - Handles all API communication with Jobber
   - Manages authentication and error handling
   - Transforms form data into Jobber client format

2. **useJobberSubmission Hook** (`src/hooks/useJobberSubmission.ts`)
   - React hook for form submission logic
   - Manages loading states and error handling
   - Provides clean interface for components

3. **ContactForm Component** (`src/components/ContactForm.tsx`)
   - Updated to integrate with Jobber API
   - Includes loading states and error handling
   - Maintains backward compatibility

4. **Type Definitions** (`src/types/jobber.ts`)
   - TypeScript interfaces for Jobber API
   - Form data mapping types
   - Response and error types

5. **JobberTestPage Component** (`src/pages/JobberTestPage.tsx`)
   - Dedicated OAuth2 testing interface
   - Real-time connection status monitoring
   - Interactive form testing with immediate feedback
   - Account verification and client creation testing

## Setup Instructions

### 1. Jobber Developer Account Setup

1. **Create Developer Center Account**
   - Visit [Jobber Developer Center](https://developer.getjobber.com/)
   - Sign up for a developer account

2. **Create Test Jobber Account**
   - Use the [developer testing signup link](https://getjobber.com/developer-sign-up/)
   - This provides a 90-day trial account for testing

3. **Create Your App**
   - In Developer Center, create a new app
   - Required fields:
     - App name: "Field & Foyer Website Integration"
     - Developer name: Your company name
     - App description: "Automated client creation from website contact forms"
     - Scopes: Select `clients:write` and `clients:read`

### 2. OAuth Setup

1. **Configure OAuth Settings**
   - Set OAuth Callback URL (for production): `https://your-domain.com/auth/callback`
   - For development/testing, you can use the GraphiQL tool

2. **Get Access Token**
   - Use the "Test in GraphiQL" feature in Developer Center
   - This provides a temporary access token for testing
   - For production, implement full OAuth 2.0 flow

### 3. Environment Configuration

1. **Copy Environment Template**
   ```bash
   cp .env.example .env.local
   ```

2. **Add Your Access Token**
   ```env
   VITE_JOBBER_ACCESS_TOKEN=your_access_token_here
   ```

### 4. Testing the Integration

1. **Run Unit Tests**
   ```bash
   npm test
   ```

2. **Test API Connection Script**
   ```bash
   npm run test:jobber
   ```

3. **Interactive Testing Page**
   ```bash
   npm run dev
   ```
   - Navigate to `http://localhost:5173/test/jobber`
   - Use the dedicated OAuth2 test page for comprehensive testing
   - Verify connection status and account information
   - Test form submission with real-time feedback

4. **Production Contact Form Testing**
   - Navigate to `http://localhost:5173/contact`
   - Fill out the contact form
   - Check browser console for success/error messages
   - Verify client creation in your Jobber test account

## Data Mapping

### Form Fields → Jobber Client

| Form Field | Jobber Field | Notes |
|------------|--------------|-------|
| `name` | `firstName`, `lastName` | Split on first space |
| `email` | `emails[0].address` | Set as primary email |
| `phone` | `phones[0].number` | Set as primary phone |
| `address` | `billingAddress` | Parsed into street, city, state, zip |
| `contactPreference` | `notes` | Added to notes field |
| `additionalInfo` | `notes` | Added to notes field |

### Notes Field Content

The notes field includes:
- Contact preference
- Additional information from form
- Lead source: "Field & Foyer Website"
- Submission timestamp

## Error Handling

### Graceful Degradation

The integration is designed to fail gracefully:

1. **API Errors**: Form still shows success to user, errors logged
2. **Network Issues**: Fallback to console logging
3. **Invalid Token**: Error logged, form continues to work
4. **Rate Limiting**: Automatic retry logic (future enhancement)

### Error Types

- **Authentication Errors**: Invalid or expired access token
- **Validation Errors**: Invalid data format (email, phone, etc.)
- **Network Errors**: Connection issues, timeouts
- **Rate Limiting**: Too many requests (2500 per 5 minutes)

## Production Deployment

### 1. OAuth Implementation

For production, implement full OAuth 2.0 flow:

```typescript
// Example OAuth flow implementation
const authUrl = `https://api.getjobber.com/api/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=clients:write`
```

### 2. Token Management

- Store access tokens securely
- Implement token refresh logic
- Handle token expiration gracefully

### 3. Environment Variables

```env
# Production environment
VITE_JOBBER_CLIENT_ID=your_client_id
VITE_JOBBER_CLIENT_SECRET=your_client_secret
VITE_JOBBER_REDIRECT_URI=https://your-domain.com/auth/callback
```

### 4. Monitoring

- Log all API interactions
- Monitor error rates
- Set up alerts for failures
- Track conversion rates

## API Rate Limits

Jobber API has two rate limits:

1. **DDoS Protection**: 2500 requests per 5 minutes
2. **Query Cost**: Point-based system using leaky bucket algorithm

### Best Practices

- Implement exponential backoff for retries
- Cache common results when possible
- Use pagination for large data sets
- Monitor rate limit headers in responses

## Security Considerations

1. **Access Token Storage**
   - Never commit tokens to version control
   - Use environment variables
   - Rotate tokens regularly

2. **Data Privacy**
   - Only collect necessary data
   - Follow GDPR/CCPA guidelines
   - Implement data retention policies

3. **API Security**
   - Validate all input data
   - Use HTTPS for all requests
   - Implement request signing (future enhancement)

## OAuth2 Testing Workflow

### Using the Dedicated Test Page

The application includes a comprehensive test page at `/test/jobber` for OAuth2 integration testing:

#### Step 1: Environment Setup
1. Ensure `.env.local` contains your Jobber access token:
   ```env
   VITE_JOBBER_ACCESS_TOKEN=your_token_here
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

#### Step 2: Access Test Page
Navigate to `http://localhost:5173/test/jobber` in your browser.

#### Step 3: Verify Connection
- The page automatically tests your API connection on load
- Check the "Connection Status" section for:
  - ✅ Green checkmark: Successfully connected
  - ❌ Red X: Connection failed
  - Account information display (name, ID, industry)

#### Step 4: Test Form Submission
1. Review the pre-filled test data or modify as needed
2. Click "Test Form Submission"
3. Monitor the real-time test results console
4. Verify success messages and client creation details

#### Step 5: Verify in Jobber
1. Log into your Jobber test account
2. Navigate to Clients section
3. Confirm the test client was created with correct information
4. Check that notes include lead source and submission details

### Test Results Interpretation

The test console provides detailed feedback:

- **Connection Tests**: API connectivity and authentication status
- **Account Verification**: Confirms access to your Jobber account
- **Form Submission**: Step-by-step submission process
- **Client Creation**: Confirmation of successful client creation
- **Error Details**: Specific error messages for troubleshooting

### Common Test Scenarios

1. **Successful Flow**: Connection ✅ → Form Submit ✅ → Client Created ✅
2. **Auth Failure**: Connection ❌ → Check token validity
3. **Validation Error**: Connection ✅ → Submit ❌ → Check form data format
4. **Network Issue**: Intermittent failures → Check internet connection

## Troubleshooting

### Common Issues

1. **"Access token not configured"**
   - Check `.env.local` file exists
   - Verify `VITE_JOBBER_ACCESS_TOKEN` is set
   - Restart development server

2. **"Authentication failed"**
   - Token may be expired (60-minute limit for test tokens)
   - Generate new token in Developer Center
   - Check token format (should start with "Bearer ")

3. **"Rate limit exceeded"**
   - Wait 5 minutes before retrying
   - Implement exponential backoff
   - Consider caching strategies

4. **Client creation fails**
   - Check required fields are provided
   - Validate email format
   - Ensure phone number format is correct

### Debug Mode

Enable debug logging:

```typescript
// In jobberApi.ts
console.log('Jobber API Request:', { query, variables })
console.log('Jobber API Response:', response)
```

## Future Enhancements

1. **Webhook Integration**
   - Listen for Jobber events
   - Sync data bidirectionally
   - Real-time updates

2. **Advanced Features**
   - Quote creation from form data
   - Service scheduling integration
   - Customer portal integration

3. **Analytics**
   - Track conversion rates
   - Monitor form abandonment
   - A/B test form variations

## Support

For issues with the integration:

1. Check this documentation
2. Review test cases for examples
3. Check Jobber API documentation
4. Contact Jobber API support: [API support email](mailto:api-support@getjobber.com)
