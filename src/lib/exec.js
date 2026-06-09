'use strict';

// Shared helper for shelling out to local scanners and parsing their JSON.
// Centralizes graceful failure: a missing binary or a parse error never throws —
// it returns { ok:false, reason } so the runner can mark the scanner SKIPPED.

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');

// Run `bin args...` and parse stdout (or a report file) as JSON.
// opts:
//   cwd              - working directory
//   reportFile       - if set, read+parse this file instead of stdout
//   allowNonZeroExit - treat any exit code as success (some tools exit non-zero
//                      when they find issues, e.g. `npm audit`)
//   maxBuffer        - stdout buffer cap (default 64 MB)
function runJson(bin, args, opts = {}) {
  const maxBuffer = opts.maxBuffer || 64 * 1024 * 1024;

  let proc;
  try {
    proc = spawnSync(bin, args, {
      cwd: opts.cwd || process.cwd(),
      encoding: 'utf8',
      maxBuffer,
      windowsHide: true,
    });
  } catch (err) {
    return { ok: false, reason: `failed to spawn ${bin}: ${err.message}` };
  }

  // ENOENT => binary not installed.
  if (proc.error) {
    if (proc.error.code === 'ENOENT') {
      return { ok: false, reason: `${bin} not installed (not found on PATH)` };
    }
    return { ok: false, reason: `${bin} error: ${proc.error.message}` };
  }

  if (proc.status !== 0 && !opts.allowNonZeroExit) {
    const stderr = (proc.stderr || '').trim().slice(0, 300);
    return { ok: false, reason: `${bin} exited ${proc.status}: ${stderr || 'no stderr'}` };
  }

  // Choose JSON source: report file or stdout.
  let text;
  if (opts.reportFile) {
    try {
      text = fs.readFileSync(opts.reportFile, 'utf8');
    } catch (err) {
      return { ok: false, reason: `${bin} report file unreadable: ${err.message}` };
    }
  } else {
    text = proc.stdout || '';
  }

  if (!text.trim()) {
    // Empty output is valid for some tools (no findings) — treat as empty object.
    return { ok: true, json: {} };
  }

  try {
    return { ok: true, json: JSON.parse(text) };
  } catch (err) {
    return { ok: false, reason: `${bin} produced non-JSON output: ${err.message}` };
  }
}

module.exports = { runJson };
