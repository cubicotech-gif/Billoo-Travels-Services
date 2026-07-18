-- ─────────────────────────────────────────────────────────────────────────────
-- 010 · PACKAGE NATIVE CURRENCY
-- Hajj packages are quoted in either USD or SAR (not PKR). This column records
-- each package's native/primary currency so the site can group packages by
-- currency and the PDF brochure / social share cards print the correct price.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE packages
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'SAR'
  CHECK (currency IN ('USD', 'SAR', 'PKR'));

-- Backfill: any existing Hajj rows default to SAR above; leave others as-is.
-- Adjust individual packages from the admin panel as needed.
