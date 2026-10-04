import Head from "next/head";
import type { Metadata } from "next";

interface SEOHeadProps {
  seo: Metadata;
}

// Type helpers for better type safety
interface OpenGraphData {
  type?: string;
  url?: string;
  siteName?: string;
  title?: string;
  description?: string;
  images?: Array<{
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
}

interface TwitterData {
  card?: string;
  title?: string;
  description?: string;
  images?: string[];
}

export default function SEOHead({ seo }: SEOHeadProps) {

  return (
    <Head>
      {/* Title & Description */}
      <title>{String(seo.title ?? "")}</title>
      <meta name="description" content={String(seo.description ?? "")} />

      {/* Canonical */}
      {seo.alternates?.canonical && (
        <link
          rel="canonical"
          href={String(seo.alternates.canonical ?? "https://wemotif.com/")}
        />
      )}

      {/* Open Graph */}
      {seo.openGraph && (
        <>
          <meta
            property="og:type"
            content={String((seo.openGraph as OpenGraphData)?.type ?? "website")}
          />
          <meta
            property="og:url"
            content={String((seo.openGraph as OpenGraphData)?.url ?? "https://wemotif.com/")}
          />
          <meta
            property="og:site_name"
            content={String((seo.openGraph as OpenGraphData)?.siteName ?? "MOTIF®")}
          />
          <meta
            property="og:title"
            content={String((seo.openGraph as OpenGraphData)?.title ?? "")}
          />
          <meta
            property="og:description"
            content={String((seo.openGraph as OpenGraphData)?.description ?? "")}
          />
          {(seo.openGraph as OpenGraphData)?.images?.map((img, i: number) => (
            <meta
              key={i}
              property="og:image"
              content={String(img?.url ?? "")}
            />
          ))}
        </>
      )}

      {/* Twitter */}
      {seo.twitter && (
        <>
          <meta
            name="twitter:card"
            content={String((seo.twitter as TwitterData)?.card ?? "summary_large_image")}
          />
          <meta
            name="twitter:title"
            content={String((seo.twitter as TwitterData)?.title ?? "")}
          />
          <meta
            name="twitter:description"
            content={String((seo.twitter as TwitterData)?.description ?? "")}
          />
          {(seo.twitter as TwitterData)?.images?.map((img: string, i: number) => (
            <meta key={i} name="twitter:image" content={String(img ?? "")} />
          ))}
        </>
      )}

      {/* Pinterest & Other Meta */}
      {seo.other &&
        Object.entries(seo.other).map(([key, value]) => (
          <meta key={key} name={key} content={String(value)} />
        ))}

      {/* Verification */}
      {seo.verification?.google && (
        <meta
          name="google-site-verification"
          content={String(seo.verification.google)}
        />
      )}
      {seo.verification?.other &&
        Object.entries(seo.verification.other).map(([key, value]) => (
          <meta key={key} name={key} content={String(value)} />
        ))}
    </Head>
  );
}
