"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckIcon, CalendarIcon, ArrowIcon, SearchIcon, KaabaIcon } from "@/components/ui/Icons";
import { formatPkgPrice, pkgCurrency, type PkgCurrency } from "@/lib/packageCurrency";
import { useHajjPackages, type DbPackage } from "@/lib/useHajjPackages";
import { HAJJ_AUDIENCES, HAJJ_CURRENCY_NOTE } from "@/lib/hajj";
import { DURATION_BUCKETS, packageBucket, tiersOf, matchesSearch } from "@/lib/packageFilters";

export function PackageCard({
  p,
  i,
  onRegister,
}: {
  p: DbPackage;
  i: number;
  /** Offers a "Register for this package" action that pre-fills the form. */
  onRegister?: (p: DbPackage) => void;
}) {
  return (
    <ScrollReveal delay={i * 0.06}>
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

          {/* Package code — how clients and staff refer to this package */}
          {p.code && (
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-midnight font-mono text-[11px] font-bold tracking-[1.5px] px-3 py-1.5 rounded-lg shadow-sm">
              {p.code.toUpperCase()}
            </span>
          )}
          {p.badge && (
            <span className="absolute top-4 right-4 bg-accent text-white text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full">
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
            <div className="grid grid-cols-1 gap-y-2 mt-4">
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
              <div className="font-mono text-[10px] tracking-[1px] uppercase text-slate-400">From · per person</div>
              <div className="font-heading text-xl font-bold text-midnight">{formatPkgPrice(p)}</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/packages/${p.id}/brochure`}
                target="_blank"
                rel="noopener noreferrer"
                title="Download PDF brochure"
                className="inline-flex items-center gap-1 text-accent border border-accent/30 px-4 py-3 rounded-lg font-heading text-[13px] font-semibold no-underline hover:bg-accent-pale transition-all"
              >
                PDF
              </a>
              <Link
                href={`/packages/${p.id}`}
                className="inline-flex items-center gap-1.5 bg-midnight text-white px-4 py-3 rounded-lg font-heading text-[13px] font-semibold no-underline hover:bg-midnight-light transition-all"
              >
                Details
                <ArrowIcon size={13} color="#fff" />
              </Link>
            </div>
          </div>

          {onRegister && (
            <button
              onClick={() => onRegister(p)}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-accent-pale text-accent-dark border border-accent/25 py-3 rounded-lg font-heading text-[13px] font-semibold cursor-pointer hover:bg-accent hover:text-white hover:border-accent transition-all"
            >
              <KaabaIcon size={14} color="currentColor" />
              Register for {p.code ? p.code.toUpperCase() : "this package"}
            </button>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── Filter chip ───
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full font-heading text-[13px] font-semibold border cursor-pointer transition-all ${
        active
          ? "bg-midnight text-white border-midnight"
          : "bg-white text-slate-500 border-slate-200 hover:border-accent hover:text-accent-dark"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * One row of filter chips. On a phone the chips stay on a single line that
 * scrolls sideways (bleeding to the screen edge so it reads as swipeable)
 * rather than wrapping into a tall ragged block; from `sm` up they wrap and
 * centre as before.
 */
function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-slate-400 mb-2 sm:hidden">
        {label}
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="hidden sm:inline font-mono text-[10px] tracking-[1.5px] uppercase text-slate-400 mr-1">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

interface HajjPackagesProps {
  /** Optional packages supplied by a parent that already fetched them. */
  packages?: DbPackage[];
  /** Whether the parent-supplied packages have finished loading. */
  loaded?: boolean;
  /** Pre-fills the registration form with the chosen package. */
  onRegister?: (p: DbPackage) => void;
}

export default function HajjPackages({
  packages: extPackages,
  loaded: extLoaded,
  onRegister,
}: HajjPackagesProps = {}) {
  const hasExternal = extPackages !== undefined;
  const self = useHajjPackages(!hasExternal);
  const packages = extPackages ?? self.packages;
  const loaded = hasExternal ? extLoaded ?? true : self.loaded;

  // Pakistan is the primary market, so its price list is the default view.
  const [currency, setCurrency] = useState<PkgCurrency>("SAR");
  const [duration, setDuration] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Only the chosen audience's price list — the same 23 journeys either way.
  const priceList = useMemo(
    () => packages.filter((p) => pkgCurrency(p) === currency),
    [packages, currency]
  );

  const tiers = useMemo(() => tiersOf(priceList), [priceList]);

  // Duration buckets that actually contain packages in this price list.
  const buckets = useMemo(
    () => DURATION_BUCKETS.filter((b) => priceList.some((p) => packageBucket(p)?.key === b.key)),
    [priceList]
  );

  const results = useMemo(
    () =>
      priceList.filter(
        (p) =>
          (duration === "all" || packageBucket(p)?.key === duration) &&
          (tier === "all" || (p.badge || "").trim() === tier) &&
          matchesSearch(p, search)
      ),
    [priceList, duration, tier, search]
  );

  const filtered = duration !== "all" || tier !== "all" || search.trim() !== "";

  function reset() {
    setDuration("all");
    setTier("all");
    setSearch("");
  }

  // Don't render the section until we know there are real Hajj packages to show
  if (!loaded || packages.length === 0) return null;

  return (
    <section id="packages" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 md:py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-7 sm:mb-10">
          <SectionHeading label="Explore & Compare" title="Hajj 2027" highlight="Packages" centered />
          <p className="hidden sm:block text-slate-500 max-w-[560px] mx-auto mt-4 text-[15px] leading-relaxed">
            Every package is all-inclusive and quoted per person. Browse freely — registration is a
            separate, free step you can take whenever you are ready.
          </p>
        </div>

        {/* ── Step 1 · Who is travelling → which price list ── */}
        <div className="max-w-[860px] mx-auto mb-7 sm:mb-10">
          <div className="text-center font-mono text-[11px] tracking-[2px] uppercase text-accent mb-3 sm:mb-4">
            Step 1 · Who is travelling?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HAJJ_AUDIENCES.map((a) => {
              const active = currency === a.currency;
              const count = packages.filter((p) => pkgCurrency(p) === a.currency).length;
              return (
                <button
                  key={a.currency}
                  onClick={() => {
                    setCurrency(a.currency);
                    reset();
                  }}
                  className={`text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 sm:gap-4 ${
                    active
                      ? "bg-white border-accent shadow-[0_10px_30px_rgba(77,163,232,0.16)]"
                      : "bg-white/60 border-slate-200 hover:border-accent/50"
                  }`}
                >
                  <span className="text-2xl leading-none shrink-0">{a.flag}</span>
                  <span className="flex-1">
                    <span className="block font-heading text-[15px] font-bold text-midnight">{a.title}</span>
                    <span className="block text-[12.5px] text-slate-500 mt-0.5">
                      {a.desc}
                      {count > 0 && <span className="text-slate-400"> · {count} packages</span>}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      active ? "border-accent bg-accent" : "border-slate-300"
                    }`}
                  >
                    {active && <CheckIcon size={11} color="#fff" />}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed mt-3 sm:mt-4 bg-accent-pale/60 border border-accent/15 rounded-xl px-4 sm:px-5 py-3">
            <span className="font-semibold text-midnight">Same package, two price lists.</span>{" "}
            {HAJJ_CURRENCY_NOTE}
          </p>
        </div>

        {/* ── Step 2 · Narrow it down ── */}
        <div className="max-w-[980px] mx-auto mb-8 sm:mb-10">
          <div className="text-center font-mono text-[11px] tracking-[2px] uppercase text-accent mb-3 sm:mb-4">
            Step 2 · Narrow it down
          </div>

          <div className="relative mb-4 sm:mb-5 max-w-[440px] mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon size={16} color="#94A3B8" />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code (e.g. UB 009), hotel or name"
              className="w-full pl-11 pr-4 py-3 border-[1.5px] border-slate-200 rounded-full font-body text-sm text-slate-700 bg-white transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
            />
          </div>

          {buckets.length > 1 && (
            <FilterRow label="Duration">
              <Chip active={duration === "all"} onClick={() => setDuration("all")}>
                Any length
              </Chip>
              {buckets.map((b) => (
                <Chip key={b.key} active={duration === b.key} onClick={() => setDuration(b.key)}>
                  {b.label}
                </Chip>
              ))}
            </FilterRow>
          )}

          {tiers.length > 1 && (
            <FilterRow label="Tier">
              <Chip active={tier === "all"} onClick={() => setTier("all")}>
                All tiers
              </Chip>
              {tiers.map((t) => (
                <Chip key={t} active={tier === t} onClick={() => setTier(t)}>
                  {t}
                </Chip>
              ))}
            </FilterRow>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-4 sm:mt-5 text-[13px] text-slate-500">
            <span>
              Showing <span className="font-semibold text-midnight">{results.length}</span> of{" "}
              {priceList.length} packages in {currency}
            </span>
            {filtered && (
              <button
                onClick={reset}
                className="text-accent font-heading text-[13px] font-semibold bg-transparent border-none cursor-pointer hover:underline p-0"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {results.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-slate-200 max-w-[560px] mx-auto">
            <p className="font-heading text-[16px] font-bold text-midnight mb-2">
              No packages match those filters
            </p>
            <p className="text-[14px] text-slate-500 mb-5">
              Try a different duration or clear the filters to see all {priceList.length} packages.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-midnight text-white px-5 py-2.5 rounded-lg font-heading text-[13px] font-semibold border-none cursor-pointer hover:bg-midnight-light transition-all"
            >
              Show all packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p, i) => (
              <PackageCard key={p.id} p={p} i={i} onRegister={onRegister} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
