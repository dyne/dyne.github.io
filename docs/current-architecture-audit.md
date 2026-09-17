# Current architecture audit

Read-only survey of the Astro codebase as of commit `13a11d5` (branch
`design_changes`). No files were changed to produce this report. Astro
version is `^7.3.3` (`package.json`), output mode `static`
(`astro.config.mjs`), with Svelte, MDX, Tailwind v4, Partytown and sitemap
integrations.

## 1. Current page structure

### `src/pages` inventory

- **9 `.astro` route files**: `index.astro`, `404.astro`, `timeline.astro`,
  `donate.astro`, `blog/index.astro`, `books/index.astro`,
  `software/index.astro`, `contact/index.astro`, `privacy/index.astro`.
- **1 API-style route**: `.well-known/nostr.json.ts` (returns a NIP-05 JSON
  document, not a page).
- **68 `.md`/`.mdx` files**: one per legacy content page or software product
  (`software/*.md`), plus a long tail of standalone one-off pages at the
  root of `src/pages` (`museum.md`, `netsukuku.md`, `writings.mdx`, etc.).
- Nested route folders (`blog/`, `books/`, `contact/`, `privacy/`,
  `software/`) each expose an `index.astro` — i.e. routing is entirely
  filesystem-based, no dynamic `[slug]` routes exist anywhere in the site.

### How the 68 markdown pages route

Every `.md`/`.mdx` page selects its own layout via Astro's frontmatter
`layout:` field (a legacy Astro pattern, not a wrapping import). Splitting
those 68 files by declared layout:

| Layout | Count | Purpose |
|---|---|---|
| `redirect.astro` | 41 | Legacy-URL stubs: frontmatter is just `destination:` (+ optional `title`), body is empty/`ok`. Immediately `<meta http-equiv="refresh">` + JS redirect to the real URL, tagged `noindex`. |
| `Layout.astro` | ~25 | Real content pages (all `software/*.md`, `awards.md`, art/writing one-offs). |
| `embed.astro` | 2 | `decodeos.md`, `harvest.md` — server-fetch a remote Markdown/HTML resource at build time and inline it (see `remote-content.mjs`). |

`astro.config.mjs` scans `src/pages` at config-load time for the string
`layout:\s*.*redirect.astro` and builds a `redirectRoutes` set, which is fed
into `@astrojs/sitemap`'s `filter` so the 41 redirect stubs never enter the
sitemap. This is a **build-time coupling between routing convention and
sitemap config** — renaming or restructuring `redirect.astro` or changing
how pages declare it will silently change sitemap output.

### Important entry points

- `src/pages/index.astro` — homepage, the most component-dense page in the
  site (see §4).
- `src/layouts/BaseLayout.astro` — the true HTML root (`<html>`, `<head>`,
  `<body>`, skip-link, focus-visible styles, global CSS/font imports). Every
  other layout wraps this one.
- `src/config.mjs` — single source for site name/origin/title/description,
  imported by `MetaTags.astro`, `Layout.astro`, `HomepageLayout.astro`, and
  `astro.config.mjs` itself.
- `src/lib/remote-content.mjs` — shared fetch layer (bounded size/timeout,
  URL-scheme allowlisting) used by the homepage newsletter block, `/blog`,
  `/software` (GitHub repos), and the two `embed.astro` pages. Has an
  offline fallback gated by `DYNE_REMOTE_CONTENT_OFFLINE=1` (used in CI/tests
  per `docs/astro-upgrade-baseline.md`).
- `src/pages/.well-known/nostr.json.ts` — the only non-Astro-page route,
  proving the routing layer isn't purely presentational.

## 2. Content architecture

### `src/content` collections (`src/content.config.ts`)

Only **three** collections are formally registered with Astro's content
layer, all using the `glob()` loader over Markdown with a Zod schema:

```ts
'what-we-do' -> src/content/what-we-do/*.md   { name, logo, link, download? }
testimonial  -> src/content/testimonial/*.md  { pic, field? }
'who-we-are' -> src/content/who-we-are/*.md   { word, color, rotation }
```

