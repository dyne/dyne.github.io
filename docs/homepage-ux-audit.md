# Homepage UX audit

Read-only UX review of `src/pages/index.astro` as rendered today (branch
`design_changes`). No files were changed to produce this report. This
builds on `docs/current-architecture-audit.md`'s technical findings; this
document looks at the same homepage purely from a visitor's-eye view: what
each section is trying to do, for whom, and where the experience currently
works against itself. Every redesign idea below is scoped to work *within*
the existing visual language (rounded `Section` pills, saccent/accent
colors, Syne/Inter type, hand-drawn illustration style) rather than propose
a rebuild.

## Current section order

As composed in `index.astro`, top to bottom:

1. **Hero** — headline + welcome line + 4 CTA buttons + `Caffuda` illustration
2. **Who we are** (`Section` wrapper) — flip-card keyword grid
3. **Stats** (component name; actually "heritage/impact" pitch) — impact copy + CTA
4. **Newsletter** — Planet Dyne pitch card + latest RSS post preview
5. **Software Announcement** — hardcoded Dynebolic promo banner
6. **Projects** — grid of 9 software project cards + "Load more" to `/software`
7. **Testimonials** — carousel of 10 quotes from external figures
8. **Supports** — donation pitch (near-duplicate of section 3)
9. **Timeline** ("What we did") — compact horizontal-scroll history + link to `/timeline`

Two components exist in `components/homepage/` but are **not mounted
anywhere on the page**: `Awards.astro` and `BannerMerch.astro`. They're
included below because a UX audit of "the homepage" should account for
content that was clearly built for this page and then dropped, since it's
either a gap to fix or dead weight to remove.

## Purpose of each section

| # | Section | Apparent purpose |
|---|---|---|
| 1 | Hero | Identity statement ("what is Dyne.org") + immediate navigation fan-out to the site's four main pillars (community/timeline, software, contact, privacy). |
| 2 | Who we are | Values/identity reinforcement via five one-word tags (open-source, sustainable, interdisciplinary, cybersecurity, crypto) — a scannable "what we stand for" moodboard. |
| 3 | Stats/heritage | Credibility + transition into the ask: "people have used our work → help us continue" with two exits (`/timeline`, `/software`). |
| 4 | Newsletter | Retention/lead-gen: convert a visitor into a recurring reader via Planet Dyne, using the most recent post as social proof of activity. |
| 5 | Software Announcement | Product marketing for one specific release (Dynebolic), timely but hand-authored. |
| 6 | Projects | Evidence: concrete list of maintained software, the closest thing to "proof of work" on the page. |
| 7 | Testimonials | Third-party credibility from named people/organizations. |
| 8 | Supports | Direct donation ask, functionally a second CTA for the same goal as section 3's "More about our story" secondary link. |
| 9 | Timeline | Longevity/history proof ("20+ years"), inviting deeper exploration. |
| — | Awards *(unmounted)* | Would add institutional/formal recognition — currently invisible to visitors even though the copy exists. |
| — | BannerMerch *(unmounted)* | Would cross-sell the Spreadshirt merch shop — currently invisible even though the component and banner asset exist. |

## Target audience served, per section

- **Hero**: everyone, but the four CTAs reveal an assumption that visitors
  arrive with one of four specific intents (join the community, evaluate
  the software, get in touch, or check the privacy stance) — a fairly
  sophisticated/self-selecting visitor, not a cold, undirected one.
- **Who we are**: values-aligned visitors (activists, artists, digital-rights
  audiences) doing a quick "do I belong here" scan.
- **Stats/heritage + Supports**: funders, donors, grant reviewers, and
  returning supporters — the donation-decision audience.
- **Newsletter**: press/community members who want ongoing visibility into
  Dyne's output, not one-time visitors.
- **Software Announcement + Projects**: technical evaluators — developers,
  sysadmins, security researchers — looking for concrete tools to adopt.
  Projects in particular pulls from `what-we-do` (9 flagship items) with a
  "Load more…" escape hatch to the full `/software` catalog.
- **Testimonials**: skeptical newcomers and institutional stakeholders who
  want third-party validation before trusting an unfamiliar org.
- **Timeline**: researchers, journalists, and anyone assessing legitimacy
  via track record ("has this org actually existed since the 90s?").
- **Awards / BannerMerch (unmounted)**: would serve, respectively, grant
  committees/press (formal recognition) and existing fans wanting to buy
  merch — both currently unserved on the homepage despite ready assets.

## Possible user questions answered

- "What even is Dyne.org?" → Hero (one-line description + tagline).
- "What do they believe in / is this project aligned with my values?" →
  Who we are.
- "Has this organization actually built anything real?" → Projects,
  Testimonials, Timeline.
- "Is this still active, or a dead project from the 2000s?" → Newsletter
  (live RSS post), Software Announcement (recent release).
- "Can I trust the people behind this?" → Testimonials (named, linked
  people/orgs), Timeline (history).
- "How do I get involved / reach them?" → Hero's "Community" CTA →
  `/contact`; header/footer socials.
- "How is this funded, and should I give money?" → Stats/heritage,
  Supports (asked twice).
- "What software can I actually download today?" → Projects (9 items) →
  `/software` (full catalog).
