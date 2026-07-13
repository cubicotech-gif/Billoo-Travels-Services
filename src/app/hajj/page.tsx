"use client";

import { useState } from "react";
import Link from "next/link";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import HajjLeadForm from "@/components/sections/HajjLeadForm";
import {
  CheckIcon,
  ArrowIcon,
  KaabaIcon,
  ShieldIcon,
  ChevronDownIcon,
  QuoteIcon,
  ClockIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { ICON_MAP } from "@/components/ui/Icons";
import { CONTACT, TESTIMONIALS, getImageSrc } from "@/lib/data";
import {
  HAJJ,
  HAJJ_BENEFITS,
  HAJJ_TRUST,
  HAJJ_WHY,
  HAJJ_STEPS,
  HAJJ_INCLUDED,
  HAJJ_FAQ,
} from "@/lib/hajj";

const CREDENTIALS = [
  "Ministry of Religious Affairs — Approved Operator",
  "Hajj & Umrah Agent ID 1251",
  "IATA Accredited Agency",
  "Saudi Nusuk Platform Partner",
];

function scrollToRegister(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
}

export default function HajjLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <InnerLayout>
      {/* ══════════ HERO — registration front and centre ══════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={HAJJ.heroImage}
          alt="The Holy Kaaba in Makkah"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,22,40,0.97) 0%, rgba(11,22,40,0.9) 42%, rgba(21,37,69,0.72) 100%)",
          }}
        />
        <div className="absolute top-[12%] right-[16%] w-[420px] h-[420px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(77,163,232,0.14)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-9 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-emerald-400/12 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                REGISTRATION OPEN
              </span>
              <span className="inline-flex items-center gap-2 bg-amber-400/12 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                Limited Seats · First Come First Served
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gradient-to-r from-accent to-transparent" />
              <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent-soft">
                Hajj {HAJJ.year} · {HAJJ.hijri}
              </span>
            </div>

            <h1 className="font-display text-white leading-[0.98] text-[42px] md:text-[62px] mb-5">
              Your Journey to the House of Allah{" "}
              <span className="italic text-accent-soft font-normal">Begins Here</span>
            </h1>

            <p className="text-white/70 text-[16px] leading-relaxed max-w-[560px] mb-8">
              Register free for Hajj {HAJJ.year} with Billoo Travels — a government-approved operator
              serving pilgrims since 1969. Reserve your place today; an advisor calls you back with
              package options and pricing. No payment required to register.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px] mb-9">
              {HAJJ_BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon size={15} color="#34D399" />
                  </span>
                  <span className="text-white/75 text-[13.5px] leading-snug">{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#register"
                onClick={scrollToRegister}
                className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
              >
                Register Now — It&apos;s Free
                <ArrowIcon size={15} color="#fff" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-lg px-6 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-white/20 transition-all"
              >
                <PhoneIcon size={15} color="#fff" />
                Talk to an Advisor
              </a>
            </div>
          </div>

          {/* Registration form */}
          <div id="register" className="scroll-mt-28">
            <div className="bg-white rounded-[20px] p-7 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
              <HajjLeadForm source="Hajj Landing Hero" />
            </div>
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════ HOW REGISTRATION WORKS ══════════ */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              label="Simple & Stress-Free"
              title="How Registration"
              highlight="Works"
              centered
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HAJJ_STEPS.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.08}>
                <div className="relative h-full bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-[0_12px_32px_rgba(11,22,40,0.08)] transition-all duration-300">
                  <div className="font-display text-5xl text-accent/20 leading-none mb-4">{s.step}</div>
                  <h3 className="font-heading text-[16px] font-bold text-midnight mb-2">{s.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              label="From Our Pilgrims"
              title="Journeys We've"
              highlight="Been Trusted With"
              centered
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 relative">
                  <div className="absolute top-5 right-5">
                    <QuoteIcon size={36} />
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-6 relative z-10">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageSrc(t.img, t.placeholder)}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-heading text-sm font-bold text-midnight">{t.name}</div>
                      <div className="font-mono text-[10px] tracking-[1px] uppercase text-accent mt-0.5">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LICENSED & ACCREDITED ══════════ */}
      <section className="py-16 px-6 md:px-9 bg-surface border-y border-slate-200">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-slate-400 mb-7">
            Licensed &amp; Accredited
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {CREDENTIALS.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.06}>
                <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-3 pr-5 py-2.5 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-accent-pale flex items-center justify-center shrink-0">
                    <ShieldIcon size={13} color="#4DA3E8" />
                  </span>
                  <span className="font-heading text-[13px] font-semibold text-ink">{c}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
              <a
                href="#register"
                onClick={scrollToRegister}
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
              >
                <KaabaIcon size={16} color="#fff" />
                Register for Hajj {HAJJ.year}
              </a>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-lg px-7 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-white/20 transition-all"
              >
                View Packages
                <ArrowIcon size={15} color="#fff" />
              </Link>
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
