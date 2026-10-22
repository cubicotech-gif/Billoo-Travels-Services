"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckIcon } from "@/components/ui/Icons";
import { useHajjPhotos } from "@/lib/hajjPhotos";

// Facts come straight from the Aziziya Accommodation Services pages of the
// Hajj 2027 brochures. Prices are deliberately not repeated here: the SAR and
// USD lists carry different supplements, and each package page shows its own.

const FACTS: { value: string; label: string }[] = [
  { value: "Opposite Jamarat", label: "Directly across from the Jamarat escalator" },
  { value: "30–50 min", label: "Walk between Aziziya and the Mina camp" },
  { value: "≈ 4 per room", label: "Air-conditioned, with attached bathroom" },
  { value: "3 buffet meals", label: "Daily, with hot & cold drinks 24 hours" },
];

const FEATURES = [
  "Fully air-conditioned rooms with a mini fridge and attached bathroom",
  "Proper beds with quality mattresses, sheets, pillow covers, blankets and towels",
  "Three buffet meals a day, with separate dining sections for men and women",
  "Hot & cold drinks, tea and coffee available around the clock",
  "Separate prayer areas for men and women",
  "Daily religious talks and guidance by a Moulana",
  "Two lifts with wheelchair access",
  "Free Wi-Fi in the lobby and live telecast from the Haram on a large screen",
  "Lockers for valuables and cash, complimentary washing machine",
  "Daily bathroom cleaning with staff available 24/7",
  "Water coolers, iron and ironing board on every floor",
  "Shuttle to the Haram on scheduled trips before the Hajj days",
];

export default function HajjAziziya() {
  const { photos } = useHajjPhotos();
  const gallery = ["aziziya-exterior", "aziziya-room", "aziziya-dining", "aziziya-lobby"]
    .map((k) => photos[k])
    .filter(Boolean);

  return (
    <section id="aziziya" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 px-6 md:px-9 bg-white">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <SectionHeading label="Walk Less, Pray More" title="Aziziya" highlight="Accommodation" centered />
          <p className="text-slate-500 max-w-[640px] mx-auto mt-4 text-[15px] leading-relaxed">
            Our Aziziya building sits right opposite the Jamarat escalator, near the Mina camps — shielding you from long
            walks in the heat and saving your energy for worship. It is a pilgrim-focused building, run to its own
            standard, not a hotel.
          </p>
        </div>

        {gallery.length > 0 && (
          <ScrollReveal>
            <div className={`grid gap-3 mb-10 ${gallery.length > 2 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"}`}>
              {gallery.map((url, i) => (
                <div key={url} className={`rounded-2xl overflow-hidden h-[150px] sm:h-[210px] ${i === 0 && gallery.length >= 4 ? "col-span-2 md:col-span-1" : ""}`}>
                  <img src={url} alt="Aziziya accommodation" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {FACTS.map((f) => (
              <div key={f.value} className="bg-accent-pale/60 border border-accent/15 rounded-2xl p-4 sm:p-5">
                <div className="font-heading text-[17px] sm:text-[20px] font-bold text-midnight leading-tight">{f.value}</div>
                <div className="text-[12px] sm:text-[13px] text-slate-500 mt-1.5 leading-snug">{f.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
          <ScrollReveal>
            <h3 className="font-heading text-[18px] font-bold text-midnight mb-4">What you get</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <span className="mt-1 shrink-0"><CheckIcon size={13} color="#10B981" /></span>
                  <span className="text-[13.5px] text-slate-600 leading-snug">{f}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-slate-500 leading-relaxed">
              Family rooms (Double or Triple) are available for a supplement — it is included in the Flex packages, and
              the exact amount is shown on each package page.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-midnight text-white px-5 py-3.5 font-heading text-[14px] font-bold">Which is right for you?</div>
              <div className="p-5 space-y-5 bg-surface-alt">
                <div>
                  <div className="font-heading text-[13.5px] font-bold text-midnight mb-1.5">Choose Aziziya if you…</div>
                  <ul className="text-[13px] text-slate-600 space-y-1.5 list-disc pl-4 leading-snug">
                    <li>want the least walking to Jamarat and Mina</li>
                    <li>prefer a lower price and a pilgrim-focused routine</li>
                    <li>are comfortable with shared, simpler rooms</li>
                  </ul>
                </div>
                <div>
                  <div className="font-heading text-[13.5px] font-bold text-midnight mb-1.5">Choose a Haram-front hotel if you…</div>
                  <ul className="text-[13px] text-slate-600 space-y-1.5 list-disc pl-4 leading-snug">
                    <li>want to walk to Masjid al-Haram for every prayer</li>
                    <li>need hotel-style rooms, privacy or easy access for elderly parents</li>
                    <li>prefer one base for the whole stay</li>
                  </ul>
                </div>
                <p className="text-[12px] text-slate-400 leading-relaxed border-t border-slate-200 pt-3">
                  Our brochure is clear on this: Aziziya services are not comparable to hotel services. Photographs are of
                  previous years&apos; arrangements and are for reference only.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
