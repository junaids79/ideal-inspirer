/**
 * Creates the demo login user in Supabase (idempotent).
 *
 * Usage: npm run seed:demo-user
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
 * .env.local. If email confirmation is enabled in Supabase, confirm the user
 * in the dashboard before logging in.
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  DEMO_FULL_NAME,
} = require("../lib/demoCredentials.js");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Missing .env.local — copy .env.local.example first.");
    process.exit(1);
  }

  const vars = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

async function main() {
  const env = loadEnvLocal();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
    process.exit(1);
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase.auth.signUp({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    options: { data: { full_name: DEMO_FULL_NAME } },
  });

  if (error) {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });

    if (loginError) {
      console.error("Could not create or sign in demo user:", error.message);
      process.exit(1);
    }

    console.log("Demo user already exists — credentials verified.");
    return;
  }

  if (data.session && data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: DEMO_FULL_NAME,
      email: DEMO_EMAIL,
    });
    console.log("Demo user created with an active session.");
  } else {
    console.log(
      "Demo user created. Confirm the email in Supabase Auth before logging in."
    );
  }

  console.log(`Email: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
