-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS SERVICES — SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor (or via Supabase CLI)
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── EXTENSIONS ───
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PACKAGES ───
CREATE TABLE IF NOT EXISTS packages (
  id               SERIAL PRIMARY KEY,
  type             TEXT NOT NULL CHECK (type IN ('Umrah', 'Hajj', 'Tour')),
  title            TEXT NOT NULL,
  nights           TEXT NOT NULL,
  hotel            TEXT NOT NULL,
  hotel_short      TEXT,
  dates            TEXT,
  includes         TEXT[]   DEFAULT '{}',
  price_pkr        INTEGER  NOT NULL DEFAULT 0,
  price_usd        INTEGER  NOT NULL DEFAULT 0,
  price_sar        INTEGER  NOT NULL DEFAULT 0,
  badge            TEXT,
  img              TEXT,
  placeholder      TEXT,
  overview         TEXT,
  itinerary        JSONB    DEFAULT '[]',
  included_items   TEXT[]   DEFAULT '{}',
  not_included     TEXT[]   DEFAULT '{}',
  gallery          TEXT[]   DEFAULT '{}',
  status           TEXT     DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  bookings_count   INTEGER  DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BOOKINGS ───
CREATE TABLE IF NOT EXISTS bookings (
  id               TEXT PRIMARY KEY, -- e.g. BT-2501-4821
  package_id       INTEGER REFERENCES packages(id) ON DELETE SET NULL,
  package_title    TEXT NOT NULL,
  tier             TEXT,
  contact_name     TEXT NOT NULL,
  contact_email    TEXT NOT NULL,
  contact_phone    TEXT NOT NULL,
  departure_date   TEXT,
  special_requests TEXT,
  currency         TEXT DEFAULT 'PKR' CHECK (currency IN ('PKR', 'USD', 'SAR')),
  base_price       BIGINT NOT NULL DEFAULT 0,
  total_price      BIGINT NOT NULL DEFAULT 0,
  booking_status   TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  payment_status   TEXT DEFAULT 'unpaid'  CHECK (payment_status IN ('unpaid', 'deposit_paid', 'partially_paid', 'paid', 'refunded')),
  payment_method   TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TRAVELERS ───
CREATE TABLE IF NOT EXISTS travelers (
  id          SERIAL PRIMARY KEY,
  booking_id  TEXT REFERENCES bookings(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  passport    TEXT NOT NULL,
  dob         TEXT,
  gender      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONTACT MESSAGES ───
CREATE TABLE IF NOT EXISTS contact_messages (
  id               SERIAL PRIMARY KEY,
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  destination      TEXT,
  package_interest TEXT,
  message          TEXT,
  status           TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BLOG POSTS ───
CREATE TABLE IF NOT EXISTS blog_posts (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  category    TEXT,
  author      TEXT DEFAULT 'Billoo Travels Editorial Team',
  read_time   TEXT,
  img         TEXT,
  placeholder TEXT,
  description TEXT,
  content     JSONB    DEFAULT '[]',
  published   BOOLEAN  DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TESTIMONIALS ───
CREATE TABLE IF NOT EXISTS testimonials (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  text        TEXT NOT NULL,
  img         TEXT,
  placeholder TEXT,
  rating      INTEGER DEFAULT 5,
  published   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AUTO-UPDATE updated_at ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_packages_updated   BEFORE UPDATE ON packages   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated   BEFORE UPDATE ON bookings   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_blog_updated       BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE packages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE travelers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials     ENABLE ROW LEVEL SECURITY;

-- packages: public read, authenticated write
CREATE POLICY "packages_public_read"   ON packages FOR SELECT USING (true);
CREATE POLICY "packages_admin_insert"  ON packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "packages_admin_update"  ON packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "packages_admin_delete"  ON packages FOR DELETE USING (auth.role() = 'authenticated');

-- bookings: anyone can create, only authenticated can read/update
CREATE POLICY "bookings_public_insert"   ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_admin_select"    ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "bookings_admin_update"    ON bookings FOR UPDATE USING (auth.role() = 'authenticated');

-- travelers: anyone can insert (linked to booking creation), admin reads
CREATE POLICY "travelers_public_insert"  ON travelers FOR INSERT WITH CHECK (true);
CREATE POLICY "travelers_admin_select"   ON travelers FOR SELECT USING (auth.role() = 'authenticated');

-- contact_messages: anyone can insert, admin reads
CREATE POLICY "contact_public_insert"    ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_select"     ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "contact_admin_update"     ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- blog_posts: public read, authenticated write
CREATE POLICY "blog_public_read"         ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "blog_admin_all"           ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- testimonials: public read published, authenticated write
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (published = true);
CREATE POLICY "testimonials_admin_all"   ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────────
-- STORAGE BUCKETS
-- Run these after the main schema
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('package-images', 'package-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('blog-images',    'blog-images',    true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('media',          'media',          true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif','video/mp4'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, authenticated upload
CREATE POLICY "storage_public_read"  ON storage.objects FOR SELECT USING (bucket_id IN ('package-images','blog-images','media'));
CREATE POLICY "storage_admin_insert" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id IN ('package-images','blog-images','media'));
CREATE POLICY "storage_admin_update" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "storage_admin_delete" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
