import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const BUCKET = "branding";
const META_PATH = "settings/meta.json";

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
  "application/json",
];

type SiteMeta = {
  logo_url: string | null;
  logo_width: number;
  logo_height: number;
};

const DEFAULTS: SiteMeta = {
  logo_url: null,
  logo_width: 120,
  logo_height: 40,
};

async function ensureBucketAllowsJson(supabase: ReturnType<typeof createAdminClient>) {
  try {
    await supabase.storage.updateBucket(BUCKET, {
      allowedMimeTypes: ALLOWED_MIME_TYPES,
    });
  } catch {
    // Bucket may already allow JSON, or update may not be permitted — proceed anyway
  }
}

async function readMeta(supabase: ReturnType<typeof createAdminClient>): Promise<SiteMeta> {
  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(META_PATH);
    if (error || !data) return { ...DEFAULTS };
    const text = await data.text();
    const parsed = JSON.parse(text);
    return {
      logo_url: parsed.logo_url ?? null,
      logo_width: parsed.logo_width ?? 120,
      logo_height: parsed.logo_height ?? 40,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

async function writeMeta(
  supabase: ReturnType<typeof createAdminClient>,
  meta: SiteMeta
): Promise<{ success: boolean; error?: string }> {
  // Ensure bucket allows JSON before writing
  await ensureBucketAllowsJson(supabase);

  const blob = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" });
  const { error } = await supabase.storage.from(BUCKET).upload(META_PATH, blob, {
    contentType: "application/json",
    upsert: true,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// GET /api/site-settings — public (logo shown to all visitors)
export async function GET() {
  const supabase = createAdminClient();
  const meta = await readMeta(supabase);
  return NextResponse.json(meta);
}

// PATCH /api/site-settings — admin only
// Body: { logo_url?, logo_width?, logo_height? }
export async function PATCH(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  // Read current metadata
  const current = await readMeta(supabase);

  // Merge allowed fields
  const allowed: (keyof SiteMeta)[] = ["logo_url", "logo_width", "logo_height"];
  let hasChanges = false;
  for (const key of allowed) {
    if (key in body) {
      (current as Record<string, unknown>)[key] = body[key];
      hasChanges = true;
    }
  }

  if (!hasChanges) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  // Write updated metadata
  const result = await writeMeta(supabase, current);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(current);
}
