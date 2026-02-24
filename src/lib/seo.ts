// ─── SITE-WIDE SEO CONSTANTS ───
export const SITE = {
  name: "Billoo Travels Services Pvt Ltd",
  shortName: "Billoo Travels",
  tagline: "Premium Hajj & Umrah Packages from Pakistan",
  description:
    "Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. VIP access, five-star comfort, and 20+ years of trusted service. Agent ID 1251.",
  url: "https://billootravels.com",
  locale: "en_PK",
  phone: "+92-21-32313461",
  email: "vip@billootravels.com",
  address: {
    street: "M2 Mezzanine, Plot 41c",
    area: "DHA Phase 5",
    city: "Karachi",
    country: "Pakistan",
    postalCode: "75500",
  },
  socials: {
    facebook: "https://facebook.com/billootravels",
    instagram: "https://instagram.com/billootravels",
    youtube: "https://youtube.com/@billootravels",
  },
  ogImage: "/og-image.jpg",
};

// ─── JSON-LD STRUCTURED DATA ───
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: "Sindh",
      postalCode: SITE.address.postalCode,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.805,
      longitude: 67.055,
    },
    sameAs: Object.values(SITE.socials),
    priceRange: "PKR 350,000 - PKR 3,500,000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1247",
      bestRating: "5",
    },
    openingHours: "Mo-Sa 09:00-20:00",
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

export function getPackageSchema(pkg: {
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  nights: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.description,
    image: pkg.image,
    touristType: "Pilgrimage",
    provider: {
      "@type": "TravelAgency",
      name: SITE.name,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}${pkg.url}`,
    },
  };
}

export function getFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${article.url}` },
  };
}

// ─── PAGE METADATA HELPER ───
export function pageMeta(title: string, description?: string, path?: string) {
  const fullTitle = title === "Home" ? `${SITE.shortName} — ${SITE.tagline}` : `${title} — ${SITE.shortName}`;
  return {
    title: fullTitle,
    description: description || SITE.description,
    keywords: "Hajj packages, Umrah packages, luxury travel Pakistan, Billoo Travels, Karachi travel agency, pilgrimage, five star Hajj, premium Umrah",
    openGraph: {
      title: fullTitle,
      description: description || SITE.description,
      url: `${SITE.url}${path || ""}`,
      siteName: SITE.name,
      images: [{ url: `${SITE.url}${SITE.ogImage}`, width: 1200, height: 630, alt: SITE.shortName }],
      locale: SITE.locale,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description: description || SITE.description,
      images: [`${SITE.url}${SITE.ogImage}`],
    },
    alternates: { canonical: `${SITE.url}${path || ""}` },
  };
}
