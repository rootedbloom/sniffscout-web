import type { MetadataRoute } from "next";
import { getCities, getIndexedPlaces } from "@/lib/places";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || "https://getsniffscout.com";
  const [cities, places] = await Promise.all([getCities(), getIndexedPlaces()]);
  const pages = ["", "/directory", "/dog-friendly-places", "/for-businesses", "/about", "/contact", "/submit-a-place", "/claim-your-business"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.6 : 1 })),
    ...cities.map((c) => ({ url: `${base}${c.path}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...places.map((p) => ({ url: `${base}/place/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
