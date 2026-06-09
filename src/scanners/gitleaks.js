'use strict';

// Thin wrapper around `gitleaks` (secret scanning).
// Parses JSON report output and normalizes findings. Secret values are NEVER
// returned raw — they are masked here at the source.

const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');
const { runJson } = require('../lib/exec');

// Mask a secret value, keeping only a hint of its shape.
function maskSecret(s) {
  if (!s) return '****';
  const str = String(s);
  if (str.length <= 8) return '****';
  return `${str.slice(0, 4)}…${str.slice(-2)}`;
}

function run(targetPath, opts = {}) {
  // gitleaks writes its JSON to a report file; capture to a temp path.
  const reportFile = path.join(os.tmpdir(), `veer-gitleaks-${process.pid}.json`);
  const args = [
    'detect',
    '--no-banner',
    '--no-color',
    '--source', targetPath,
    '--report-format', 'json',
    '--report-path', reportFile,
    '--exit-code', '0', // do not fail the process on findings; we read the report
  ];

  const res = runJson('gitleaks', args, { reportFile });
  if (!res.ok) {
    return { ok: false, skipped: true, reason: res.reason, findings: [] };
  }

  // gitleaks report is a JSON array of leak objects.
  let leaks = res.json;
  if (!Array.isArray(leaks)) {
    // Some versions emit {} or null when nothing is found.
    leaks = [];
  }

  const findings = leaks.map((l) => ({
    tool: 'gitleaks',
    severity: 'high', // a real leaked secret is always high+
    category: 'Secret management',
    title: l.RuleID || l.Description || 'Potential secret',
    // Mask the secret/match — never surface the raw value.
    detail: `${l.Description || 'Secret detected'} (value: ${maskSecret(l.Secret || l.Match)})`,
    file: l.File ? path.normalize(l.File) : null,
    line: l.StartLine || null,
  }));

  // Best-effort cleanup of the temp report.
  try { fs.unlinkSync(reportFile); } catch (_) { /* ignore */ }

  return { ok: true, skipped: false, reason: null, findings, raw: leaks };
}

module.exports = { run, maskSecret };
