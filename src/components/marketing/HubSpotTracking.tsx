'use client';

import Script from 'next/script';
import { HUBSPOT_PORTAL_ID } from '@/lib/marketing-analytics';

export default function HubSpotTracking() {
  if (!HUBSPOT_PORTAL_ID) {
    return null;
  }

  return (
    <>
      <Script id="hubspot-tracking" strategy="afterInteractive">
        {`
          (function(h,u,b,s,p,o,t){h.hsLog||(h.hsLog=function(){
          (h.hsLog.queue=h.hsLog.queue||[]).push(arguments)});h.hsLog.queue||
          (h.hsLog.queue=[]);(function(){var e=b.createElement(s);
          e.async=!0;e.src="//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js";
          var t=b.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t)})()})
          (window,document,document,"script");
        `}
      </Script>
      <Script id="hubspot-disable-chat" strategy="afterInteractive">
        {`
          window.hsConversationsSettings = {
            loadImmediately: false
          };
          window.addEventListener('load', function() {
            if (window.HubSpotConversations) {
              window.HubSpotConversations.widget.remove();
            }
          });
        `}
      </Script>
    </>
  );
}