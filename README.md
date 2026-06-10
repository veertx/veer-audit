# veer-audit

**An open-source, local-first AI security audit agent that produces shareable,
sanitized reports.**

`veer-audit` runs a security audit over your codebase **on your machine** and produces
two reports:

- a **private report** for you — with file paths, line references, and full detail; and
- a **public report** — **sanitized by design**: no code, no file paths, no secrets,
  no stack traces, and no tool/vendor names. Safe to publish, share with your community,
  or attach to a release.

Your code never leaves your machine.

## Who it's for

- Project owners who want **continuous, automated security monitoring** without paying
  for a SaaS that ingests their source.
- Open-source maintainers who want to **publish proof of ongoing security hygiene**
  without leaking implementation details.
- Teams shipping crypto / funds-handling code who want a weekly safety net **on top of**
  (never instead of) professional human audits.

## How it works

The agent shells out to industry-standard scanners installed on your host, collects
their JSON output locally, normalizes the findings, and renders the two reports. No
upload step exists.

Scanners used:

- **SAST** — `semgrep`, including this repo's custom rules in `rules/semgrep/`.
- **Secret scanning** — `gitleaks`.
- **Dependency CVEs** — `osv-scanner` (falls back to `npm audit` if unavailable).
- **Configuration / IaC** — `trivy` (optional).

An **optional LLM reasoning layer** (any provider, **off by default**) can review a
small, explicit allowlist of files for logic-level issues using the locked
`checklists/crypto-checklist.md`. It only ever sees files you list.

## Quick start

### 1. Install the scanners

Install whichever you want — official installs only. Any missing tool is simply
marked **SKIPPED** in the report; the agent still runs.

**semgrep** (static analysis)

```bash
pip install semgrep
# Windows: semgrep runs best via WSL or pipx — use:
pipx install semgrep
```

**gitleaks** (secret scanning)

```bash
winget install gitleaks          # Windows
brew install gitleaks            # macOS
# Linux: https://github.com/gitleaks/gitleaks/releases
```

**osv-scanner** (dependency CVEs)

```bash
winget install Google.OSVScanner # Windows (if missing in winget, see releases below)
brew install osv-scanner         # macOS
# Linux / releases: https://github.com/google/osv-scanner/releases
```

**trivy** (configuration / IaC — **OPTIONAL**)

```bash
brew install trivy               # macOS
# Other platforms / releases: https://github.com/aquasecurity/trivy/releases
```

Then verify they're on your PATH:

```bash
semgrep --version
gitleaks version
osv-scanner --version
```

`npm audit` ships with Node.js and needs no install (used as a dependency-scan fallback).

### 2. Configure your target

```bash
cp config/target.example.json config/target.json
# edit config/target.json — set name, path to your project, excludes, etc.
```

`config/target.json` is **gitignored** — your real config stays private.

### 3. Run

```bash
node src/run.js
# or, once linked:  veer-audit
```

Outputs land in:

- `results/raw/<date>/` — raw scanner JSON (gitignored).
- `reports/private/<date>-private.md` — your detailed report (gitignored).
- `reports/public/<date>-public.md` — the sanitized, shareable report (gitignored).

### 4. Schedule it (optional)

See `schedule/veer-audit.cron.example` for a weekly cron line and a PM2 ecosystem
example.

## Example report

See [`examples/veertx-2026-06-10-public.md`](examples/veertx-2026-06-10-public.md) — a real public report generated against VeerTx, with deduplication and triage statuses.

## The privacy model

- **Your code never leaves your machine.** Scanners run locally; there is no telemetry
  and no upload path in the code.
- **Public reports are sanitized by design.** The public builder strips file paths
  (mapping them to generic component names), strips code, masks anything resembling a
  secret, and replaces tool/vendor names with generic terms ("static analysis",
  "dependency scanning", "secret scanning").
- **Private reports** keep paths and line numbers so you can act, but **always mask**
  secret values.
- **The optional LLM layer** sends only the files in your explicit allowlist — nothing
  else — and is off unless you turn it on.

## Scope — read this honestly

`veer-audit` is **continuous automated monitoring**. It is a safety net and an early
warning system. It catches known vulnerability patterns, leaked secrets, vulnerable
dependencies, and common misconfigurations.

**It is NOT a replacement for a professional human security audit** — especially for
**cryptographic code or any code that handles funds**. Automated tools cannot reason
about your threat model, your protocol's economic assumptions, or subtle logic flaws
the way an expert human auditor can. Use `veer-audit` to stay clean between audits, not
instead of them.

## License

Open source. See `LICENSE` (add your preferred license).
