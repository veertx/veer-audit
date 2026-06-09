'use strict';

// Thin wrapper around `semgrep`.
// Runs SAST plus this repo's custom rules, parses JSON, and normalizes findings to:
//   { tool, severity, category, title, detail, file, line }

const path = require('node:path');
const { runJson } = require('../lib/exec');

// Map semgrep severities to our scale.
function normSeverity(sev) {
  switch (String(sev || '').toUpperCase()) {
    case 'ERROR': return 'high';
    case 'WARNING': return 'medium';
    case 'INFO': return 'low';
    default: return 'info';
  }
}

// Run semgrep against the target. `rulesDir` points at rules/semgrep/.
// Returns { ok, skipped, reason, findings }.
function run(targetPath, opts = {}) {
  const rulesDir = opts.rulesDir;
  const exclude = opts.exclude || [];

  // --config auto pulls the registry's default rulesets; we also add our local rules.
  const args = ['--json', '--quiet', '--config', 'auto'];
  if (rulesDir) args.push('--config', rulesDir);
  for (const ex of exclude) args.push('--exclude', ex);
  args.push(targetPath);

  const res = runJson('semgrep', args);
  if (!res.ok) {
    return { ok: false, skipped: true, reason: res.reason, findings: [] };
  }

  const findings = [];
  const results = (res.json && res.json.results) || [];
  for (const r of results) {
    const extra = r.extra || {};
    findings.push({
      tool: 'semgrep',
      severity: normSeverity(extra.severity),
      category: (extra.metadata && extra.metadata.category) || 'SAST',
      title: r.check_id || 'semgrep finding',
      detail: (extra.message || '').trim(),
      file: r.path ? path.normalize(r.path) : null,
      line: (r.start && r.start.line) || null,
    });
  }

  return { ok: true, skipped: false, reason: null, findings, raw: res.json };
}

module.exports = { run, normSeverity };
