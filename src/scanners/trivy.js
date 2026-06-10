'use strict';

// Thin wrapper around `trivy` (config / IaC scanning). Optional scanner.
// Scans the target filesystem for misconfigurations and parses JSON output.

const path = require('node:path');
const { runJson } = require('../lib/exec');

function normSeverity(sev) {
  switch (String(sev || '').toUpperCase()) {
    case 'CRITICAL': return 'critical';
    case 'HIGH': return 'high';
    case 'MEDIUM': return 'medium';
    case 'LOW': return 'low';
    default: return 'info';
  }
}

function run(targetPath, opts = {}) {
  // `trivy config` scans IaC / config files; `--quiet` keeps stdout JSON-clean.
  const args = ['config', '--quiet', '--format', 'json', targetPath];
  const res = runJson('trivy', args);
  if (!res.ok) {
    return { ok: false, skipped: true, reason: res.reason, findings: [] };
  }

  const findings = [];
  const results = (res.json && res.json.Results) || [];
  for (const r of results) {
    const target = r.Target || '';
    for (const m of r.Misconfigurations || []) {
      findings.push({
        tool: 'trivy',
        severity: normSeverity(m.Severity),
        category: 'Configuration',
        title: `${m.ID || 'config'} - ${m.Title || 'misconfiguration'}`,
        detail: (m.Description || m.Message || '').slice(0, 500),
        file: target ? path.normalize(target) : null,
        line: (m.CauseMetadata && m.CauseMetadata.StartLine) || null,
      });
    }
  }

  return { ok: true, skipped: false, reason: null, findings, raw: res.json };
}

module.exports = { run, normSeverity };
