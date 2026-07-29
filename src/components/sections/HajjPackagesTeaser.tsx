"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { PackageCard } from "@/components/sections/HajjPackages";
import { pkgCurrency } from "@/lib/packageCurrency";
import type { DbPackage } from "@/lib/useHajjPackages";

function scrollToPackages(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
}

interface Props {
  packages: DbPackage[];
  loaded: boolean;
}

/**
 * A curiosity-driving "peek" at the Hajj packages, shown high on the landing
 * page right beneath the registration hero. It surfaces a few real package
 * cards plus a prominent button that scrolls down to the full packages
 * section — so a visitor sees packages exist on first glance, not only the
 * registration form. Renders nothing until real Hajj packages are available.
 */
export default function HajjPackagesTeaser({ packages, loaded }: Props) {
  if (!loaded || packages.length === 0) return null;

  // Show a small, representative peek — the first few published packages.
  const preview = packages.slice(0, 3);

  // A quick "from" price range to spark interest without opening every card.
  const currencies = Array.from(new Set(packages.map((p) => pkgCurrency(p))));

  return (
    <section className="relative py-16 md:py-20 px-6 md:px-9 bg-surface-alt overflow-hidden">
      <div className="absolute -top-24 right-[-6%] w-[420px] h-[420px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(77,163,232,0.10)_0%,transparent_70%)]" />

      <div className="relative max-w-[1180px] mx-auto">
        {/* Heading + primary CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-accent-pale border border-accent/25 text-accent font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              NEW FOR 2027 · PACKAGES NOW LIVE
            </span>
            <h2 className="font-display text-midnight text-[30px] md:text-[40px] leading-[1.05] max-w-[620px]">
              Curious about your{" "}
              <span className="italic text-accent font-normal">Hajj 2027 package?</span>
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[540px] mt-4">
              Registration is free — but here&apos;s a first look at the all-inclusive packages
              you&apos;ll choose from. Explore the options, then reserve your place in a minute.
            </p>
          </div>

          <a
            href="#packages"
            onClick={scrollToPackages}
            className="shrink-0 inline-flex items-center gap-2 bg-midnight text-white px-6 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-midnight-light transition-all hover:-translate-y-px hover:shadow-lg self-start"
          >
            View All Packages
            <ArrowIcon size={15} color="#fff" />
          </a>
        </div>

        {/* Package glances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map((p, i) => (
            <PackageCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {/* Footnote row — reassure + repeat the invitation */}
        <ScrollReveal>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center">
            <span className="inline-flex items-center gap-2 text-slate-500 text-[13.5px]">
              <CheckIcon size={14} color="#10B981" />
              {packages.length} package{packages.length > 1 ? "s" : ""} available
              {currencies.length > 0 && (
                <>
                  {" · "}
                  priced in {currencies.join(" & ")}
                </>
              )}
            </span>
            <a
              href="#packages"
              onClick={scrollToPackages}
              className="inline-flex items-center gap-1.5 text-accent font-heading text-[13.5px] font-semibold no-underline hover:gap-2.5 transition-all"
            >
              Compare every package
              <ArrowIcon size={14} color="#4DA3E8" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
