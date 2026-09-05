"use client";

import { useEffect, useState } from "react";

// Shape of a package row as returned by /api/packages.
export interface DbPackage {
  id: number;
  type: string;
  /** Brochure reference, e.g. "UB 001" — how staff and clients identify a package. */
  code: string | null;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  currency: string | null;
  includes: string[];
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  badge: string | null;
  img: string | null;
}

/**
 * Fetches the published Hajj packages once and returns them. The Hajj landing
 * page shows packages in two places (a hero teaser and the full section), so
 * this hook lets the page fetch a single time and share the result — avoiding
 * a duplicate /api/packages call. Pass `enabled = false` when a parent is
 * already supplying the data.
 */
export function useHajjPackages(enabled = true) {
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    fetch("/api/packages")
      .then((r) => r.json())
      .then((d) => {
        const all: DbPackage[] = Array.isArray(d.packages) ? d.packages : [];
        setPackages(all.filter((p) => (p.type || "").toLowerCase() === "hajj"));
      })
      .catch(() => setPackages([]))
      .finally(() => setLoaded(true));
  }, [enabled]);

  return { packages, loaded };
}
