-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — LICENSES & CREDENTIALS (verifiable documents)
-- Upload the real Munazzam certificate, Ministry of Religious Affairs licence,
-- IATA & Nusuk documents. Shown as clickable trust proof on the site.
-- Edit from Admin → Homepage.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses_label   TEXT    NOT NULL DEFAULT 'Officially Licensed & Verified';
-- Array of { title, issuer, image, doc_url }
--   title   — e.g. "Hajj Group Organizer Licence"
--   issuer  — e.g. "Ministry of Religious Affairs" / "Munazzam" / "Nusuk"
--   image   — a preview image URL (screenshot / photo of the certificate)
--   doc_url — full document to open on click (image or PDF)
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS licenses         JSONB   NOT NULL DEFAULT '[]'::jsonb;

-- Seed a few placeholders (image-less) so the admin sees the structure.
-- Upload the real documents from Admin → Homepage → Licenses & Credentials.
UPDATE homepage_content
SET licenses = '[
  {"title": "Hajj Group Organizer Licence", "issuer": "Ministry of Religious Affairs", "image": "", "doc_url": ""},
  {"title": "Munazzam Registration", "issuer": "Munazzam · Saudi Hajj Platform", "image": "", "doc_url": ""},
  {"title": "Nusuk Umrah Platform Partner", "issuer": "Nusuk", "image": "", "doc_url": ""},
  {"title": "IATA Accreditation", "issuer": "IATA", "image": "", "doc_url": ""}
]'::jsonb
WHERE id = 1 AND (licenses IS NULL OR licenses = '[]'::jsonb);

-- ── Documents storage bucket (images + PDF) for licence uploads ──
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  10485760, -- 10 MB
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

-- Done! Go to Admin → Homepage to upload your real licence documents.
