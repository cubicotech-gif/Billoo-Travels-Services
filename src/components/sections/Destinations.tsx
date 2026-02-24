"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { DESTINATIONS } from "@/lib/data";
import { MapPinIcon, ArrowIcon } from "@/components/ui/Icons";

export default function Destinations() {
  return (
    <section className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="Where We Go"
            title="Top"
            highlight="Destinations"
          />
          <ScrollReveal delay={0.1}>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-slate-500 font-heading text-sm font-medium no-underline hover:text-accent transition-colors"
            >
              View all packages <ArrowIcon size={14} color="#94A3B8" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <ScrollReveal key={dest.name} delay={i * 0.08}>
              <Link href="/packages" className="block no-underline">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="dest-card relative rounded-[22px] overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.14)] transition-shadow duration-400 group"
                >
                  {/* Image */}
                  <div className="relative h-[420px] overflow-hidden">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay — deepens on hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(11,22,40,0.94) 0%, rgba(11,22,40,0.5) 45%, rgba(11,22,40,0.12) 100%)",
                      }}
                    />

                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">
                        {dest.tag}
                      </span>
                    </div>

                    {/* Package count */}
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-white/50 tracking-[1px]">
                      {dest.packages}
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Location */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <MapPinIcon size={12} color="rgba(77,163,232,0.7)" />
                        <span className="font-mono text-[10px] text-accent/70 tracking-[1px]">
                          {dest.country}
                        </span>
                      </div>

                      {/* City name */}
                      <h3 className="font-heading text-[22px] font-bold text-white mb-0 leading-tight">
                        {dest.name}
                      </h3>

                      {/* Description — visible on hover via CSS */}
                      <p className="text-[12.5px] text-white/60 leading-relaxed mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {dest.desc}
                      </p>

                      {/* Explore CTA */}
                      <div className="flex items-center gap-1.5 text-accent font-heading text-[13px] font-semibold mt-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        Explore Packages <ArrowIcon size={13} color="#4DA3E8" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
