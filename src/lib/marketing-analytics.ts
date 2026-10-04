// Marketing tracking utilities
declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    fbq: any;
    hsLoad: any;
    _hsq: any;
  }
}

// Google Analytics tracking
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

export const trackGAEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export const trackGTMEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

// Meta Pixel tracking
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export const trackMetaEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// HubSpot tracking
export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '';

export const trackHubSpotEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: eventName,
      properties
    }]);
  }
};

// Unified tracking function for all platforms
export const trackEvent = (eventName: string, data: Record<string, any> = {}) => {
  // Track to Google Analytics
  trackGAEvent(eventName, 'engagement', eventName, 1);
  
  // Track to Google Tag Manager
  trackGTMEvent(eventName, data);
  
  // Track to Meta Pixel
  trackMetaEvent(eventName, data);
  
  // Track to HubSpot
  trackHubSpotEvent(eventName, data);
};

// Form submission tracking
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
  const eventData = {
    form_name: formName,
    ...formData
  };
  
  trackEvent('form_submit', eventData);
  trackGAEvent('submit', 'form', formName);
  trackMetaEvent('Lead', eventData);
};