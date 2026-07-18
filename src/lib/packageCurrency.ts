// ─── PACKAGE NATIVE CURRENCY HELPERS ───
// Hajj packages are quoted in a single native currency (USD or SAR). These
// helpers read a package's `currency` field and format its matching price,
// so the detail page, PDF brochure and social share cards all show the
// correct amount without depending on the site-wide currency switcher.

export type PkgCurrency = "USD" | "SAR" | "PKR";

// The two currencies Hajj packages are grouped by.
export const PACKAGE_CURRENCIES: PkgCurrency[] = ["USD", "SAR"];

export const CURRENCY_LABEL: Record<PkgCurrency, string> = {
  USD: "US Dollars",
  SAR: "Saudi Riyals",
  PKR: "Pakistani Rupees",
};

interface Priceable {
  currency?: string | null;
  price_usd?: number | null;
  price_sar?: number | null;
  price_pkr?: number | null;
}

// Normalise a package's currency, falling back to SAR when unset/invalid.
export function pkgCurrency(p: Priceable): PkgCurrency {
  const c = (p.currency || "").toUpperCase();
  return c === "USD" || c === "SAR" || c === "PKR" ? (c as PkgCurrency) : "SAR";
}

// The numeric price in the package's native currency.
export function pkgAmount(p: Priceable): number {
  const c = pkgCurrency(p);
  const map: Record<PkgCurrency, number> = {
    USD: p.price_usd ?? 0,
    SAR: p.price_sar ?? 0,
    PKR: p.price_pkr ?? 0,
  };
  return map[c] || 0;
}

// Format an amount in a given currency, e.g. "$4,499" or "SAR 16,800".
export function formatMoney(amount: number, currency: PkgCurrency): string {
  const value = (amount || 0).toLocaleString("en-US");
  return currency === "USD" ? `$${value}` : `${currency} ${value}`;
}

// Format a package's price in its native currency, e.g. "SAR 16,800".
export function formatPkgPrice(p: Priceable): string {
  return formatMoney(pkgAmount(p), pkgCurrency(p));
}
