"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import HajjLeadForm from "@/components/sections/HajjLeadForm";
import GoogleReviews from "@/components/sections/GoogleReviews";
import Licenses from "@/components/sections/Licenses";
import HajjPackages from "@/components/sections/HajjPackages";
import { useHajjPackages, type DbPackage } from "@/lib/useHajjPackages";
import { pkgAmount, pkgCurrency, formatMoney, type PkgCurrency } from "@/lib/packageCurrency";
import { packageDays } from "@/lib/packageFilters";
import {
  CheckIcon,
  ArrowIcon,
  KaabaIcon,
  ChevronDownIcon,
  ClockIcon,
  PhoneIcon,
  SearchIcon,
} from "@/components/ui/Icons";
import { ICON_MAP } from "@/components/ui/Icons";
import { CONTACT } from "@/lib/data";
import {
  HAJJ,
  HAJJ_BENEFITS,
  HAJJ_TRUST,
  HAJJ_WHY,
  HAJJ_STEPS,
  HAJJ_INCLUDED,
  HAJJ_FAQ,
} from "@/lib/hajj";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const FORM_ANCHOR = "register-form";

/**
 * Where a "register" action should land. Below `lg` the form sits underneath
 * the intro copy, so aim at the form itself — otherwise a phone user lands on
 * a heading and has to scroll again. From `lg` up the two share a row, so aim
 * at the section and keep the heading in view.
 */
function scrollToRegister() {
  scrollTo(window.innerWidth < 1024 ? FORM_ANCHOR : "register");
}

