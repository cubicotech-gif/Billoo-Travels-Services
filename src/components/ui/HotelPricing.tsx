"use client";

import { useState } from "react";
import { Pricing, hasPricing } from "@/lib/pricing";
import { PkgCurrency, formatMoney } from "@/lib/packageCurrency";
import { hotelKeys, type PhotoMap } from "@/lib/hajjPhotos";

// Hotel-option picker for a Hajj package: choose the hotel (Package A / B),
// then read the per-person price for each room type. With a single hotel
// option it simply shows the room table.
export default function HotelPricing({
  pricing,
  currency,
  photos = {},
}: {
  pricing: Pricing | null | undefined;
  currency: PkgCurrency;
  photos?: PhotoMap;
}) {
  const [active, setActive] = useState(0);
  if (!hasPricing(pricing)) return null;
  const tiers = pricing.tiers!;
  const rooms = pricing.rooms!;
  const multi = tiers.length > 1;
  const tier = tiers[Math.min(active, tiers.length - 1)];
  const photo = hotelKeys({ hotel: tier.label }).map((k) => photos[k]).find(Boolean);

  // Cheapest numeric price in this hotel option, to flag it in the table.
  const nums = rooms.map((r) => r[tier.key]).filter((v): v is number => typeof v === "number" && v > 0);
  const lowest = nums.length ? Math.min(...nums) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      {multi && (
        <div role="tablist" aria-label="Hotel option" className="grid grid-cols-2 bg-surface-alt border-b border-slate-200">
          {tiers.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`text-left px-4 sm:px-5 py-3.5 border-none cursor-pointer transition-all ${
                i === active ? "bg-white shadow-[inset_0_-3px_0_#4DA3E8]" : "bg-transparent hover:bg-white/60"
              }`}
            >
              <div className={`font-mono text-[10px] tracking-[1.5px] uppercase ${i === active ? "text-accent" : "text-slate-400"}`}>
                Option {i + 1}
              </div>
              <div className={`font-heading text-[13px] sm:text-[14.5px] font-bold leading-snug ${i === active ? "text-midnight" : "text-slate-500"}`}>
                {t.label || "Hotel"}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-[1fr_190px]">
        <div className="divide-y divide-slate-100">
          {!multi && (
            <div className="px-5 py-3.5 bg-accent-pale/50 font-heading text-[14.5px] font-bold text-midnight">{tier.label}</div>
          )}
          {rooms.map((r) => {
            const v = r[tier.key];
            const isNum = typeof v === "number" && v > 0;
            return (
              <div key={r.room} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="font-heading text-[14px] font-semibold text-midnight">{r.room}</div>
                  <div className="text-[11.5px] text-slate-400">
                    {r.room === "Sharing" ? "4–5 pilgrims share" : "per person, sharing"}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-heading text-[18px] font-bold ${isNum ? "text-midnight" : "text-slate-300 font-body text-[13px] font-normal italic"}`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {isNum ? formatMoney(v as number, currency) : "Not available"}
                  </div>
                  {isNum && v === lowest && rooms.length > 1 && (
                    <div className="font-mono text-[9.5px] tracking-[1px] uppercase text-emerald-600">Lowest price</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {photo && (
          <div className="hidden sm:block border-l border-slate-100">
            <img src={photo} alt={tier.label} className="w-full h-full object-cover min-h-[160px]" />
          </div>
        )}
      </div>
    </div>
  );
}
