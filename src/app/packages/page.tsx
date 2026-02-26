"use client";

import { useState, useEffect } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCurrency } from "@/lib/currency";
import { CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import Link from "next/link";

const TABS = ["All", "Umrah", "Hajj"] as const;
const SORTS = ["Popular", "Price: Low", "Price: High", "Duration"] as const;

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

function getPrice(p: DbPackage, currency: string) {
  if (currency === "USD") return p.price_usd;
  if (currency === "SAR") return p.price_sar;
  return p.price_pkr;
}

function fmtPrice(p: DbPackage, currency: string) {
  const sym: Record<string, string> = { PKR: "PKR ", USD: "$", SAR: "SAR " };
  return `${sym[currency] || ""}${getPrice(p, currency).toLocaleString()}`;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800";

export default function PackagesPage() {
  const [tab, setTab] = useState<string>("All");
  const [sort, setSort] = useState<string>("Popular");
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((d) => setPackages(d.packages || []))
      .finally(() => setLoading(false));
  }, []);

  let filtered = packages.filter((p) => tab === "All" || p.type === tab);
  if (sort === "Price: Low") filtered = [...filtered].sort((a, b) => getPrice(a, currency) - getPrice(b, currency));
  if (sort === "Price: High") filtered = [...filtered].sort((a, b) => getPrice(b, currency) - getPrice(a, currency));
  if (sort === "Duration") filtered = [...filtered].sort((a, b) => parseInt(a.nights) - parseInt(b.nights));

  return (
    <InnerLayout>
      <PageBanner
        label="Our Packages"
        title="Explore"
        highlight="Journeys"
        description="Handcrafted packages for every pilgrim — from premium comfort to ultimate luxury."
        bgImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[1280px] mx-auto">

          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
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
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400 tracking-[1px]">SORT:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-heading text-[13px] text-slate-600 bg-white cursor-pointer focus:outline-none focus:border-accent"
                >
                  {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </ScrollReveal>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                  <div className="h-[220px] bg-slate-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                    <div className="h-8 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <>
              <ScrollReveal>
                <p className="text-sm text-slate-400 mb-6">{filtered.length} package{filtered.length !== 1 ? "s" : ""} found</p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => {
                  const imgSrc = p.img || FALLBACK_IMG;
                  return (
                    <ScrollReveal key={p.id} delay={i * 0.08}>
                      <Link href={`/packages/${p.id}`} className="no-underline block h-full">
                        <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer h-full">
                          {p.featured && (
                            <div className="absolute top-0 right-0 z-10 bg-amber-400 text-white text-[9px] font-bold font-mono tracking-[1.5px] px-3 py-1 rounded-bl-lg">
                              ★ FEATURED
                            </div>
                          )}
                          <div className="relative h-[220px] overflow-hidden">
                            <img src={imgSrc} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/40" />
                            <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                              {p.badge && <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{p.badge}</span>}
                              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight">{p.type}</span>
                            </div>
                            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                              <span className="font-heading text-[13px] font-semibold text-white">{p.nights}</span>
                              <span className="font-heading text-[13px] font-semibold text-accent-soft">{p.hotel_short || p.hotel}</span>
                            </div>
                          </div>
                          <div className="p-5 pb-6">
                            <h3 className="font-heading text-lg font-bold text-midnight mb-1">{p.title}</h3>
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
                                <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase">From</div>
                                <div className="font-heading text-[22px] font-bold text-accent">{fmtPrice(p, currency)}</div>
                              </div>
                              <span className="text-accent font-heading text-[13px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Details <ArrowIcon size={14} color="#4DA3E8" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="col-span-3 py-20 text-center text-slate-400">
                  <div className="text-5xl mb-4">✈️</div>
                  <p className="font-heading text-lg font-semibold text-midnight mb-1">No packages found</p>
                  <p className="text-sm">Try a different filter or check back soon.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </InnerLayout>
  );
}
