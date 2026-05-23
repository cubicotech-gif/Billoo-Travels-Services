-- ============================================================
-- Billoo Travels — Categories + Seasonal Spotlight Setup
-- Run this in your Supabase SQL Editor (Project → SQL Editor).
-- Safe to run more than once.
-- ============================================================
-- What it does:
--   1. Expands package categories to: Umrah, Hajj, Holidays, Honeymoon
--      (any old "Tour" packages become "Holidays").
--   2. Upgrades the homepage seasonal banner into a configurable
--      PRIMARY + SECONDARY spotlight you can point at any category
--      from Admin → Seasonal Spotlight.
-- ============================================================

-- 1) Package categories ────────────────────────────────────────────────────────
ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_type_check;
UPDATE packages SET type = 'Holidays' WHERE type = 'Tour';
ALTER TABLE packages
  ADD CONSTRAINT packages_type_check
  CHECK (type IN ('Umrah', 'Hajj', 'Holidays', 'Honeymoon'));

-- 2) Make sure the spotlight config table exists (created originally as umrah_section)
CREATE TABLE IF NOT EXISTS umrah_section (
  id              INTEGER PRIMARY KEY DEFAULT 1,
  enabled         BOOLEAN NOT NULL DEFAULT true,
  eyebrow         TEXT NOT NULL DEFAULT '',
  title           TEXT NOT NULL DEFAULT '',
  title_highlight TEXT NOT NULL DEFAULT '',
  subtitle        TEXT NOT NULL DEFAULT '',
  bg_image        TEXT NOT NULL DEFAULT '',
  badge_enabled   BOOLEAN NOT NULL DEFAULT true,
  badge_text      TEXT NOT NULL DEFAULT '',
  season_note     TEXT NOT NULL DEFAULT '',
  cta_label       TEXT NOT NULL DEFAULT 'Explore Umrah Packages',
  cta_link        TEXT NOT NULL DEFAULT '/packages?type=Umrah',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT umrah_section_single_row CHECK (id = 1)
);

INSERT INTO umrah_section (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 3) Spotlight columns: category selector + secondary spotlight ─────────────────
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

UPDATE umrah_section SET
  secondary_eyebrow         = COALESCE(NULLIF(secondary_eyebrow, ''),         'ALSO THIS SEASON'),
  secondary_title           = COALESCE(NULLIF(secondary_title, ''),           'Worldwide'),
  secondary_title_highlight = COALESCE(NULLIF(secondary_title_highlight, ''), 'Holidays'),
  secondary_subtitle        = COALESCE(NULLIF(secondary_subtitle, ''),        'Dubai, Turkey, the Maldives and beyond — curated leisure escapes for families and couples.'),
  secondary_bg_image        = COALESCE(NULLIF(secondary_bg_image, ''),        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=2400'),
  secondary_cta_label       = COALESCE(NULLIF(secondary_cta_label, ''),       'Explore Holidays'),
  secondary_cta_link        = COALESCE(NULLIF(secondary_cta_link, ''),        '/packages?type=Holidays')
WHERE id = 1;

-- Done! Go to Admin → Seasonal Spotlight to configure the primary & secondary features.
