'use strict';

// Builds the PRIVATE report: reports/private/<date>-private.md
// Full detail for the owner — file paths and line refs ARE included.
// Secret values are ALWAYS masked (never raw).

const fs = require('node:fs');
const path = require('node:path');
const { maskSecrets } = require('../lib/mask');
const { SEVERITY_ORDER, dedupe, triageFor } = require('../lib/findings');

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

// Raw severity counts (true occurrence volume) + a unique-group line + scanners.
function renderSummary(findings, groups, scannerStatus) {
  const counts = countBySeverity(findings);
  const lines = [];
  lines.push('| Severity | Count (raw) |');
  lines.push('| --- | --- |');
  for (const sev of SEVERITY_ORDER) {
    lines.push(`| ${sev} | ${counts[sev]} |`);
  }
  lines.push(`| **total raw** | **${findings.length}** |`);
  lines.push(`| **unique findings (deduped)** | **${groups.length}** |`);
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

// One block per deduplicated group, highest severity first. Lists every file:line.
function renderFindings(groups) {
  if (!groups.length) return '_No findings._';

  const sorted = [...groups].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );

  const blocks = sorted.map((g, i) => {
    const lines = [
      `### ${i + 1}. ${maskSecrets(g.title)}`,
      '',
      `- **Severity:** ${g.severity}`,
      `- **Category:** ${g.category}`,
      `- **Component:** ${g.component}`,
      `- **Source:** ${g.tool}`,
      `- **Status:** ${String(g.triage.status).replace(/_/g, ' ')}`,
      `- **Occurrences:** ${g.occurrences}`,
      `- **Detail:** ${maskSecrets(g.detail) || '_n/a_'}`,
      '- **Locations:**',
    ];
    for (const l of g.locations) {
      const loc = l.file ? `${l.file}${l.line ? `:${l.line}` : ''}` : 'n/a';
      lines.push(`  - \`${loc}\``);
    }
    if (g.triage.note) lines.push(`- **Note:** ${maskSecrets(g.triage.note)}`);
    return lines.join('\n');
  });

  return blocks.join('\n\n');
}

// findings: normalized finding objects.
// scannerStatus: [{ name, status, note }]
// config: target config (project name + componentMap).
// triage: parsed config/triage.json rules.
// outDir / date: where + the date stamp.
function build({ findings, scannerStatus, config, outDir, date, triage }) {
  const tpl = loadTemplate();
  const name = (config && config.name) || 'Project';
  const componentMap = config && config.componentMap;

  // Deduplicate, then attach triage status to each group.
  const groups = dedupe(findings, componentMap).map((g) => ({
    ...g,
    triage: triageFor(g, triage),
  }));

  const intro = [
    `**Project:** ${name}`,
    '',
    'This is the **private** audit report. It contains file paths and line references',
    'for your use. Secret values are masked. Do not publish this file - use the public',
    'report for sharing.',
  ].join('\n');

  const scopeNote = [
    '> **Scope:** This is automated, continuous monitoring. It complements but does',
    '> **not** replace a professional human security audit - especially for',
    '> cryptographic or funds-handling code.',
  ].join('\n');

  const md = tpl
    .replace('{{TITLE}}', `${name} - Private Security Audit`)
    .replace('{{DATE}}', date)
    .replace('{{INTRO}}', intro)
    .replace('{{SUMMARY}}', renderSummary(findings, groups, scannerStatus))
    .replace('{{FINDINGS}}', renderFindings(groups))
    .replace('{{SCOPE_NOTE}}', scopeNote);

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${date}-private.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  return outPath;
}

module.exports = { build, countBySeverity, SEVERITY_ORDER };
