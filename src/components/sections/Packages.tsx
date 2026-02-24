"use client";

import { useState } from "react";
import { PACKAGES, formatPrice } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TABS = ["All", "Umrah", "Hajj"] as const;

export default function Packages() {
  const [tab, setTab] = useState<string>("All");
  const { currency } = useCurrency();
  const filtered = PACKAGES.filter((p) => tab === "All" || p.type === tab);

  return (
    <section id="packages" className="py-24 px-6 md:px-9 bg-surface-alt">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <SectionHeading label="Featured Packages" title="Curated" highlight="Journeys" />
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer">
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={p.placeholder}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/40" />
                  <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                    <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">
                      {p.badge}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight backdrop-blur-lg">
                      {p.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="font-heading text-[13px] font-semibold text-white">
                      {p.nights}
                    </span>
                    <span className="font-heading text-[13px] font-semibold text-accent-soft">
                      {p.hotelShort}
                    </span>
                  </div>
                </div>
                <div className="p-5 pb-6">
                  <h3 className="font-heading text-lg font-bold text-midnight mb-1">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <CalendarIcon />
                    {p.dates}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.includes.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] font-semibold text-accent bg-accent-pale px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="h-px bg-slate-200 mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mb-0.5">
                        From
                      </div>
                      <div className="font-heading text-[22px] font-bold text-accent">
                        {formatPrice(p.price, currency)}
                      </div>
                    </div>
                    <button className="bg-transparent border-none text-accent font-heading text-[13px] font-semibold cursor-pointer flex items-center gap-1 hover:gap-2 transition-all">
                      View <ArrowIcon size={14} color="#4DA3E8" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
