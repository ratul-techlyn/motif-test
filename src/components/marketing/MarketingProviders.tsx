'use client';

import GoogleAnalytics from './GoogleAnalytics';
import GoogleTagManager, { GoogleTagManagerNoScript } from './GoogleTagManager';
import MetaPixel from './MetaPixel';
import HubSpotTracking from './HubSpotTracking';
import MicrosoftClarity from './MicrosoftClarity';

interface MarketingProvidersProps {
  children?: React.ReactNode;
  includeNoScript?: boolean;
}

export default function MarketingProviders({ children, includeNoScript = false }: MarketingProvidersProps) {
  return (
    <>
      {/* Include NoScript elements if requested (for body) */}
      {includeNoScript && <GoogleTagManagerNoScript />}
      
      {/* Analytics Scripts */}
      <GoogleAnalytics />
      <GoogleTagManager />
      <MetaPixel />
      <HubSpotTracking />
      <MicrosoftClarity />
      
      {children}
    </>
  );
}