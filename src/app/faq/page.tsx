"use client";

import { useState } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FAQS } from "@/lib/data";
import { ChevronDownIcon } from "@/components/ui/Icons";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <InnerLayout>
      <PageBanner
        label="FAQ"
        title="Frequently Asked"
        highlight="Questions"
        description="Everything you need to know before booking your journey."
      />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <p className="text-base text-slate-500 leading-relaxed mb-10">
              Can&apos;t find what you&apos;re looking for? Feel free to{" "}
              <a href="/contact" className="text-accent font-semibold no-underline hover:underline">contact us</a>{" "}
              and our team will be happy to help.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className={`border rounded-[14px] overflow-hidden transition-all duration-300 bg-white ${
                    open === i ? "border-accent shadow-[0_4px_16px_rgba(77,163,232,0.12)]" : "border-slate-200 hover:border-accent"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full px-6 py-5 flex justify-between items-center bg-transparent border-none cursor-pointer font-heading text-[15px] font-semibold text-midnight text-left gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-accent tracking-[1px]">{String(i + 1).padStart(2, "0")}</span>
                      {f.q}
                    </span>
                    <div className={`transition-transform duration-300 min-w-[20px] ${open === i ? "rotate-180" : ""}`}>
                      <ChevronDownIcon color={open === i ? "#4DA3E8" : "#94A3B8"} />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{ maxHeight: open === i ? 300 : 0 }}
                  >
                    <div className="px-6 pb-5 pl-[54px] text-sm text-slate-500 leading-relaxed">{f.a}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div className="mt-14 text-center bg-midnight rounded-2xl p-10">
              <h2 className="font-heading text-xl font-bold text-white mb-3">Still Have Questions?</h2>
              <p className="text-sm text-white/50 mb-6 max-w-[360px] mx-auto">Our team is here to help you plan the perfect journey.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="/contact" className="bg-accent text-white px-7 py-3 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all">
                  Contact Us
                </a>
                <a href="https://wa.me/922132313461" target="_blank" rel="noopener noreferrer" className="bg-transparent text-white px-7 py-3 rounded-lg font-heading text-sm font-semibold no-underline border border-white/20 hover:bg-white/10 transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </InnerLayout>
  );
}