- **Not currently answered on the homepage**: "Has this org won any
  formal recognition/awards?" (content exists in `content/awards/index.md`
  but the component is unmounted and the routed `/awards` page is an empty
  stub) and "Can I buy something to support them directly?" (merch banner
  exists but isn't shown anywhere).

## Possible UX issues

- **Evidence comes too late.** Four sections (Hero, Who-we-are,
  Stats/heritage, Newsletter) — all mission statement, values, and a
  donation/newsletter ask — precede the first concrete proof of work
  (Projects, section 6). A technically-minded visitor arriving to evaluate
  software has to scroll past most of the page before seeing any.
- **The ask is duplicated with no differentiation.** Stats/heritage (§3)
  and Supports (§8) are both donation pitches with nearly identical copy
  ("Help us make an impact/by supporting our work") and go to the same
  `/donate` destination, split six sections apart. This reads as
  accidental duplication rather than a deliberate primary/secondary ask,
  and dilutes the donate CTA's impact rather than reinforcing it.
- **Hero offers four competing first actions with no visual hierarchy.**
  "Meet us / Software / Community / Privacy" are rendered as one button
  and three inverted (secondary-style) buttons in a wrapping flex row —
  but "Privacy" as one of only four homepage-level CTAs is an unusual
  priority for a first-time visitor's very first decision point, and
  competes directly with "Software" and "Community" for attention.
- **Component naming vs. content mismatch risks future regressions**:
  `Stats.astro` contains no statistics (it's heritage/impact prose) — a
  future editor asked to "add real numbers to the stats section" would
  likely edit the wrong file or be confused about where numeric stats
  (users, downloads, years active, countries) would actually go, since no
  such section currently exists at all despite Timeline and Testimonials
  implying a 20+ year, internationally-recognized track record that isn't
  quantified anywhere.
- **Silent content gaps**: Awards and merch cross-sell both have working
  components/copy/assets but render nowhere — from a visitor's perspective
  these opportunities (formal credibility, direct revenue) simply don't
  exist, even though the org clearly invested in producing them.
- **Testimonials carousel accessibility/robustness**: autoplay is
  correctly disabled under `prefers-reduced-motion`, and off-screen slides
  get `aria-hidden`/`tabindex="-1"` — good baseline — but the carousel
  loads Swiper from a third-party CDN only once scrolled near, so on a
  slow connection a visitor can see an empty/collapsed section before the
  library initializes; there's no static-content fallback if the CDN
  fetch fails.
- **Timeline interaction is drag-to-scroll only**, with no visible
  scrollbar or "there's more" affordance beyond a thin custom-styled
  scrollbar; touch/keyboard users get no explicit hint that the compact
  homepage timeline is horizontally scrollable at all.
- **The RSS/newsletter section shows exactly one post** with a fixed
  "More newsletter issues" link — it's not clear from the visual design
  whether this is a live feed or a static screenshot-like card, which may
  undersell how active the newsletter actually is.

## Redesign opportunities (identity-preserving)

These are reordering/consolidation/labeling changes, not a visual or
component rewrite — the `Section` pill pattern, color system, and existing
components stay as-is.

- **Move Projects earlier**, e.g. directly after Hero or after Who-we-are,
  so technical evaluators hit concrete evidence within the first two
  screens. Who-we-are's flip cards and the heritage pitch can follow as
  reinforcement rather than gatekeeping.
- **Merge the two donation asks into one, placed once.** Keep
  Stats/heritage as the higher-level "impact" pitch with a single strong
  CTA to `/donate`, and repurpose or retire `Supports.astro`'s near-duplicate
  copy rather than repeating the same ask verbatim later on the same page.
  If a second donate touchpoint is wanted for visitors who scroll all the
  way down, differentiate its copy/framing from the first instead of
  reusing the same headline.
- **Give the Hero CTAs a clear primary/secondary hierarchy** consistent
  with the existing `Button`/`inverted` component API (already supports
  exactly this): one solid primary action (e.g. "Software" or "Meet us"),
  the rest visually secondary, and consider moving "Privacy" out of the
  homepage hero into the footer/contact context where a privacy-conscious
  visitor would naturally look for it, without removing the page or the
  content.
- **Surface Awards and the merch banner** using their existing,
  already-built components — either mount `Awards.astro` in place of (or
  alongside) one of the two donation pitches to add institutional
  credibility to the funding ask, and/or mount `BannerMerch.astro` near
  Supports as an alternative, non-donation way to contribute. Both slot
  into the existing `Section`/rounded-card visual rhythm with no new
  design work.
- **Add a real, lightweight "by the numbers" strip** (years active,
  software projects maintained, countries/testimonials, etc.) using the
  existing pill/`Section` styling, separate from the renamed heritage
  block — this would finally give the `Stats` name a referent and answer
  the "is this still active / how big is this" question with a number
  instead of prose, without requiring new content infrastructure (the data
  already exists implicitly: `what-we-do` collection count, testimonial
  count, timeline start year).
- **Clarify the Newsletter section as "live"** — a small "Latest from
  Planet Dyne" eyebrow label or visible publish date on the RSS item would
  make it obvious this is a live feed rather than static marketing copy,
  reinforcing the "still active" signal the page is already trying to send
  via the Software Announcement and Timeline sections.
- **Add a scroll affordance to the homepage timeline** (a subtle gradient
  fade at the right edge, or a small "drag/scroll for more →" caption)
  using only CSS — no change to the underlying `TimelineHome.svelte` data
  flow or the CSV-driven architecture.

---

*This audit is based on a static read of `index.astro` and its imported
components/content; it does not include analytics, scroll-depth data, or
user testing, so the ordering and hierarchy issues above are inferred from
structure and copy, not measured behavior.*
