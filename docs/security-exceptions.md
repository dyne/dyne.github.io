# Dependency security exceptions

## Astro 6 transition and Sharp

Status: temporary, reviewed 2026-08-24.

The CI dependency audit permits only these high-severity findings during the reviewed Astro 6 checkpoint:

- `GHSA-2pvr-wf23-7pc7`
- `GHSA-8hv8-536x-4wqp`
- `GHSA-f88m-g3jw-g9cj`
- `GHSA-f48w-9m4c-m7f5`
- `GHSA-7pw4-f3q4-r2p2`
- `GHSA-4g3v-8h47-v7g6`

It continues to reject every critical advisory and every high-severity advisory identifier outside this allowlist, including new findings in Astro or Sharp. A clean report, or a report in which any approved advisory has been resolved, is accepted without requiring a policy edit.

The current Astro 6 lockfile reports the three new Astro identifiers through the direct `astro@6.4.8` dependency at `node_modules/astro`; the available fixed version is `astro@7.2.6`. `GHSA-f88m-g3jw-g9cj` remains on the transitive `astro -> sharp` path at `node_modules/sharp`. The two earlier Astro identifiers remain listed solely to permit a clean rollback to the prior reviewed Astro 5 checkpoint; they are not present in the Astro 6 audit report.

Dyne.org is generated as a static site: it does not run Astro's server rendering or server-island features in production, and Sharp processes repository-controlled images during the trusted build rather than user-supplied uploads. These constraints reduce exposure but do not remove the need to upgrade.

This exception expires at the mandatory Astro 7 boundary: `migrate-astro-seven` must remove the three Astro 6 transition IDs, all rollback-only identifiers, and the Sharp identifier from the validator and this document. The Astro 7 lockfile must have zero high/critical advisories; no additional allowlist entry is permitted.
