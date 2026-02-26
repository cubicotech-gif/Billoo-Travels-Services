"use client";

import { PRICING, formatPrice } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const PERK_TOOLTIPS: Record<string, string> = {
  "Scholar Sessions": "Group religious lectures and Q&A sessions led by certified Islamic scholars",
  "Personal Scholar": "One dedicated Islamic scholar assigned exclusively to your group for the entire journey",
  "Dedicated Scholar": "Your own private scholar available around the clock for personalised guidance and du'a",
  "Shared Ziyarat": "Guided tours to sacred Madinah & Makkah sites shared with fellow pilgrims",
  "Private Ziyarat": "Exclusive private guided tours to all major Ziyarat sites at your own pace",
  "Priority Visa": "Fast-track visa processing with dedicated consulate liaison support",
  "VIP Visa": "White-glove premium visa service with a personal processing agent and same-week turnaround",
};

const PAYMENT_METHODS = ["Bank Transfer", "JazzCash", "EasyPaisa", "Credit Card"];

export default function Pricing() {
  const { currency } = useCurrency();

  return (
    <section id="pricing" className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1060px] mx-auto">
        <div className="text-center mb-14">
          <SectionHeading label="Pricing" title="Select Your" highlight="Class" centered />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PRICING.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`rounded-[18px] p-9 relative transition-all duration-400 flex flex-col h-full ${
                  p.popular
                    ? "bg-gradient-to-br from-midnight to-midnight-light border border-accent/20 shadow-[0_28px_56px_rgba(11,22,40,0.2)] scale-[1.04]"
                    : "bg-white border border-slate-200"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-bright text-white px-4 py-1 rounded-full font-mono text-[10px] font-semibold tracking-[1px]">
                    RECOMMENDED
                  </div>
                )}
                <div className={`font-heading text-xl font-bold mb-1 ${p.popular ? "text-white" : "text-midnight"}`}>
                  {p.tier}
                </div>
                <div className={`font-heading text-[34px] font-bold my-3 mb-6 ${p.popular ? "text-accent-soft" : "text-accent"}`}>
                  {formatPrice(p.price, currency)}
                </div>
                <div className={`h-px mb-6 ${p.popular ? "bg-white/[0.08]" : "bg-slate-200"}`} />
                <div className="flex flex-col gap-3 mb-7 flex-1">
                  {p.perks.map((pk, pi) => {
                    const tooltip = PERK_TOOLTIPS[pk.text];
                    return (
                      <div
                        key={pi}
                        className={`flex items-center gap-2 text-[13px] ${
                          pk.included
                            ? p.popular ? "text-white/80" : "text-slate-700"
                            : p.popular ? "text-white/20 line-through" : "text-slate-300 line-through"
                        }`}
                      >
                        {pk.included ? (
                          <CheckIcon color={p.popular ? "#7EC8FF" : "#4DA3E8"} />
                        ) : (
                          <XIcon />
                        )}
                        {tooltip && pk.included ? (
                          <span className="relative group/tip inline-flex items-center gap-1 cursor-default">
                            {pk.text}
                            <span className={`text-[10px] ${p.popular ? "text-white/30" : "text-slate-400"}`}>ⓘ</span>
                            <span className="absolute bottom-full left-0 mb-2 w-52 text-[11px] leading-relaxed bg-midnight text-white/85 rounded-[10px] px-3 py-2 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-normal shadow-xl border border-white/10">
                              {tooltip}
                            </span>
                          </span>
                        ) : (
                          <span>{pk.included ? pk.text : "Not included"}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <a
                  href="/booking"
                  className={`w-full flex justify-center py-3.5 rounded-lg font-heading text-[13px] font-semibold cursor-pointer transition-all hover:-translate-y-px border no-underline text-center ${
                    p.popular
                      ? "bg-accent text-white border-accent hover:bg-accent-dark hover:shadow-lg"
                      : "bg-transparent text-midnight border-slate-200 hover:border-accent hover:text-accent"
                  }`}
                >
                  Book Now — Get Quote
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Payment trust badge strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mr-1">Accepted Payments:</span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-500 font-heading text-[11px] font-semibold border border-slate-200"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
