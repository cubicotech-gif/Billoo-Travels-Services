"use client";

import { CurrencyProvider } from "@/lib/currency";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import SeasonalSpotlight from "@/components/sections/SeasonalSpotlight";
import Packages from "@/components/sections/Packages";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import CTAStrip from "@/components/sections/CTAStrip";
import Pricing from "@/components/sections/Pricing";
import { Team, Testimonials } from "@/components/sections/GalleryTeamTestimonials";
import { FAQ, Blog, Contact } from "@/components/sections/FAQBlogContact";
import { Footer, WhatsAppWidget } from "@/components/sections/FooterWhatsApp";

export default function HomePage() {
  return (
    <CurrencyProvider>
      {/* Hook */}
      <Navbar />
      <Hero />
      {/* Trust */}
      <TrustBar />
      {/* Seasonal offers (primary + secondary) */}
      <SeasonalSpotlight />
      {/* Product — full catalogue */}
      <Packages />
      {/* Why us */}
      <Services />
      {/* Process */}
      <HowItWorks />
      {/* Compare */}
      <Pricing />
      {/* Proof */}
      <Testimonials />
      <Team />
      {/* Objections */}
      <FAQ />
      {/* Close */}
      <CTAStrip />
      <Contact />
      {/* SEO / content */}
      <Blog />
      <Footer />
      <WhatsAppWidget />
    </CurrencyProvider>
  );
}
