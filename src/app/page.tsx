"use client";

import { CurrencyProvider } from "@/lib/currency";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTAStrip from "@/components/sections/CTAStrip";
import Packages from "@/components/sections/Packages";
import Destinations from "@/components/sections/Destinations";
import Pricing from "@/components/sections/Pricing";
import { Gallery, Testimonials } from "@/components/sections/GalleryTeamTestimonials";
import { FAQ, Blog, Contact } from "@/components/sections/FAQBlogContact";
import { Footer, WhatsAppWidget } from "@/components/sections/FooterWhatsApp";

export default function HomePage() {
  return (
    <CurrencyProvider>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <CTAStrip />
      <Packages />
      <Destinations />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </CurrencyProvider>
  );
}
