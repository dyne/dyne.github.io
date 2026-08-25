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
