// ─── ROOM-TYPE PRICING MATRIX ───
// A Hajj package's `pricing` field holds a room-type × hotel-tier matrix.
// Each package can have one or two hotel tiers (Package A / Package B) and
// a price per room type (Quad/Triple/Double) for each tier. A value of null
// means "not available" (shown as N/A).

export interface PricingTier {
  key: string;   // "A" | "B"
  label: string; // hotel name, e.g. "Fairmont Clock Tower"
}

export interface PricingRoom {
  room: string;                       // "Quad" | "Triple" | "Double"
  [tierKey: string]: number | string | null; // per-tier price (or null)
}

export interface Pricing {
  tiers?: PricingTier[];
  rooms?: PricingRoom[];
}

// True when the package carries a usable price matrix.
export function hasPricing(p: Pricing | null | undefined): p is Pricing {
  return !!p && Array.isArray(p.tiers) && p.tiers.length > 0 && Array.isArray(p.rooms) && p.rooms.length > 0;
}

// Collect every numeric price cell in the matrix.
export function pricingValues(p: Pricing | null | undefined): number[] {
  if (!hasPricing(p)) return [];
  const vals: number[] = [];
  for (const row of p.rooms!) {
    for (const tier of p.tiers!) {
      const v = row[tier.key];
      if (typeof v === "number" && v > 0) vals.push(v);
    }
  }
  return vals;
}

// The lowest ("From") price across the whole matrix, or 0 if none.
export function pricingFrom(p: Pricing | null | undefined): number {
  const vals = pricingValues(p);
  return vals.length ? Math.min(...vals) : 0;
}
