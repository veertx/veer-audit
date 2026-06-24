# VeerTx - Public Security Report

_Generated 2026-06-24 by veer-audit - local-first automated security audit._

VeerTx is a non-custodial privacy payment relay on Solana and Base. It generates shareable pay links that route payments through stealth addresses so sender and receiver wallets are never linked on-chain.

**Audited dependencies:** Built on Privacy Cash ZK pools, which are independently audited.

This public report is **sanitized by design**: it contains no code, no file paths,
no secret values, and no tool names. It summarizes the security posture observed by
automated local scanning.

## Summary

**Open posture - unresolved findings (lead with this):**

| Severity | Open |
| --- | --- |
| critical | 0 |
| high | 4 |
| medium | 13 |
| low | 6 |
| info | 0 |
| **total open** | **23** |

**All findings - including triaged (resolved / accepted / legacy / false positive):**

| Severity | All |
| --- | --- |
| critical | 0 |
| high | 13 |
| medium | 18 |
| low | 6 |
| info | 0 |
| **total** | **37** |

## Findings

### 1. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** open
- **Occurrences:** 4
- **Summary:** ws - GHSA-96hv-2xvq-fx4p
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 2. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** open
- **Occurrences:** 1
- **Summary:** tmp - GHSA-ph9p-34f9-6g65
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 3. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** open
- **Occurrences:** 1
- **Summary:** undici - GHSA-vxpw-j846-p89q
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 4. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** open
- **Occurrences:** 4
- **Summary:** ws - GHSA-96hv-2xvq-fx4p
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 5. security

- **Component:** backend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.jsonwebtoken.security.audit.jwt-decode-without-verify.jwt-decode-without-verify
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 6. security

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 4
- **Summary:** html.security.audit.missing-integrity.missing-integrity
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 7. security

- **Component:** backend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 8. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** uuid - GHSA-w5hq-g745-h8pq
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 9. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** vite - GHSA-v6wh-96g9-6wx3
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 10. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 3
- **Summary:** ws - GHSA-58qx-3vcg-4xpx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 11. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** @anthropic-ai/sdk - GHSA-p7fg-763f-g4gf
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 12. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** ip-address - GHSA-v2v4-37r5-5v8g
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 13. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** qs - GHSA-q8mj-m7cp-5q26
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 14. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** tar - GHSA-vmf3-w455-68vh
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 15. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** undici - GHSA-p88m-4jfj-68fv
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 16. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 2
- **Summary:** uuid - GHSA-w5hq-g745-h8pq
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 17. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 3
- **Summary:** ws - GHSA-58qx-3vcg-4xpx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 18. security

- **Component:** backend
- **Severity:** low
- **Status:** open
- **Occurrences:** 57
- **Summary:** javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 19. security

- **Component:** operations
- **Severity:** low
- **Status:** open
- **Occurrences:** 5
- **Summary:** javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 20. security

- **Component:** backend
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 21. Dependency vulnerability

- **Component:** dependencies
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** elliptic - GHSA-848j-6mx2-7j84
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 22. Dependency vulnerability

- **Component:** dependencies
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** undici - GHSA-35p6-xmwp-9g52
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 23. Dependency vulnerability

- **Component:** dependencies
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** undici - GHSA-g8m3-5g58-fq7m
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 24. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 1
- **Summary:** bigint-buffer - GHSA-3gc7-fjrx-p6mg
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Transitive dependency of the blockchain SDK; no patched version exists upstream. Low reachability; revisit on SDK upgrades.

### 25. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 1
- **Summary:** form-data - GHSA-hmw2-7cc7-3qxx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Conditional CRLF issue requires attacker-controlled multipart field names; only fixed trusted field names are used.

### 26. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 1
- **Summary:** vite - GHSA-fx2h-pf6j-xcff
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Vite is a build-time dev dependency; the flagged dev-server paths are not present in the served static build.

### 27. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 1
- **Summary:** bigint-buffer - GHSA-3gc7-fjrx-p6mg
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Transitive dependency of the blockchain SDK; no patched version exists upstream. Low reachability; revisit on SDK upgrades.

### 28. Secret management

- **Component:** application code
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** generic-api-key
- **Impact:** A leaked credential could let an attacker access protected systems or data.
- **Recommendation:** Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.
- **Note:** Historical values in repository history; credentials rotated 2026-06-10. Remaining matches are documentation text or placeholders.

### 29. security

- **Component:** backend
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** typescript.react.security.react-insecure-request.react-insecure-request
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Loopback call to an internal webhook on 127.0.0.1; never crosses the network.

### 30. Secret management

- **Component:** configuration
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** generic-api-key
- **Impact:** A leaked credential could let an attacker access protected systems or data.
- **Recommendation:** Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.
- **Note:** Flagged value is a public on-chain contract address, not a credential.

### 31. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** path-to-regexp - GHSA-j3q9-mxjg-w52f
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is on the remediated major line; scanner range over-report.

### 32. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** underscore - GHSA-qpx9-hpmf-5gmw
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is already past the patched release; scanner range over-report.

### 33. security

- **Component:** backend
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 56
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 34. security

- **Component:** application code
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 6
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 35. security

- **Component:** frontend
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 40
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 36. security

- **Component:** operations
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 2
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 37. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** path-to-regexp - GHSA-27v5-c462-wpq7
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is on the remediated major line; scanner range over-report.

---

> **Important - scope of this report.** This is automated, continuous security
> monitoring. It **complements but does not replace** a professional human security
> audit. In particular, cryptographic and funds-handling code requires expert human
> review that automated tooling cannot provide.
