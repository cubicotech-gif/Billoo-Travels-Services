"use client";

import { CurrencyProvider } from "@/lib/currency";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CTAStrip from "@/components/sections/CTAStrip";
import Packages from "@/components/sections/Packages";
import Pricing from "@/components/sections/Pricing";
import { Gallery, Team, Testimonials } from "@/components/sections/GalleryTeamTestimonials";
import { FAQ, Blog, Contact } from "@/components/sections/FAQBlogContact";
import { Footer, WhatsAppWidget } from "@/components/sections/FooterWhatsApp";

export default function HomePage() {
  return (
    <CurrencyProvider>
      <Navbar />
      <Hero />
      <Services />
      <CTAStrip />
      <Packages />
      <Pricing />
      <Gallery />
      <Team />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </CurrencyProvider>
  );
}
