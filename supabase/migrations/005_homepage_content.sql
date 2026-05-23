-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — HOMEPAGE CONTENT (trust bar + how-it-works)
-- Singleton table (always exactly 1 row, id = 1). Edit from Admin → Homepage.
-- ─────────────────────────────────────────────────────────────────────────────

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

ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "homepage_content_public_read"
  ON homepage_content FOR SELECT USING (true);

CREATE POLICY "homepage_content_admin_update"
  ON homepage_content FOR UPDATE USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS homepage_content_updated_at ON homepage_content;
CREATE TRIGGER homepage_content_updated_at
  BEFORE UPDATE ON homepage_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
