"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowIcon } from "@/components/ui/Icons";

const REASONS = [
  {
    number: "01",
    title: "Licensed & Certified",
    desc: "Official Ministry of Hajj & Umrah licensed operator (Agent ID 1251) since 2005. Every journey is backed by 20+ years of credentials.",
    badge: "Agent ID 1251",
    img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    number: "02",
    title: "20+ Years of Excellence",
    desc: "Founded in 2000, we've served over 15,000 pilgrims with a 4.9★ satisfaction rating — Pakistan's most trusted travel partner.",
    badge: "Est. 2000",
    img: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    number: "03",
    title: "Five-Star Hospitality",
    desc: "From Raffles Makkah Palace to Fairmont Clock Tower — only the finest hotels closest to Haram, every time, without compromise.",
    badge: "5-Star Always",
    img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    number: "04",
    title: "24/7 Personal Concierge",
    desc: "Your dedicated advisor is available around the clock — before departure, throughout your journey, and upon your safe return.",
    badge: "Always Available",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600&h=400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 md:px-9 bg-charcoal overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
          <ScrollReveal>
            <div>
              <div className="font-mono text-[11px] tracking-[2px] uppercase text-accent mb-3">
                Why Billoo Travels
              </div>
              <h2 className="font-heading text-3xl md:text-[42px] font-bold text-white leading-tight">
                The Standard Others{" "}
                <span className="font-display italic text-accent font-normal">
                  Aspire To
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="lg:max-w-[380px]">
              <p className="text-white/45 text-[15px] leading-relaxed mb-5">
                When it comes to your most sacred journey, only the best will do. Here is why 15,000+ pilgrims choose us, year after year.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-accent font-heading text-sm font-semibold no-underline hover:gap-3 transition-all"
              >
                Our Full Story <ArrowIcon size={14} color="#4DA3E8" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[20px] overflow-hidden group cursor-default"
              >
                {/* Background Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transform: "scale(1.02)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,22,40,0.97) 0%, rgba(11,22,40,0.6) 55%, rgba(11,22,40,0.2) 100%)",
                    }}
                  />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[32px] font-bold text-white/[0.07] leading-none">
                      {r.number}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent/20 text-accent border border-accent/30">
                      {r.badge}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-[12.5px] text-white/50 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom trust bar */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 py-7 px-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8 sm:gap-12 items-center justify-center sm:justify-start">
              {[
                { val: "15,000+", lbl: "Pilgrims Served" },
                { val: "4.9★", lbl: "Average Rating" },
                { val: "99.8%", lbl: "Visa Approval" },
                { val: "20+", lbl: "Years Trusted" },
              ].map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="font-heading text-2xl font-bold text-accent">
                    {s.val}
                  </div>
                  <div className="font-mono text-[9px] text-white/30 tracking-[1.5px] uppercase mt-0.5">
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/packages"
              className="shrink-0 bg-accent text-white px-7 py-3 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
            >
              View All Packages
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
