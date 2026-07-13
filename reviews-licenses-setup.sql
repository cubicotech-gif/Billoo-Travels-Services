-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — REVIEWS & LICENSES SETUP
-- Run this once in Supabase → SQL Editor to enable:
--   1. The live Google Reviews widget (Admin → Reviews)
--   2. Verifiable Licence & Credential documents (Admin → Homepage)
-- Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Google Reviews widget settings ──
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_embed  TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_script TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_url    TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_rating         TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_count  TEXT;

-- ── 2. Licences & credentials ──
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses_label   TEXT    NOT NULL DEFAULT 'Officially Licensed & Verified';
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses         JSONB   NOT NULL DEFAULT '[]'::jsonb;

UPDATE homepage_content
SET licenses = '[
  {"title": "Hajj Group Organizer Licence", "issuer": "Ministry of Religious Affairs", "image": "", "doc_url": ""},
  {"title": "Munazzam Registration", "issuer": "Munazzam · Saudi Hajj Platform", "image": "", "doc_url": ""},
  {"title": "Nusuk Umrah Platform Partner", "issuer": "Nusuk", "image": "", "doc_url": ""},
  {"title": "IATA Accreditation", "issuer": "IATA", "image": "", "doc_url": ""}
]'::jsonb
WHERE id = 1 AND (licenses IS NULL OR licenses = '[]'::jsonb);

-- ── 3. Documents storage bucket (images + PDF) for licence uploads ──
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents', 'documents', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','application/pdf']
)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  CREATE POLICY "storage_documents_read"   ON storage.objects FOR SELECT USING (bucket_id = 'documents');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "storage_documents_insert" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'documents');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "storage_documents_delete" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated' AND bucket_id = 'documents');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Done! Now open Admin → Reviews and Admin → Homepage to add the real content.
