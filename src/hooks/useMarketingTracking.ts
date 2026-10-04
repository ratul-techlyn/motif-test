/**
 * Enhanced event tracking hooks and utilities for marketing analytics
 */
'use client';

import { useEffect } from 'react';
import { trackEvent, trackGAEvent, trackMetaEvent } from '@/lib/marketing-analytics';

// Hook for tracking page views
export function usePageView() {
  useEffect(() => {
    // Track page view on mount
    trackEvent('page_view', {
      page_url: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }, []);
}

// Hook for tracking user engagement
export function useEngagementTracking() {
  useEffect(() => {
    let engagementTimer: NodeJS.Timeout;
    let scrollDepth = 0;
    let maxScrollDepth = 0;

    // Track engagement time
    const startTime = Date.now();
    
    const trackEngagement = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 0 && timeSpent % 30 === 0) { // Every 30 seconds
        trackEvent('engagement_time', {
          time_spent_seconds: timeSpent,
          max_scroll_depth: maxScrollDepth,
          page_url: window.location.href,
        });
      }
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);

      // Track milestone scroll depths
      if (scrollDepth >= 25 && scrollDepth < 50) {
        trackEvent('scroll_25', { scroll_depth: scrollDepth });
      } else if (scrollDepth >= 50 && scrollDepth < 75) {
        trackEvent('scroll_50', { scroll_depth: scrollDepth });
      } else if (scrollDepth >= 75 && scrollDepth < 90) {
        trackEvent('scroll_75', { scroll_depth: scrollDepth });
      } else if (scrollDepth >= 90) {
        trackEvent('scroll_90', { scroll_depth: scrollDepth });
      }
    };

    // Set up event listeners
    engagementTimer = setInterval(trackEngagement, 1000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      clearInterval(engagementTimer);
      window.removeEventListener('scroll', handleScroll);
      
      // Track final engagement metrics
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackEvent('session_end', {
          total_time_spent: timeSpent,
          max_scroll_depth: maxScrollDepth,
          page_url: window.location.href,
        });
      }
    };
  }, []);
}

// Track specific user interactions
export const trackUserInteraction = (elementType: string, elementId?: string, additionalData?: Record<string, any>) => {
  trackEvent('user_interaction', {
    element_type: elementType,
    element_id: elementId,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, ctaLocation: string, ctaType: string = 'button') => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_type: ctaType,
    page_url: window.location.href,
  });

  // Also track as conversion events
  trackGAEvent('click', 'cta', ctaName);
  trackMetaEvent('ViewContent', {
    content_name: ctaName,
    content_category: 'CTA',
  });
};

// Track video interactions
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoName: string, currentTime?: number) => {
  trackEvent('video_interaction', {
    action,
    video_name: videoName,
    current_time: currentTime,
    page_url: window.location.href,
  });
};

// Track downloads
export const trackDownload = (fileName: string, fileType: string, downloadSource: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    download_source: downloadSource,
    page_url: window.location.href,
  });

  trackMetaEvent('ViewContent', {
    content_name: fileName,
    content_category: 'Download',
    content_type: fileType,
  });
};