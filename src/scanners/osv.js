'use strict';

// Thin wrapper around `osv-scanner` (dependency CVEs).
// Falls back to `npm audit --json` when osv-scanner is not installed.

const path = require('node:path');
const { runJson } = require('../lib/exec');

// Map CVSS-ish / OSV severities to our scale.
function normSeverity(sev) {
  const s = String(sev || '').toUpperCase();
  if (s.includes('CRITICAL')) return 'critical';
  if (s.includes('HIGH')) return 'high';
  if (s.includes('MODERATE') || s.includes('MEDIUM')) return 'medium';
  if (s.includes('LOW')) return 'low';
  return 'info';
}

// Parse npm audit JSON into normalized findings (fallback path).
function parseNpmAudit(json, targetPath) {
  const findings = [];
  const vulns = (json && json.vulnerabilities) || {};
  for (const name of Object.keys(vulns)) {
    const v = vulns[name];
    findings.push({
      tool: 'npm-audit',
      severity: normSeverity(v.severity),
      category: 'Dependency vulnerability',
      title: `${name} - ${v.severity || 'unknown'} severity`,
      detail: Array.isArray(v.via)
        ? v.via.map((x) => (typeof x === 'string' ? x : x.title)).filter(Boolean).join('; ')
        : String(v.via || ''),
      file: path.join(targetPath, 'package.json'),
      line: null,
    });
  }
  return findings;
}

function run(targetPath, opts = {}) {
  // Exclude findings whose source path falls under an excluded directory.
  // opts.exclude was previously accepted but never applied, so osv-scanner's
  // recursive walk reported lockfiles in excluded dirs (e.g. x402). Segment
  // match, NOT substring, so "x402" only matches a real x402 path segment.
  const exclude = opts.exclude || [];
  const isExcluded = (p) => {
    if (!p) return false;
    const segs = path.normalize(p).split(/[\\/]+/);
    return exclude.some((ex) => segs.includes(ex));
  };

  // Primary: osv-scanner.
  const osvArgs = ['--format', 'json', '-r', targetPath];
  // osv-scanner exits 1 when it FINDS vulnerabilities — that is a successful scan,
  // not a failure. Allow non-zero exit and parse its stdout JSON regardless.
  const res = runJson('osv-scanner', osvArgs, { allowNonZeroExit: true });

  if (res.ok) {
    const findings = [];
    const results = (res.json && res.json.results) || [];
    for (const pkgResult of results) {
      const source = pkgResult.source || {};
      if (isExcluded(source.path)) continue; // skip excluded dirs (e.g. x402)
      for (const p of pkgResult.packages || []) {
        const pkg = p.package || {};
        for (const vuln of p.vulnerabilities || []) {
          findings.push({
            tool: 'osv-scanner',
            severity: normSeverity(
              (vuln.database_specific && vuln.database_specific.severity) ||
              (vuln.severity && vuln.severity[0] && vuln.severity[0].type)
            ),
            category: 'Dependency vulnerability',
            title: `${pkg.name || 'package'} - ${vuln.id || 'advisory'}`,
            detail: (vuln.summary || vuln.details || '').slice(0, 500),
            file: source.path ? path.normalize(source.path) : null,
            line: null,
          });
        }
      }
    }
    return { ok: true, skipped: false, reason: null, findings, raw: res.json };
  }

  // Fallback: npm audit (ships with Node). Run inside the target dir.
  const auditRes = runJson('npm', ['audit', '--json'], { cwd: targetPath, allowNonZeroExit: true });
  if (auditRes.ok) {
    const findings = parseNpmAudit(auditRes.json, targetPath).filter((f) => !isExcluded(f.file));
    return {
      ok: true,
      skipped: false,
      reason: null,
      findings,
      raw: auditRes.json,
      note: 'osv-scanner unavailable; used npm audit fallback',
    };
  }

  return {
    ok: false,
    skipped: true,
    reason: `osv-scanner failed (${res.reason}); npm audit fallback failed (${auditRes.reason})`,
    findings: [],
  };
}

module.exports = { run, normSeverity, parseNpmAudit };
