-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — SITE SETTINGS & BRANDING
-- ─────────────────────────────────────────────────────────────────────────────

-- Singleton table for global site settings (always exactly 1 row, id = 1)
CREATE TABLE IF NOT EXISTS site_settings (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  logo_url      TEXT,
  logo_width    INTEGER  DEFAULT 120,
  logo_height   INTEGER  DEFAULT 40,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed the single row so it always exists
INSERT INTO site_settings (id, logo_url, logo_width, logo_height)
VALUES (1, NULL, 120, 40)
ON CONFLICT (id) DO NOTHING;

-- RLS: public can read (logo shown to all visitors), only admin can update
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings_public_read"
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "site_settings_admin_update"
  ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- ─── BRANDING STORAGE BUCKET ───
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'branding',
  'branding',
  true,
  2097152, -- 2 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for branding bucket
-- (separate from existing policies so they don't conflict)
CREATE POLICY "storage_branding_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'branding');

CREATE POLICY "storage_branding_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'branding');

CREATE POLICY "storage_branding_delete"
  ON storage.objects FOR DELETE
  USING (auth.role() = 'authenticated' AND bucket_id = 'branding');