These are consumed exclusively via `getCollection()` + `render()` in three
homepage components: `Projects.astro`, `Testimonials.astro`,
`WhoWeAre.astro`.

### Everything else under `src/content` is loose data, not a collection

The rest of `src/content` is a mix of conventions that predate (or sit
outside) the content-collection API:

- **Markdown-with-frontmatter "singleton" files**, imported directly as ES
  modules (`import * as copy from '~/content/x/index.md'`) rather than
  through `getCollection`: `hero/index.md`, `heritage/index.md`,
  `supports/index.md`, `awards/index.md`, `contact/index.md`. Astro's MDX/MD
  integration exposes `.frontmatter` and `.compiledContent()` on these,
  which is how components pull copy (see §4).
- **Flat JSON data files**, imported as plain JS objects: `software.json`
  (the canonical software-product registry, keyed by `id`), `menu/menu.json`
  (header nav), `social/*.json` (four separate social-link variants for
  header, footer, contact page, privacy page), `books/books.json`,
  `privacy/*.json`.
- **Orphaned content**: `what-we-did/{index,10,20}.md` (a `datum`/
  `description` schema that looks like timeline entries) is **not**
  registered in `content.config.ts` and is not imported by any component or
  page — it appears to be leftover from before the timeline was rebuilt
  around a CSV (see §4). `homepage/Awards.astro` reads
  `content/awards/index.md` but the component itself is never imported by
  any page — `awards.md` (the actual routed `/awards` page) is a bare
  frontmatter stub with no body content, so the real award copy that exists
  in `content/awards/index.md` is presently unreachable by a visitor.
- **Broken symlinks on this checkout**: `src/content/pillars`,
  `src/content/projects`, `src/content/timeline`, and the root-level
  `content` and `images` entries are git symlinks that Windows checked out
  as literal one-line text files (e.g. `src/content/timeline` contains the
  text `what-we-did/`) instead of resolving to real directories. This is a
  local-checkout artifact (needs `git config core.symlinks true` and a
  filesystem/privilege that supports symlinks, or WSL) — the target
  repository layout is presumably a submodule or shared content tree, not a
  content bug in the site itself. It does mean `pillars/`, `projects/`, and
  the not-yet-content-collection `timeline/` cannot currently be inspected
  from this checkout.

### Content → page wiring, summarized

There is no single, uniform content model. Three different mechanisms
coexist for pulling data into markup:

1. `getCollection()` (type-checked, schema-validated) — 3 homepage sections.
2. Direct `.md` module import for frontmatter + compiled body — 5
   single-instance copy blocks (hero, heritage, supports, awards*, contact).
3. Direct `.json` import — software list, nav, socials, books, privacy
   links.

This works, but it means adding a new "collection-like" content type
requires picking the right one of three patterns by precedent rather than
following one documented convention.

## 3. Component architecture

### `src/components` (flat, ~26 files) + three subfolders

- **Flat top level**: generic, reusable primitives — `Button.astro`,
  `Link.astro`, `Logo.astro`, `Svg.astro`, `MetaTags.astro`,
  `GlobalAssets.astro`, `Header.astro`, `Footer.astro`, `Socials.astro` /
  `AllSocials.astro` / `SocialIcon.astro`, `ProjectCard.astro`,
  `PreviewBox.astro`, `Caffuda.astro`, `ButtonsGroup.astro`,
  `Software.astro`, `SoftwareAnnouncement.astro`, `BlogArticlePreview.astro`,
  `Newsletter.astro`, `SponsorLink.astro`, `ConspireChat.astro`, and one
  Svelte outlier, `Section.svelte` (the pill-shaped colored section used
  repeatedly on the homepage — Svelte only for its `$$slots.description`
  check, everything else in it is static markup).
- **`components/homepage/`**: page-section components used only by
  `index.astro` — `Hero`, `Stats` (despite the name, renders the "heritage"
  copy block, not numeric stats), `WhoWeAre`, `Projects`, `Testimonials`,
  `Supports`, `Swiper.astro` (carousel chrome for Testimonials),
  `BlogArticlePreviewHome`, `BannerMerch`, and the unused `Awards` (§2).
