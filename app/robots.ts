import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

// Private pages are excluded with a noindex tag: a Disallow here would prevent crawlers from reading it
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
