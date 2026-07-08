# AGENTS.md

This file provides instructions for AI agents working in this repository.

## First steps
- Read `README.md` for project overview and workflows.
- Prefer `scripts/` for generation tasks; do not reimplement them.

## Supabase notes
- `pnpm dump:supabase` and `pnpm gen:all` generate local status/schema dumps under `supabase/`.
- `supabase/status.txt` includes secrets; do not commit or share it.

## v0 notes
- Use the v0 Model API via `pnpm v0:generate` as the primary workflow.
- The Model API endpoint is `https://api.v0.dev/v1/chat/completions` with `Authorization: Bearer $V0_API_KEY`.
- MCP is optional and not required for normal usage.

## Safety
- Avoid modifying files outside the repository unless explicitly asked.
- Ask before running commands that require network access or system-wide changes.
