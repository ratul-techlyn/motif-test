import { redirect } from "next/navigation";

// Blog content is managed in the Strapi admin panel
export const dynamic = "force-dynamic";

export default function AdminBlogRedirect() {
  const adminUrl = process.env.STRAPI_ADMIN_URL || `${process.env.STRAPI_URL ?? ""}/admin`;
  redirect(adminUrl);
}
