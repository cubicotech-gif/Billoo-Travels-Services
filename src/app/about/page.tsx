"use client";

import type { ComponentType } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/data-extended";
import {
  CheckIcon,
  ShieldIcon,
  KaabaIcon,
  GlobeIcon,
  VisaIcon,
  HeadsetIcon,
  PlaneIcon,
  ArrowIcon,
} from "@/components/ui/Icons";

// Local icon resolver so data can reference icons by name
const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  Shield: ShieldIcon,
  Kaaba: KaabaIcon,
  Globe: GlobeIcon,
  Visa: VisaIcon,
  Headset: HeadsetIcon,
  Plane: PlaneIcon,
  Check: CheckIcon,
};

// About-page stats — anchored on the 1969 founding so wording stays consistent
const ABOUT_STATS = [
  { value: "1969", label: "Established" },
  { value: "15,000+", label: "Pilgrims Served" },
  { value: "50+", label: "Years of Trust" },
  { value: "4.9★", label: "Client Rating" },
];

const founder = ABOUT.team[0];

export default function AboutPage() {
  return (
    <InnerLayout>
      <PageBanner
        label="About Us"
        title="Our"
        highlight="Story"
        description="Five decades of elevating sacred journeys with trust, excellence, and devotion."
      />

      {/* Story — two-column with image */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">Who We Are</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-midnight mb-5 leading-tight">
                Five Decades of <span className="font-display italic text-accent font-normal">Trust</span>
              </h2>
              <p className="text-base text-ink/80 leading-relaxed mb-6 font-medium">{ABOUT.intro}</p>
              {ABOUT.story.map((p, i) => (
                <p key={i} className="text-[15px] text-slate-500 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-accent-pale -z-10" />
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_18px_50px_rgba(11,22,40,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1100"
                  alt="Masjid al-Haram, Makkah"
                  className="w-full h-[340px] md:h-[460px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 bg-white rounded-2xl px-6 py-4 border border-slate-200 shadow-[0_12px_30px_rgba(11,22,40,0.12)]">
                <div className="font-heading text-2xl font-bold text-midnight">Since 1969</div>
                <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-slate-400 mt-1">Serving Pilgrims</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=2000')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,22,40,0.92), rgba(21,37,69,0.86))" }} />
        <div className="relative max-w-[1100px] mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6 z-10">
          {ABOUT_STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="font-mono text-[10px] text-white/45 tracking-[2px] mt-2 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            { Icon: ShieldIcon, label: "Our Mission", text: ABOUT.mission },
            { Icon: GlobeIcon, label: "Our Vision", text: ABOUT.vision },
          ].map(({ Icon, label, text }, i) => (
            <ScrollReveal key={label} delay={i * 0.1}>
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 h-full overflow-hidden hover:shadow-[0_14px_40px_rgba(11,22,40,0.08)] transition-shadow">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-soft" />
                <div className="w-12 h-12 rounded-xl bg-accent-pale flex items-center justify-center mb-5">
                  <Icon size={22} color="#4DA3E8" />
                </div>
                <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">{label}</div>
                <p className="text-base text-slate-600 leading-relaxed">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us — NEW */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading label="Why Billoo" title="Why Families" highlight="Choose Us" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT.whyChooseUs.map((w, i) => {
              const Icon = ICONS[w.icon] || CheckIcon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.12)] hover:-translate-y-1 transition-all duration-400">
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

      {/* Values */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading label="Our Values" title="What We" highlight="Stand For" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT.values.map((v, i) => {
              const Icon = ICONS[v.icon] || CheckIcon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center hover:border-accent hover:shadow-[0_8px_24px_rgba(77,163,232,0.12)] transition-all duration-400 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center mx-auto mb-4">
                      <Icon size={20} color="#4DA3E8" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-midnight mb-2">{v.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading label="Our Journey" title="Key" highlight="Milestones" centered />
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />
            {ABOUT.milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="font-heading text-2xl font-bold text-accent">{m.year}</div>
                    <p className="text-sm text-slate-500 mt-1">{m.event}</p>
                  </div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-accent border-[3px] border-accent-pale mt-1.5 shrink-0 ml-[18px] md:ml-0" />
                  <div className="md:hidden flex-1 pl-4">
                    <div className="font-heading text-lg font-bold text-accent">{m.year}</div>
                    <p className="text-sm text-slate-500 mt-1">{m.event}</p>
                  </div>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "pl-8" : "pr-8"}`} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations / Licenses — NEW */}
      <section className="py-16 px-6 md:px-9 bg-surface-alt border-y border-slate-200">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-slate-400 mb-7">
            Licensed &amp; Accredited
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {ABOUT.credentials.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-3 pr-5 py-2.5 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-accent-pale flex items-center justify-center shrink-0">
                    <CheckIcon size={13} color="#4DA3E8" />
                  </span>
                  <span className="font-heading text-[13px] font-semibold text-ink">{c}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — founder spotlight */}
      {founder && (
        <section className="py-20 md:py-24 px-6 md:px-9 bg-surface">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-14">
              <SectionHeading label="Leadership" title="Meet the" highlight="Founder's Vision" centered />
            </div>
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center bg-surface-alt rounded-3xl border border-slate-200 p-6 md:p-10">
                <div className="rounded-2xl overflow-hidden border border-slate-200 mx-auto w-full max-w-[300px]">
                  <img src={founder.placeholder} alt={founder.name} className="w-full h-[340px] object-cover" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-midnight">{founder.name}</h3>
                  <div className="font-mono text-[11px] text-accent tracking-[1.5px] uppercase mt-1.5 mb-5">{founder.role}</div>
                  <p className="text-[15px] text-slate-500 leading-relaxed mb-4">
                    Carrying forward a legacy that began in 1969, {founder.name} leads Billoo Travels with the same
                    conviction the company was built on — that a pilgrimage should be handled with honesty, comfort,
                    and genuine care for every family we serve.
                  </p>
                  <p className="text-[15px] text-slate-500 leading-relaxed">
                    Under this leadership, the team blends decades of on-the-ground experience with modern service
                    standards, ensuring every Hajj and Umrah journey is as seamless as it is spiritually rewarding.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 md:px-9 bg-midnight text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Begin Your <span className="font-display italic text-accent font-normal">Journey?</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-[400px] mx-auto">Contact us today and let our experts craft the perfect pilgrimage experience.</p>
          <a href="/contact" className="bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all inline-flex items-center gap-2">
            Get in Touch <ArrowIcon size={16} color="#fff" />
          </a>
        </ScrollReveal>
      </section>
    </InnerLayout>
  );
}
