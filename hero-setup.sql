-- ============================================================
-- Billoo Travels — Hero Section Database Setup
-- Run this in your Supabase SQL Editor (Project → SQL Editor)
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS hero_destinations (
  id            SERIAL PRIMARY KEY,
  label         TEXT NOT NULL,
  city          TEXT NOT NULL DEFAULT '',
  code          TEXT NOT NULL DEFAULT '',
  country       TEXT NOT NULL DEFAULT '',
  tagline       TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  price         TEXT NOT NULL DEFAULT '',
  temp          TEXT NOT NULL DEFAULT '',
  flight        TEXT NOT NULL DEFAULT '',
  tz            TEXT NOT NULL DEFAULT '',
  bg_image      TEXT NOT NULL DEFAULT '',
  images        TEXT[]  NOT NULL DEFAULT '{}',
  map_x         NUMERIC NOT NULL DEFAULT 60,
  map_y         NUMERIC NOT NULL DEFAULT 45,
  quote_text    TEXT NOT NULL DEFAULT '',
  quote_name    TEXT NOT NULL DEFAULT '',
  quote_role    TEXT NOT NULL DEFAULT '',
  quote_initial TEXT NOT NULL DEFAULT '',
  sort_order    INTEGER NOT NULL DEFAULT 0,
  active        BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (recommended for Supabase)
ALTER TABLE hero_destinations ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (hero section is public-facing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'hero_destinations' AND policyname = 'Public read'
  ) THEN
    CREATE POLICY "Public read" ON hero_destinations FOR SELECT USING (true);
  END IF;
END $$;

-- 4. Seed default destinations
INSERT INTO hero_destinations
  (label, city, code, country, tagline, description, price, temp, flight, tz,
   bg_image, images, map_x, map_y,
   quote_text, quote_name, quote_role, quote_initial,
   sort_order, active)
VALUES
  (
    'Umrah', 'Makkah', 'JED', 'Saudi Arabia',
    'Your Sacred Journey, Elevated',
    'VIP pilgrimage · Five-star suites steps from Haram · Personal scholar guiding every ritual · Private SUV transfers · 99.8% visa success',
    '450,000', '34°C', '~4h 15m', 'AST',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=2400',
    ARRAY[
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=100&h=160&fit=crop&q=80'
    ],
    62, 46,
    'Flawless logistics let us focus entirely on worship. Truly transcendent.',
    'Fatima H.', 'Executive Hajj ''24', 'F',
    1, true
  ),
  (
    'Hajj 2026', 'Makkah', 'JED', 'Saudi Arabia',
    'The Journey of a Lifetime',
    'Premium Hajj packages · Palace suites at Abraj Al Bait · Dedicated scholar · VIP transfers · Priority visa processing',
    '1,250,000', '38°C', '~4h 15m', 'AST',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=85&w=2400',
    ARRAY[
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=100&h=160&fit=crop&q=80'
    ],
    62, 46,
    'The Clock Tower suite and VIP transfers exceeded all expectations.',
    'Khalid A.', 'Royal Umrah ''24', 'K',
    2, true
  ),
  (
    'Turkey', 'Istanbul', 'IST', 'Turkey',
    'Where Continents Converge',
    'Ottoman heritage · Bosphorus cruises · Cappadocia balloon rides · Luxury boutique hotels · Halal dining curated',
    '380,000', '18°C', '~5h 40m', 'TRT',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=85&w=2400',
    ARRAY[
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=160&fit=crop&q=80'
    ],
    54, 30,
    'Istanbul with Billoo felt like traveling with family. Incredible detail.',
    'Dr. Aisha S.', 'Turkey Tour ''24', 'A',
    3, true
  ),
  (
    'Dubai', 'Dubai', 'DXB', 'UAE',
    'Beyond Extraordinary',
    'Desert safaris · Sky-high dining · Beachfront suites · Burj Khalifa access · Curated shopping tours',
    '320,000', '30°C', '~2h 30m', 'GST',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=2400',
    ARRAY[
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=100&h=160&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=160&fit=crop&q=80'
    ],
    66, 43,
    'Our family trip was seamless. The personal concierge was a game changer.',
    'Hasan R.', 'Dubai Luxury ''24', 'H',
    4, true
  )
ON CONFLICT DO NOTHING;

-- 5. Optional: auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS hero_destinations_updated_at ON hero_destinations;
CREATE TRIGGER hero_destinations_updated_at
  BEFORE UPDATE ON hero_destinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Done! Your hero_destinations table is ready.
-- Go to Admin → Hero Section to manage destinations.
