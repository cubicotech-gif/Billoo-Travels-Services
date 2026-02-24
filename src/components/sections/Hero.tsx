"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STATS } from "@/lib/data";
import { PlaneIcon, SearchIcon, CheckIcon, ArrowIcon } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[105vh] flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565552643951-b2e152973b06?auto=format&fit=crop&q=85&w=2400')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,22,40,0.93) 0%, rgba(15,29,53,0.78) 40%, rgba(21,37,69,0.65) 100%)",
        }}
      />
      {/* Ambient orbs */}
      <div className="absolute top-[5%] right-[25%] w-[600px] h-[600px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(77,163,232,0.09)_0%,transparent_70%)]" />
      <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(92,184,255,0.06)_0%,transparent_70%)]" />

      {/* Floating images */}
      <div className="hidden lg:block absolute top-[15%] right-[5%] w-[180px] h-[240px] rounded-2xl overflow-hidden opacity-25 border border-white/10 animate-float">
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=200&h=260&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden lg:block absolute bottom-[20%] right-[12%] w-[140px] h-[180px] rounded-xl overflow-hidden opacity-20 border border-white/[0.08] animate-float-delayed">
        <img
          src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=160&h=200&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-9 w-full z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-[60px] items-center pt-20 lg:pt-0">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full py-1.5 px-4 pl-1.5 mb-8">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <PlaneIcon size={12} color="#fff" />
            </div>
            <span className="font-heading text-xs font-semibold text-accent-soft">
              Premium Travel Partner · Agent ID 1251
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-[54px] font-bold text-white leading-[1.07] mb-5 tracking-tight">
            Your Sacred Journey,
            <br />
            <span className="font-display italic text-accent font-normal text-[1.08em]">
              Elevated.
            </span>
          </h1>
          <p className="text-[17px] text-white/55 leading-[1.85] max-w-[480px] mb-8">
            Pakistan&apos;s premier agency for luxury Hajj, Umrah &amp;
            international tours. VIP access. Five-star comfort. Flawless
            execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(77,163,232,0.35)]"
            >
              <PlaneIcon size={15} color="#fff" />
              Explore Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-white border border-white/25 px-7 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline hover:bg-white/10 hover:border-white/50 transition-all"
            >
              Plan My Journey
              <ArrowIcon size={14} color="#fff" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t border-white/[0.08]">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`${
                  i > 0 ? "sm:border-l sm:border-white/[0.08] sm:pl-7" : ""
                }`}
              >
                <div className="font-heading text-2xl font-bold text-white">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-white/30 tracking-[1.5px] mt-1 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Glass Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <div className="glass rounded-[22px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.22)]">
            <h3 className="font-heading text-xl font-bold text-white mb-1.5">
              Plan Your Journey
            </h3>
            <p className="text-[13px] text-white/40 mb-6">
              Personalized quote within 24 hours
            </p>
            <div className="flex flex-col gap-3">
              <input className="glass-input" placeholder="Full Name" />
              <input className="glass-input" placeholder="Email Address" />
              <input className="glass-input" placeholder="Phone Number" />
              <select
                className="glass-input cursor-pointer appearance-none"
                defaultValue=""
              >
                <option value="" disabled className="text-slate-400">
                  Select Destination
                </option>
                <option value="u" className="text-slate-700">
                  Umrah — Makkah &amp; Madinah
                </option>
                <option value="h" className="text-slate-700">
                  Hajj 2025
                </option>
                <option value="t" className="text-slate-700">
                  Turkey — Istanbul
                </option>
                <option value="d" className="text-slate-700">
                  Dubai — UAE
                </option>
              </select>
              <select
                className="glass-input cursor-pointer appearance-none"
                defaultValue=""
              >
                <option value="" disabled className="text-slate-400">
                  Package Tier
                </option>
                <option value="e" className="text-slate-700">
                  Economy
                </option>
                <option value="b" className="text-slate-700">
                  Business
                </option>
                <option value="f" className="text-slate-700">
                  First Class
                </option>
              </select>
              <Link
                href="/packages"
                className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-[10px] font-heading text-sm font-semibold mt-1 hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg no-underline"
              >
                <SearchIcon size={16} color="#fff" /> Search Packages
              </Link>
            </div>
            <div className="flex items-center justify-center gap-3.5 mt-4 flex-wrap">
              {["Instant Quote", "No Hidden Fees", "Free Consultation"].map(
                (t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 text-[10px] text-white/30"
                  >
                    <CheckIcon size={12} color="rgba(77,163,232,0.5)" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <div className="font-mono text-[9px] text-white tracking-[3px]">
          SCROLL
        </div>
        <div className="w-px h-7 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
