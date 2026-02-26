"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { useSiteSettings } from "@/lib/siteSettings";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currency, setCurrency, currencies } = useCurrency();
  const { logo_url, logo_width, logo_height } = useSiteSettings();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "py-2.5 bg-white/95 backdrop-blur-xl border-b border-slate-200"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-9 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          {logo_url ? (
            <img
              src={logo_url}
              alt="Billoo Travels"
              style={{ width: logo_width, height: logo_height, objectFit: "contain" }}
              className="transition-all duration-400"
            />
          ) : (
            <>
              <div
                className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center font-display font-bold text-xl transition-all duration-400 ${
                  scrolled
                    ? "bg-midnight text-accent"
                    : "bg-white/[0.08] border border-white/[0.12] text-white backdrop-blur-lg"
                }`}
              >
                B
              </div>
              <div>
                <div
                  className={`font-heading text-base font-bold tracking-wide transition-colors duration-400 ${
                    scrolled ? "text-midnight" : "text-white"
                  }`}
                >
                  BILLOO TRAVELS
                </div>
                <div
                  className={`font-mono text-[8px] tracking-[3px] ${
                    scrolled ? "text-slate-400" : "text-white/40"
                  }`}
                >
                  PVT LTD · EST. 2000
                </div>
              </div>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-heading text-[13px] font-medium no-underline transition-colors ${
                scrolled
                  ? "text-slate-500 hover:text-accent"
                  : "text-white/70 hover:text-accent-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className={`h-[18px] w-px ${scrolled ? "bg-slate-200" : "bg-white/[0.12]"}`} />

          {/* Currency Switcher */}
          <div
            className={`flex rounded-lg overflow-hidden border ${
              scrolled
                ? "border-slate-200"
                : "border-white/[0.12] backdrop-blur-lg"
            }`}
          >
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 font-heading text-[11px] font-semibold tracking-wide border-none cursor-pointer transition-all ${
                  currency === c
                    ? "bg-accent text-white"
                    : scrolled
                    ? "bg-transparent text-slate-400"
                    : "bg-transparent text-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <Link
            href="/booking"
            className="bg-accent text-white px-5 py-2 rounded-lg font-heading text-[13px] font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden bg-transparent border-none cursor-pointer ${
            scrolled ? "text-midnight" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-heading text-[13px] font-medium text-slate-500 no-underline hover:text-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="bg-accent text-white px-5 py-2.5 rounded-lg font-heading text-[13px] font-semibold no-underline self-start mt-1"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
