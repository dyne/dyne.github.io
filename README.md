# Welcome to the [Dyne.org](https://dyne.org) website made in [Astro](https://astro.build)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)

> 🧑‍🚀 **Seasoned astronaut?** Skip this file. Have fun!

## 🧩 Custom components

Any component below can be used inline inside markdown extended (.mdx files)
 
Standalone button:
```
<Button text="Click Me" href="#" /> 
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── page.md
│       └── page.mdx (<- markdown + html)
│       └── page/index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

The comma separated file `public/dyne-timeline.csv` holds the contents of the timeline of events shown on homepage: updating it will update the website.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## Browser tests

The browser suite always serves the generated production site through `astro preview`; it does not test the development server.

```sh
npm ci
npx playwright install chromium
npm test
npm run test:e2e
```

Run one file or browser profile after building the site:

```sh
npm run build
npx playwright test test/e2e/critical-routes.spec.ts --project=chromium-mobile
```

Playwright writes traces and screenshots only for failed tests, under the ignored `output/playwright/` directory. Inspect a failure with:

```sh
npx playwright show-trace output/playwright/test-results/<failure>/trace.zip
```

There are no approved visual snapshots yet. When a future test introduces one, review intentional changes before updating it with `npx playwright test --update-snapshots`.

Browser assertions must be deterministic: do not require a live third-party feed, API, or newsletter. Mock those responses in the test or use a checked-in fixture/fallback.

## Maintaining the visitor journeys

### Homepage selection

`src/components/homepage/ProjectHighlights.astro` selects three authored entries
from the `what-we-do` collection: `01_zenroom`, `02_devuan` and `09_tomb`.
Each selection supplies a local project route and a short purpose statement;
the displayed project name comes from the collection entry. Keep those IDs and
routes in sync when changing the selection. The build rejects a missing entry.
Check each purpose statement against the authored project content and retain
the full software-directory link and access to the remaining projects.

`src/pages/index.astro` places these highlights before participation, the
newsletter, news and history. Keep the hero's Explore software, Join the
community and Our story destinations accurate. Preserve existing anchors,
source-backed claims and the newsletter/feed fallback. Homepage rendering and
browser tests cover the selection, sequence, links and offline content.

### Software catalog

Edit authored data in `src/content/software.json` and local project pages in
`src/pages/software/`. `src/lib/software-catalog.mjs` merges nonempty fields in
this order: JSON, Markdown pages, then GitHub enrichment. A later source fills
missing fields; it does not replace authored values. Inputs and final IDs are
sorted so remote response order does not decide the result.

IDs are trimmed and lowercased. Add intentional identity mappings to
`SOFTWARE_ALIASES`; the current `jaro-mail` alias maps to `jaromail`. Punctuation
alone does not merge projects. Keep legitimate unmatched remote entries and
the offline fixture fallback. Actions distinguish Project website,
Documentation, Source code and Download; a repository URL must not be presented
as a binary download. Existing action labels take precedence when sources
merge, and duplicate destination URLs are removed.

`SOFTWARE_PURPOSES` assigns canonical IDs to Creative media, Operating systems,
Privacy and security, and Developer and system tools. Projects without an
assignment remain in General. Base assignments on authored descriptions;
remote keywords do not establish a purpose or maintenance status. Preserve
complete catalog coverage, local routes and no-JavaScript jump links. Run
`test/software-catalog.test.mjs` and `test/e2e/software.spec.ts` when editing
identity, precedence, actions or groups.

### Community and support links

`src/content/social/linktree.json` and `quicklinks.json` supply the community
channels and quick links on `/contact`. Update those sources rather than
duplicating destinations in page copy, and retain every supported channel.

`src/pages/donate.astro` contains recurring providers, one-time payment methods,
wallet addresses and merchandise/service offers. Keep provider labels explicit
and separate donations from purchases. Recipient addresses, currency, amounts,
wallet URIs and benefit promises are payment data: verify an authorised change
against its source before editing them. `test/fixtures/donation-baseline.json`
freezes three wallets, six offer tiers, ten payment destinations and the exact
promises. Do not regenerate it merely to make a failing test pass. An intended
payment-data change needs a separately reviewed fixture update.

Check links without submitting payments, forms or messages. Keep keyboard tabs,
manual wallet selection, visible clipboard success/failure feedback and the
no-JavaScript payment methods usable. Donation invariant and critical-route
tests verify these contracts without navigating to payment providers.

For any journey change, run `npm test` and `npm run test:e2e`, inspect all failures
and expected device-specific skips, and check the existing
[performance budgets](docs/performance-budgets.md). Preserve image dimensions,
responsive assets, lazy below-fold media and current hydration boundaries.
Review changed routes on phone and desktop with normal/enlarged root text,
320px reflow, keyboard navigation and reduced motion. The browser performance
test attaches its measured resource bytes, request count and layout shift.
Local build and preview results do not establish that a change is deployed.

## Astro migration and release rollback

The supported Astro/Vite/Node matrix, clean-room release gates, GitHub Pages
artifact boundary, and non-destructive rollback commands are in
[`docs/astro-migration-and-rollback.md`](docs/astro-migration-and-rollback.md).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 💼 License

    Dyne.org website
    Copyright (c) 2022 Dyne.org foundation, Amsterdam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

## 📚 Guides

### ⏱️ Updating the timeline

1. Edit the file in `dyne-timeline.csv`
2. Add it in `/public` folder
3. Rebuild & deploy
