-- ============================================================
-- Billoo Travels — Homepage Content Setup
-- Run this in your Supabase SQL Editor (Project → SQL Editor)
-- ============================================================
-- Powers two homepage marketing blocks, editable from
-- Admin → Homepage:
--   • Trust bar  (credibility figures under the hero)
--   • How It Works (the 4-step booking process)
-- Singleton table (always exactly 1 row, id = 1).
-- ============================================================

CREATE TABLE IF NOT EXISTS homepage_content (
  id              INTEGER PRIMARY KEY DEFAULT 1,
  trust_enabled   BOOLEAN NOT NULL DEFAULT true,
  trust_items     JSONB   NOT NULL DEFAULT '[]'::jsonb,
  steps_enabled   BOOLEAN NOT NULL DEFAULT true,
  steps_label     TEXT    NOT NULL DEFAULT 'Simple Process',
  steps_title     TEXT    NOT NULL DEFAULT 'Your Journey in',
  steps_highlight TEXT    NOT NULL DEFAULT 'Four Steps',
  steps_subtitle  TEXT    NOT NULL DEFAULT '',
  steps           JSONB   NOT NULL DEFAULT '[]'::jsonb,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT homepage_content_single_row CHECK (id = 1)
);

ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'homepage_content' AND policyname = 'homepage_content_public_read') THEN
    CREATE POLICY "homepage_content_public_read" ON homepage_content FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'homepage_content' AND policyname = 'homepage_content_admin_update') THEN
    CREATE POLICY "homepage_content_admin_update" ON homepage_content FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END $$;

INSERT INTO homepage_content
  (id, trust_enabled, trust_items, steps_enabled, steps_label, steps_title, steps_highlight, steps_subtitle, steps)
VALUES (
  1,
  true,
  '[
    {"value": "Since 1969", "label": "55+ Years of Trust"},
    {"value": "Licensed", "label": "Ministry of Hajj #1251"},
    {"value": "15,000+", "label": "Pilgrims Served"},
    {"value": "99.8%", "label": "Visa Success Rate"},
    {"value": "4.9★", "label": "Rated by Clients"},
    {"value": "24/7", "label": "Concierge Support"}
  ]'::jsonb,
  true,
  'Simple Process',
  'Your Journey in',
  'Four Steps',
  'From booking to boarding, we handle every detail so you can focus entirely on your worship.',
  '[
    {"title": "Choose Your Package", "desc": "Browse our curated Umrah & Hajj packages, or tell us your budget and dates and we will tailor one for you."},
    {"title": "Reserve Your Seat", "desc": "Confirm with a small deposit. Your advisor instantly locks in your hotel and flights."},
    {"title": "We Handle Everything", "desc": "Visa processing, five-star hotels near the Haram, transport and guided rituals — all arranged for you."},
    {"title": "Begin Your Journey", "desc": "Travel with complete peace of mind, backed by 24/7 concierge support throughout your trip."}
  ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS homepage_content_updated_at ON homepage_content;
CREATE TRIGGER homepage_content_updated_at
  BEFORE UPDATE ON homepage_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Accreditation strip (trust/partner logos) — added later, safe to re-run.
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accred_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accred_label   TEXT    NOT NULL DEFAULT 'Accredited & Trusted';
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accreditations JSONB   NOT NULL DEFAULT '[]'::jsonb;

UPDATE homepage_content
SET accreditations = '[
  {"name": "IATA Accredited", "logo": ""},
  {"name": "Nusuk Authorised", "logo": ""},
  {"name": "Ministry of Hajj & Umrah", "logo": ""},
  {"name": "Saudi Tourism Partner", "logo": ""},
  {"name": "DTS / TDAP Registered", "logo": ""}
]'::jsonb
WHERE id = 1 AND (accreditations IS NULL OR accreditations = '[]'::jsonb);

-- Done! Go to Admin → Homepage to edit the trust bar, accreditations and steps.
