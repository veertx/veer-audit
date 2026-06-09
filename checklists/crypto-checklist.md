# Crypto Audit Checklist (LOCKED)

> The manual / optional-LLM review checklist for cryptographic and funds-handling code.
> These items require reasoning automated scanners cannot do. When the LLM layer is
> enabled, it reviews **only** the files in `config.llm.fileAllowlist` against this list.
> **Do not edit these items casually — they are locked guarantees.**

1. **Signing message constants are byte-identical.**
   Every constant string that is signed/verified must match byte-for-byte across
   client and server. No whitespace drift, no trailing newline differences, no
   encoding mismatch. A single differing byte breaks verification or, worse, allows
   a mismatched-domain signature to validate.

2. **Strict separation of signature purposes.**
   - **Deterministic stealth signature:** contains **no nonce and no timestamp** —
     it must be reproducible.
   - **Authentication signature:** **must** bind a fresh **nonce + timestamp + URI**.
   The two code paths must never share a message format or be interchangeable.

3. **Every EVM address is lowercased before backend lookup/recovery.**
   Address comparisons and map lookups must normalize to lowercase first. Mixed-case
   (checksum) addresses must never be compared raw against stored lowercase keys.

4. **ECDSA low-S enforcement on recovery.**
   Reject signatures whose `S` value is in the upper half of the curve order
   (malleability). Enforce low-S on every recovery/verify path.

5. **No logging of keys or signatures.**
   Private keys, secret keys, seed phrases, and raw signatures must never reach logs,
   error messages, traces, or telemetry — at any log level.

6. **RPC failure = fail secure.**
   On any RPC error, timeout, or `null`/empty response, **halt**. Never treat a failed
   or null RPC result as a valid state and never act on it. Default to refusing the
   operation.

7. **Frontend integrity.**
   - **SRI** (Subresource Integrity) on all built/third-party assets.
   - Verified **DNS / DNSSEC** posture for the served domain.
   The goal: a tampered asset or hijacked DNS cannot silently serve malicious code.
