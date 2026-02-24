-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — SEED DATA
-- Run AFTER 001_initial_schema.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── PACKAGES ───
INSERT INTO packages (id, type, title, nights, hotel, hotel_short, dates, includes, price_pkr, price_usd, price_sar, badge, placeholder, overview, itinerary, included_items, not_included, gallery, status, bookings_count)
VALUES
  (
    1, 'Umrah', 'Royal Umrah Retreat', '14 Nights',
    'Raffles Makkah Palace ★★★★★', 'Raffles Makkah Palace',
    'Mar 10 – 24, 2025',
    ARRAY['Private SUV', 'VIP Access', 'Executive Visa', 'Scholar Guide'],
    1250000, 4499, 16800,
    'Most Booked',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=700&h=500&fit=crop',
    'Our most popular Umrah package combines spiritual fulfillment with five-star luxury. Every aspect of your journey is meticulously planned to ensure a profound and comfortable experience.',
    '[{"day":"Day 1","title":"Arrival & Check-in","desc":"Airport reception with private transfer. Hotel check-in and orientation briefing. Evening free for rest."},{"day":"Day 2-3","title":"Makkah — Umrah Rituals","desc":"Guided Umrah performance with scholarly guidance. Tawaf, Sa''i, and all essential rituals covered with personal attention."},{"day":"Day 4-7","title":"Makkah — Spiritual Immersion","desc":"Daily prayers at Masjid Al-Haram. Optional guided Ziyarat to historical sites. Scholar-led discussion sessions."},{"day":"Day 8-10","title":"Madinah — Prophet''s City","desc":"Transfer to Madinah. Visit Masjid An-Nabawi. Guided tours of Uhud, Quba Mosque, and historical landmarks."},{"day":"Final Day","title":"Departure","desc":"Farewell breakfast. Private airport transfer. Departure with lifelong memories and spiritual renewal."}]',
    ARRAY['Return flights (business class)','5-star hotel accommodation near Haram','Daily breakfast & dinner buffet','Private airport transfers','Guided Umrah rituals','Ziyarat tours in Makkah & Madinah','Scholar guidance throughout','24/7 concierge support','Travel insurance','Visa processing'],
    ARRAY['Personal expenses & shopping','Lunch meals','Tips & gratuities','Additional excursions not in itinerary','Phone/internet charges'],
    ARRAY['https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=600&h=400&fit=crop'],
    'active', 156
  ),
  (
    2, 'Hajj', 'Executive Hajj', '21 Nights',
    'Fairmont Clock Tower ★★★★★', 'Fairmont Clock Tower',
    'Jun 1 – 22, 2025',
    ARRAY['VIP Mina Tent', 'Personal Scholar', 'Business Class', 'Chauffeur'],
    3500000, 12500, 46800,
    'Signature',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=700&h=500&fit=crop',
    'Experience the sacred journey of Hajj with unmatched luxury and devotion. Our Executive Hajj package ensures you focus solely on worship while we handle every detail with precision and care.',
    '[{"day":"Day 1","title":"Arrival & Check-in","desc":"Airport reception with private transfer. Hotel check-in and orientation briefing. Evening free for rest."},{"day":"Day 2-3","title":"Makkah — Pre-Hajj Rituals","desc":"Guided Umrah performance with scholarly guidance. Tawaf, Sa''i, and all essential rituals covered with personal attention."},{"day":"Day 4-8","title":"Makkah — Spiritual Immersion","desc":"Daily prayers at Masjid Al-Haram. Optional guided Ziyarat to historical sites. Scholar-led discussion sessions."},{"day":"Day 9-13","title":"Hajj — Sacred Days","desc":"Mina, Arafat, Muzdalifah, Jamarat — all Hajj rituals with VIP access and personal scholar guidance."},{"day":"Day 14-18","title":"Madinah — Prophet''s City","desc":"Transfer to Madinah. Visit Masjid An-Nabawi. Guided tours of Uhud, Quba Mosque, and historical landmarks."},{"day":"Final Day","title":"Departure","desc":"Farewell breakfast. Private airport transfer. Departure with lifelong memories and spiritual renewal."}]',
    ARRAY['Return flights (business class)','5-star hotel accommodation near Haram','VIP Mina tent with full services','Daily breakfast & dinner buffet','Private chauffeur throughout','Guided Hajj & Umrah rituals','Ziyarat tours in Makkah & Madinah','Personal scholar guidance','24/7 concierge support','Travel insurance','Priority visa processing'],
    ARRAY['Personal expenses & shopping','Lunch meals','Tips & gratuities','Additional excursions not in itinerary','Phone/internet charges'],
    ARRAY['https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=600&h=400&fit=crop'],
    'active', 89
  ),
  (
    3, 'Umrah', 'Premium Umrah', '10 Nights',
    'Hilton Suites Makkah ★★★★★', 'Hilton Suites Makkah',
    'Apr 15 – 25, 2025',
    ARRAY['Guided Ziyarat', 'Executive Coach', 'Visa Included', 'Buffet Meals'],
    850000, 2999, 11250,
    'Best Value',
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=700&h=500&fit=crop',
    'A premium Umrah experience designed for those seeking spiritual enrichment with exceptional comfort. Perfect for families and individuals looking for quality without compromise.',
    '[{"day":"Day 1","title":"Arrival & Check-in","desc":"Airport reception with executive coach transfer. Hotel check-in and orientation briefing. Evening free for rest."},{"day":"Day 2-3","title":"Makkah — Umrah Rituals","desc":"Guided Umrah performance with scholarly guidance. Tawaf, Sa''i, and all essential rituals covered."},{"day":"Day 4-7","title":"Makkah — Spiritual Immersion","desc":"Daily prayers at Masjid Al-Haram. Guided Ziyarat to historical sites. Scholar-led discussion sessions."},{"day":"Day 8-9","title":"Madinah — Prophet''s City","desc":"Transfer to Madinah. Visit Masjid An-Nabawi. Guided tours of Uhud, Quba Mosque."},{"day":"Final Day","title":"Departure","desc":"Farewell breakfast. Executive coach airport transfer. Departure with spiritual renewal."}]',
    ARRAY['Return flights (economy class)','5-star hotel accommodation near Haram','Daily breakfast & dinner buffet','Executive coach transfers','Guided Umrah rituals','Ziyarat tours in Makkah & Madinah','Scholar guidance','24/7 support','Travel insurance','Visa processing'],
    ARRAY['Personal expenses & shopping','Lunch meals','Tips & gratuities','Additional excursions not in itinerary'],
    ARRAY['https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop'],
    'active', 234
  );

