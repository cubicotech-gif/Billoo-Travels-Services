"use client";

import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BLOGS } from "@/lib/data";
import { CalendarIcon, ClockIcon } from "@/components/ui/Icons";
import Link from "next/link";

export default function BlogPage() {
  return (
    <InnerLayout>
      <PageBanner
        label="Journal"
        title="Travel"
        highlight="Insights"
        description="Guides, tips, and stories to help you prepare for a meaningful journey."
        bgImage="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          {/* Featured Post */}
          <ScrollReveal>
            <Link href={`/blog/${BLOGS[0].slug}`} className="no-underline block mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] transition-all duration-400 group">
                <div className="h-[250px] md:h-[340px] overflow-hidden">
                  <img src={BLOGS[0].placeholder} alt={BLOGS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white self-start mb-4">{BLOGS[0].cat}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><CalendarIcon />{BLOGS[0].date}</span>
                    <span className="flex items-center gap-1"><ClockIcon />{BLOGS[0].read}</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-midnight mb-3 leading-snug">{BLOGS[0].title}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{BLOGS[0].desc}</p>
                  <span className="text-accent font-heading text-[13px] font-semibold">Read Article →</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link href={`/blog/${b.slug}`} className="no-underline block h-full">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer h-full">
                    <div className="relative h-[200px] overflow-hidden">
                      <img src={b.placeholder} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{b.cat}</span>
                      </div>
                    </div>
                    <div className="p-5 pb-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1"><CalendarIcon />{b.date}</span>
                        <span className="flex items-center gap-1"><ClockIcon />{b.read}</span>
                      </div>
                      <h3 className="font-heading text-[17px] font-bold text-midnight mb-2 leading-snug">{b.title}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
