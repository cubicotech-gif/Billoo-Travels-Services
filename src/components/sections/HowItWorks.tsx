"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Step {
  title: string;
  desc: string;
}

interface HomepageContent {
  steps_enabled: boolean;
  steps_label: string;
  steps_title: string;
  steps_highlight: string;
  steps_subtitle: string;
  steps: Step[];
}

export default function HowItWorks() {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((d) => setData(d.content || null))
      .catch(() => setData(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !data || !data.steps_enabled) return null;
  const steps = Array.isArray(data.steps) ? data.steps : [];
  if (steps.length === 0) return null;

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <SectionHeading
            label={data.steps_label || "Simple Process"}
            title={data.steps_title || "Your Journey in"}
            highlight={data.steps_highlight || "Four Steps"}
            centered
          />
          {data.steps_subtitle && (
            <ScrollReveal>
              <p className="text-[15px] text-slate-500 leading-relaxed max-w-[560px] mx-auto mt-4">
                {data.steps_subtitle}
              </p>
            </ScrollReveal>
          )}
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* connecting line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative text-center">
                <div className="relative z-10 mx-auto w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5">
                  <span className="font-display text-xl font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-[16px] font-bold text-midnight mb-2">{s.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
