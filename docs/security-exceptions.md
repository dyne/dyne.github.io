# Dependency audit policy

The Astro 7 checkpoint has no dependency-security exceptions. CI runs
`npm audit --json` through `scripts/validate-npm-audit.mjs`, which accepts only
reports with zero high and zero critical advisories. Do not add an allowlist:
update to a fixed dependency release instead.

Dyne.org remains a static GitHub Pages site. That reduces its runtime attack
surface, but it does not relax the dependency audit requirement.
