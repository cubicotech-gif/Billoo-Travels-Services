import { Pricing, hasPricing } from "@/lib/pricing";
import { PkgCurrency, formatMoney } from "@/lib/packageCurrency";

// Renders the room-type × hotel-tier price matrix as a table.
// `variant="brochure"` uses tighter, print-friendly sizing.
export default function PricingTable({
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
  const brochure = variant === "brochure";

  const cell = (v: number | string | null) =>
    typeof v === "number" && v > 0 ? formatMoney(v, currency) : "—";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className={`text-left font-heading font-bold text-midnight bg-surface-alt border border-slate-200 ${
                brochure ? "text-[11px] px-3 py-2" : "text-[13px] px-4 py-3"
              }`}
            >
              Room Type
            </th>
            {tiers.map((t) => (
              <th
                key={t.key}
                className={`text-left font-heading font-bold text-midnight bg-surface-alt border border-slate-200 ${
                  brochure ? "text-[11px] px-3 py-2" : "text-[13px] px-4 py-3"
                }`}
              >
                <div>{tiers.length > 1 ? `Package ${t.key}` : "Price"}</div>
                {t.label && (
                  <div className={`font-body font-normal text-slate-500 ${brochure ? "text-[9px]" : "text-[11px]"} mt-0.5 leading-snug`}>
                    {t.label}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-white" : "bg-surface/40"}>
              <td
                className={`font-heading font-semibold text-midnight border border-slate-200 ${
                  brochure ? "text-[11px] px-3 py-2" : "text-[13px] px-4 py-2.5"
                }`}
              >
                {row.room}
                <span className={`font-body font-normal text-slate-400 ml-1 ${brochure ? "text-[9px]" : "text-[11px]"}`}>/ person</span>
              </td>
              {tiers.map((t) => {
                const v = row[t.key];
                const isNum = typeof v === "number" && v > 0;
                return (
                  <td
                    key={t.key}
                    className={`border border-slate-200 font-heading font-semibold ${
                      isNum ? "text-accent-dark" : "text-slate-300"
                    } ${brochure ? "text-[11px] px-3 py-2" : "text-[13px] px-4 py-2.5"}`}
                  >
                    {cell(v)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
