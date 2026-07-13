import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/seo";
import { HAJJ, HAJJ_FAQ } from "@/lib/hajj";

const TITLE = `Hajj ${HAJJ.year} Registration Now Open — ${SITE.shortName}`;
const DESCRIPTION = `Register free for Hajj ${HAJJ.year} with ${SITE.shortName} — a government-approved operator (Agent ID 1251) serving pilgrims since 1969. 5-star hotels near the Haram, VIP Mina & Arafat camps, full visa & Nusuk support. Limited seats — reserve your place today.`;
const URL = `${SITE.url}${HAJJ.landingPath}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    `Hajj ${HAJJ.year}`,
    `Hajj ${HAJJ.year} registration`,
    "Hajj packages Pakistan",
    "Hajj registration Karachi",
    "government approved Hajj operator",
    "VIP Hajj packages",
    "Billoo Travels Hajj",
    "5 star Hajj packages",
    "Hajj visa Nusuk processing",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [{ url: HAJJ.shareImage, width: 1200, height: 630, alt: `Hajj ${HAJJ.year} Registration — ${SITE.shortName}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HAJJ.shareImage],
  },
  alternates: { canonical: URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HAJJ_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: `Hajj ${HAJJ.year} Registration`, item: URL },
  ],
};

export default function HajjLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="schema-hajj-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-hajj-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
