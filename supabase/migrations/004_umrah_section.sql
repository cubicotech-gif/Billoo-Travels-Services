-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — UMRAH SEASON SECTION (homepage marketing banner)
-- Singleton table (always exactly 1 row, id = 1). Edit from Admin → Umrah Season.
-- ─────────────────────────────────────────────────────────────────────────────

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

INSERT INTO umrah_section
  (id, enabled, eyebrow, title, title_highlight, subtitle, bg_image,
   badge_enabled, badge_text, season_note, cta_label, cta_link)
VALUES (
  1,
  true,
  'NEW SEASON · 1448 AH',
  'Umrah',
  '1448',
  'The new Umrah season is here. Secure your place with Pakistan''s most trusted name — five-star hotels steps from the Haram, visa processing, flights and guided rituals handled end to end.',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=2400',
  true,
  'Early-Bird Pricing · Limited Seats',
  'Bookings now open',
  'Explore Umrah Packages',
  '/packages?type=Umrah'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE umrah_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "umrah_section_public_read"
  ON umrah_section FOR SELECT USING (true);

CREATE POLICY "umrah_section_admin_update"
  ON umrah_section FOR UPDATE USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS umrah_section_updated_at ON umrah_section;
CREATE TRIGGER umrah_section_updated_at
  BEFORE UPDATE ON umrah_section
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