- **`components/social_icons/`**: one `.astro` file per platform (Discord,
  Facebook, Github, Instagram, Linkedin, Mastodon, Matrix, Medium,
  Telegram, Twitter, Youtube), selected dynamically by `SocialIcon.astro`.
- **`components/icons/donations/`**: same pattern for donation methods
  (bitcoin, ethereum, monero, github, opencollective, patreon, cafuda).
- **`components/timeline/`**: the only sizeable interactive subsystem —
  `dataProcess/{fetch,clean,filter,group,parse,index}.ts` (CSV → grouped
  timeline entries, PapaParse-based) feeding two independent Svelte render
  trees, `home/Timeline{Home,HomeGroup,HomeItem}.svelte` (compact, used on
  the homepage) and `page/Timeline{Page,PageGroup,PageItem}.svelte` (full
  detail, used on `/timeline`), plus a shared `SyncLoader.svelte` spinner
  and `colors.ts`.

### Layouts (`src/layouts`, 5 files) — a small, legible hierarchy

```
BaseLayout.astro        <html>/<head>/<body>, MetaTags, GlobalAssets, skip-link
 ├─ Layout.astro         + Header/Footer + prose container + title/logo band
 │                         + merges src/content/software.json by `content.software` id
 │                         used by: all routed .astro index pages (blog, books,
 │                         software, contact, privacy, timeline, donate-adjacent)
 │                         + ~25 markdown pages via frontmatter `layout:`
 ├─ HomepageLayout.astro  + Header/Footer, full-bleed slot, no title band
 │                         used by: index.astro, donate.astro
 ├─ embed.astro           wraps Layout.astro, injects remote-fetched HTML
 └─ redirect.astro        standalone (bypasses BaseLayout entirely) —
                            minimal <html>, meta-refresh + JS redirect
```

`Layout.astro`'s software.json merge (page frontmatter overrides the
matching `software.json` entry by `id`) is a genuinely useful pattern — it's
how the 25+ software markdown pages get a consistent logo/title header
without repeating metadata — but it's undocumented outside a code comment,
and it lives inside a file named generically `Layout.astro` rather than
something like `ContentLayout.astro`, which makes the merge behavior easy to
miss.

### Reusable UI patterns worth naming

- **Slot-driven "pill section"**: `Section.svelte` + Tailwind
  `bg-saccent`/`rounded-3xl` styling is the homepage's dominant visual
  rhythm (Who We Are, Newsletter, Software Announcement, Timeline all sit
  inside one).
- **Card pattern**: `ProjectCard.astro` (logo circle + title + slot body +
  Learn-more/Download buttons) is reused across `Projects.astro` (homepage)
  and `software/index.astro`.
- **Frontmatter-driven copy blocks**: Hero/Stats/Supports/Awards all follow
  the same `import * as copy from '<md>'; copy.frontmatter.X` shape.
- **`<Button as="button" | as="a">` polymorphism** via a `Tag` variable is a
  small but clean example of one component covering two semantics instead
  of two components.

## 4. Homepage rendering flow

`src/pages/index.astro` → `HomepageLayout.astro` → `BaseLayout.astro`.

Sequential build-time flow inside `index.astro`:

1. `await loadPlanetDyneFeed()` (`remote-content.mjs`) — fetches the Planet
   Dyne RSS feed server-side at build time (with a 5s/512KB-bounded fetch,
   falling back to `src/fixtures/planet-dyne-feed.json` on any failure, or
   forced offline via `DYNE_REMOTE_CONTENT_OFFLINE=1`). Only `feed.items[0]`
   is used, passed into `BlogArticlePreviewHome` inside `Newsletter`.
2. **`Hero`** — reads `content/hero/index.md` frontmatter (CTA labels/URLs)
   + compiled Markdown body, renders the top banner with `Caffuda` (a
   decorative visual) and up to 4 CTA buttons via `ButtonsGroup`.
3. **`Section id="who-we-are"`** wraps **`WhoWeAre`**, which calls
   `getCollection('who-we-are')` (3 markdown "flip card" keyword entries:
   interdisciplinary/opensource/sustainable) and renders a hover/flip
   interaction in pure CSS (`transform-style: preserve-3d`).
