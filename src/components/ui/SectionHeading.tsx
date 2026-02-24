"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  label: string;
  title: string;
  highlight: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ label, title, highlight, centered = false, light = false }: Props) {
  return (
    <ScrollReveal className={centered ? "text-center" : ""}>
      <div className={`font-mono text-[11px] tracking-[1.5px] uppercase ${light ? "text-accent-soft" : "text-accent"}`}>
        {label}
      </div>
      <h2 className={`font-heading text-3xl md:text-4xl font-bold mt-2 ${light ? "text-white" : "text-midnight"}`}>
        {title}{" "}
        <span className={`font-display italic font-normal ${light ? "text-accent-soft" : "text-accent"}`}>
          {highlight}
        </span>
      </h2>
    </ScrollReveal>
  );
}
