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
// Findings are expressed as: category / component / severity / impact / recommendation.

const fs = require('node:fs');
const path = require('node:path');
const { maskSecrets, genericizeTools } = require('../lib/mask');

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];

function loadTemplate() {
  return fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8');
}

// Map a real file path to a GENERIC component name.
// Uses config.componentMap (prefix match) when present, else a coarse heuristic.
function componentFor(file, componentMap) {
  if (!file) return 'application code';
  const norm = String(file).replace(/\\/g, '/').toLowerCase();

  if (componentMap) {
    for (const prefix of Object.keys(componentMap)) {
      if (norm.includes(prefix.replace(/\\/g, '/').toLowerCase())) {
        return componentMap[prefix];
      }
    }
  }

  // Coarse fallback heuristics — never reveal the actual path.
  if (/(server|api|backend|service|controller|route)/.test(norm)) return 'backend';
  if (/(web|ui|frontend|client|component|page|view)/.test(norm)) return 'frontend';
  if (/(package\.json|lock|deps|node_modules)/.test(norm)) return 'dependencies';
  if (/(config|\.ya?ml|\.toml|dockerfile|\.tf)/.test(norm)) return 'configuration';
  return 'application code';
}

// Derive a plain-language impact statement from category/severity.
function impactFor(f) {
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
  return map[f.category] || 'This weakness could affect the security of the application.';
}

// Derive a generic, non-leaking recommendation.
function recommendationFor(f) {
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
  return map[f.category] || 'Review and remediate following secure development best practices.';
}

function countBySeverity(findings) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) if (counts[f.severity] != null) counts[f.severity] += 1;
  return counts;
}

function renderSummary(findings) {
  const counts = countBySeverity(findings);
  const lines = ['| Severity | Count |', '| --- | --- |'];
  for (const sev of SEVERITY_ORDER) lines.push(`| ${sev} | ${counts[sev]} |`);
  lines.push(`| **total** | **${findings.length}** |`);
  return lines.join('\n');
}

// Sanitize one finding into a publishable block. NO paths, NO code, NO tool names.
function renderFinding(f, idx, componentMap) {
  const component = componentFor(f.file, componentMap);
  // Title is genericized + secret-masked; we deliberately drop f.detail (may carry
  // code/paths) and synthesize impact/recommendation instead.
  const title = genericizeTools(maskSecrets(f.title || f.category));
  return [
    `### ${idx + 1}. ${f.category}`,
    '',
    `- **Component:** ${component}`,
    `- **Severity:** ${f.severity}`,
    `- **Summary:** ${title}`,
    `- **Impact:** ${impactFor(f)}`,
    `- **Recommendation:** ${recommendationFor(f)}`,
  ].join('\n');
}

function renderFindings(findings, componentMap) {
  if (findings.length === 0) {
    return '_No findings of note in this run._';
  }
  const sorted = [...findings].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );
  return sorted.map((f, i) => renderFinding(f, i, componentMap)).join('\n\n');
}

function build({ findings, config, outDir, date }) {
  const tpl = loadTemplate();
  const name = (config && config.name) || 'Project';
  const ctx = (config && config.context) || {};
  const componentMap = config && config.componentMap;

  // Intro from config publicDescription + audited dependencies line.
  const introParts = [];
  if (ctx.publicDescription) {
    introParts.push(genericizeTools(maskSecrets(ctx.publicDescription)));
  }
  if (Array.isArray(ctx.auditedDependencies) && ctx.auditedDependencies.length) {
    introParts.push('');
    introParts.push(`**Audited dependencies:** ${ctx.auditedDependencies.join('; ')}.`);
  }
  introParts.push('');
  introParts.push(
    'This public report is **sanitized by design**: it contains no code, no file paths,',
    'no secret values, and no tool names. It summarizes the security posture observed by',
    'automated local scanning.'
  );
  const intro = introParts.join('\n');

  const scopeNote = [
    '> **Important — scope of this report.** This is automated, continuous security',
    '> monitoring. It **complements but does not replace** a professional human security',
    '> audit. In particular, cryptographic and funds-handling code requires expert human',
    '> review that automated tooling cannot provide.',
  ].join('\n');

  let md = tpl
    .replace('{{TITLE}}', `${name} — Public Security Report`)
    .replace('{{DATE}}', date)
    .replace('{{INTRO}}', intro)
    .replace('{{SUMMARY}}', renderSummary(findings))
    .replace('{{FINDINGS}}', renderFindings(findings, componentMap))
    .replace('{{SCOPE_NOTE}}', scopeNote);

  // Final safety net: run the WHOLE document through the genericizers + secret mask
  // one more time so nothing leaks even if a builder path was missed.
  md = genericizeTools(maskSecrets(md));

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${date}-public.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  return outPath;
}

module.exports = { build, componentFor, impactFor, recommendationFor };