4. **`Stats`** — despite the component name, this is the "heritage" pitch
   block (`content/heritage/index.md`): title/description/CTA + a
   background illustration image. No actual numeric/statistical data is
   rendered here today.
5. **`Newsletter`** — static Planet Dyne pitch card, slotting in the single
   RSS item fetched in step 1 via `BlogArticlePreviewHome`.
6. **`SoftwareAnnouncement`** — static promo card for `dynebolic.org`,
   hand-coded (intro text and target hardcoded in `index.astro`), with an
   inlined SVG banner (`~/assets/dynebolic-banner.svg?raw` via `Svg.astro`).
7. **`Projects`** — `getCollection('what-we-do')` (9 markdown entries:
   zenroom, devuan, interfacer, reflow, dowse, gitzone, frei0r, dynebolic,
   tomb), each rendered as a `ProjectCard`, sorted by filename id, with a
   "Load more…" button to `/software`.
8. **`Testimonials`** — `getCollection('testimonial')` (10 entries) inside a
   `Swiper.astro` carousel; each testimonial's `pic` path is rewritten to
   look for a pre-optimized `.webp`/`-256.webp` variant under
   `.../optimized/`.
9. **`Supports`** — same copy-block pattern as Hero/Stats, reading
   `content/supports/index.md`.
10. **Timeline section** — `TimelineHome.svelte` rendered `client:visible`
    (hydrates only once scrolled into view). At runtime in the browser it
    fetches `/public/dyne-timeline.csv` via PapaParse
    (`dataProcess/fetch.ts`), then `filterItems` → `groupItems` before
    rendering. **This is the one homepage data source that is not resolved
    at build time** — it's a client-side fetch of a static CSV, decoupled
    from both `src/content` and the RSS/GitHub remote-content layer.

Data-source summary for the homepage: 3 Astro content collections
(`what-we-do`, `testimonial`, `who-we-are`), 4 standalone Markdown copy
files (hero, heritage, supports — awards is loaded by a component that's
never mounted), 1 build-time remote RSS fetch with offline fallback, and 1
client-side static-CSV fetch. Four distinct data-loading mechanisms feed one
page.

## 5. Preserve / redesign / UX opportunities

### What should be preserved

- **`BaseLayout` → `Layout`/`HomepageLayout` hierarchy.** It's a clean,
  shallow composition; `BaseLayout` correctly centralizes the one true
  `<html>` shell, meta tags, and global styles/fonts so nothing downstream
  has to repeat them.
- **`remote-content.mjs`'s defensive fetch layer** — explicit timeout, byte
  cap, protocol allowlisting, and a deterministic offline fallback wired
  into CI (`DYNE_REMOTE_CONTENT_OFFLINE=1`, per `docs/astro-upgrade-baseline.md`).
  This is materially more careful than most static-site remote-fetch code
  and should be the template for any new external data source.
- **The `Layout.astro` + `software.json` merge pattern** for content pages —
  it gives every software page consistent metadata/logo/title presentation
  from one JSON source of truth while still letting page frontmatter
  override anything. Worth keeping and worth documenting explicitly.
- **The redirect-stub convention** (`layout: ../layouts/redirect.astro` +
  `destination:`) — simple, auditable, and already covered by
  `test/static-redirects.test.mjs` and excluded from the sitemap
  automatically.
- **Content-collection schemas for `what-we-do`/`testimonial`/`who-we-are`**
  — these are the only three content types with real Zod validation; that
  safety net is worth extending rather than replacing.
- **Test coverage discipline** — `test/` already asserts on generated HTML
  structure, accessibility markup, internal references, redirects, and
  performance budgets; any redesign should keep building on this rather
  than around it.

### What could be redesigned

- **Unify the three content-loading mechanisms** (`getCollection`, direct
  `.md` module import, direct `.json` import) into a smaller number of
  documented patterns — at minimum, migrate the five singleton copy
  Markdown files (hero/heritage/supports/awards/contact) into proper
  content-collection singletons so they get schema validation like
  `what-we-do`/`testimonial`/`who-we-are` already do.
