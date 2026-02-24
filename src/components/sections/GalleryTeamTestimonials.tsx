"use client";

import { useState, useEffect } from "react";
import { GALLERY, TEAM, TESTIMONIALS } from "@/lib/data";
import { QuoteIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── GALLERY ───
export function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 md:px-9 bg-surface-alt">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <SectionHeading label="Gallery" title="Moments of" highlight="Devotion" centered />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5" style={{ gridAutoRows: "200px" }}>
          {GALLERY.map((g, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div
                className={`relative rounded-2xl overflow-hidden cursor-pointer border border-slate-200 group h-full ${
                  g.span ? "md:row-span-2" : ""
                }`}
              >
                <img
                  src={g.placeholder}
                  alt={g.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/70 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-4">
                  <span className="font-heading text-sm font-semibold text-white">{g.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ───
export function Team() {
  return (
    <section className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <SectionHeading label="Leadership" title="The Team Behind" highlight="Your Journey" centered />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="rounded-[18px] overflow-hidden border border-slate-200 bg-white transition-all duration-400 hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.12)] hover:-translate-y-1 group">
                <div className="h-[260px] overflow-hidden">
                  <img
                    src={t.placeholder}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
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
  );
}

// ─── TESTIMONIALS ───
export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-9 overflow-hidden">
      {/* BG Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,22,40,0.93), rgba(15,29,53,0.88))" }} />

      <div className="relative max-w-[760px] mx-auto z-10">
        <div className="text-center mb-12">
          <SectionHeading label="Testimonials" title="Trusted by" highlight="Thousands" centered light />
        </div>
        <div className="relative min-h-[220px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`${i === idx ? "relative" : "absolute top-0 left-0 right-0"} transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] text-center ${
                i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5 pointer-events-none"
              }`}
            >
              <div className="glass rounded-[20px] p-9 md:p-10">
                <QuoteIcon />
                <p className="font-display text-lg md:text-xl italic text-white leading-relaxed mt-4 mb-7 max-w-[540px] mx-auto">
                  &ldquo;{t.text}&rdquo;
                </p>
                <img
                  src={t.placeholder}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-[3px] border-accent/30 mx-auto mb-2.5"
                />
                <div className="font-heading text-sm font-bold text-white">{t.name}</div>
                <div className="font-mono text-[11px] text-accent-soft tracking-[1px] mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 justify-center mt-7">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-350 ${
                i === idx ? "w-6 bg-accent" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