-- Reset sequence so next auto-generated id starts from 4
SELECT setval('packages_id_seq', 3);

-- ─── BLOG POSTS ───
INSERT INTO blog_posts (title, slug, category, read_time, placeholder, description, content, published)
VALUES
  (
    'Complete Guide to Umrah 2025', 'complete-guide-umrah-2025', 'Umrah', '8 min',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=350&fit=crop',
    'Everything for a spiritually fulfilling Umrah journey this year.',
    '[{"type":"text","text":"Everything you need to know before embarking on your Umrah journey in 2025."},{"type":"heading","text":"Planning Ahead"},{"type":"text","text":"The key to a successful spiritual journey lies in thorough preparation. Start by ensuring your passport has at least six months validity and gather all necessary documentation. Book your packages well in advance — at least 2-3 months for Umrah to secure the best accommodations."},{"type":"heading","text":"What to Pack"},{"type":"text","text":"Pack light but smart. Essential items include comfortable walking shoes, modest clothing suitable for prayer, personal medications, a small prayer mat, and copies of all important documents."},{"type":"heading","text":"During Your Journey"},{"type":"text","text":"Stay hydrated, especially during summer months. Take advantage of the scholarly guidance provided in your package. Most importantly, maintain patience and focus on the spiritual aspects of your journey."}]',
    true
  ),
  (
    'Top 10 Tips for Comfortable Hajj', 'tips-comfortable-hajj', 'Hajj', '6 min',
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=350&fit=crop',
    'Expert advice from seasoned travelers on making Hajj seamless.',
    '[{"type":"text","text":"Making Hajj comfortable and spiritually fulfilling requires careful preparation and the right mindset."},{"type":"heading","text":"Physical Preparation"},{"type":"text","text":"Start walking regularly months before Hajj. The pilgrimage involves significant amounts of walking, so building your stamina is essential. Also consult your doctor about vaccinations and any health considerations."},{"type":"heading","text":"Essential Gear"},{"type":"text","text":"Invest in quality ihram clothing and comfortable sandals. A small backpack, portable battery, and a detailed map of Makkah will be invaluable companions during your journey."}]',
    true
  ),
  (
    'Istanbul: Muslim Traveler''s Paradise', 'istanbul-muslim-travelers-paradise', 'Travel', '5 min',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=350&fit=crop',
    'Explore the rich Islamic heritage of Turkey''s cultural capital.',
    '[{"type":"text","text":"Istanbul stands at the crossroads of East and West, offering Muslim travelers a unique blend of Islamic heritage, stunning architecture, and world-class hospitality."},{"type":"heading","text":"Must-Visit Islamic Sites"},{"type":"text","text":"The Blue Mosque, Hagia Sophia (now a mosque again), and the Eyüp Sultan Mosque are must-visits. Each tells a chapter of Islam''s rich history in Turkey."},{"type":"heading","text":"Halal Food Scene"},{"type":"text","text":"Istanbul''s food scene is overwhelmingly halal-friendly. From street-side kebabs to fine Ottoman cuisine, you''ll find exceptional food that caters to Muslim dietary requirements throughout the city."}]',
    true
  );

-- ─── TESTIMONIALS ───
INSERT INTO testimonials (name, role, text, placeholder, rating, published)
VALUES
  ('Fatima Hassan', 'Executive Hajj ''24', 'The proximity to the Haram and flawless logistics allowed us to focus entirely on worship. Truly transcendent.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', 5, true),
  ('Khalid Abdullah', 'Royal Umrah ''24', 'Impeccable from start to finish. The Clock Tower suite and VIP transfers exceeded all expectations.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', 5, true),
  ('Dr. Aisha Siddiqui', 'Family Umrah ''24', 'Traveling with three children was seamless. The personal concierge was an absolute game changer for our family.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', 5, true);
