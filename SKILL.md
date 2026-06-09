# veer-audit — Skill & Design System

> The operating contract for this project. Read before changing anything.

## Purpose

`veer-audit` is a **local-first, privacy-preserving security audit agent**. It runs a
**weekly automated security audit** over a target codebase and produces **two reports**:

- a **private report** for the project owner (file paths + line refs, full detail), and
- a **public report** that is **sanitized by design** — safe to publish.

It is continuous monitoring, not a one-shot tool, and **not** a replacement for a
professional human audit of cryptographic or funds-handling code.

## Stack

- **Runner:** Node.js, **plain JS, no framework**. Built-ins only (`child_process`,
  `fs`, `path`). No heavy dependencies.
- **Execution model:** the runner **shells out** to scanners installed on the host and
  collects their JSON output. Everything runs **locally**.
- **Scanners:**
  - `semgrep` — SAST + this repo's **custom rules** (`rules/semgrep/`).
  - `gitleaks` — secret scanning.
  - `osv-scanner` — dependency CVEs.
  - `trivy` — config / IaC scanning (**optional**).
  - `npm audit` — dependency fallback when `osv-scanner` is unavailable.
- **Optional LLM layer:** any provider, **off by default**. When enabled, it reasons
  over a **scoped file allowlist only** (see Hard Rules). It is never required to run.

## Hard rules (non-negotiable)

These are the privacy guarantees the project exists to provide. Violating one is a bug.

1. **PUBLIC reports never contain:** code snippets, file paths, secret values, stack
   traces, or **AI tool / vendor names**. Refer to tooling generically — "static
   analysis", "dependency scanning", "secret scanning", "configuration scanning".
2. **PRIVATE reports** may contain file paths and line references, but **never raw
   secret values** — always mask them (e.g. `AKIA…XXXX`).
3. **The agent never uploads the codebase anywhere.** All scanners run locally. There
   is no telemetry, no upload step, no remote submission.
4. **The LLM layer (if enabled) sends ONLY files** matching the explicit
   `llm.fileAllowlist` in the target config. No allowlist match → nothing is sent.
   Off by default.

## Report tone & shape

Every finding is expressed as:

```
category / component (generic name) / severity / impact / recommendation
```

- **category** — class of issue (e.g. "Secret management", "Dependency vulnerability").
- **component** — a **generic** name in public reports ("backend", "application code",
  "frontend"), mapped from real paths via `config.componentMap` when present.
- **severity** — `critical` / `high` / `medium` / `low` / `info`.
- **impact** — what an attacker could do, in plain language.
- **recommendation** — the fix, actionable and specific without leaking internals.

Tone is calm, factual, non-alarmist. No blame, no hype. State the risk and the fix.

## Design system (reports)

- **Format:** GitHub-flavored Markdown, from `src/report/template.md`.
- **Structure:** title → intro → summary counts by severity → findings → scope note.
- **Severity order:** always critical → high → medium → low → info.
- **Public closing note:** every public report ends with the standing reminder that
  automated audit **complements but does not replace** professional human audit,
  especially for cryptographic and funds-handling code.

## GSD rules for this project

- **Local-first or it doesn't ship.** No feature may introduce a network upload of
  source, findings, or secrets without explicit owner opt-in and a new config flag.
- **Sanitize at the boundary.** Public-report sanitization lives in `src/report/public.js`
  and nowhere else. Never hand the public builder anything you wouldn't publish.
- **Fail soft, per scanner.** A missing or broken scanner is marked `SKIPPED` with a
  reason; the run continues and the report records the gap. Never crash the whole run.
- **Built-ins over deps.** Reach for `node:child_process` / `node:fs` before adding a
  package. Every dependency is a supply-chain risk in a security tool.
- **Mask, don't trust.** Treat every scanner output as potentially containing a secret.
  Mask before it reaches any report.
