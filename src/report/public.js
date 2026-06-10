'use strict';

// Builds the PUBLIC report: reports/public/<date>-public.md
//
// THIS IS THE SANITIZATION BOUNDARY. Everything that reaches the public report
// passes through here. The public report must NEVER contain:
//   - code snippets
//   - file paths
//   - secret values
//   - stack traces
//   - tool / AI vendor names
//
// Findings are deduplicated into category / component / severity / status /
// occurrences / impact / recommendation entries.

const fs = require('node:fs');
const path = require('node:path');
const { maskSecrets, genericizeTools } = require('../lib/mask');
const {
  SEVERITY_ORDER,
  STATUS_ORDER,
  componentFor,
  dedupe,
  triageFor,
} = require('../lib/findings');

function loadTemplate() {
  // Strip the leading HTML comment header so it never reaches rendered output —
  // render from the template BODY only.
  const raw = fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8');
  return raw.replace(/^<!--[\s\S]*?-->\s*/, '');
}

// Derive a plain-language impact statement from category.
function impactFor(group) {
  const map = {
    'Secret management':
      'A leaked credential could let an attacker access protected systems or data.',
    'Dependency vulnerability':
      'A known vulnerability in a third-party dependency could be exploited against the application.',
    'Configuration':
      'A misconfiguration could weaken the security posture of the deployment.',
    'SAST':
      'A code-level weakness could be exploited depending on how the affected path is reached.',
  };
  return map[group.category] || 'This weakness could affect the security of the application.';
}

// Derive a generic, non-leaking recommendation.
function recommendationFor(group) {
  const map = {
    'Secret management':
      'Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.',
    'Dependency vulnerability':
      'Upgrade the affected dependency to a patched version and re-run dependency scanning.',
    'Configuration':
      'Apply the recommended secure configuration and re-scan to confirm.',
    'SAST':
      'Review the flagged pattern and apply the secure coding practice for this issue class.',
  };
  return map[group.category] || 'Review and remediate following secure development best practices.';
}

function statusLabel(status) {
  return String(status).replace(/_/g, ' ');
}

function countBySeverity(groups) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const g of groups) if (counts[g.severity] != null) counts[g.severity] += 1;
  return counts;
}

// Two views: OPEN-only counts first (honest posture), then ALL findings.
// Counts are per deduplicated finding (group), not per raw occurrence.
function renderSummary(groups) {
  const openGroups = groups.filter((g) => g.triage.status === 'open');
  const open = countBySeverity(openGroups);
  const all = countBySeverity(groups);

  const lines = [];
  lines.push('**Open posture - unresolved findings (lead with this):**');
  lines.push('');
  lines.push('| Severity | Open |');
  lines.push('| --- | --- |');
  for (const sev of SEVERITY_ORDER) lines.push(`| ${sev} | ${open[sev]} |`);
  lines.push(`| **total open** | **${openGroups.length}** |`);
  lines.push('');
  lines.push('**All findings - including triaged (resolved / accepted / legacy / false positive):**');
  lines.push('');
  lines.push('| Severity | All |');
  lines.push('| --- | --- |');
  for (const sev of SEVERITY_ORDER) lines.push(`| ${sev} | ${all[sev]} |`);
  lines.push(`| **total** | **${groups.length}** |`);
  return lines.join('\n');
}

// Sanitize one deduplicated group into a publishable block.
function renderFinding(group, idx) {
  const isDependency = group.category === 'Dependency vulnerability';

  // GENERICIZER SCOPING: the tool/vendor scrubber corrupts dependency PACKAGE names
  // (e.g. a package whose name contains a vendor word). So for Dependency
  // vulnerability findings we mask secrets on the summary but DO NOT genericize it.
  // Prose fields are always genericized + masked.
  const rawSummary = group.title || group.category;
  const summary = isDependency
    ? maskSecrets(rawSummary)
    : genericizeTools(maskSecrets(rawSummary));

  const note = group.triage.note ? genericizeTools(maskSecrets(group.triage.note)) : '';

  const lines = [
    `### ${idx + 1}. ${group.category}`,
    '',
    `- **Component:** ${group.component}`,
    `- **Severity:** ${group.severity}`,
    `- **Status:** ${statusLabel(group.triage.status)}`,
    `- **Occurrences:** ${group.occurrences}`,
    `- **Summary:** ${summary}`,
    `- **Impact:** ${genericizeTools(impactFor(group))}`,
    `- **Recommendation:** ${genericizeTools(recommendationFor(group))}`,
  ];
  if (note) lines.push(`- **Note:** ${note}`);
  return lines.join('\n');
}

// Sorted: open first, then accepted, legacy, then resolved/false_positive;
// within a status, by severity.
function renderFindings(groups) {
  if (!groups.length) return '_No findings of note in this run._';
  const sorted = [...groups].sort((a, b) => {
    const sa = STATUS_ORDER.indexOf(a.triage.status);
    const sb = STATUS_ORDER.indexOf(b.triage.status);
    if (sa !== sb) return sa - sb;
    return SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
  });
  return sorted.map((g, i) => renderFinding(g, i)).join('\n\n');
}

function build({ findings, config, outDir, date, triage }) {
  const tpl = loadTemplate();
  const name = (config && config.name) || 'Project';
  const ctx = (config && config.context) || {};
  const componentMap = config && config.componentMap;

  // Deduplicate, then attach triage status to each group.
  const groups = dedupe(findings, componentMap).map((g) => ({
    ...g,
    triage: triageFor(g, triage),
  }));

  // Intro from config publicDescription + audited dependencies line.
  const introParts = [];
  if (ctx.publicDescription) {
    introParts.push(genericizeTools(maskSecrets(ctx.publicDescription)));
  }
  if (Array.isArray(ctx.auditedDependencies) && ctx.auditedDependencies.length) {
    introParts.push('');
    // Strip any trailing period before adding our own so we never double up ("audited..").
    const deps = genericizeTools(maskSecrets(ctx.auditedDependencies.join('; '))).replace(/\.+\s*$/, '');
    introParts.push(`**Audited dependencies:** ${deps}.`);
  }
  introParts.push('');
  introParts.push(
    'This public report is **sanitized by design**: it contains no code, no file paths,',
    'no secret values, and no tool names. It summarizes the security posture observed by',
    'automated local scanning.'
  );
  const intro = introParts.join('\n');

  const scopeNote = [
    '> **Important - scope of this report.** This is automated, continuous security',
    '> monitoring. It **complements but does not replace** a professional human security',
    '> audit. In particular, cryptographic and funds-handling code requires expert human',
    '> review that automated tooling cannot provide.',
  ].join('\n');

  let md = tpl
    .replace('{{TITLE}}', `${name} - Public Security Report`)
    .replace('{{DATE}}', date)
    .replace('{{INTRO}}', intro)
    .replace('{{SUMMARY}}', renderSummary(groups))
    .replace('{{FINDINGS}}', renderFindings(groups))
    .replace('{{SCOPE_NOTE}}', scopeNote);

  // Secret-mask safety net over the WHOLE document. NOTE: we intentionally do NOT
  // blanket-genericize here — that pass corrupted dependency package names. The
  // genericizer is applied per prose field above instead.
  md = maskSecrets(md);

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${date}-public.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  return outPath;
}

module.exports = { build, componentFor, impactFor, recommendationFor };
