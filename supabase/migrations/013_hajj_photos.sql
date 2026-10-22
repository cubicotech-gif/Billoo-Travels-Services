-- ─────────────────────────────────────────────────────────────────────────────
-- 013 · HAJJ PHOTO LIBRARY
-- One photo per hotel / service, uploaded once from Admin → Hajj Photos and
-- reused automatically by every Hajj package that uses that hotel (cards,
-- detail page, comparison). A package's own cover photo (Admin → Packages)
-- still wins when set.
-- Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hajj_photos (
  key        TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  grp        TEXT NOT NULL,
  sort_order INT  NOT NULL DEFAULT 0,
  image_url  TEXT
);

INSERT INTO hajj_photos (key, label, grp, sort_order) VALUES
  ('intercontinental',  'Dar Al Tawhid Intercontinental',  'Makkah hotels', 10),
  ('fairmont',          'Fairmont Clock Tower',            'Makkah hotels', 20),
  ('dar-al-tawhid-ihg', 'Dar Al Tawhid IHG',               'Makkah hotels', 30),
  ('swissotel',         'Swissotel Makkah',                'Makkah hotels', 40),
  ('abraj-tower',       'Abraj Tower / Makkah Hotel & Tower', 'Makkah hotels', 50),
  ('makkah-tower',      'Makkah Tower',                    'Makkah hotels', 60),
  ('pullman-zamzam',    'Pullman Zamzam Makkah',           'Makkah hotels', 70),
  ('voco',              'Voco Makkah by IHG',              'Makkah hotels', 80),
  ('dar-al-taqwa',      'Dar Al Taqwa',                    'Madinah hotels', 110),
  ('dallah-taibah',     'Dallah Taibah (Premier Floor)',   'Madinah hotels', 120),
  ('hilton-madinah',    'Hilton Madinah',                  'Madinah hotels', 130),
  ('al-aqeeq',          'Al Aqeeq',                        'Madinah hotels', 140),
  ('aziziya-exterior',  'Aziziya building (opposite Jamarat)', 'Aziziya', 210),
  ('aziziya-room',      'Aziziya room',                    'Aziziya', 220),
  ('aziziya-dining',    'Aziziya dining hall',             'Aziziya', 230),
  ('aziziya-lobby',     'Aziziya lobby & prayer area',     'Aziziya', 240),
  ('mina-camp',         'Mina camp (Maktab A / A Plus, Zone 1)', 'Mashaer & transport', 310),
  ('arafat-camp',       'Arafat air-conditioned camp',     'Mashaer & transport', 320),
  ('luxury-bus',        'Luxury Mashaer bus',              'Mashaer & transport', 330),
  ('bullet-train',      'Makkah–Madinah high-speed train', 'Mashaer & transport', 340),
  ('kaaba',             'Kaaba / Masjid al-Haram',         'General', 410),
  ('madinah-haram',     'Masjid an-Nabawi',                'General', 420)
ON CONFLICT (key) DO NOTHING;
