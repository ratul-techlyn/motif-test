import { timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { STRAPI_TAG } from "@/lib/strapi/client";

// Called by the Strapi webhook (Settings → Webhooks) on entry/media changes
function validSecret(given: string | null): boolean {
  const expected = process.env.STRAPI_WEBHOOK_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!validSecret(request.headers.get("x-webhook-secret"))) {
    return NextResponse.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { event?: string; model?: string };

  // One tag covers every blog query: listings, related posts and sitemap stay consistent
  revalidateTag(STRAPI_TAG);

  return NextResponse.json({ revalidated: true, event: body.event ?? null, model: body.model ?? null });
}
