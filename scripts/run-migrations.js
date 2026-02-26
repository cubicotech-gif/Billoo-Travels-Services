import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    console.log("site_settings table status:", settingsError.message);
  } else {
    console.log("site_settings table EXISTS. Data:", JSON.stringify(settingsData));
  }

  // 2. Check and create branding storage bucket
  console.log("\n--- Checking branding storage bucket ---");
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.log("Error listing buckets:", bucketsError.message);
  } else {
    console.log("Available buckets:", buckets?.map((b) => b.id).join(", ") || "none");
    const brandingBucket = buckets?.find((b) => b.id === "branding");

    if (brandingBucket) {
      console.log("branding bucket already EXISTS");
    } else {
      console.log("branding bucket NOT found. Creating...");
      const { error: createError } = await supabase.storage.createBucket("branding", {
        public: true,
        fileSizeLimit: 2097152,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
      });

      if (createError) {
        console.log("Failed to create bucket:", createError.message);
      } else {
        console.log("branding bucket CREATED successfully");
      }
    }
  }

  // 3. Check packages table (migration 001)
  console.log("\n--- Checking packages table ---");
  const { data: packagesData, error: packagesError } = await supabase
    .from("packages")
    .select("id")
    .limit(1);

  if (packagesError) {
    console.log("packages table status:", packagesError.message);
  } else {
    console.log("packages table EXISTS");
  }

  // 4. If site_settings exists but empty, seed default row
  if (!settingsError && settingsData && settingsData.length === 0) {
    console.log("\n--- Seeding default site_settings row ---");
    const { error: insertError } = await supabase
      .from("site_settings")
      .insert({ id: 1, logo_url: null, logo_width: 120, logo_height: 40 });

    if (insertError) {
      console.log("Insert failed:", insertError.message);
    } else {
      console.log("Default site_settings row created!");
    }
  }

  console.log("\n--- Done ---");
}

checkAndSetup().catch(console.error);
