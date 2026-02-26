import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createSiteSettingsTable() {
  console.log("Creating site_settings table via Supabase REST SQL...");

  // Use the Supabase Management API to run raw SQL
  const projectRef = supabaseUrl.replace("https://", "").replace(".supabase.co", "");
  
  const sql = `
    -- Create site_settings singleton table
    CREATE TABLE IF NOT EXISTS public.site_settings (
      id            INTEGER PRIMARY KEY DEFAULT 1,
      logo_url      TEXT,
      logo_width    INTEGER  DEFAULT 120,
      logo_height   INTEGER  DEFAULT 40,
      CONSTRAINT single_row CHECK (id = 1)
    );

    -- Seed the single row so it always exists
    INSERT INTO public.site_settings (id, logo_url, logo_width, logo_height)
    VALUES (1, NULL, 120, 40)
    ON CONFLICT (id) DO NOTHING;

    -- RLS: public can read
    ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'site_settings_public_read'
      ) THEN
        CREATE POLICY site_settings_public_read ON public.site_settings FOR SELECT USING (true);
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'site_settings_admin_update'
      ) THEN
        CREATE POLICY site_settings_admin_update ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
      END IF;
    END $$;

    -- Storage policies for branding bucket (if not already there)
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'storage_branding_read'
      ) THEN
        CREATE POLICY storage_branding_read ON storage.objects FOR SELECT USING (bucket_id = 'branding');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'storage_branding_insert'
      ) THEN
        CREATE POLICY storage_branding_insert ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'branding');
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'storage_branding_delete'
      ) THEN
        CREATE POLICY storage_branding_delete ON storage.objects FOR DELETE USING (bucket_id = 'branding');
      END IF;
    END $$;
  `;

  // Execute via Supabase PostgREST rpc - we need to use the pg_net or direct fetch
  // Since we have the service role key, we can call the SQL endpoint directly
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      "apikey": supabaseServiceKey,
      "Authorization": `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  // The rpc approach may not work - let's try the Supabase pg endpoint instead
  // Try using the /pg endpoint which is available on supabase
  console.log("Trying direct SQL execution...");

  const pgResponse = await fetch(`${supabaseUrl}/pg`, {
    method: "POST",
    headers: {
      "apikey": supabaseServiceKey,
      "Authorization": `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (pgResponse.ok) {
    console.log("SQL executed successfully via /pg endpoint!");
    const result = await pgResponse.json();
    console.log("Result:", JSON.stringify(result));
  } else {
    console.log("/pg endpoint status:", pgResponse.status);
    const text = await pgResponse.text();
    console.log("/pg response:", text);
    
    // Fallback: try individual table creation steps via Supabase client
    console.log("\nFalling back to step-by-step approach...");
    await stepByStepSetup();
  }
}

async function stepByStepSetup() {
  // Step 1: Try to query the table first
  console.log("\nStep 1: Check if table exists...");
  const { error: checkError } = await supabase.from("site_settings").select("id").limit(1);
  
  if (checkError && checkError.message.includes("Could not find")) {
    console.log("Table does NOT exist. Need to create it via Supabase Dashboard SQL editor.");
    console.log("\nPlease run this SQL in your Supabase Dashboard > SQL Editor:");
    console.log("---");
    console.log(`CREATE TABLE IF NOT EXISTS public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo_url TEXT,
  logo_width INTEGER DEFAULT 120,
  logo_height INTEGER DEFAULT 40,
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.site_settings (id, logo_url, logo_width, logo_height)
VALUES (1, NULL, 120, 40)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_settings_public_read ON public.site_settings FOR SELECT USING (true);
CREATE POLICY site_settings_admin_update ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');`);
    console.log("---");
    console.log("\nAlternatively, I can make the logo system work without the database table using local storage in /public folder.");
  } else if (!checkError) {
    console.log("Table already exists!");
    
    // Seed default row if empty
    const { data } = await supabase.from("site_settings").select("*");
    if (data && data.length === 0) {
      const { error: insertErr } = await supabase
        .from("site_settings")
        .insert({ id: 1, logo_url: null, logo_width: 120, logo_height: 40 });
      console.log(insertErr ? `Seed failed: ${insertErr.message}` : "Default row seeded!");
    } else {
      console.log("Table has data:", JSON.stringify(data));
    }
  }
}

createSiteSettingsTable().catch(console.error);
