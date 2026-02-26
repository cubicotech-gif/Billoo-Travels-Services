"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "@/lib/currency";
import { CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

const TABS = ["All", "Umrah", "Hajj"] as const;
const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800";

function fmtPrice(p: DbPackage, currency: string) {
  const prices: Record<string, number> = { PKR: p.price_pkr, USD: p.price_usd, SAR: p.price_sar };
  const sym: Record<string, string> = { PKR: "PKR ", USD: "$", SAR: "SAR " };
  return `${sym[currency] || ""}${(prices[currency] ?? p.price_pkr).toLocaleString()}`;
}

export default function Packages() {
  const [tab, setTab] = useState<string>("All");
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();

  useEffect(() => {
    fetch("/api/packages?featured=1")
      .then((r) => r.json())
      .then((d) => setPackages(d.packages || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = packages.filter((p) => tab === "All" || p.type === tab);

  return (
    <section id="packages" className="py-24 px-6 md:px-9 bg-surface-alt">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <SectionHeading label="Featured Packages" title="Curated" highlight="Journeys" />
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-1.5 rounded-full font-heading text-[13px] font-medium cursor-pointer transition-all border ${
                  tab === t ? "bg-midnight text-white border-midnight" : "bg-transparent text-slate-500 border-slate-200 hover:border-accent hover:text-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-[260px] bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-8 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="font-heading text-base text-midnight font-semibold">No featured packages yet.</p>
            <p className="text-sm mt-1">Mark packages as Featured in the admin panel to display them here.</p>
          </div>
        )}

        {/* Featured cards grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => {
              const imgSrc = p.img || FALLBACK_IMG;
              return (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <Link href={`/packages/${p.id}`} className="no-underline block h-full">
                    <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(11,22,40,0.12)] hover:border-accent group cursor-pointer h-full">

                      {/* Featured ribbon */}
                      <div className="absolute top-0 right-0 z-10">
                        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-bold font-mono tracking-[1.5px] px-3.5 py-1.5 rounded-bl-xl shadow-md">
                          ★ FEATURED
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative h-[260px] overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/60" />

                        {/* Top badges */}
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

                        {/* Bottom meta on image */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                          <span className="font-heading text-[13px] font-semibold text-white drop-shadow">{p.nights}</span>
                          <span className="font-heading text-[13px] font-semibold text-accent-soft drop-shadow">{p.hotel_short || p.hotel}</span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5 pb-6">
                        <h3 className="font-heading text-lg font-bold text-midnight mb-1 group-hover:text-accent transition-colors">{p.title}</h3>

                        {p.dates && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                            <CalendarIcon />{p.dates}
                          </div>
                        )}

                        {p.includes?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.includes.slice(0, 4).map((f) => (
                              <span key={f} className="text-[11px] font-semibold text-accent bg-accent-pale px-2 py-0.5 rounded-md">
                                {f}
                              </span>
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
        )}

        {/* View All CTA */}
        {!loading && filtered.length > 0 && (
          <ScrollReveal>
            <div className="mt-12 text-center">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-midnight text-white px-8 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline hover:bg-midnight/90 transition-all hover:-translate-y-px hover:shadow-lg"
              >
                View All Packages <ArrowIcon size={14} color="white" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
