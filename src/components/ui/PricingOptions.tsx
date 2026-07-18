import { Pricing, hasPricing } from "@/lib/pricing";
import { PkgCurrency, formatMoney } from "@/lib/packageCurrency";

// Presents the package's price choices as easy-to-read "hotel option" cards
// instead of a cross-tab A/B table. Each option is one hotel choice with its
// own per-person room prices, so a traveller simply picks a hotel, then a room.
// `variant="brochure"` tightens sizing for the printed PDF.
export default function PricingOptions({
  pricing,
  currency,
  variant = "web",
}: {
  pricing: Pricing | null | undefined;
  currency: PkgCurrency;
  variant?: "web" | "brochure";
}) {
  if (!hasPricing(pricing)) return null;
  const tiers = pricing.tiers!;
  const rooms = pricing.rooms!;
  const multi = tiers.length > 1;
  const brochure = variant === "brochure";

  return (
    <div className={`grid gap-${brochure ? "2.5" : "4"} ${multi ? "sm:grid-cols-2" : "sm:grid-cols-1 max-w-md"}`}>
      {tiers.map((t, i) => (
        <div
          key={t.key}
          className="rounded-xl border border-slate-200 overflow-hidden bg-white brochure-break"
        >
          {/* Option header */}
          <div className={`bg-accent-pale/60 border-b border-slate-200 ${brochure ? "px-3 py-2" : "px-5 py-4"}`}>
            {multi && (
              <div className={`font-body text-accent-dark font-semibold ${brochure ? "text-[9.5px]" : "text-[12px]"}`}>
                Option {i + 1}
              </div>
            )}
            <div className={`font-display text-midnight leading-tight ${brochure ? "text-[13px]" : "text-[18px]"}`}>
              {t.label || "Hotel"}
            </div>
          </div>

          {/* Room prices */}
          <div className="divide-y divide-slate-100">
            {rooms.map((r, ri) => {
              const v = r[t.key];
              const isNum = typeof v === "number" && v > 0;
              return (
                <div
                  key={ri}
                  className={`flex items-center justify-between ${brochure ? "px-3 py-1.5" : "px-5 py-3"}`}
                >
                  <span className={`font-body text-slate-600 ${brochure ? "text-[10px]" : "text-[13.5px]"}`}>
                    {r.room}
                    <span className={`text-slate-400 ml-1 ${brochure ? "text-[8.5px]" : "text-[11px]"}`}>per person</span>
                  </span>
                  <span
                    className={`font-heading font-bold ${isNum ? "text-midnight" : "text-slate-300 font-body font-normal italic"} ${
                      brochure ? "text-[11.5px]" : "text-[15px]"
                    }`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {isNum ? formatMoney(v as number, currency) : "Not available"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
