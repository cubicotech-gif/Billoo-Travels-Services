import { CONTACT } from "@/lib/data";
import { pkgCurrency, formatPkgPrice } from "@/lib/packageCurrency";
import { packageDays } from "@/lib/packageFilters";
import type { Pricing } from "@/lib/pricing";

// ─── DERIVED HAJJ PACKAGE FACTS ───
// The packages table has no "style" or "shifting" column — those facts live in
// the badge, title and code the brochures use. Deriving them here (one place)
// keeps the admin panel unchanged: publish a package as usual and it lands in
// the right filter, card label and comparison row automatically.

export type HajjStyle = "Non-Aziziya" | "Flex" | "Comfort" | "Value";

export interface MetaSource {
  code?: string | null;
  title?: string;
  nights?: string | null;
  badge?: string | null;
  hotel?: string | null;
  hotel_short?: string | null;
  currency?: string | null;
  price_usd?: number | null;
  price_sar?: number | null;
  price_pkr?: number | null;
  pricing?: Pricing | null;
}

export interface HajjMeta {
  style: HajjStyle;
  /** Stays in an Aziziya building for (part of) the Hajj days. */
  aziziya: boolean;
  /** "Shifting" packages move between a hotel and Aziziya; the rest keep one base. */
  shifting: boolean;
  firstCity: "Madinah" | "Makkah" | null;
  days: number;
  /** Number of hotel options (Package A / B). */
  options: number;
}

export function styleOf(p: MetaSource): HajjStyle {
  const b = `${p.badge || ""} ${p.title || ""}`.toLowerCase();
  if (/flex/.test(b)) return "Flex";
  if (/comfort/.test(b)) return "Comfort";
  if (/value/.test(b)) return "Value";
  return "Non-Aziziya";
}

export function metaOf(p: MetaSource): HajjMeta {
  const style = styleOf(p);
  const title = p.title || "";
  const aziziya = style !== "Non-Aziziya";
  const shifting = style === "Flex" || style === "Comfort" || (style === "Value" && /\+\s*abraj/i.test(title));
  const firstCity = /madinah first/i.test(title) ? "Madinah" : /makkah first/i.test(title) ? "Makkah" : null;
  return {
    style,
    aziziya,
    shifting,
    firstCity,
    days: packageDays(p),
    options: p.pricing?.tiers?.length || 1,
  };
}

export const STYLE_BLURB: Record<HajjStyle, string> = {
  "Non-Aziziya": "Hotel in front of the Haram, same room all the way",
  Flex: "Makkah hotel, then Aziziya near Jamarat — family room included",
  Comfort: "5-star Makkah nights, then Aziziya near Jamarat",
  Value: "Aziziya near Jamarat — the best value for money",
};

/** Cheapest price in the chosen room row across both hotel options. */
export function roomFrom(p: MetaSource, room: string): number {
  const rows = p.pricing?.rooms || [];
  const tiers = p.pricing?.tiers || [];
  const row = rows.find((r) => r.room.toLowerCase() === room.toLowerCase());
  if (!row) return 0;
  const vals = tiers.map((t) => row[t.key]).filter((v): v is number => typeof v === "number" && v > 0);
  return vals.length ? Math.min(...vals) : 0;
}

/** Prefilled WhatsApp link so an advisor knows exactly which package was asked about. */
export function whatsappLink(p: MetaSource, extra = ""): string {
  const code = p.code ? p.code.toUpperCase() : "";
  const msg =
    `Assalamualaikum, I would like details for Hajj 2027 package ${code} ` +
    `(${p.title}, ${pkgCurrency(p)} price list, from ${formatPkgPrice(p)} per person).${extra ? " " + extra : ""}`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}
