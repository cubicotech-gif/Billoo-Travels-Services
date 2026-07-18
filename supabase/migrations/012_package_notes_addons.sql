-- ─────────────────────────────────────────────────────────────────────────────
-- 012 · PACKAGE NOTES + OPTIONAL ADD-ONS
-- The Hajj brochures carry important details beyond inclusions/exclusions:
--   • add_ons  — optional paid upgrades & supplements (Deluxe/Diamond tent,
--                Kaaba view, extra Madinah nights, Aziziya family room,
--                VIP transport, airport taxi, etc.)
--   • notes    — "good to know" points (rooms retained 25-28 May, Makkah
--                nights may be reduced at same price, peak check-in after
--                Isha, prices subject to change, etc.)
-- Kept as text arrays so they render as clean bullet lists.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE packages ADD COLUMN IF NOT EXISTS add_ons TEXT[] DEFAULT '{}';
ALTER TABLE packages ADD COLUMN IF NOT EXISTS notes   TEXT[] DEFAULT '{}';
