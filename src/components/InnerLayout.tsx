"use client";

import { ReactNode } from "react";
import { CurrencyProvider } from "@/lib/currency";
import Navbar from "@/components/sections/Navbar";
import { Footer, WhatsAppWidget } from "@/components/sections/FooterWhatsApp";

export default function InnerLayout({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </CurrencyProvider>
  );
}
