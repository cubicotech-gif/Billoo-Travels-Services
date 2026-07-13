"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/lib/currency";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckIcon, CalendarIcon, ArrowIcon } from "@/components/ui/Icons";

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
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800";

function fmtPrice(p: DbPackage, currency: string) {
  const prices: Record<string, number> = { PKR: p.price_pkr, USD: p.price_usd, SAR: p.price_sar };
  const sym: Record<string, string> = { PKR: "PKR ", USD: "$", SAR: "SAR " };
  return `${sym[currency] || ""}${(prices[currency] ?? p.price_pkr).toLocaleString()}`;
}

export default function HajjPackages() {
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { currency } = useCurrency();

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((d) => {
        const all: DbPackage[] = Array.isArray(d.packages) ? d.packages : [];
        setPackages(all.filter((p) => (p.type || "").toLowerCase() === "hajj"));
      })
      .catch(() => setPackages([]))
      .finally(() => setLoaded(true));
  }, []);

  // Don't render the section until we know there are real Hajj packages to show
  if (!loaded || packages.length === 0) return null;

  return (
    <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-14">
          <SectionHeading label="Choose Your Journey" title="Hajj" highlight="Packages" centered />
          <p className="text-slate-500 max-w-[540px] mx-auto mt-4 text-[15px] leading-relaxed">
            Transparent, all-inclusive packages. Register your interest and an advisor will help you pick
            the one that fits your budget and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <div className="group h-full bg-white rounded-[20px] border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_18px_44px_rgba(77,163,232,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={p.img || FALLBACK_IMG}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-accent text-white text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[1px] text-white/90">
                    {p.nights}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-midnight leading-snug">{p.title}</h3>
                  <div className="text-[13px] text-slate-500 mt-1.5">{p.hotel_short || p.hotel}</div>

                  {p.dates && (
                    <div className="flex items-center gap-1.5 mt-3 text-[12px] text-slate-400">
                      <CalendarIcon size={13} color="#94A3B8" />
                      {p.dates}
                    </div>
                  )}

                  {Array.isArray(p.includes) && p.includes.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4">
                      {p.includes.slice(0, 4).map((inc) => (
                        <div key={inc} className="flex items-start gap-1.5">
                          <span className="mt-0.5 shrink-0"><CheckIcon size={12} color="#10B981" /></span>
                          <span className="text-[12px] text-slate-600 leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-5 flex items-end justify-between border-t border-slate-100 mt-5">
                    <div>
                      <div className="font-mono text-[10px] tracking-[1px] uppercase text-slate-400">From</div>
                      <div className="font-heading text-xl font-bold text-midnight">{fmtPrice(p, currency)}</div>
                    </div>
                    <Link
                      href={`/packages/${p.id}`}
                      className="inline-flex items-center gap-1.5 bg-midnight text-white px-4 py-2.5 rounded-lg font-heading text-[13px] font-semibold no-underline hover:bg-midnight-light transition-all"
                    >
                      Details
                      <ArrowIcon size={13} color="#fff" />
                    </Link>
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
