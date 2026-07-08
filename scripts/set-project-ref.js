#!/usr/bin/env node
/**
 * Overwrite supabase/config.toml project_id with SUPABASE_PROJECT_REF_PROD (or SUPABASE_PROJECT_REF).
 * This is handy when the config is still pointing at a local project_id and db push fails.
 */

const fs = require("fs");
const path = require("path");

const projectRef =
  process.env.SUPABASE_PROJECT_REF_PROD ||
  process.env.SUPABASE_PROJECT_REF ||
  process.env.SUPABASE_PROJECT_ID ||
  "";

if (!projectRef || !/^[a-z]{20}$/.test(projectRef)) {
  console.error(
    "project ref is missing or invalid. Set SUPABASE_PROJECT_REF_PROD (20 lowercase letters)."
  );
  process.exit(1);
}

const configPath = path.join(process.cwd(), "supabase", "config.toml");

if (!fs.existsSync(configPath)) {
  console.error("supabase/config.toml not found");
  process.exit(1);
}

const text = fs.readFileSync(configPath, "utf8");
const updated = text.replace(
  /^project_id\s*=\s*".*"/m,
  `project_id = "${projectRef}"`
);

fs.writeFileSync(configPath, updated, "utf8");
console.log(`Updated supabase/config.toml project_id to ${projectRef}`);
