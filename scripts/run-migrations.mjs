import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// We'll run SQL via supabase.rpc or direct REST. 
// Since supabase-js doesn't have a raw SQL method, we use the REST API.
async function runSQL(sql, label) {
  console.log(`\n--- Running: ${label} ---`);
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ query: sql }),
  });

  // The REST rpc endpoint won't work for raw SQL. Use the SQL endpoint instead.
  const sqlResponse = await fetch(`${supabaseUrl}/pg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!sqlResponse.ok) {
    // Fallback: try the management API
    console.log(`REST approach failed, trying direct approach...`);
  }
}

// Instead of raw SQL via REST, let's verify tables exist using supabase-js
async function checkAndSetup() {
  console.log("Checking Supabase connection...");
  console.log("URL:", supabaseUrl);
  
  // 1. Check if site_settings table exists
  console.log("\n--- Checking site_settings table ---");
  const { data: settingsData, error: settingsError } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1);

  if (settingsError) {
    console.log("site_settings table NOT found:", settingsError.message);
    console.log("\n=== ACTION REQUIRED ===");
    console.log("Please run the following SQL in your Supabase SQL Editor:");
    console.log("1. Go to: " + supabaseUrl.replace('.supabase.co', '.supabase.co').replace('https://', 'https://supabase.com/dashboard/project/') + '/sql/new');
    console.log("2. Copy and paste the content of: supabase/migrations/002_site_settings.sql");
    console.log("3. Click 'Run'");
    console.log("========================\n");
  } else {
    console.log("site_settings table EXISTS:", JSON.stringify(settingsData));
  }

  // 2. Check if branding bucket exists
  console.log("\n--- Checking branding storage bucket ---");
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.log("Error listing buckets:", bucketsError.message);
  } else {
    const brandingBucket = buckets?.find((b) => b.id === "branding");
    if (brandingBucket) {
      console.log("branding bucket EXISTS");
    } else {
      console.log("branding bucket NOT found. Available buckets:", buckets?.map(b => b.id).join(", ") || "none");
      
      // Try to create it
      console.log("Attempting to create branding bucket...");
      const { data: newBucket, error: createError } = await supabase.storage.createBucket("branding", {
        public: true,
        fileSizeLimit: 2097152, // 2MB
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
      });
      
      if (createError) {
        console.log("Failed to create bucket:", createError.message);
      } else {
        console.log("branding bucket CREATED successfully");
      }
    }
  }

  // 3. Check if packages table exists (from migration 001)
  console.log("\n--- Checking packages table (migration 001) ---");
  const { data: packagesData, error: packagesError } = await supabase
    .from("packages")
    .select("id")
    .limit(1);

  if (packagesError) {
    console.log("packages table NOT found:", packagesError.message);
    console.log("You need to run migration 001 first.");
  } else {
    console.log("packages table EXISTS, row count sample:", packagesData?.length);
  }

  // 4. If site_settings doesn't exist, try creating it via supabase-js
  if (settingsError) {
    console.log("\n--- Attempting to create site_settings via API ---");
    // This won't work if the table doesn't exist, but let's try inserting
    const { error: insertError } = await supabase
      .from("site_settings")
      .upsert({ id: 1, logo_url: null, logo_width: 120, logo_height: 40 });
    
    if (insertError) {
      console.log("Could not create site_settings row:", insertError.message);
      console.log("\nYou MUST run the SQL migration manually in Supabase Dashboard.");
    } else {
      console.log("site_settings row created successfully!");
    }
  }

  console.log("\n--- Summary ---");
  console.log("Done checking. If any tables are missing, please run the SQL migrations manually in Supabase SQL Editor.");
}

checkAndSetup().catch(console.error);
