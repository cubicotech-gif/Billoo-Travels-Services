import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/booking/confirm"],
      },
    ],
    sitemap: "https://billootravels.com/sitemap.xml",
  };
}
