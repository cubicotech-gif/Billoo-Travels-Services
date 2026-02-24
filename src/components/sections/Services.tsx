"use client";

import { SERVICES } from "@/lib/data";
import { ICON_MAP } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <SectionHeading label="Our Services" title="Everything You Need," highlight="Under One Roof" centered />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white transition-all duration-400 hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.12)] hover:-translate-y-1 group">
                  <div className="h-[140px] overflow-hidden relative">
                    <img
                      src={s.placeholder}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/60" />
                    <div className="absolute bottom-3 left-3.5">
                      <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">
                        {s.metric}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 pb-5.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      {Icon && <Icon size={20} />}
                      <h3 className="font-heading text-[15px] font-bold text-midnight">{s.title}</h3>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
