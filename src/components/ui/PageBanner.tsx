"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  title: string;
  highlight: string;
  description?: string;
  bgImage?: string;
}

export default function PageBanner({ label, title, highlight, description, bgImage }: Props) {
  return (
    <section className="relative min-h-[340px] md:min-h-[400px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage
            ? `url('${bgImage}')`
            : "url('https://images.unsplash.com/photo-1565552643951-b2e152973b06?auto=format&fit=crop&q=80&w=2000')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(11,22,40,0.92) 0%, rgba(15,29,53,0.8) 50%, rgba(21,37,69,0.7) 100%)",
        }}
      />
      <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(77,163,232,0.06)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1280px] mx-auto px-6 md:px-9 w-full z-10 pt-24"
      >
        <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent-soft mb-3">
          {label}
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
          {title}{" "}
          <span className="font-display italic text-accent font-normal">{highlight}</span>
        </h1>
        {description && (
          <p className="text-base text-white/50 leading-relaxed mt-4 max-w-[520px]">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
}
