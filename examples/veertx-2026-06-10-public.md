# VeerTx - Public Security Report

_Generated 2026-06-10 by veer-audit - local-first automated security audit._

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
| high | 1 |
| medium | 12 |
| low | 5 |
| info | 0 |
| **total open** | **18** |

**All findings - including triaged (resolved / accepted / legacy / false positive):**

| Severity | All |
| --- | --- |
| critical | 0 |
| high | 20 |
| medium | 29 |
| low | 6 |
| info | 0 |
| **total** | **55** |

## Findings

### 1. security

- **Component:** backend
- **Severity:** high
- **Status:** open
- **Occurrences:** 1
- **Summary:** typescript.react.security.react-insecure-request.react-insecure-request
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Under review.

### 2. security

- **Component:** backend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.jsonwebtoken.security.audit.jwt-decode-without-verify.jwt-decode-without-verify
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 3. security

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 6
- **Summary:** html.security.audit.missing-integrity.missing-integrity
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 4. security

- **Component:** backend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 5. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** postcss - GHSA-qx2v-qp2m-jg93
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 6. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** qs - GHSA-q8mj-m7cp-5q26
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 7. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 3
- **Summary:** uuid - GHSA-w5hq-g745-h8pq
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 8. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** open
- **Occurrences:** 5
- **Summary:** ws - GHSA-58qx-3vcg-4xpx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 9. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** @anthropic-ai/sdk - GHSA-p7fg-763f-g4gf
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 10. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** ip-address - GHSA-v2v4-37r5-5v8g
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 11. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 1
- **Summary:** qs - GHSA-q8mj-m7cp-5q26
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 12. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 2
- **Summary:** uuid - GHSA-w5hq-g745-h8pq
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 13. Dependency vulnerability

- **Component:** dependencies
- **Severity:** medium
- **Status:** open
- **Occurrences:** 3
- **Summary:** ws - GHSA-58qx-3vcg-4xpx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 14. security

- **Component:** backend
- **Severity:** low
- **Status:** open
- **Occurrences:** 58
- **Summary:** javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 15. security

- **Component:** operations
- **Severity:** low
- **Status:** open
- **Occurrences:** 6
- **Summary:** javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 16. security

- **Component:** backend
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.

### 17. Dependency vulnerability

- **Component:** frontend
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** elliptic - GHSA-848j-6mx2-7j84
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 18. Dependency vulnerability

- **Component:** dependencies
- **Severity:** low
- **Status:** open
- **Occurrences:** 1
- **Summary:** elliptic - GHSA-848j-6mx2-7j84
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.

### 19. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 2
- **Summary:** bigint-buffer - GHSA-3gc7-fjrx-p6mg
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Transitive dependency of the blockchain SDK; no patched version exists upstream. Low reachability; revisit on SDK upgrades.

### 20. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** accepted
- **Occurrences:** 1
- **Summary:** bigint-buffer - GHSA-3gc7-fjrx-p6mg
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Transitive dependency of the blockchain SDK; no patched version exists upstream. Low reachability; revisit on SDK upgrades.

### 21. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** legacy
- **Occurrences:** 1
- **Summary:** follow-redirects - GHSA-r4q5-vmmm-2653
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Legacy frontend only; retired at migration.

### 22. Secret management

- **Component:** application code
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 3
- **Summary:** generic-api-key
- **Impact:** A leaked credential could let an attacker access protected systems or data.
- **Recommendation:** Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.
- **Note:** Historical values in repository history; credentials rotated 2026-06-10. Remaining matches are documentation text or placeholders.

### 23. Secret management

- **Component:** application code
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** telegram-bot-api-token
- **Impact:** A leaked credential could let an attacker access protected systems or data.
- **Recommendation:** Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.
- **Note:** Historical value in repository history; credential rotated 2026-06-10.

### 24. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-35jp-ww65-95wh
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 25. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-3g43-6gmg-66jw
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 26. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-6chq-wfr3-2hj9
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 27. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-777c-7fjr-54vf
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 28. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-hfxv-24rg-xrqf
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 29. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-j5f8-grm9-p9fc
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 30. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-p92q-9vqr-4j8v
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 31. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-pf86-5x62-jrwf
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 32. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-pjwm-pj3p-43mv
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 33. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-pmwg-cvhr-8vh7
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 34. Dependency vulnerability

- **Component:** frontend
- **Severity:** high
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-q8qp-cvcw-x6jj
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 35. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-3p68-rc4w-qgx5
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 36. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-3w6x-2g7m-8v23
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 37. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-445q-vr5w-6q77
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 38. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-5c9x-8gcm-mpgx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 39. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-62hf-57xw-28j9
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 40. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-898c-q2cr-xwhg
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 41. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-fvcv-3m26-pcqx
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 42. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-m7pr-hjqh-92cm
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 43. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-vf2m-468p-8v99
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 44. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-w9j2-pvgh-6h63
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 45. Dependency vulnerability

- **Component:** frontend
- **Severity:** medium
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-xx6v-rp6x-q39c
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 46. Dependency vulnerability

- **Component:** frontend
- **Severity:** low
- **Status:** resolved
- **Occurrences:** 1
- **Summary:** axios - GHSA-xhjh-pmcv-23jw
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Dependency overridden to a patched version in the active frontend. Remaining occurrences are in the legacy frontend, retired at migration. The package is not present in the served bundle.

### 47. Secret management

- **Component:** configuration
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** generic-api-key
- **Impact:** A leaked credential could let an attacker access protected systems or data.
- **Recommendation:** Rotate the affected credential, remove it from source and history, and load secrets from a manager or environment.
- **Note:** Flagged value is a public on-chain contract address, not a credential.

### 48. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** path-to-regexp - GHSA-j3q9-mxjg-w52f
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is on the remediated major line; scanner range over-report.

### 49. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** tmp - GHSA-ph9p-34f9-6g65
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is already past the patched release; scanner range over-report.

### 50. Dependency vulnerability

- **Component:** dependencies
- **Severity:** high
- **Status:** false positive
- **Occurrences:** 1
- **Summary:** underscore - GHSA-qpx9-hpmf-5gmw
- **Impact:** A known vulnerability in a third-party dependency could be exploited against the application.
- **Recommendation:** Upgrade the affected dependency to a patched version and re-run dependency scanning.
- **Note:** Locked version is already past the patched release; scanner range over-report.

### 51. security

- **Component:** backend
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 54
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 52. security

- **Component:** application code
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 6
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 53. security

- **Component:** frontend
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 47
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 54. security

- **Component:** operations
- **Severity:** medium
- **Status:** false positive
- **Occurrences:** 2
- **Summary:** rules.static analysis.insecure-secret-comparison
- **Impact:** This weakness could affect the security of the application.
- **Recommendation:** Review and remediate following secure development best practices.
- **Note:** Custom detection rule is intentionally broad; flagged comparisons reviewed and do not compare secret material. Rule tightening planned.

### 55. Dependency vulnerability

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
