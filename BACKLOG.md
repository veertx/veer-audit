# veer-audit - Backlog

## Public report quality

- **Map raw semgrep rule IDs to human-readable titles in public reports.** The public
  report currently prints raw rule IDs (e.g.
  `javascript.node-crypto.security.gcm-no-tag-length.gcm-no-tag-length`) as the finding
  summary. These leak the tool fingerprint - they're recognizably static-analysis rule
  paths - and read ugly on the published security page. Maintain a rule-ID -> clean title
  map and render the human-readable title, falling back to a generic title for unmapped
  IDs.
