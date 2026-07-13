-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — GOOGLE REVIEWS WIDGET SETTINGS
-- Store the auto-sync Google reviews widget embed + profile link so the reviews
-- shown on the site are the real ones from your Google Business profile.
-- Edit from Admin → Reviews.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_enabled BOOLEAN NOT NULL DEFAULT true;
-- The widget container HTML from your provider (Elfsight / Featurable / Trustindex…)
-- e.g. <div class="elfsight-app-XXXXXXXX" data-elfsight-app-lazy></div>
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_embed  TEXT;
-- The provider's platform script URL
-- e.g. https://static.elfsight.com/platform/platform.js
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_script TEXT;
-- Direct link to your Google Business / Maps reviews (the "See all reviews" button)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_url    TEXT;
-- Headline rating shown in the badge, e.g. 4.9
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_rating         TEXT;
-- Total number of Google reviews, e.g. 320
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_reviews_count  TEXT;

-- Done! Go to Admin → Reviews to paste your widget embed and Google profile link.
