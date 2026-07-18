"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { HAJJ } from "@/lib/hajj";
import { SITE } from "@/lib/seo";
import { formatPkgPrice, pkgCurrency, CURRENCY_LABEL } from "@/lib/packageCurrency";
import { Pricing, hasPricing } from "@/lib/pricing";
import PricingOptions from "@/components/ui/PricingOptions";
import Itinerary, { ItItem } from "@/components/ui/Itinerary";

interface DbPackage {
  id: number;
  type: string;
  code: string | null;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  currency: string | null;
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  pricing: Pricing | null;
  includes: string[];
  badge: string | null;
  img: string | null;
  overview: string | null;
  itinerary: ItItem[];
  included_items: string[];
  not_included: string[];
  add_ons: string[];
  notes: string[];
}

export default function PackageBrochurePage() {
  const params = useParams();
  const [pkg, setPkg] = useState<DbPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/packages/${params.id}`)
      .then((r) => r.json())
      .then((d) => { if (d.package) setPkg(d.package); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (pkg) document.title = `${pkg.title} — Hajj ${HAJJ.year} Brochure · Billoo Travels`;
  }, [pkg]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="w-10 h-10 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-midnight mb-4">Package Not Found</h1>
          <Link href="/admin/packages" className="text-accent font-heading text-sm font-semibold no-underline hover:underline">
            ← Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const currency = pkgCurrency(pkg);
  const price = formatPkgPrice(pkg);

  return (
    <div className="brochure-shell">
      {/* ── Floating action bar (never printed) ── */}
      <div className="no-print sticky top-0 z-50 bg-[#0B1628] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/admin/packages/${pkg.id}/share`} className="text-white/70 text-sm font-heading no-underline hover:text-white">
          ← Back to Share Kit
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline text-white/50 text-xs font-body mr-2">
            Tip: choose “Save as PDF” as the printer
          </span>
          <button
            onClick={() => window.print()}
            className="bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white px-5 py-2 rounded-lg font-heading text-sm font-semibold border-none cursor-pointer transition-all"
          >
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* ── The printable A4 sheet ── */}
      <div className="brochure-sheet shadow-[0_10px_40px_rgba(0,0,0,0.15)] my-0 sm:my-8 print:my-0">
        {/* ══════════ PAGE 1 ══════════ */}
        {/* Header band */}
        <div className="relative bg-[#0B1628] text-white px-8 pt-5 pb-5 overflow-hidden">
          <div className="absolute top-[-40%] right-[-6%] w-[320px] h-[320px] rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(77,163,232,0.22)_0%,transparent_70%)]" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,.18), rgba(77,163,232,.55))", border: "1px solid rgba(255,255,255,.2)" }}>
                <span className="font-display text-base text-white leading-none">B</span>
              </div>
              <div>
                <div className="font-heading text-[14px] font-bold tracking-[2px] uppercase">Billoo Travels</div>
                <div className="font-body text-[8.5px] tracking-[1.5px] text-[#7EC8FF]/70">Pvt Ltd · Est. 1969</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display italic text-[12px] text-[#7EC8FF]">Hajj {HAJJ.year} · {HAJJ.hijri}</div>
              <div className="inline-flex items-center gap-1.5 mt-1 bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 font-body text-[9px] font-semibold px-2 py-0.5 rounded-full">
                Approved Operator · Agent ID {CONTACT.agentId}
              </div>
            </div>
          </div>

          <div className="relative mt-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#4DA3E8] text-white">{pkg.type}</span>
              {pkg.badge && <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-[#0B1628]">{pkg.badge}</span>}
              {pkg.code && <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-[#7EC8FF] border border-white/20">PKG {pkg.code}</span>}
            </div>
            <h1 className="font-display text-[25px] leading-[1.1] text-white">{pkg.title}</h1>
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-4 border-b border-slate-200">
          {[
            { k: "Duration", v: pkg.nights },
            { k: "Hotel", v: pkg.hotel_short || pkg.hotel },
            { k: "Dates", v: pkg.dates || "Flexible" },
            { k: `Price (${currency})`, v: price, accent: true },
          ].map((f, i) => (
            <div key={i} className={`px-4 py-2.5 ${i < 3 ? "border-r border-slate-200" : ""}`}>
              <div className="font-body text-[9px] text-slate-400 mb-0.5">{f.k}</div>
              <div className={`font-heading text-[12px] font-bold leading-tight ${f.accent ? "text-[#4DA3E8]" : "text-[#0B1628]"}`}>{f.v}</div>
              {f.accent && <div className="font-body text-[8px] text-slate-400 mt-0.5">from · per person</div>}
            </div>
          ))}
        </div>

        <div className="px-8 py-3">
          {/* Overview */}
          {pkg.overview && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[14px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Overview
              </h2>
              <p className="text-[10.5px] text-slate-600 leading-relaxed">{pkg.overview}</p>
            </section>
          )}

          {/* Highlights */}
          {pkg.includes?.length > 0 && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[14px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Package Highlights
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {pkg.includes.map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-[#2B7CC4] bg-[#EBF5FF] px-2.5 py-1 rounded-md">{h}</span>
                ))}
              </div>
            </section>
          )}

          {/* Pricing — hotel options */}
          {hasPricing(pkg.pricing) && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[14px] font-semibold text-[#0B1628] mb-1 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Choose Your Hotel &amp; Room
              </h2>
              {pkg.pricing!.tiers!.length > 1 && (
                <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                  Both options include the same itinerary &amp; services — only the hotels differ. Pick your hotel, then your room type.
                </p>
              )}
              <PricingOptions pricing={pkg.pricing} currency={currency} variant="brochure" />
              <p className="text-[9px] text-slate-400 mt-1.5">
                Prices per person in {CURRENCY_LABEL[currency]}. Ticket &amp; Qurbani not included. Book early — prices subject to change.
              </p>
            </section>
          )}

          {/* What's Included — 2-column list */}
          {pkg.included_items?.length > 0 && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[13px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> What&apos;s Included
              </h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-0.5">
                {pkg.included_items.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[9px] text-slate-600 leading-snug">
                    <span className="text-[#4DA3E8] font-bold shrink-0">✓</span>{item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Not Included — 2-column list */}
          {pkg.not_included?.length > 0 && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[13px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Not Included
              </h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-0.5">
                {pkg.not_included.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[9px] text-slate-500 leading-snug">
                    <span className="text-slate-400 font-bold shrink-0">✕</span>{item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Optional upgrades & add-ons */}
          {pkg.add_ons?.length > 0 && (
            <section className="mb-2.5 brochure-break">
              <h2 className="brochure-h2 font-display text-[13px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Optional Upgrades &amp; Add-ons
              </h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                {pkg.add_ons.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[9px] text-slate-600 leading-snug">
                    <span className="text-[#4DA3E8] shrink-0">＋</span>{item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Good to know */}
          {pkg.notes?.length > 0 && (
            <section className="mb-0 brochure-break">
              <h2 className="brochure-h2 font-display text-[13px] font-semibold text-[#0B1628] mb-1.5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#4DA3E8]" /> Good to Know
              </h2>
              <ul className="space-y-1">
                {pkg.notes.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[9px] text-slate-500 leading-snug">
                    <span className="text-slate-400 shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ══════════ PAGE 2 (clean break) — the journey ══════════ */}
        <div className="page-break-before">
          {/* Slim page-2 header strip */}
          <div className="bg-[#0B1628] text-white px-8 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-display"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,.18), rgba(77,163,232,.55))", border: "1px solid rgba(255,255,255,.2)" }}>B</span>
              <span className="font-heading text-[11px] font-bold tracking-[1.5px] uppercase">Billoo Travels</span>
              <span className="font-body text-[9px] text-[#7EC8FF]/70">· Hajj {HAJJ.year}</span>
            </div>
            <span className="font-body text-[9.5px] text-[#7EC8FF]">{pkg.code ? `PKG ${pkg.code}` : ""}</span>
          </div>

          <div className="px-8 py-4">
            {/* Itinerary */}
            {pkg.itinerary?.length > 0 && (
              <section>
                <h2 className="brochure-h2 font-display text-[14px] font-semibold text-[#0B1628] mb-2 flex items-center gap-2">
                  <span className="w-5 h-px bg-[#4DA3E8]" /> Your Hajj Journey
                </h2>
                <Itinerary items={pkg.itinerary} variant="brochure" />
              </section>
            )}
          </div>

          {/* Footer band */}
          <div className="bg-[#0B1628] text-white px-8 py-5 brochure-break">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display text-[15px] font-semibold mb-1">Ready to reserve your place for Hajj {HAJJ.year}?</div>
                <div className="text-[10.5px] text-white/60">Registration is free — an advisor will call you back with full details.</div>
              </div>
              <div className="text-right text-[10.5px] leading-relaxed">
                <div className="text-[#7EC8FF] font-semibold">{CONTACT.phone}</div>
                <div className="text-white/70">{CONTACT.email}</div>
                <div className="text-white/70">{SITE.url.replace("https://", "")}/hajj</div>
              </div>
            </div>
            <div className="border-t border-white/10 mt-3 pt-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="font-body text-[9px] text-white/45">{CONTACT.address}</div>
              <div className="font-body text-[9px] text-white/45">
                Priced in {CURRENCY_LABEL[currency]} · Government-Approved Hajj &amp; Umrah Operator
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="no-print text-center py-6 text-slate-400 text-xs font-body">
        Billoo Travels · Hajj {HAJJ.year} Package Brochure
      </div>
    </div>
  );
}
