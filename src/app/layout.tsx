import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";
import { SiteSettingsProvider } from "@/lib/siteSettings";

export const metadata: Metadata = {
  title: "Billoo Travels | Premium Hajj & Umrah Packages from Karachi | Since 1969",
  description:
    "Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. 50+ years of trusted service. VIP packages, 5-star hotels, visa processing & private concierge. Book now.",
  keywords: [
    "Hajj packages Pakistan",
    "Umrah packages Karachi",
    "luxury Hajj 2025",
    "premium Umrah packages",
    "Billoo Travels",
    "Karachi travel agency",
    "VIP Hajj packages",
    "Ministry of Hajj licensed operator",
    "Hajj visa processing",
  ],
  openGraph: {
    title: "Billoo Travels | Premium Hajj & Umrah Packages | Since 1969",
    description:
      "Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. 50+ years of trusted service. VIP packages, 5-star hotels & private concierge.",
    url: "https://www.billootravels.com",
    siteName: "Billoo Travels Services Pvt Ltd",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Billoo Travels — Premium Hajj & Umrah Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Billoo Travels | Premium Hajj & Umrah Packages | Since 1969",
    description:
      "Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. 50+ years of trusted service.",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200&h=630",
    ],
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Billoo Travels Services Pvt Ltd",
  url: "https://www.billootravels.com",
  logo: "https://www.billootravels.com/logo.png",
  image:
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200",
  description:
    "Pakistan's premier agency for luxury Hajj, Umrah & international tours.",
  telephone: "+92-21-32313461",
  email: "vip@billootravels.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "M2 Mezzanine, Plot 41c, 27th St, DHA Phase 5, Tauheed Commercial Area",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "75500",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.8038,
    longitude: 67.0319,
  },
  foundingDate: "1969",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "15000",
  },
  sameAs: [
    "https://www.facebook.com/people/Billoo-Travels-Services-Pvt-Ltd/61573636793379/",
    "https://instagram.com/billootravels",
    "https://youtube.com/@billootravels",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What documents are required for Umrah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Valid passport (6+ months), photographs, vaccination certificates, and visa forms. Our team handles the entire process for you.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2-3 months for Umrah, 4-6 months for Hajj to secure the best hotel proximity and flights.",
      },
    },
    {
      "@type": "Question",
      name: "Are payments refundable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full refund up to 30 days before departure, 50% up to 15 days, case-by-case after that.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide group packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Custom group packages for families and organizations with special pricing and dedicated coordinators.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in VIP packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "5-star suites near Haram, private SUV, personal scholar, priority visa, business class flights, and 24/7 concierge.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <Script
          id="schema-travel-agency"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <SiteSettingsProvider>
          <CurrencyProvider>{children}</CurrencyProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
