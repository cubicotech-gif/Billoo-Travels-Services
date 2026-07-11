"use client";

import { CurrencyProvider } from "@/lib/currency";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import HajjRegistration from "@/components/sections/HajjRegistration";
import SeasonalSpotlight from "@/components/sections/SeasonalSpotlight";
import Packages from "@/components/sections/Packages";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import AccreditationStrip from "@/components/sections/AccreditationStrip";
import CTAStrip from "@/components/sections/CTAStrip";
import { Testimonials } from "@/components/sections/GalleryTeamTestimonials";
import { FAQ, Contact } from "@/components/sections/FAQBlogContact";
import { Footer, WhatsAppWidget, StickyMobileCTA } from "@/components/sections/FooterWhatsApp";

export default function HomePage() {
  return (
    <CurrencyProvider>
      {/* Hook */}
      <Navbar />
      <Hero />
      {/* Trust */}
      <TrustBar />
      {/* Hajj 2027 registration promotion */}
      <HajjRegistration />
      {/* Seasonal offers (primary + secondary) */}
      <SeasonalSpotlight />
      {/* Product — full catalogue */}
      <Packages />
      {/* Why us */}
      <Services />
      {/* Process */}
      <HowItWorks />
      {/* Authority / accreditation */}
      <AccreditationStrip />
      {/* Proof */}
      <Testimonials />
      {/* Objections */}
      <FAQ />
      {/* Close */}
      <CTAStrip />
      <Contact />
      <Footer />
      {/* Clearance for the sticky mobile bar */}
      <div className="h-14 md:hidden" />
      <WhatsAppWidget />
      <StickyMobileCTA />
    </CurrencyProvider>
  );
}
