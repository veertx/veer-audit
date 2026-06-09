# veer-audit — Project Memory

## Status

**Scaffolded.** Full project structure and runnable skeleton in place (2026-06-10).

**v1 scope:** local scanners + two-report generator.
- Runner shells out to `semgrep`, `gitleaks`, `osv-scanner`, `trivy` (optional),
  `npm audit` (fallback).
- Normalizes findings to a common shape.
- Emits a **private** report (paths + lines, secrets masked) and a **public** report
  (sanitized: no code, no paths, no secrets, no tool names).

## Next steps

1. **Wire scanners** — flesh out each `src/scanners/*.js` wrapper against real tool
   output (verify JSON shapes, exit codes, version flags).
2. **Report templates** — refine `src/report/template.md` and the private/public
   builders; confirm sanitization removes all paths/code/tool names.
3. **Schedule weekly** — finalize `schedule/veer-audit.cron.example` and the PM2
   ecosystem example; document install.
4. **Optional LLM layer** — build the off-by-default reasoning pass that reads ONLY
   `llm.fileAllowlist` files and runs the `checklists/crypto-checklist.md` items.

## Notes / decisions

- Plain JS, no framework, built-ins only. Every dependency is a supply-chain risk.
- Sanitization is centralized in `src/report/public.js` — the only place that decides
  what is publishable.
- Real config lives in `config/target.json` (gitignored). `config/target.example.json`
  is the committed template.
