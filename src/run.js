#!/usr/bin/env node
'use strict';

// veer-audit — main runner.
//
// 1. Load config/target.json (fall back to target.example.json with a warning).
// 2. Run each scanner via child_process against the target path.
// 3. Save raw JSON outputs to results/raw/<date>/.
// 4. Build the private + public reports.
//
// Every scanner fails SOFT: a missing/broken tool is marked SKIPPED with a reason
// and the run continues. The runner never crashes on a single scanner failure.

const fs = require('node:fs');
const path = require('node:path');

const semgrep = require('./scanners/semgrep');
const gitleaks = require('./scanners/gitleaks');
const osv = require('./scanners/osv');
const trivy = require('./scanners/trivy');
const { loadTriage } = require('./lib/findings');
const privateReport = require('./report/private');
const publicReport = require('./report/public');

const ROOT = path.resolve(__dirname, '..');

// --- date stamp (YYYY-MM-DD) -------------------------------------------------
function today() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// --- config loading ----------------------------------------------------------
function loadConfig() {
  const real = path.join(ROOT, 'config', 'target.json');
  const example = path.join(ROOT, 'config', 'target.example.json');

  if (fs.existsSync(real)) {
    return JSON.parse(fs.readFileSync(real, 'utf8'));
  }
  console.warn(
    '[veer-audit] WARNING: config/target.json not found — falling back to ' +
    'config/target.example.json. Copy it and edit before a real run.'
  );
  return JSON.parse(fs.readFileSync(example, 'utf8'));
}

// --- raw output persistence --------------------------------------------------
function saveRaw(rawDir, name, payload) {
  try {
    fs.mkdirSync(rawDir, { recursive: true });
    fs.writeFileSync(
      path.join(rawDir, `${name}.json`),
      JSON.stringify(payload, null, 2),
      'utf8'
    );
  } catch (err) {
    console.warn(`[veer-audit] could not save raw output for ${name}: ${err.message}`);
  }
}

// --- main --------------------------------------------------------------------
function main() {
  const date = today();
  const config = loadConfig();
  const targetPath = path.resolve(ROOT, config.path || '.');
  const exclude = config.exclude || [];
  const rulesDir = path.join(ROOT, 'rules', 'semgrep');

  console.log(`[veer-audit] auditing "${config.name}" at ${targetPath}`);

  if (!fs.existsSync(targetPath)) {
    console.error(`[veer-audit] target path does not exist: ${targetPath}`);
    process.exit(1);
  }

  const rawDir = path.join(ROOT, 'results', 'raw', date);

  // Scanner registry. Each entry is run independently and may be SKIPPED.
  const scanners = [
    { name: 'semgrep', run: () => semgrep.run(targetPath, { rulesDir, exclude }) },
    { name: 'gitleaks', run: () => gitleaks.run(targetPath, { exclude }) },
    { name: 'osv', run: () => osv.run(targetPath, { exclude }) },
    { name: 'trivy', run: () => trivy.run(targetPath, { exclude }) }, // optional
  ];

  const allFindings = [];
  const scannerStatus = [];

  for (const s of scanners) {
    process.stdout.write(`[veer-audit] running ${s.name}... `);
    let res;
    try {
      res = s.run();
    } catch (err) {
      // Defensive: a wrapper bug must not kill the run.
      res = { ok: false, skipped: true, reason: `wrapper error: ${err.message}`, findings: [] };
    }

    if (res.ok) {
      console.log(`ok (${res.findings.length} findings)`);
      scannerStatus.push({
        name: s.name,
        status: 'OK',
        note: res.note || `${res.findings.length} findings`,
      });
      allFindings.push(...res.findings);
      saveRaw(rawDir, s.name, res.raw != null ? res.raw : res.findings);
    } else {
      console.log(`SKIPPED (${res.reason})`);
      scannerStatus.push({ name: s.name, status: 'SKIPPED', note: res.reason });
    }
  }

  // Build both reports.
  const privateDir = path.join(ROOT, 'reports', 'private');
  const publicDir = path.join(ROOT, 'reports', 'public');

  // Triage rules (config/triage.json) are optional and private; default = none.
  const triage = loadTriage(ROOT);

  const privatePath = privateReport.build({
    findings: allFindings,
    scannerStatus,
    config,
    outDir: privateDir,
    date,
    triage,
  });
  const publicPath = publicReport.build({
    findings: allFindings,
    config,
    outDir: publicDir,
    date,
    triage,
  });

  console.log('\n[veer-audit] done.');
  console.log(`  private report: ${privatePath}`);
  console.log(`  public report:  ${publicPath}`);
  console.log(`  raw outputs:    ${rawDir}`);
  console.log(`  total findings: ${allFindings.length}`);
}

main();
