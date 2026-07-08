#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function getArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[index + 1];
}

function stripCodeFence(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
  }
  return trimmed;
}

async function main() {
  const apiKey = process.env.V0_API_KEY;
  if (!apiKey) {
    console.error("V0_API_KEY is required. Set it in .env.");
    process.exit(1);
  }

  const promptFile = getArg("--prompt-file");
  const prompt =
    (promptFile && fs.readFileSync(promptFile, "utf8")) ||
    getArg(
      "--prompt",
      "Create a bold, modern landing hero section for a Next.js page using Tailwind CSS. Provide a single React component (default export) that can be used as the content of app/page.tsx. Include a hero headline, subtext, two CTA buttons, and a small feature list. Use a light background with subtle gradient and a simple geometric accent. No external images. Keep it responsive. Output code only."
    );
  const model = getArg("--model", "v0-1.5-md");
  const outPath = getArg("--out", "apps/web/app/page.tsx");

  const response = await fetch("https://api.v0.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`v0 API error: ${response.status} ${response.statusText}`);
    console.error(text);
    process.exit(1);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    console.error("v0 API response missing content.");
    process.exit(1);
  }

  const output = stripCodeFence(content);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  console.log(`Wrote ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
