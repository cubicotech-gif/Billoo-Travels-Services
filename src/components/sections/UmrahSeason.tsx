"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/lib/currency";
import { CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface UmrahSection {
  enabled: boolean;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  bg_image: string;
  badge_enabled: boolean;
  badge_text: string;
  season_note: string;
  cta_label: string;
  cta_link: string;
}

interface DbPackage {
  id: number;
  type: string;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  includes: string[];
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  badge: string | null;
  img: string | null;
  featured: boolean;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800";

function fmtPrice(p: DbPackage, currency: string) {
  const prices: Record<string, number> = { PKR: p.price_pkr, USD: p.price_usd, SAR: p.price_sar };
  const sym: Record<string, string> = { PKR: "PKR ", USD: "$", SAR: "SAR " };
  return `${sym[currency] || ""}${(prices[currency] ?? p.price_pkr).toLocaleString()}`;
}

export default function UmrahSeason() {
  const [section, setSection] = useState<UmrahSection | null>(null);
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { currency } = useCurrency();

  useEffect(() => {
    fetch("/api/umrah-section")
      .then((r) => r.json())
      .then((d) => setSection(d.section || null))
      .catch(() => setSection(null))
      .finally(() => setLoaded(true));

    fetch("/api/packages?type=Umrah&featured=1")
      .then((r) => r.json())
      .then((d) => setPackages(d.packages || []))
      .catch(() => setPackages([]));
  }, []);

  // Don't render anything until we know the section exists and is enabled.
  if (!loaded || !section || !section.enabled) return null;

  const bg = section.bg_image || FALLBACK_IMG;
  const cta = section.cta_link || "/packages?type=Umrah";

  return (
    <section id="umrah-season" className="bg-midnight py-20 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Banner ── */}
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden min-h-[360px] flex">
            {/* Background image */}
            <img src={bg} alt="Umrah season" className="absolute inset-0 w-full h-full object-cover" />
            {/* Gradient overlays */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(105deg, rgba(11,22,40,0.94) 0%, rgba(11,22,40,0.8) 45%, rgba(21,37,69,0.45) 75%, rgba(21,37,69,0.2) 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 w-full flex items-center">
              <div className="max-w-[640px] px-7 md:px-12 py-12">
                {/* Eyebrow */}
                {section.eyebrow && (
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-px bg-gradient-to-r from-accent to-transparent" />
                    <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent-soft">
                      {section.eyebrow}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-display text-white leading-[0.95] text-[44px] md:text-[64px] mb-5">
                  {section.title}{" "}
                  {section.title_highlight && (
                    <span className="italic text-accent-soft font-normal">{section.title_highlight}</span>
                  )}
                </h2>

                {/* Subtitle */}
                {section.subtitle && (
                  <p className="text-white/60 text-[15px] leading-relaxed max-w-[520px] mb-7">
                    {section.subtitle}
                  </p>
                )}

                {/* Badge + season note */}
                {(section.badge_enabled && section.badge_text) || section.season_note ? (
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    {section.badge_enabled && section.badge_text && (
                      <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {section.badge_text}
                      </span>
                    )}
                    {section.season_note && (
                      <span className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {section.season_note}
                      </span>
                    )}
                  </div>
                ) : null}

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={cta}
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
                  >
                    {section.cta_label || "Explore Umrah Packages"}
                    <ArrowIcon size={14} color="white" />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline border border-white/25 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all hover:-translate-y-px"
                  >
                    Talk to an Advisor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Hot Umrah packages ── */}
        {packages.length > 0 && (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[10px] tracking-[2px] uppercase text-accent-soft mb-1">
                  Hot This Season
                </div>
                <h3 className="font-heading text-xl font-bold text-white">Featured Umrah Packages</h3>
              </div>
              <Link
                href={cta}
                className="hidden sm:inline-flex items-center gap-1 text-accent-soft font-heading text-[13px] font-semibold no-underline hover:gap-2 transition-all"
              >
                View all <ArrowIcon size={14} color="#7EC8FF" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.slice(0, 3).map((p, i) => {
                const imgSrc = p.img || FALLBACK_IMG;
                return (
                  <ScrollReveal key={p.id} delay={i * 0.1}>
                    <Link href={`/packages/${p.id}`} className="no-underline block h-full">
                      <div className="relative bg-white rounded-2xl border border-white/10 overflow-hidden transition-all duration-[450ms] hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.4)] group cursor-pointer h-full">
                        <div className="absolute top-0 right-0 z-10">
                          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-bold font-mono tracking-[1.5px] px-3.5 py-1.5 rounded-bl-xl shadow-md">
                            ★ FEATURED
                          </div>
                        </div>

                        <div className="relative h-[220px] overflow-hidden">
                          <img
                            src={imgSrc}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/60" />
                          <div className="absolute top-3.5 left-3.5 flex gap-1.5 pr-16">
                            {p.badge && (
                              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white shadow">
                                {p.badge}
                              </span>
                            )}
                            <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight backdrop-blur-sm">
                              {p.type}
                            </span>
                          </div>
                          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                            <span className="font-heading text-[13px] font-semibold text-white drop-shadow">{p.nights}</span>
                            <span className="font-heading text-[13px] font-semibold text-accent-soft drop-shadow">{p.hotel_short || p.hotel}</span>
                          </div>
                        </div>

                        <div className="p-5 pb-6">
                          <h4 className="font-heading text-lg font-bold text-midnight mb-1 group-hover:text-accent transition-colors">{p.title}</h4>
                          {p.dates && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                              <CalendarIcon />{p.dates}
                            </div>
                          )}
                          {p.includes?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {p.includes.slice(0, 4).map((f) => (
                                <span key={f} className="text-[11px] font-semibold text-accent bg-accent-pale px-2 py-0.5 rounded-md">{f}</span>
                              ))}
                            </div>
                          )}
                          <div className="h-px bg-slate-200 mb-4" />
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mb-0.5">From</div>
                              <div className="font-heading text-[22px] font-bold text-accent">{fmtPrice(p, currency)}</div>
                            </div>
                            <span className="text-accent font-heading text-[13px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                              View <ArrowIcon size={14} color="#4DA3E8" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
