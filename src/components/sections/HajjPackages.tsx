"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckIcon, CalendarIcon, ArrowIcon } from "@/components/ui/Icons";
import { formatPkgPrice, pkgCurrency, PACKAGE_CURRENCIES, type PkgCurrency } from "@/lib/packageCurrency";

interface DbPackage {
  id: number;
  type: string;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  currency: string | null;
  includes: string[];
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  badge: string | null;
  img: string | null;
}

const CURRENCY_TITLE: Record<PkgCurrency, string> = {
  USD: "US Dollar Packages",
  SAR: "Saudi Riyal Packages",
  PKR: "Rupee Packages",
};

function PackageCard({ p, i }: { p: DbPackage; i: number }) {
  return (
    <ScrollReveal delay={i * 0.08}>
      <div className="group h-full bg-white rounded-[20px] border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_18px_44px_rgba(77,163,232,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div className="relative h-[200px] overflow-hidden">
          {p.img ? (
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight to-midnight-light">
              <span className="font-mono text-[10px] tracking-[3px] text-white/25">BILLOO TRAVELS</span>
            </div>
          )}
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
              <div className="font-heading text-xl font-bold text-midnight">{formatPkgPrice(p)}</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/packages/${p.id}/brochure`}
                target="_blank"
                rel="noopener noreferrer"
                title="Download PDF brochure"
                className="inline-flex items-center gap-1 text-accent border border-accent/30 px-3 py-2.5 rounded-lg font-heading text-[13px] font-semibold no-underline hover:bg-accent-pale transition-all"
              >
                PDF
              </a>
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
      </div>
    </ScrollReveal>
  );
}

export default function HajjPackages() {
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<"all" | PkgCurrency>("all");

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

  // Group Hajj packages by their native currency (USD / SAR).
  const groups = useMemo(() => {
    const g: Record<PkgCurrency, DbPackage[]> = { USD: [], SAR: [], PKR: [] };
    packages.forEach((p) => g[pkgCurrency(p)].push(p));
    return g;
  }, [packages]);

  // Which currency groups actually have packages
  const activeCurrencies = PACKAGE_CURRENCIES.filter((c) => groups[c].length > 0);

  // Don't render the section until we know there are real Hajj packages to show
  if (!loaded || packages.length === 0) return null;

  const showTabs = activeCurrencies.length > 1;
  const visibleCurrencies = tab === "all" ? activeCurrencies : activeCurrencies.filter((c) => c === tab);

  return (
    <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-10">
          <SectionHeading label="Choose Your Journey" title="Hajj" highlight="Packages" centered />
          <p className="text-slate-500 max-w-[540px] mx-auto mt-4 text-[15px] leading-relaxed">
            Transparent, all-inclusive packages. Register your interest and an advisor will help you pick
            the one that fits your budget and comfort.
          </p>
        </div>

        {/* Currency filter tabs */}
        {showTabs && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {(["all", ...activeCurrencies] as const).map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={`px-5 py-2 rounded-full font-heading text-[13px] font-semibold border cursor-pointer transition-all ${
                  tab === c
                    ? "bg-midnight text-white border-midnight"
                    : "bg-white text-slate-500 border-slate-200 hover:border-accent"
                }`}
              >
                {c === "all" ? "All Packages" : c === "USD" ? "$ USD" : "SAR"}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-14">
          {visibleCurrencies.map((c) => (
            <div key={c}>
              {activeCurrencies.length > 1 && (
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-heading text-lg font-bold text-midnight">{CURRENCY_TITLE[c]}</h3>
                  <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-accent bg-accent-pale px-2.5 py-1 rounded-md">
                    Priced in {c}
                  </span>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups[c].map((p, i) => (
                  <PackageCard key={p.id} p={p} i={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
