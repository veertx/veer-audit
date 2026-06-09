'use strict';

// Secret-masking utilities. Used by BOTH report builders.
// Private reports may show paths/lines but NEVER raw secret values.
// Public reports show none of code/paths/secrets.

// Patterns that look like secret material. Conservative but broad.
const SECRET_PATTERNS = [
  /\bAKIA[0-9A-Z]{16}\b/g,                 // AWS access key id
  /\bASIA[0-9A-Z]{16}\b/g,                 // AWS temp key id
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g,       // GitHub tokens
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,     // Slack tokens
  /\bsk-[A-Za-z0-9]{20,}\b/g,              // generic "sk-" API keys
  /\b[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g, // JWT-ish
  /-----BEGIN[ A-Z]*PRIVATE KEY-----[\s\S]*?-----END[ A-Z]*PRIVATE KEY-----/g, // PEM keys
  /\b[0-9a-fA-F]{64}\b/g,                  // 32-byte hex (private keys / hashes)
  /\b[A-Za-z0-9+/]{40,}={0,2}\b/g,         // long base64 blobs
];

// Replace any secret-looking substring with a masked placeholder.
function maskSecrets(text) {
  if (text == null) return text;
  let out = String(text);
  for (const re of SECRET_PATTERNS) {
    out = out.replace(re, (m) => {
      if (m.length <= 8) return '«masked»';
      return `${m.slice(0, 4)}…«masked»`;
    });
  }
  return out;
}

// Tool/vendor names → generic terms. Used only by the public builder.
const TOOL_GENERIC = [
  [/\bsemgrep\b/gi, 'static analysis'],
  [/\bgitleaks\b/gi, 'secret scanning'],
  [/\bosv[- ]?scanner\b/gi, 'dependency scanning'],
  [/\bnpm[- ]?audit\b/gi, 'dependency scanning'],
  [/\btrivy\b/gi, 'configuration scanning'],
  // AI / vendor names must never appear in public reports.
  [/\b(openai|anthropic|claude|gpt-?\d*|gemini|llama|mistral|cohere)\b/gi, 'analysis engine'],
];

function genericizeTools(text) {
  if (text == null) return text;
  let out = String(text);
  for (const [re, repl] of TOOL_GENERIC) out = out.replace(re, repl);
  return out;
}

module.exports = { maskSecrets, genericizeTools };
