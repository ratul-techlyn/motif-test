// Pre-render service integration for server-side bot detection (see brain/SETUP.md)
import { NextRequest } from 'next/server';
import { isbot } from 'isbot';

const PRERENDER_URL = process.env.PRERENDER_URL; // e.g. https://render.yourdomain.com
const PRERENDER_API_KEY = process.env.PRERENDER_API_KEY;
const PRERENDER_TIMEOUT_MS = 25_000; // a cache MISS renders in a headless browser and takes a few seconds

// Crawlers that should receive pre-rendered HTML (from SETUP.md)
const BOTS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot/i;

// Dev tools and automation that should always get the normal app
const DEV_TOOLS = /lighthouse|puppeteer|playwright|selenium|webdriver|headless|pagespeed/i;

/**
 * Determine if the request should be prerendered based on bot detection
 * Uses the SETUP.md bot list plus the isbot library
 */
export function shouldPrerender(request: NextRequest): boolean {
  // Not configured: serve the normal app to everyone
  if (!PRERENDER_URL || !PRERENDER_API_KEY) {
    return false;
  }

  // Our own headless browser loading the page - forwarding it back would loop
  if (request.headers.get('x-render-request')) {
    return false;
  }

  if (request.method !== 'GET') {
    return false;
  }

  const userAgent = request.headers.get('user-agent') || '';

  if (DEV_TOOLS.test(userAgent)) {
    return false;
  }

  return BOTS.test(userAgent) || isbot(userAgent);
}

/**
 * Check if this request should be ignored (file extensions, API routes, etc.)
 */
export function shouldIgnoreRequest(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;

  // Ignore API routes and Next internals
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return true;
  }

  // Ignore anything with a file extension (scripts, styles, images, fonts...)
  return /\.[a-z0-9]+$/i.test(pathname);
}

/**
 * Full public URL of the page. Behind the reverse proxy the request arrives
 * on localhost, which the pre-render service refuses (BLOCKED_ADDRESS).
 */
function getPublicUrl(request: NextRequest): string {
  const url = request.nextUrl.clone();
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto');

  if (host) {
    const publicHost = host.split(',')[0].trim();
    url.port = ''; // setting host without a port would keep the internal one
    url.host = publicHost;
  }
  if (proto) url.protocol = `${proto.split(',')[0].trim()}:`;

  return url.toString();
}

/**
 * Fetch prerendered HTML from the pre-render service
 * Returns null on errors or timeouts so the caller falls back to the normal page
 */
export async function fetchPrerenderedHTML(
  request: NextRequest
): Promise<{ html: string; status: number; cache: string | null } | null> {
  try {
    const pageUrl = getPublicUrl(request);

    const response = await fetch(
      `${PRERENDER_URL}/api/render?url=${encodeURIComponent(pageUrl)}`,
      {
        headers: { 'x-api-key': PRERENDER_API_KEY! },
        signal: AbortSignal.timeout(PRERENDER_TIMEOUT_MS),
      }
    );

    // 404/410 are served as-is so crawlers see the real status
    if (!response.ok && response.status !== 404 && response.status !== 410) {
      console.warn(`Prerender request failed with status: ${response.status}`);
      return null;
    }

    return {
      html: await response.text(),
      status: response.status,
      cache: response.headers.get('x-render-cache'),
    };
  } catch (error) {
    // Log error but don't throw - graceful fallback to normal rendering
    if (error instanceof Error) {
      console.warn('Prerender request failed:', error.message);
    }
    return null;
  }
}

/**
 * Utility function to check if request is from a bot (used for animation bypasses)
 */
export function isBotRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  return isbot(userAgent);
}
