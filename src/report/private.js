'use strict';

// Builds the PRIVATE report: reports/private/<date>-private.md
// Full detail for the owner — file paths and line refs ARE included.
// Secret values are ALWAYS masked (never raw).

const fs = require('node:fs');
const path = require('node:path');
const { maskSecrets } = require('../lib/mask');

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];

function loadTemplate() {
  return fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8');
}

function countBySeverity(findings) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) {
    if (counts[f.severity] != null) counts[f.severity] += 1;
  }
  return counts;
}

function renderSummary(findings, scannerStatus) {
  const counts = countBySeverity(findings);
  const lines = [];
  lines.push('| Severity | Count |');
  lines.push('| --- | --- |');
  for (const sev of SEVERITY_ORDER) {
    lines.push(`| ${sev} | ${counts[sev]} |`);
  }
  lines.push(`| **total** | **${findings.length}** |`);
  lines.push('');
  lines.push('### Scanner status');
  lines.push('');
  lines.push('| Scanner | Status | Note |');
  lines.push('| --- | --- | --- |');
  for (const s of scannerStatus) {
    lines.push(`| ${s.name} | ${s.status} | ${maskSecrets(s.note || '')} |`);
  }
  return lines.join('\n');
}

function renderFindings(findings) {
  if (findings.length === 0) return '_No findings._';

  // Group by severity, highest first.
  const sorted = [...findings].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );

  const blocks = sorted.map((f, i) => {
    const loc = f.file ? `${f.file}${f.line ? `:${f.line}` : ''}` : 'n/a';
    return [
      `### ${i + 1}. ${maskSecrets(f.title)}`,
      '',
      `- **Severity:** ${f.severity}`,
      `- **Category:** ${f.category}`,
      `- **Source:** ${f.tool}`,
      `- **Location:** \`${loc}\``,
      `- **Detail:** ${maskSecrets(f.detail) || '_n/a_'}`,
    ].join('\n');
  });

  return blocks.join('\n\n');
}

// findings: normalized finding objects.
// scannerStatus: [{ name, status, note }]
// config: target config (for the project name).
// outDir / date: where + the date stamp.
function build({ findings, scannerStatus, config, outDir, date }) {
  const tpl = loadTemplate();
  const name = (config && config.name) || 'Project';

  const intro = [
    `**Project:** ${name}`,
    '',
    'This is the **private** audit report. It contains file paths and line references',
    'for your use. Secret values are masked. Do not publish this file — use the public',
    'report for sharing.',
  ].join('\n');

  const scopeNote = [
    '> **Scope:** This is automated, continuous monitoring. It complements but does',
    '> **not** replace a professional human security audit — especially for',
    '> cryptographic or funds-handling code.',
  ].join('\n');

  const md = tpl
    .replace('{{TITLE}}', `${name} — Private Security Audit`)
    .replace('{{DATE}}', date)
    .replace('{{INTRO}}', intro)
    .replace('{{SUMMARY}}', renderSummary(findings, scannerStatus))
    .replace('{{FINDINGS}}', renderFindings(findings))
    .replace('{{SCOPE_NOTE}}', scopeNote);

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${date}-private.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  return outPath;
}

module.exports = { build, countBySeverity, SEVERITY_ORDER };
