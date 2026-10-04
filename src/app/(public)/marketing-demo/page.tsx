'use client';

import Head from 'next/head';
import { useEffect } from 'react';
import { usePageView, useEngagementTracking, trackUserInteraction, trackCTAClick } from '@/hooks/useMarketingTracking';
import { trackEvent } from '@/lib/marketing-analytics';

export default function MarketingDemo() {
  // Automatically track page views and engagement
  usePageView();
  useEngagementTracking();

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleCTAClick = (ctaName: string, ctaLocation?: string) => {
    trackCTAClick(ctaName, ctaLocation || 'Marketing Demo Page');
  };

  const handleCustomEvent = () => {
    trackEvent('demo_interaction', {
      demo_type: 'marketing_test',
      user_action: 'button_click',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Marketing Integration Demo
        </h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl mb-4">🎯 Active Tracking</h2>
          <p className="text-gray-300 mb-4">
            This page automatically tracks:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Page view (sent to GA4, GTM, Meta Pixel, HubSpot)</li>
            <li>Scroll depth (25%, 50%, 75%, 90%)</li>
            <li>Time spent on page (every 30 seconds)</li>
            <li>User engagement metrics</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl mb-4">📊 Google Analytics 4</h3>
            <p className="text-gray-300 mb-4">
              Enhanced ecommerce tracking with custom events
            </p>
            <button
              onClick={() => handleCTAClick('GA4 Demo')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
            >
              Track GA4 Event
            </button>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl mb-4">🏷️ Google Tag Manager</h3>
            <p className="text-gray-300 mb-4">
              Advanced tag management and custom triggers
            </p>
            <button
              onClick={() => trackUserInteraction('demo_button', 'gtm-test')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
            >
              Track GTM Event
            </button>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl mb-4">📘 Meta Pixel + Conversion API</h3>
            <p className="text-gray-300 mb-4">
              Client and server-side tracking for optimal attribution
            </p>
            <button
              onClick={() => handleCTAClick('Meta Conversion')}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
            >
              Track Meta Event
            </button>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl mb-4">🧡 HubSpot Integration</h3>
            <p className="text-gray-300 mb-4">
              Lead tracking and CRM integration
            </p>
            <button
              onClick={() => trackUserInteraction('hubspot_demo', 'lead-generation')}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded transition-colors"
            >
              Track HubSpot Event
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h3 className="text-xl mb-4">🧪 Custom Event Testing</h3>
          <p className="text-gray-300 mb-4">
            Test custom event tracking across all platforms:
          </p>
          <button
            onClick={handleCustomEvent}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded transition-colors"
          >
            Fire Custom Event
          </button>
        </div>

        <div className="bg-yellow-900 border border-yellow-600 p-6 rounded-lg">
          <h3 className="text-xl mb-4">⚠️ Setup Required</h3>
          <p className="text-yellow-100 mb-4">
            To see data in your marketing platforms, make sure to:
          </p>
          <ol className="list-decimal list-inside text-yellow-100 space-y-2">
            <li>Configure environment variables in <code className="bg-yellow-800 px-2 py-1 rounded">.env.local</code></li>
            <li>Add your Google Analytics Measurement ID</li>
            <li>Add your Google Tag Manager Container ID</li>
            <li>Add your Meta Pixel ID and Conversion API token</li>
            <li>Add your HubSpot Portal ID and API credentials</li>
          </ol>
          <p className="text-yellow-100 mt-4">
            Check the <code className="bg-yellow-800 px-2 py-1 rounded">MARKETING_INTEGRATION.md</code> file for detailed setup instructions.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl mb-4">🚀 Ready to Go Live?</h2>
          <p className="text-gray-300 mb-6">
            Test the contact form integration with all marketing platforms:
          </p>
          <a
            href="/contact"
            onClick={() => handleCTAClick('Contact Form', 'Demo Page')}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg transition-colors inline-block"
          >
            Test Contact Form Integration
          </a>
        </div>
      </div>
    </div>
    </>
  );
}