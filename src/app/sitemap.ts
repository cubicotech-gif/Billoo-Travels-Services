import { MetadataRoute } from "next";

const BASE = "https://billootravels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/packages`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/packages/1`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE}/packages/2`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE}/packages/3`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${BASE}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/blog/complete-guide-umrah-2025`, changeFrequency: "monthly" as const, priority: 0.65 },
    { url: `${BASE}/blog/top-10-tips-comfortable-hajj`, changeFrequency: "monthly" as const, priority: 0.65 },
    { url: `${BASE}/blog/istanbul-muslim-traveler-paradise`, changeFrequency: "monthly" as const, priority: 0.65 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/faq`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/booking`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/refunds`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
