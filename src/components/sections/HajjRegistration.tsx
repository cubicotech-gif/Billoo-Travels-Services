"use client";

import Link from "next/link";
import { CheckIcon, ArrowIcon, KaabaIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HajjLeadForm from "@/components/sections/HajjLeadForm";
import { HAJJ, HAJJ_BENEFITS, HAJJ_TRUST } from "@/lib/hajj";

export default function HajjRegistration() {
  return (
    <section id="hajj-registration" className="relative bg-surface py-16 md:py-20 px-6 md:px-9 overflow-hidden">
      {/* Soft brand glows on the light backdrop */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(77,163,232,0.14)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 w-[460px] h-[460px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(126,200,255,0.12)_0%,transparent_70%)]" />

      <div className="relative max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="relative rounded-[28px] bg-white border border-slate-200/80 shadow-[0_30px_80px_-30px_rgba(11,22,40,0.28)] overflow-hidden">
            {/* Accent top hairline */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-soft to-accent" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center px-7 md:px-12 py-11 md:py-14">
              {/* ── Promo copy ── */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    REGISTRATION OPEN
                  </span>
                  <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                    Limited Seats
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-accent to-transparent" />
                  <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent">
                    Hajj {HAJJ.year} · {HAJJ.hijri}
                  </span>
                </div>

                <h2 className="font-display text-midnight leading-[0.98] text-[38px] md:text-[54px] mb-4">
                  Hajj {HAJJ.year} Registration{" "}
                  <span className="italic text-accent font-normal">Now Open</span>
                </h2>

                <p className="text-slate-500 text-[15px] leading-relaxed max-w-[540px] mb-7">
                  Reserve your place for the sacred journey of {HAJJ.year}. Register your details today and
                  our Hajj advisors will call you back with package options, pricing and next steps —
                  <span className="font-semibold text-ink"> no payment required to register.</span>
                </p>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px] mb-8">
                  {HAJJ_BENEFITS.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckIcon size={12} color="#10B981" />
                      </span>
                      <span className="text-slate-600 text-[13.5px] leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                {/* Trust mini-stats — build confidence right on the promo */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-slate-100">
                  {HAJJ_TRUST.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-heading text-xl font-bold text-midnight">{s.value}</div>
                      <div className="font-mono text-[10px] tracking-[1px] uppercase text-slate-400 mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}

                  <Link
                    href={HAJJ.landingPath}
                    className="ml-auto inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-accent no-underline hover:gap-2.5 transition-all"
                  >
                    <KaabaIcon size={16} color="#4DA3E8" />
                    Full Hajj {HAJJ.year} guide
                    <ArrowIcon size={14} color="#4DA3E8" />
                  </Link>
                </div>
              </div>

              {/* ── Registration form ── */}
              <div className="bg-white rounded-[20px] p-7 md:p-8 border border-slate-200 shadow-[0_20px_50px_-20px_rgba(11,22,40,0.25)]">
                <HajjLeadForm source="Homepage Promo" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
