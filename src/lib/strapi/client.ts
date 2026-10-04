// Server-only: uses the private STRAPI_API_TOKEN. Never import from a "use client" file.
import { draftMode } from "next/headers";

// Every Strapi fetch is tagged with this, so one webhook call refreshes all blog data
export const STRAPI_TAG = "strapi";

type Query = Record<string, unknown>;

// Serialise nested objects/arrays into Strapi's bracket syntax: populate[blog][fields][0]=slug
export function toQueryString(query: Query): string {
  const parts: string[] = [];
  const walk = (value: unknown, key: string) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${key}[${i}]`));
    else if (typeof value === "object") {
      for (const [k, v] of Object.entries(value as Query)) walk(v, `${key}[${k}]`);
    } else parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  for (const [k, v] of Object.entries(query)) walk(v, k);
  return parts.join("&");
}

export async function isPreview(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // draftMode() is unavailable outside a request (e.g. sitemap generation at build time)
    return false;
  }
}

export async function strapiFetch<T>(path: string, query: Query = {}): Promise<T> {
  const baseUrl = process.env.STRAPI_URL;
  if (!baseUrl) throw new Error("STRAPI_URL is not set");

  const preview = await isPreview();
  const qs = toQueryString(preview ? { ...query, status: "draft" } : query);

  const res = await fetch(`${baseUrl}/api/${path}${qs ? `?${qs}` : ""}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN ?? ""}` },
    ...(preview
      ? { cache: "no-store" as const }
      : { cache: "force-cache" as const, next: { tags: [STRAPI_TAG], revalidate: 3600 } }),
  });

  if (!res.ok) {
    throw new Error(`Strapi ${res.status} on /api/${path}`);
  }
  return (await res.json()) as T;
}
