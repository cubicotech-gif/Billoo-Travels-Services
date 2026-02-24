"use client";

import { useState } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PACKAGES, formatPrice } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import Link from "next/link";

const TABS = ["All", "Umrah", "Hajj"] as const;
const SORTS = ["Popular", "Price: Low", "Price: High", "Duration"] as const;

export default function PackagesPage() {
  const [tab, setTab] = useState<string>("All");
  const [sort, setSort] = useState<string>("Popular");
  const { currency } = useCurrency();

  let filtered = PACKAGES.filter((p) => tab === "All" || p.type === tab);

  if (sort === "Price: Low") filtered = [...filtered].sort((a, b) => a.price[currency] - b.price[currency]);
  if (sort === "Price: High") filtered = [...filtered].sort((a, b) => b.price[currency] - a.price[currency]);
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
                      tab === t
                        ? "bg-midnight text-white border-midnight"
                        : "bg-transparent text-slate-500 border-slate-200 hover:border-accent hover:text-accent"
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
                  {SORTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </ScrollReveal>

          {/* Results count */}
          <ScrollReveal>
            <p className="text-sm text-slate-400 mb-6">{filtered.length} package{filtered.length !== 1 ? "s" : ""} found</p>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.08}>
                <Link href={`/packages/${p.id}`} className="no-underline block">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer h-full">
                    <div className="relative h-[220px] overflow-hidden">
                      <img
                        src={p.placeholder}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/40" />
                      <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                        <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{p.badge}</span>
                        <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight">{p.type}</span>
                      </div>
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="font-heading text-[13px] font-semibold text-white">{p.nights}</span>
                        <span className="font-heading text-[13px] font-semibold text-accent-soft">{p.hotelShort}</span>
                      </div>
                    </div>
                    <div className="p-5 pb-6">
                      <h3 className="font-heading text-lg font-bold text-midnight mb-1">{p.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <CalendarIcon />{p.dates}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.includes.map((f) => (
                          <span key={f} className="text-[11px] font-semibold text-accent bg-accent-pale px-2 py-0.5 rounded-md">{f}</span>
                        ))}
                      </div>
                      <div className="h-px bg-slate-200 mb-4" />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase">From</div>
                          <div className="font-heading text-[22px] font-bold text-accent">{formatPrice(p.price, currency)}</div>
                        </div>
                        <span className="text-accent font-heading text-[13px] font-semibold flex items-center gap-1">
                          Details <ArrowIcon size={14} color="#4DA3E8" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
