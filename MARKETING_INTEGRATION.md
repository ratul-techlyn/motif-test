# Marketing Integration Documentation

This project now includes comprehensive marketing tracking and analytics integration with multiple platforms.

## Integrated Platforms

### 1. Google Analytics 4 (GA4)
- **Purpose**: Website analytics and user behavior tracking
- **Implementation**: `src/components/marketing/GoogleAnalytics.tsx`
- **Environment Variable**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 2. Google Tag Manager (GTM)
- **Purpose**: Tag management and advanced tracking configuration
- **Implementation**: `src/components/marketing/GoogleTagManager.tsx`
- **Environment Variable**: `NEXT_PUBLIC_GTM_ID`

### 3. Meta Pixel (Facebook Pixel)
- **Purpose**: Facebook/Instagram advertising optimization and tracking
- **Implementation**: `src/components/marketing/MetaPixel.tsx`
- **Environment Variable**: `NEXT_PUBLIC_META_PIXEL_ID`

### 4. Meta Conversion API
- **Purpose**: Server-side conversion tracking for improved data accuracy
- **Implementation**: `src/app/api/meta/conversion/route.ts`
- **Environment Variables**: 
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `META_CONVERSION_API_ACCESS_TOKEN`

### 5. HubSpot Tracking
- **Purpose**: Lead tracking and CRM integration
- **Implementation**: `src/components/marketing/HubSpotTracking.tsx`
- **Environment Variable**: `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`

### 6. HubSpot API Integration
- **Purpose**: Direct form submissions to HubSpot CRM
- **Implementation**: `src/app/api/hubspot/contact/route.ts`
- **Environment Variables**:
  - `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
  - `HUBSPOT_ACCESS_TOKEN`
  - `HUBSPOT_FORM_ID`

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file (use `.env.local.example` as reference):

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id
META_CONVERSION_API_ACCESS_TOKEN=your_meta_conversion_api_token

# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token
HUBSPOT_FORM_ID=your_hubspot_form_id
```

### 2. Platform-Specific Setup

#### Google Analytics
1. Create a GA4 property in Google Analytics
2. Copy the Measurement ID (format: G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_MEASUREMENT_ID`

#### Google Tag Manager
1. Create a GTM container
2. Copy the Container ID (format: GTM-XXXXXXX)
3. Add to `NEXT_PUBLIC_GTM_ID`

#### Meta Pixel
1. Create a Facebook Business account and add a Pixel
2. Copy the Pixel ID
3. Add to `NEXT_PUBLIC_META_PIXEL_ID`
4. For Conversion API, generate an access token in Meta Business Manager
5. Add to `META_CONVERSION_API_ACCESS_TOKEN`

#### HubSpot
1. Get your Portal ID from HubSpot account settings
2. Create a private app in HubSpot to get access token
3. Create a form in HubSpot and copy the Form ID
4. Add all three values to respective environment variables

#### Resend Email Service
1. Sign up for Resend at https://resend.com
2. Create an API key in your Resend dashboard
3. Add to `RESEND_API_KEY` environment variable
4. Configure your domain for sending emails (optional but recommended)

## Usage

### Automatic Tracking
The following events are automatically tracked:
- Page views
- Form submissions
- User engagement metrics
- Scroll depth

### Manual Tracking
Use the provided utility functions for custom tracking:

```typescript
import { trackEvent, trackCTAClick, trackUserInteraction } from '@/lib/marketing-analytics';

// Track custom events
trackEvent('custom_event', { property: 'value' });

// Track CTA clicks
trackCTAClick('Download Brochure', 'Hero Section');

// Track user interactions
trackUserInteraction('button', 'newsletter-signup');
```

### Enhanced Hooks
Use the provided hooks for automatic page and engagement tracking:

```typescript
import { usePageView, useEngagementTracking } from '@/hooks/useMarketingTracking';

function MyPage() {
  usePageView(); // Automatically tracks page views
  useEngagementTracking(); // Tracks scroll depth and time spent
  
  return <div>...</div>;
}
```

## Contact Form Integration

The contact form (`src/app/(public)/contact/~comp/ContactForm.tsx`) now automatically:
1. Tracks form submissions across all platforms
2. Sends data to HubSpot CRM
3. Triggers Meta Conversion API events
4. Records analytics events in GA4 and GTM
5. **Sends email notifications to ashome@wemotif.com via Resend**

## API Endpoints

### `/api/hubspot/contact`
- **Method**: POST
- **Purpose**: Submit contact form data to HubSpot
- **Body**: Contact form data object

### `/api/meta/conversion`
- **Method**: POST
- **Purpose**: Send conversion events to Meta
- **Body**: Conversion event data with user information

### `/api/email`
- **Method**: POST
- **Purpose**: Send email notifications to ashome@wemotif.com
- **Body**: Contact form data object
- **Dependencies**: Requires `RESEND_API_KEY` environment variable

## Privacy Compliance

- All PII data sent to Meta Conversion API is automatically hashed
- Client IP addresses and user agents are collected for accurate attribution
- All tracking respects user consent preferences

## Testing

To test the integrations:
1. Fill out and submit the contact form
2. Check browser console for tracking confirmations
3. Verify data appears in respective platforms (GA4, HubSpot, Meta Events Manager)
4. Use browser developer tools to inspect network requests

## Troubleshooting

### Common Issues
1. **Environment variables not loading**: Ensure `.env.local` exists and contains all required variables
2. **Tracking not working**: Check browser console for errors and verify environment variables
3. **Form submission failing**: Check API endpoint logs and verify HubSpot/Meta credentials

### Debug Mode
Set `NODE_ENV=development` to enable detailed console logging for all tracking events.