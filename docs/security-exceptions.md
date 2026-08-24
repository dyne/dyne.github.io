# Dependency security exceptions

## Astro 5 and Sharp

Status: temporary, reviewed 2026-08-24.

The CI dependency audit currently permits only these high-severity findings affecting `astro` and its transitive `sharp` dependency:

- `GHSA-2pvr-wf23-7pc7`
- `GHSA-8hv8-536x-4wqp`
- `GHSA-f88m-g3jw-g9cj`

It continues to reject every critical advisory and every high-severity advisory identifier outside this allowlist, including new findings in Astro or Sharp. A clean report, or a report in which any approved advisory has been resolved, is accepted without requiring a policy edit.

The site remains on Astro 5 because resolving the current findings requires a separate major-framework migration. Dyne.org is generated as a static site: it does not run Astro's server rendering or server-island features in production, and Sharp processes repository-controlled images during the trusted build rather than user-supplied uploads. These constraints reduce exposure but do not remove the need to upgrade.

Remove each identifier from the allowlist in `scripts/validate-npm-audit.mjs` as soon as its advisory disappears from the lockfile audit. Remove this exception entirely after the dedicated Astro major-upgrade plan is implemented and the full build, browser, accessibility, and performance suites pass.
