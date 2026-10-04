import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  shouldPrerender,
  shouldIgnoreRequest,
  fetchPrerenderedHTML
} from "./lib/prerender-middleware";

// Global middleware with pre-render service integration and bot detection (see brain/SETUP.md)
export async function middleware(request: NextRequest) {
  // Skip processing for ignored requests (API routes, static files, etc.)
  if (shouldIgnoreRequest(request)) {
    return NextResponse.next();
  }

  // Determine if this request should be prerendered
  const shouldUsePrerender = shouldPrerender(request);

  console.log(`Prerender check for ${request.nextUrl}: ${shouldUsePrerender}`);

  // Short-circuit for regular users - optimize for user traffic first
  if (!shouldUsePrerender) {
    const response = NextResponse.next();

    // Smart tiered caching: 1hr for users vs previous aggressive 1-year caching
    response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=7200"); // 1hr users, 2hr CDN
    response.headers.set("X-Prerendered", "false");
    response.headers.set("X-Bot-Detected", "false");

    // Add performance headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-DNS-Prefetch-Control", "on");

    return response;
  }

  // Only process bots that should be prerendered (minimize blocking time)
  try {
    // Attempt to fetch prerendered HTML from the pre-render service
    const prerendered = await fetchPrerenderedHTML(request);

    if (prerendered) {
      // Successfully got prerendered content (or a real 404/410) - return it
      const headers: Record<string, string> = {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Prerendered': 'true',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200', // 2 hours for bots
      };
      if (prerendered.cache) headers['X-Render-Cache'] = prerendered.cache;

      return new Response(prerendered.html, { status: prerendered.status, headers });
    }
  } catch (error) {
    // Log error but continue to normal rendering - graceful fallback
    console.warn('Prerender middleware error:', error);
  }

  // Pre-render service failed - fall back to normal rendering
  const response = NextResponse.next();
  response.headers.set("X-Prerendered", "false");
  response.headers.set("X-Bot-Detected", "true");
  response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

  return response;
}

// Define which paths middleware will run on
export const config = {
  // Exclude API routes, Next internals and any path with a file extension (static assets)
  matcher: ['/((?!_next|favicon.ico|api/|.*\\..*).*)'],
};
