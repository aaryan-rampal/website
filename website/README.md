# aaryan.rampal.dev

The source for my personal website and blog. Built with [Astro](https://astro.build), deployed to Cloudflare Workers.

Live at [www.aaryan.rampal.dev](https://www.aaryan.rampal.dev).

## Running it locally

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
```

| Command              | What it does                                                 |
| :------------------- | :----------------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload. **Shows drafts.**                 |
| `npm run build`      | Builds the production site into `./dist/`                     |
| `npm run preview`    | Builds, then serves it through Wrangler — closest to the real thing |
| `npm run deploy`     | Builds and pushes live to Cloudflare                          |

## Deploying

One command, run from this `website/` directory:

```sh
npm run deploy
```

That runs `astro build` and then `wrangler deploy`. There's no CI pipeline — deploys happen when I run this, and not before.

First time on a new machine, you'll need to authenticate:

```sh
npx wrangler login
```

Cloudflare-side config lives in `wrangler.jsonc`. The Worker is named `website`; it serves the built `./dist/` as static assets with server-side rendering via the Astro Cloudflare adapter. The domain itself is wired up in the Cloudflare dashboard, not in this repo.

To check what actually shipped, `npx wrangler deployments list`. Logs are at `npx wrangler tail` (observability is on).

## Where the writing lives

Everything is in **`src/content/blog/`**. One file per post, `.md` or `.mdx`. The filename becomes the URL:

```
src/content/blog/geese.mdx  →  /blog/geese/
```

Posts need frontmatter at the top of the file:

```yaml
---
title: "Geese"           # required
pubDate: 2026-05-26      # required
description: "..."       # optional — used for SEO and previews
updatedDate: 2026-06-01  # optional
heroImage: ...           # optional
draft: true              # optional — see below
---
```

The schema is enforced in `src/content.config.ts`. Miss a required field or typo one, and the build fails loudly rather than shipping something broken.

Use `.mdx` instead of `.md` when a post needs components — `geese.mdx` imports `BlogImage` for captioned images. Math works in both via KaTeX: `$inline$` and `$$block$$`.

`_markdown-cheatsheet.md` is my reference for the formatting available here — it's marked `draft: true`, so it only renders locally.

## What actually shows up on the site

Two separate mechanisms decide this, and they behave differently.

### `draft: true`

Set it in the frontmatter and the post is visible locally but hidden in production:

```yaml
draft: true
```

The filter is `import.meta.env.DEV || !post.data.draft`, applied in `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`. So:

| Where                          | Draft post          |
| :----------------------------- | :------------------ |
| `npm run dev`                  | Visible             |
| `npm run build` / deployed     | No listing, no page |

Because the check keys off dev mode rather than a build flag, `npm run preview` builds in production mode — drafts disappear there too. That's a good way to confirm what's actually going out.

**Known gap — drafts still leak into RSS.** The feed (`src/pages/rss.xml.js`) calls `getCollection('blog')` with no draft filter, so every draft's title and description ends up in the published `/rss.xml`. The post itself 404s, but the title is out there. Verified on a real build: `_markdown-cheatsheet.md` is `draft: true` and has no page in `dist/`, yet its title appears in the feed.

Until that's fixed, `draft: true` means "no page on the site," not "invisible." For anything where the title alone is the sensitive part, keep it out of `src/content/blog/` entirely.

The one-line fix, whenever I get to it:

```js
const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
```

### A leading underscore (partial)

An underscore prefix — `_markdown-cheatsheet.md` — keeps a file from becoming a page, but it does **not** keep it out of the collection: it still loads, and still reaches RSS. It's a naming convention here, not a hiding mechanism. Don't rely on it for privacy; use it to mark files that aren't really posts.

### Filenames and URLs

Slugs are lowercased. `how-I-improved-my-music-taste.md` becomes `/blog/how-i-improved-my-music-taste/`. Worth naming files in lowercase from the start so the file matches its URL.

## Layout of the rest

```text
src/
├── components/     # Header, Footer, BlogImage, etc.
├── content/blog/   # the posts
├── layouts/        # BlogPost.astro — the wrapper every post renders into
├── pages/          # routes: index, about, blog/, rss.xml
├── styles/         # global.css
├── assets/         # images imported by posts (optimized at build)
└── consts.ts       # site title and description
public/             # static files served as-is, no processing
```

Images imported from `src/assets/` get optimized during the build. Anything in `public/` is served untouched.

## Credit

Theme started from Astro's blog template, which is itself based on [Bear Blog](https://github.com/HermanMartinus/bearblog/).