- **Resolve the orphaned content**: either wire `what-we-did/*.md` into a
  registered collection and a real page, or remove it; either mount
  `homepage/Awards.astro` somewhere (e.g. on `/awards`, which currently has
  no body content) or delete the dead component + its dangling import of
  `content/awards/index.md`.
- **Reconcile the two timeline data paths.** The homepage widget and the
  `/timeline` page both derive from `public/dyne-timeline.csv` fetched
  client-side, entirely separate from `src/content`'s Astro-native data
  layer. If the CSV is the real source of truth going forward, the
  leftover `what-we-did` markdown collection should be retired to avoid
  implying there are two timelines.
- **Rename for clarity**: `homepage/Stats.astro` renders heritage/pitch copy,
  not statistics — the name will mislead the next person who wants to add
  an actual metrics section. `Layout.astro` vs `HomepageLayout.astro` is
  also non-obvious from the names alone (the generic content layout is
  called `Layout`, the minimal one used only by two pages is called
  `HomepageLayout`) — worth a short comment or rename once other content
  work touches these files.
- **The 41 redirect stubs and the astro.config.mjs regex coupling**: sitemap
  exclusion depends on grepping page source text for a literal
  `layout:\s*.*redirect.astro` pattern at config-load time. This works but
  is fragile to any refactor of how redirects declare their layout: the 41
  stubs already spell the same path three different ways —
  `../layouts/redirect.astro` (28), `~/layouts/redirect.astro` (10), and
  `../../layouts/redirect.astro` (3) — which the regex happens to catch
  today only because it matches on the trailing `redirect.astro` fragment.
  Consolidating on one spelling, or deriving the set from actual parsed
  frontmatter instead of a regex over source text, would remove a subtle
  footgun.

### Possible UX improvement areas

- **Homepage narrative order** currently interleaves organizational pitch
  (Hero → Who We Are → heritage/"Stats") with a newsletter capture and a
  single hardcoded software promo *before* showing any actual project work
  (`Projects` is the 7th section). A visitor has to scroll past four
  persuasion/marketing blocks before reaching concrete evidence (software,
  testimonials). Reordering to front-load social proof/project evidence is
  a low-risk, high-leverage change.
- **The hardcoded `SoftwareAnnouncement`** (dynebolic promo with copy and
  URL inlined directly in `index.astro`) is the one homepage section with
  no content-file backing — it can't be updated without a code change, and
  it will silently become stale/wrong when the next product launch
  happens. Bringing it into the same copy-block or JSON pattern as
  Hero/Supports would let non-developers rotate it.
- **Timeline UX** is duplicated at two fidelity levels (`TimelineHome`
  compact horizontal-scroll vs `TimelinePage` full detail) using
  click-and-drag horizontal scrolling with no visible scrollbar affordance
  beyond a custom-styled one — worth a usability pass (keyboard
  navigation, touch affordance, and a visible "there's more to the right"
  cue) since it's one of the few genuinely interactive, JS-hydrated pieces
  of the site.
- **Testimonials carousel image handling** (`pic.replace(...).replace(...)`
  string surgery to guess an optimized `.webp` path) is brittle — any
  testimonial whose `pic` doesn't already live under a `.../testimonial/`
  path segment, or use a `/testimonial/optimized/` sibling, would silently
  produce a broken `srcset`. Worth confirming this convention is documented
  somewhere content editors will see it, or generating the optimized
  variant path from the schema instead of string manipulation.
- **Accessibility of the mobile nav**: `Header.astro`'s mobile menu toggle
  button has `aria-expanded="false"` hardcoded in markup with no visible JS
  in the component to flip it (the toggle behavior lives in
  `data-aw-toggle-menu`, wired up elsewhere/externally) — worth verifying
  `aria-expanded` is actually kept in sync when the menu opens, since a
  stale `aria-expanded` is a common and easy-to-miss screen-reader
  regression.

---

*This report reflects only what a static read of the repository shows; the
timeline CSV's actual runtime content, the resolved contents of the broken
`pillars`/`projects` symlinks, and any A/B or analytics data on current
homepage engagement were out of scope for a code-only audit.*
