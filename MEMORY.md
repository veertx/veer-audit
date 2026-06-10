# veer-audit - Project Memory

## Status

**v1 complete (2026-06-10).** Local scanners + two-report generator, now with
**deduplication + triage statuses**. **First real audit shipped** - run against VeerTx;
sanitized public report published at `examples/veertx-2026-06-10-public.md`.

Report templates and the example report are now **hyphen-only (no em-dashes)** for clean
rendering on the published page.

**v1 scope (delivered):** local scanners + two-report generator.
- Runner shells out to `semgrep`, `gitleaks`, `osv-scanner`, `trivy` (optional),
  `npm audit` (fallback).
- Normalizes findings, then **dedups** by (tool + rule/advisory id + component) with an
  occurrence count.
- **Triage** via private `config/triage.json` (gitignored): per-finding status
  (open / accepted / legacy / resolved / false_positive) + public-safe note.
- Emits a **private** report (paths + lines, secrets masked) and a **public** report
  (sanitized: no code, no paths, no secrets, no tool names; open-posture-first summary).

## Downstream integration

- **veer-tx frontend consumes the public reports** via its `pull-reports` script: it
  copies from `examples/` and commits them into the frontend.
- **Security page is live** at `beta.veertx.com/security`, rendering these public reports.

## Next steps

1. **Wire scanners** - flesh out each `src/scanners/*.js` wrapper against real tool
   output (verify JSON shapes, exit codes, version flags).
2. **Report templates** - refine `src/report/template.md` and the private/public
   builders; confirm sanitization removes all paths/code/tool names.
3. **Schedule weekly** - finalize `schedule/veer-audit.cron.example` and the PM2
   ecosystem example; document install.
4. **Optional LLM layer** - build the off-by-default reasoning pass that reads ONLY
   `llm.fileAllowlist` files and runs the `checklists/crypto-checklist.md` items.

## Notes / decisions

- Plain JS, no framework, built-ins only. Every dependency is a supply-chain risk.
- Sanitization is centralized in `src/report/public.js` - the only place that decides
  what is publishable.
- Real config lives in `config/target.json` (gitignored). `config/target.example.json`
  is the committed template.
