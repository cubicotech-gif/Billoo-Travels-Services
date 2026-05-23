-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — CATEGORIES + SEASONAL SPOTLIGHT (primary & secondary)
--   • Expands package categories to Umrah / Hajj / Holidays / Honeymoon
--     (legacy 'Tour' rows are migrated to 'Holidays')
--   • Turns the old "Umrah Season" banner into a category-agnostic spotlight
--     with a PRIMARY (peak season) and an optional SECONDARY feature.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) Package categories ────────────────────────────────────────────────────────
ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_type_check;
UPDATE packages SET type = 'Holidays' WHERE type = 'Tour';
ALTER TABLE packages
  ADD CONSTRAINT packages_type_check
  CHECK (type IN ('Umrah', 'Hajj', 'Holidays', 'Honeymoon'));

-- 2) Spotlight config — add the category selector + secondary spotlight ─────────
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS spotlight_type            TEXT    NOT NULL DEFAULT 'Umrah';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_enabled         BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_type            TEXT    NOT NULL DEFAULT 'Holidays';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_eyebrow         TEXT    NOT NULL DEFAULT '';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_title           TEXT    NOT NULL DEFAULT '';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_title_highlight TEXT    NOT NULL DEFAULT '';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_subtitle        TEXT    NOT NULL DEFAULT '';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_bg_image        TEXT    NOT NULL DEFAULT '';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_cta_label       TEXT    NOT NULL DEFAULT 'Explore Packages';
ALTER TABLE umrah_section ADD COLUMN IF NOT EXISTS secondary_cta_link        TEXT    NOT NULL DEFAULT '/packages';

-- Seed a sensible secondary example on the singleton row (fills blanks only).
UPDATE umrah_section SET
  secondary_eyebrow         = COALESCE(NULLIF(secondary_eyebrow, ''),         'ALSO THIS SEASON'),
  secondary_title           = COALESCE(NULLIF(secondary_title, ''),           'Worldwide'),
  secondary_title_highlight = COALESCE(NULLIF(secondary_title_highlight, ''), 'Holidays'),
  secondary_subtitle        = COALESCE(NULLIF(secondary_subtitle, ''),        'Dubai, Turkey, the Maldives and beyond — curated leisure escapes for families and couples.'),
  secondary_bg_image        = COALESCE(NULLIF(secondary_bg_image, ''),        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=2400'),
  secondary_cta_label       = COALESCE(NULLIF(secondary_cta_label, ''),       'Explore Holidays'),
  secondary_cta_link        = COALESCE(NULLIF(secondary_cta_link, ''),        '/packages?type=Holidays')
WHERE id = 1;
