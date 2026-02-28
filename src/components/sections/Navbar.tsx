"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { useSiteSettings } from "@/lib/siteSettings";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Billoo-Travels-Services-Pvt-Ltd/61573636793379/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/billootravels",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@billootravels",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

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
          ? "py-2 bg-white/97 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
          {logo_url ? (
            <img
              src={logo_url}
              alt="Billoo Travels"
              style={{
                width: logo_width,
                height: logo_height,
                maxHeight: 80,
                objectFit: "contain",
              }}
              className="transition-all duration-400"
            />
          ) : (
            <>
              {/* Gradient circle badge — matches hero section style */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: scrolled
                    ? "linear-gradient(135deg, #0B1628, #1a3054)"
                    : "linear-gradient(135deg, rgba(255,255,255,.18), rgba(77,163,232,.55))",
                  boxShadow: scrolled
                    ? "0 4px 18px rgba(11,22,40,.18)"
                    : "0 4px 18px rgba(77,163,232,.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: scrolled ? "none" : "1px solid rgba(255,255,255,.18)",
                  backdropFilter: scrolled ? "none" : "blur(12px)",
                  transition: "all 0.4s",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 22,
                    color: scrolled ? "#4DA3E8" : "#fff",
                    lineHeight: 1,
                    transition: "color 0.4s",
                  }}
                >
                  B
                </span>
              </div>

              <div>
                <div
                  className={`font-heading text-[15px] font-bold tracking-[2.5px] uppercase transition-colors duration-400 ${
                    scrolled ? "text-[#0B1628]" : "text-white"
                  }`}
                >
                  BILLOO TRAVELS
                </div>
                <div
                  className={`font-mono text-[8px] tracking-[3px] transition-colors duration-400 ${
                    scrolled ? "text-slate-400" : "text-[#4DA3E8]/60"
                  }`}
                >
                  PVT LTD · EST. 1969
                </div>
              </div>
            </>
          )}
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-heading text-[13px] font-medium no-underline transition-colors ${
                scrolled
                  ? "text-slate-500 hover:text-[#4DA3E8]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className={`h-[18px] w-px ${scrolled ? "bg-slate-200" : "bg-white/[0.15]"}`} />

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex items-center justify-center w-7 h-7 rounded-md transition-all ${
                  scrolled
                    ? "text-slate-400 hover:text-[#4DA3E8] hover:bg-[#EBF5FF]"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className={`h-[18px] w-px ${scrolled ? "bg-slate-200" : "bg-white/[0.15]"}`} />

          {/* Currency Switcher */}
          <div
            className={`flex rounded-lg overflow-hidden border ${
              scrolled ? "border-slate-200" : "border-white/[0.15] backdrop-blur-lg"
            }`}
          >
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 font-heading text-[11px] font-semibold tracking-wide border-none cursor-pointer transition-all ${
                  currency === c
                    ? "bg-[#4DA3E8] text-white"
                    : scrolled
                    ? "bg-transparent text-slate-400"
                    : "bg-transparent text-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Book Now */}
          <Link
            href="/booking"
            className={`px-5 py-2 rounded-lg font-heading text-[13px] font-semibold no-underline transition-all hover:-translate-y-px hover:shadow-lg ${
              scrolled
                ? "bg-[#0B1628] text-white hover:bg-[#1a3054]"
                : "bg-white/[0.12] text-white border border-white/[0.18] backdrop-blur-lg hover:bg-white/[0.2]"
            }`}
          >
            Book Now
          </Link>

          {/* Admin Panel */}
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-[12px] font-semibold no-underline transition-all hover:-translate-y-px ${
              scrolled
                ? "bg-[#4DA3E8] text-white hover:bg-[#2B7CC4] shadow-sm"
                : "bg-[#4DA3E8]/80 text-white hover:bg-[#4DA3E8] border border-[#4DA3E8]/40 backdrop-blur-lg"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
            Admin
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className={`md:hidden bg-transparent border-none cursor-pointer p-1 ${
            scrolled ? "text-[#0B1628]" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
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
                  className="font-heading text-[13px] font-medium text-slate-500 no-underline hover:text-[#4DA3E8]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-1">
                <Link
                  href="/booking"
                  className="bg-[#0B1628] text-white px-5 py-2.5 rounded-lg font-heading text-[13px] font-semibold no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Link>
                <Link
                  href="/admin"
                  className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-heading text-[13px] font-semibold no-underline flex items-center gap-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  </svg>
                  Admin
                </Link>
              </div>
              {/* Currency in mobile */}
              <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-slate-200 self-start mt-1">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 font-heading text-[11px] font-semibold tracking-wide border-none cursor-pointer transition-all ${
                      currency === c ? "bg-[#4DA3E8] text-white" : "bg-transparent text-slate-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {/* Social icons in mobile menu */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 mt-1">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-slate-400 hover:text-[#4DA3E8] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
