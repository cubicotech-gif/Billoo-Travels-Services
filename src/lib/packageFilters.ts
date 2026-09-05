// ─── HAJJ PACKAGE FILTERING HELPERS ───
// Duration and tier are not separate columns: the packages table stores the
// duration as free text in `nights` ("14 Days", "Flex 09 Days", "Value 9–10
// Days") and the tier in `badge`. Deriving the filters from those fields keeps
// the admin panel exactly as it is — publish a package the usual way and it
// lands in the right filter automatically.

export interface Filterable {
  nights?: string | null;
  badge?: string | null;
  code?: string | null;
  title?: string;
  hotel?: string | null;
  hotel_short?: string | null;
}

/** The lowest day count mentioned in `nights` — "Value 9–10 Days" → 9. */
export function packageDays(p: Filterable): number {
  const nums = (p.nights || "").match(/\d+/g);
  return nums ? Math.min(...nums.map(Number)) : 0;
}

export interface DurationBucket {
  key: string;
  label: string;
  min: number;
  max: number;
}

// Buckets chosen to match the real 2027 spread (9, 10, 13, 14, 17 and 20 days)
// without giving a visitor six near-identical chips to read.
export const DURATION_BUCKETS: DurationBucket[] = [
  { key: "short", label: "9–10 days", min: 1, max: 10 },
  { key: "mid", label: "13–14 days", min: 11, max: 14 },
  { key: "long", label: "17–20 days", min: 15, max: 999 },
];

export function packageBucket(p: Filterable): DurationBucket | undefined {
  const days = packageDays(p);
  if (!days) return undefined;
  return DURATION_BUCKETS.find((b) => days >= b.min && days <= b.max);
}

/** Distinct tier badges present, in first-seen order — mirrors what admin published. */
export function tiersOf(packages: Filterable[]): string[] {
  const seen: string[] = [];
  packages.forEach((p) => {
    const badge = (p.badge || "").trim();
    if (badge && !seen.includes(badge)) seen.push(badge);
  });
  return seen;
}

// Ignore spaces and dashes so "ub001", "UB 001" and "ub-001" all find UB 001.
const norm = (s: string) => s.toLowerCase().replace(/[\s–—-]/g, "");

/** Free-text match over the fields a visitor actually types: code, name, hotel. */
export function matchesSearch(p: Filterable, query: string): boolean {
  const needle = norm(query);
  if (!needle) return true;
  return [p.code, p.title, p.hotel, p.hotel_short]
    .filter(Boolean)
    .some((field) => norm(String(field)).includes(needle));
}
