import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./fluid_style.css";
import "../styles/_curve_chart.scss";
import SchemaInjector from "@/components/SchemaInjector";
import MarketingProviders from "@/components/marketing/MarketingProviders";
import { AnimationProvider } from "@/context/AnimationContext";
import { CursorProvider } from "@/context/CursorContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const clashDisplay = localFont({
  variable: "--font-clash-display",
  src: [
    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },

    {
      path: "../fonts/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
const helveticaNeue = localFont({
  variable: "--font-helveticaNeue",
  src: [
    {
      path: "../fonts/helvetica-neue/HelveticaNeueLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-neue/HelveticaNeueLight.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/helvetica-neue/HelveticaNeueMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-neue/HelveticaNeueBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-neue/HelveticaNeueBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/helvetica-neue/HelveticaNeueBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "MOTIF® — STRATEGY. COMMERCE. EXPERT.",
  description:
    "An Agency turned to Incubator — Growing & Scaling Luxury Lifestyle, Fashion & Beauty Brands with strategies, powerful creatives & crazy ideas. ⚡️",
  openGraph: {
    type: "website",
    url: "https://wemotif.com/",
    siteName: "MOTIF®",
    title: "MOTIF® — Brand Incubator",
    description:
      "An Agency turned to Incubator — Growing & Scaling Luxury Lifestyle, Fashion & Beauty Brands with strategies, powerful creatives & crazy ideas.",
    images: [
      { url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOTIF® — STRATEGY. COMMERCE. EXPERT",
    description:
      "Building, Growing, & Scaling Best in the classes Luxury Lifestyle, Fashion, & Beauty Brands",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
  alternates: { canonical: "https://wemotif.com/" },
  // 🔐 add verification tokens once (replace with your values)
  verification: {
    google: "gyX4fbMLYAaabASBvwxgNS6TcoUHxNwE4TNjPDGzZHU",
    other: {
      "msvalidate.01": "F400CE862791318510D066CCA13A7F2D",
      "p:domain_verify": "b82c525b6b451ecf12d08016bee21f39",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      {/* <MasterGraphScript />
      <GlobalFAQsScript /> */}
      <SchemaInjector />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <MarketingProviders />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://js.hs-scripts.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://www.clarity.ms" />
      <link rel="preconnect" href="https://www.gstatic.com" />
      <script src="https://www.google.com/recaptcha/api.js?render=6LdYGQcsAAAAAJYe89ZM4HDnrDvAzP4DnIFHLZUc" async></script>
  </head>
      <body
        className={`${clashDisplay.variable} ${helveticaNeue.variable} antialiased`}
      >
        <AnimationProvider>
          <CursorProvider>
            <MarketingProviders includeNoScript>
                {children}
              {/* <BotAwareWrapper>
              </BotAwareWrapper> */}
            </MarketingProviders>
          </CursorProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
