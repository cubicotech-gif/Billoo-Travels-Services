import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Billoo Travels Services Pvt Ltd | Premium Hajj & Umrah Packages",
  description:
    "Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. VIP access, five-star comfort, and 20+ years of trusted service. Agent ID 1251.",
  keywords: [
    "Hajj packages",
    "Umrah packages",
    "luxury travel Pakistan",
    "Billoo Travels",
    "Karachi travel agency",
    "VIP Hajj",
    "premium Umrah",
  ],
  openGraph: {
    title: "Billoo Travels | Premium Hajj & Umrah",
    description: "Your sacred journey, elevated. 15,000+ pilgrims served.",
    url: "https://billootravels.com",
    siteName: "Billoo Travels",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