export default function HajjLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  // The package a visitor chose to register for — pre-fills the form below.
  const [picked, setPicked] = useState<DbPackage | null>(null);

  // Fetch Hajj packages once and share with the hero fork + packages section.
  const { packages, loaded: packagesLoaded } = useHajjPackages();
  const hasPackages = packagesLoaded && packages.length > 0;

  // Headline numbers for the "explore" path: how many journeys, how long, and
  // the lowest price in each currency — so the choice is informed, not blind.
  const summary = useMemo(() => {
    const from: Partial<Record<PkgCurrency, number>> = {};
    let minDays = Infinity;
    let maxDays = 0;
    packages.forEach((p) => {
      const c = pkgCurrency(p);
      const amount = pkgAmount(p);
      if (amount > 0 && (from[c] === undefined || amount < from[c]!)) from[c] = amount;
      const days = packageDays(p);
      if (days > 0) {
        minDays = Math.min(minDays, days);
        maxDays = Math.max(maxDays, days);
      }
    });
    // Each journey is published once per currency, so count one price list.
    const journeys = packages.filter((p) => pkgCurrency(p) === "SAR").length || packages.length;
    return {
      journeys,
      days: maxDays ? `${minDays}–${maxDays} days` : "",
      from: (["SAR", "USD"] as PkgCurrency[])
        .filter((c) => from[c])
        .map((c) => formatMoney(from[c]!, c)),
    };
  }, [packages]);

  function registerFor(p: DbPackage) {
    setPicked(p);
    scrollToRegister();
  }

  return (
    <InnerLayout>
      {/* ══════════ HERO — one clear fork: explore, or register ══════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={HAJJ.heroImage}
          alt="The Holy Kaaba in Makkah"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,22,40,0.97) 0%, rgba(11,22,40,0.92) 48%, rgba(21,37,69,0.8) 100%)",
          }}
        />
        <div className="absolute top-[12%] right-[16%] w-[420px] h-[420px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(77,163,232,0.14)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-[1080px] mx-auto px-6 md:px-9 pt-24 sm:pt-28 pb-14 sm:pb-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 bg-emerald-400/12 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              REGISTRATION OPEN
            </span>
            <span className="inline-flex items-center gap-2 bg-amber-400/12 border border-amber-400/30 text-amber-300 font-mono text-[10px] sm:text-[11px] font-semibold tracking-[1px] px-3 sm:px-3.5 py-1.5 rounded-full">
              Limited Seats<span className="hidden sm:inline"> · First Come First Served</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent" />
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent-soft">
              Hajj {HAJJ.year} · {HAJJ.hijri}
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>

          <h1 className="font-display text-white leading-[1.02] sm:leading-[0.98] text-[33px] sm:text-[46px] md:text-[62px] mb-4 sm:mb-5">
            Your Journey to the House of Allah{" "}
            <span className="italic text-accent-soft font-normal whitespace-nowrap">Begins Here</span>
          </h1>

          <p className="text-white/70 text-[14.5px] sm:text-[16px] leading-relaxed max-w-[620px] mx-auto mb-7 sm:mb-10">
            Billoo Travels — a government-approved Hajj operator serving pilgrims since 1969.
            <span className="hidden sm:inline">
              {" "}Browse the {HAJJ.year} packages, or register free and let an advisor call you back.
            </span>
          </p>

          {/* ── The fork ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 max-w-[860px] mx-auto text-left">
            {/* Path 1 — explore */}
            {hasPackages ? (
              <button
                onClick={() => scrollTo("packages")}
                className="group h-full bg-white rounded-2xl p-5 sm:p-6 md:p-7 border-none cursor-pointer text-left transition-all hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)] flex flex-col"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-accent mb-2.5 sm:mb-3">
                  <SearchIcon size={13} color="#4DA3E8" />
                  See what&apos;s on offer
                </span>
                <span className="block font-heading text-[19px] sm:text-[21px] md:text-[23px] font-bold text-midnight leading-tight mb-1.5 sm:mb-2">
                  Explore Hajj {HAJJ.year} Packages
                </span>
                <span className="block text-[13px] sm:text-[13.5px] text-slate-500 leading-relaxed mb-3.5 sm:mb-4">
                  {summary.journeys} all-inclusive packages
                  {summary.days && ` · ${summary.days}`}
                  {summary.from.length > 0 && (
                    <> · from {summary.from.join(" / ")} per person</>
                  )}
                  .
                  <span className="hidden sm:inline">
                    {" "}Compare hotels, dates and room prices before you decide.
                  </span>
                </span>
                <span className="mt-auto inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  Explore packages
                  <ArrowIcon size={15} color="#4DA3E8" />
                </span>
              </button>
            ) : (
              <div className="h-full bg-white/10 border border-white/15 backdrop-blur-lg rounded-2xl p-6 md:p-7 flex flex-col justify-center">
                <span className="block font-heading text-[19px] font-bold text-white mb-2">
                  Packages coming soon
                </span>
                <span className="block text-[13.5px] text-white/60 leading-relaxed">
                  Register now and we will send you the Hajj {HAJJ.year} packages the moment they
                  are released.
                </span>
              </div>
            )}

            {/* Path 2 — register */}
            <button
              onClick={() => scrollToRegister()}
              className="group h-full bg-accent rounded-2xl p-5 sm:p-6 md:p-7 border-none cursor-pointer text-left transition-all hover:-translate-y-1 hover:bg-accent-dark hover:shadow-[0_22px_50px_rgba(77,163,232,0.35)] flex flex-col"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-white/80 mb-2.5 sm:mb-3">
                <KaabaIcon size={13} color="#ffffff" />
                Ready to reserve
              </span>
              <span className="block font-heading text-[19px] sm:text-[21px] md:text-[23px] font-bold text-white leading-tight mb-1.5 sm:mb-2">
                Register for Hajj {HAJJ.year}
              </span>
              <span className="block text-[13px] sm:text-[13.5px] text-white/85 leading-relaxed mb-3.5 sm:mb-4">
                Free, under a minute, and no payment required.
                <span className="hidden sm:inline">
                  {" "}An advisor calls you back with package options, pricing and next steps.
                </span>
              </span>
              <span className="mt-auto inline-flex items-center gap-2 font-heading text-sm font-semibold text-white group-hover:gap-3 transition-all">
                Register free
                <ArrowIcon size={15} color="#fff" />
              </span>
            </button>
          </div>

          <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-3 text-white/70 text-[13.5px] no-underline hover:text-white transition-all"
            >
              <PhoneIcon size={14} color="currentColor" />
              Prefer to talk? Message an advisor on WhatsApp
            </a>
          </div>

          <div className="mt-6 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3 max-w-[700px] mx-auto text-left">
            {HAJJ_BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                  <CheckIcon size={15} color="#34D399" />
                </span>
                <span className="text-white/70 text-[13.5px] leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TRUST STRIP ══════════ */}
      <section className="bg-midnight border-t border-white/5 py-10 px-6 md:px-9">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {HAJJ_TRUST.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="font-mono text-[10px] text-white/45 tracking-[2px] mt-2 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PATH 1 · EXPLORE THE PACKAGES ══════════ */}
      <HajjPackages packages={packages} loaded={packagesLoaded} onRegister={registerFor} />

      {/* ══════════ PATH 2 · REGISTER ══════════ */}
      <section
        id="register"
        className="scroll-mt-24 relative py-14 sm:py-20 md:py-24 px-6 md:px-9 bg-surface-alt overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(77,163,232,0.14)_0%,transparent_70%)]" />

        <div className="relative max-w-[1180px] mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_460px] gap-8 lg:gap-x-14 lg:gap-y-10 items-start">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <SectionHeading label="Simple & Stress-Free" title="Register for" highlight={`Hajj ${HAJJ.year}`} />
            <p className="text-slate-500 text-[14.5px] sm:text-[15px] leading-relaxed max-w-[540px] mt-3 sm:mt-4">
              Registration is free and non-binding — you are reserving your place in the queue, not
              paying for a package.
              {hasPackages && (
                <>
                  {" "}Not sure which one yet?{" "}
                  <button
                    onClick={() => scrollTo("packages")}
                    className="text-accent font-semibold bg-transparent border-none p-0 cursor-pointer hover:underline"
                  >
                    Browse the packages
                  </button>
                  <span className="hidden sm:inline"> — an advisor will help you choose either way</span>.
                </>
              )}
            </p>
          </div>

          <div
            id={FORM_ANCHOR}
            className="order-2 w-full scroll-mt-20 sm:scroll-mt-24 bg-white rounded-[20px] p-6 sm:p-7 md:p-8 border border-slate-200 shadow-[0_24px_60px_-24px_rgba(11,22,40,0.3)] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28"
          >
            <HajjLeadForm
              source={picked ? `Hajj Landing · ${picked.code || picked.title}` : "Hajj Landing"}
              packageCode={picked?.code ?? null}
              packageTitle={picked?.title ?? null}
              onClearPackage={() => setPicked(null)}
            />
          </div>

          <div className="order-3 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:col-start-1 lg:row-start-2">
            {HAJJ_STEPS.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.06}>
                <div className="h-full bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 flex sm:block gap-4">
                  <div className="font-display text-3xl sm:text-4xl text-accent/25 leading-none shrink-0 sm:mb-3">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-midnight mb-1.5">{s.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY REGISTER WITH BILLOO ══════════ */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              label="Why Families Trust Us"
              title="A Hajj Handled With"
              highlight="Care & Integrity"
              centered
            />
            <p className="text-slate-500 max-w-[560px] mx-auto mt-4 text-[15px] leading-relaxed">
              Five decades of guiding pilgrims to Makkah and Madinah — with the honesty, comfort and
              reverence this journey deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HAJJ_WHY.map((w, i) => {
              const Icon = ICON_MAP[w.icon] || CheckIcon;
              return (
                <ScrollReveal key={w.title} delay={i * 0.06}>
                  <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.12)] hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-accent-pale flex items-center justify-center mb-5">
                      <Icon size={22} color="#4DA3E8" />
                    </div>
                    <h3 className="font-heading text-[17px] font-bold text-midnight mb-2">{w.title}</h3>
                    <p className="text-[13.5px] text-slate-500 leading-relaxed">{w.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ WHAT'S INCLUDED ══════════ */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-accent-pale -z-10" />
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_18px_50px_rgba(11,22,40,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1100"
                  alt="Masjid al-Haram, Makkah"
                  className="w-full h-[340px] md:h-[460px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 bg-white rounded-2xl px-6 py-4 border border-slate-200 shadow-[0_12px_30px_rgba(11,22,40,0.12)]">
                <div className="font-heading text-2xl font-bold text-midnight">All-Inclusive</div>
                <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-slate-400 mt-1">
                  No Hidden Costs
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">
                What You Get
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-midnight mb-5 leading-tight">
                Every Hajj Package{" "}
                <span className="font-display italic text-accent font-normal">Includes</span>
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                From the moment you land until your safe return, every detail is arranged for you — so
                you can focus entirely on worship.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {HAJJ_INCLUDED.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckIcon size={12} color="#10B981" />
                    </span>
                    <span className="text-slate-600 text-[14px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12.5px] text-slate-400 leading-relaxed mt-6">
                Inclusions vary slightly by package — the exact list for each one is on its package
                page and PDF brochure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ LICENSED & VERIFIED DOCUMENTS ══════════ */}
      <Licenses tone="surface" />

      {/* ══════════ REAL GOOGLE REVIEWS ══════════ */}
      <GoogleReviews tone="light" />

      {/* ══════════ FAQ ══════════ */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[820px] mx-auto">
          <div className="text-center mb-12">
            <SectionHeading
              label="Good to Know"
              title="Hajj Registration"
              highlight="Questions"
              centered
            />
          </div>
          <div className="flex flex-col gap-3">
            {HAJJ_FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-[0_6px_20px_rgba(11,22,40,0.06)]"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 bg-transparent border-none cursor-pointer"
                  >
                    <span className="font-heading text-[15px] font-semibold text-midnight">{f.q}</span>
                    <span className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                      <ChevronDownIcon size={18} color="#4DA3E8" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[14px] text-slate-500 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative py-20 md:py-24 px-6 md:px-9 overflow-hidden bg-midnight">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(77,163,232,0.12)_0%,transparent_70%)]" />
        <div className="relative max-w-[720px] mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-emerald-400/12 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full mb-6">
              <ClockIcon size={13} color="#34D399" />
              SEATS ARE LIMITED
            </div>
            <h2 className="font-display text-white text-[34px] md:text-[46px] leading-[1.02] mb-5">
              Don&apos;t Miss Hajj {HAJJ.year}.{" "}
              <span className="italic text-accent-soft font-normal">Reserve Your Place.</span>
            </h2>
            <p className="text-white/65 text-[15px] leading-relaxed max-w-[520px] mx-auto mb-9">
              Registration is free and takes under a minute. Secure your spot in the queue before our
              Saudi quota allocation fills for the season.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToRegister()}
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold border-none cursor-pointer hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
              >
                <KaabaIcon size={16} color="#fff" />
                Register for Hajj {HAJJ.year}
              </button>
              {hasPackages ? (
                <button
                  onClick={() => scrollTo("packages")}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-lg px-7 py-3.5 rounded-lg font-heading text-sm font-semibold cursor-pointer hover:bg-white/20 transition-all"
                >
                  View Packages
                  <ArrowIcon size={15} color="#fff" />
                </button>
              ) : (
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-lg px-7 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-white/20 transition-all"
                >
                  View Packages
                  <ArrowIcon size={15} color="#fff" />
                </Link>
              )}
            </div>
            <p className="font-mono text-[11px] tracking-[1px] text-white/40 mt-8">
              Or call us directly · {CONTACT.phone}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </InnerLayout>
  );
}
