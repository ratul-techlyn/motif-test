import { isPreview } from "@/lib/strapi/client";

// Shown only while Next.js draft mode is on (opened from the Strapi admin preview)
export default async function PreviewBanner({ path }: { path: string }) {
  if (!(await isPreview())) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-4 rounded-full bg-[#F65516] px-5 py-2 font-helvetica text-sm text-white shadow-lg">
      <span>Preview mode: showing draft content</span>
      <a href={`/api/preview/exit?url=${encodeURIComponent(path)}`} className="underline underline-offset-4">
        Exit
      </a>
    </div>
  );
}
