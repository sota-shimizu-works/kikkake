// scripts/gen-contracts.ts
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const OUT_ZOD = path.join(root, "packages/api-contract/zod/index.ts");
const OUT_TYPES = path.join(root, "packages/api-contract/types/index.ts");
const OPENAPI_JSON = path.join(root, "packages/api-contract/openapi.json");

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("SUPABASE_URL or KEY is missing");
  process.exit(1);
}

// 1) OpenAPIを取得
const curl = `curl -s "${url}/rest/v1/?apikey=${key}"`;
const json = execSync(curl, { stdio: ["ignore", "pipe", "inherit"] }).toString();
writeFileSync(OPENAPI_JSON, json);

// 2) OpenAPI→Zod生成
execSync(`npx openapi-typescript-zod ${OPENAPI_JSON} --output ${OUT_ZOD} --with-version`, {
  stdio: "inherit",
});

// 3) OpenAPI→TypeScript型（クライアント用定義）
execSync(`npx openapi-typescript ${OPENAPI_JSON} --output ${OUT_TYPES}`, { stdio: "inherit" });

console.log("✅ Generated: OpenAPI, Zod, Types");