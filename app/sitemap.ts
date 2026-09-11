import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://flomaila.vercel.app";
  return [{ url: base + "/" }, { url: base + "/login" }, { url: base + "/w" }, { url: base + "/privacy" }, { url: base + "/terms" }];
}
