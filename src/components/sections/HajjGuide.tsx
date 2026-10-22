"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { STYLE_BLURB, type HajjStyle } from "@/lib/hajjMeta";

const STYLES: { style: HajjStyle; name: string; stay: string; bestFor: string }[] = [
  {
    style: "Non-Aziziya",
    name: "Platinum · Non-Aziziya",
    stay: "One hotel in front of the Haram for the whole Makkah stay. Your room is kept for you through the days of Hajj.",
    bestFor: "Pilgrims who want hotel comfort and the shortest walk to the Haram.",
  },
  {
    style: "Flex",
    name: "Platinum · Flex",
    stay: "A Makkah hotel for the first nights, then Aziziya near Jamarat for the Hajj days. The Aziziya family room is included.",
    bestFor: "Families who want some hotel time in Makkah and an easy Hajj.",
  },
  {
    style: "Comfort",
    name: "Platinum · Comfort",
    stay: "5-star Makkah nights first, then Aziziya for the Hajj days. A longer 14–17 day journey.",
    bestFor: "A longer stay with premium hotel nights and the Aziziya advantage.",
  },
  {
    style: "Value",
    name: "Platinum · Value",
    stay: "Aziziya near Jamarat for the whole Makkah stay, with a Madinah hotel. One longer option also adds Makkah hotel nights.",
    bestFor: "The best value for money — the lowest prices in the range.",
  },
];

const TERMS: { q: string; a: string }[] = [
  {
    q: "Shifting vs non-shifting — what is the difference?",
    a: "Non-shifting means you keep one base in Makkah for the whole stay. Shifting means you move from your Makkah hotel to the Aziziya building for the Hajj days, close to Jamarat. Either way, your Hajj days are covered by the same Mina and Arafat services.",
  },
  {
    q: "Madinah first or Makkah first?",
    a: "Madinah first starts in Madinah, then moves to Makkah before the Hajj days. Makkah first goes straight to Makkah and visits Madinah after Hajj. Both include the same Madinah ziyarat; the difference is the order — and the dates that go with it.",
  },
  {
    q: "What are Package A and Package B?",
    a: "Some journeys offer two hotel options — for example two Makkah hotels or two Madinah hotels. Everything else is identical; only the hotel (and the price) changes. Pick the hotel you prefer, then your room type.",
  },
  {
    q: "Quad, Triple, Double or Sharing?",
    a: "The room type is how many pilgrims share a room: Quad (4), Triple (3), Double (2). A few Makkah Tower packages also offer a Sharing room, where four to five pilgrims share. Prices are per person.",
  },
  {
    q: "What are the Mina and Arafat services?",
    a: "Every package includes a Zone 1 Maktab tent in Mina near Jamarat (about 16 people to a tent, sofa-cum-bed, private toilets), an air-conditioned tent in Arafat with meals and drinks, a floor mat and snack box in Muzdalifah, and private luxury buses for the Mashaer days. Our SAR list uses the upgraded Maktab A Plus category.",
  },
  {
    q: "What is not included?",
    a: "The airline ticket and Qurbani are not included — each package page shows the current estimates. Optional upgrades such as the Kaaba-view supplement, an Aziziya family room or extra Madinah nights are priced separately.",
  },
  {
    q: "Why are there two price lists, SAR and USD?",
    a: "They are published as two separate brochures, each with its own prices — one for pilgrims travelling from Pakistan (SAR) and one for pilgrims travelling from overseas (USD). Prices are not converted between them.",
  },
  {
    q: "What does “Abraj Tower” mean in a package?",
    a: "Abraj Tower covers hotels in the Clock Tower complex such as Swiss Maqam, Hajar Tower, Swissotel, Safwa Orchid and Al Marwa. “Project of Jabal e Omar” covers hotels such as Hayat Regency, Address, Jumeirah, Hilton Convention, DoubleTree and Marriott.",
  },
];

export default function HajjGuide() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="guide" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 px-6 md:px-9 bg-surface">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <SectionHeading label="Package Guide" title="Choosing the Right" highlight="Package" centered />
          <p className="text-slate-500 max-w-[600px] mx-auto mt-4 text-[15px] leading-relaxed">
            Our Executive Platinum range comes in four styles. Here is how they differ in plain language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {STYLES.map((s, i) => (
            <ScrollReveal key={s.style} delay={i * 0.06}>
              <div className="h-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-heading text-[16px] font-bold text-midnight">{s.name}</h3>
                  <span className={`shrink-0 text-[10.5px] font-heading font-semibold px-2.5 py-1 rounded-full ${s.style === "Non-Aziziya" ? "bg-accent text-white" : "bg-amber-400 text-midnight"}`}>
                    {s.style === "Non-Aziziya" ? "Hotel only" : "With Aziziya"}
                  </span>
                </div>
                <div className="text-[12.5px] font-semibold text-accent-dark mb-2">{STYLE_BLURB[s.style]}</div>
                <p className="text-[13.5px] text-slate-600 leading-relaxed mb-3">{s.stay}</p>
                <p className="text-[12.5px] text-slate-500 leading-relaxed">
                  <span className="font-semibold text-midnight">Best for: </span>
                  {s.bestFor}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <h3 className="font-heading text-[20px] font-bold text-midnight text-center mb-5">Terms, explained</h3>
        <div className="max-w-[820px] mx-auto space-y-2.5">
          {TERMS.map((t, i) => {
            const isOpen = open === i;
            return (
              <div key={t.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 bg-transparent border-none cursor-pointer"
                >
                  <span className="font-heading text-[14.5px] font-semibold text-midnight">{t.q}</span>
                  <span className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDownIcon />
                  </span>
                </button>
                {isOpen && <p className="px-5 pb-5 -mt-1 text-[13.5px] text-slate-600 leading-relaxed">{t.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
