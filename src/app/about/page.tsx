"use client";

import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/data-extended";
import { STATS } from "@/lib/data";
import { CheckIcon } from "@/components/ui/Icons";

export default function AboutPage() {
  return (
    <InnerLayout>
      <PageBanner
        label="About Us"
        title="Our"
        highlight="Story"
        description="20+ years of elevating sacred journeys with trust, excellence, and devotion."
      />

      {/* Story */}
      <section className="py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">Who We Are</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-midnight mb-8">
              Two Decades of <span className="font-display italic text-accent font-normal">Trust</span>
            </h2>
          </ScrollReveal>
          {ABOUT.story.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-base text-slate-500 leading-relaxed mb-5">{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stats Strip */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=2000')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,22,40,0.9), rgba(21,37,69,0.85))" }} />
        <div className="relative max-w-[1000px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 z-10">
          {[...STATS, { value: "50+", label: "Destinations" }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="font-mono text-[10px] text-white/40 tracking-[2px] mt-2 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-24 px-6 md:px-9 bg-surface-alt">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full">
              <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">Our Mission</div>
              <p className="text-base text-slate-600 leading-relaxed">{ABOUT.mission}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full">
              <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent mb-3">Our Vision</div>
              <p className="text-base text-slate-600 leading-relaxed">{ABOUT.vision}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading label="Our Values" title="What We" highlight="Stand For" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT.values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center hover:border-accent hover:shadow-[0_8px_24px_rgba(77,163,232,0.12)] transition-all duration-400 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center mx-auto mb-4">
                    <CheckIcon size={20} color="#4DA3E8" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-midnight mb-2">{v.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 px-6 md:px-9 bg-surface-alt">
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

      {/* Team */}
      <section className="py-24 px-6 md:px-9 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <SectionHeading label="Leadership" title="Meet Our" highlight="Team" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT.team.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-[18px] overflow-hidden border border-slate-200 bg-white transition-all duration-400 hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.12)] hover:-translate-y-1 group">
                  <div className="h-[260px] overflow-hidden">
                    <img src={t.placeholder} alt={t.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-heading text-[15px] font-bold text-midnight">{t.name}</h4>
                    <div className="font-mono text-[10px] text-accent tracking-[1px] mt-1">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-9 bg-midnight text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Begin Your <span className="font-display italic text-accent font-normal">Journey?</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-[400px] mx-auto">Contact us today and let our experts craft the perfect pilgrimage experience.</p>
          <a href="/contact" className="bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all inline-flex items-center gap-2">
            Get in Touch
          </a>
        </ScrollReveal>
      </section>
    </InnerLayout>
  );
}
