import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Opened from the Strapi admin "Preview" button (see config/admin.ts in motif-cms)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET;

  if (!secret || searchParams.get("secret") !== secret) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  if (searchParams.get("status") === "published") draft.disable();
  else draft.enable();

  // Only internal blog paths, so this can't be used as an open redirect
  const url = searchParams.get("url") ?? "";
  redirect(/^\/blogs?(\/|$)/.test(url) && !url.startsWith("//") ? url : "/blog");
}
