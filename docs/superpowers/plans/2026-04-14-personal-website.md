# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing Astro blog starter into a Literary Minimal personal site with Georgia serif, a deep red accent, KaTeX math support, and a clean MDX authoring workflow.

**Architecture:** Build on the existing Astro starter — restyle CSS, rewrite the Header/Footer/Homepage components, restyle the blog list and post layout, add remark-math + rehype-katex for math rendering, and replace sample blog posts with a real first post. No new pages or routes needed.

**Tech Stack:** Astro, MDX (already configured), remark-math, rehype-katex, Shiki (built-in), Georgia system serif font.

---

## File Map

| File | Change |
|------|--------|
| `website/src/styles/global.css` | Full rewrite — Literary Minimal palette, Georgia, red accent |
| `website/src/components/Header.astro` | Full rewrite — name left, nav + social icons right |
| `website/src/components/Footer.astro` | Simplify to "© 2026 Aaryan Rampal" |
| `website/src/components/BaseHead.astro` | Remove Atkinson font tag; add KaTeX CSS link |
| `website/src/pages/index.astro` | Full rewrite — photo, bio, interests layout |
| `website/src/pages/blog/index.astro` | Full rewrite — list layout with red titles, right-aligned dates |
| `website/src/layouts/BlogPost.astro` | Rewrite — date + title header, no hero image, clean prose |
| `website/src/consts.ts` | Update SITE_TITLE and SITE_DESCRIPTION |
| `website/astro.config.mjs` | Add remark-math + rehype-katex; remove Atkinson font config |
| `website/src/content/blog/` | Delete all sample posts; add `hello-world.md` |
| `website/src/content.config.ts` | Make `description` optional (so short posts don't require it) |
| `website/src/assets/fonts/` | Delete Atkinson woff files |
| `website/package.json` | Add remark-math, rehype-katex dependencies |

---

## Task 1: Install math dependencies

**Files:**
- Modify: `website/package.json`
- Modify: `website/astro.config.mjs`

- [ ] **Step 1: Install remark-math and rehype-katex**

```bash
cd website && npm install remark-math rehype-katex
```

Expected output: packages added to `node_modules/`, versions added to `package.json` dependencies.

- [ ] **Step 2: Wire plugins into astro.config.mjs**

Replace the full contents of `website/astro.config.mjs` with:

```js
// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
});
```

- [ ] **Step 3: Verify dev server starts without errors**

```bash
cd website && npm run dev
```

Expected: server starts at `http://localhost:4321`, no plugin errors in terminal.

- [ ] **Step 4: Commit**

```bash
cd website && git add package.json package-lock.json astro.config.mjs
git commit -m "feat: add remark-math and rehype-katex for LaTeX support"
```

---

## Task 2: Add KaTeX CSS and remove Atkinson font

**Files:**
- Modify: `website/src/components/BaseHead.astro`
- Delete: `website/src/assets/fonts/atkinson-regular.woff`
- Delete: `website/src/assets/fonts/atkinson-bold.woff`

- [ ] **Step 1: Update BaseHead.astro**

Replace the full contents of `website/src/components/BaseHead.astro` with:

```astro
---
import '../styles/global.css';
import type { ImageMetadata } from 'astro';
import FallbackImage from '../assets/blog-placeholder-1.jpg';
import { SITE_TITLE } from '../consts';

interface Props {
	title: string;
	description: string;
	image?: ImageMetadata;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const { title, description, image = FallbackImage } = Astro.props;
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
<link rel="sitemap" href="/sitemap-index.xml" />
<link
	rel="alternate"
	type="application/rss+xml"
	title={SITE_TITLE}
	href={new URL('rss.xml', Astro.site)}
/>
<meta name="generator" content={Astro.generator} />

<!-- KaTeX CSS for math rendering -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image.src, Astro.url)} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image.src, Astro.url)} />
```

- [ ] **Step 2: Delete Atkinson font files**

```bash
rm website/src/assets/fonts/atkinson-regular.woff website/src/assets/fonts/atkinson-bold.woff
```

- [ ] **Step 3: Verify dev server still starts**

```bash
cd website && npm run dev
```

Expected: no errors, site loads (still looks like the starter — styling comes in Task 3).

- [ ] **Step 4: Commit**

```bash
git add website/src/components/BaseHead.astro
git rm website/src/assets/fonts/atkinson-regular.woff website/src/assets/fonts/atkinson-bold.woff
git commit -m "feat: add KaTeX CSS, remove Atkinson font"
```

---

## Task 3: Rewrite global CSS — Literary Minimal

**Files:**
- Modify: `website/src/styles/global.css`

- [ ] **Step 1: Replace global.css entirely**

```css
:root {
	--accent: #c0392b;
	--black: #111111;
	--gray: #888888;
	--gray-light: #e8e8e8;
	--background: #fafaf8;
}

* {
	box-sizing: border-box;
}

body {
	font-family: Georgia, 'Times New Roman', Times, serif;
	margin: 0;
	padding: 0;
	background-color: var(--background);
	color: var(--black);
	font-size: 18px;
	line-height: 1.75;
	text-align: left;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

main {
	width: 720px;
	max-width: calc(100% - 2em);
	margin: 0 auto;
	padding: 3em 1em;
}

h1, h2, h3, h4, h5, h6 {
	margin: 0 0 0.5rem 0;
	color: var(--black);
	font-family: Georgia, 'Times New Roman', Times, serif;
	line-height: 1.2;
	font-weight: bold;
}

h1 { font-size: 2.5em; }
h2 { font-size: 2em; }
h3 { font-size: 1.5em; }
h4 { font-size: 1.25em; }
h5 { font-size: 1.1em; }

strong, b { font-weight: bold; }

a {
	color: var(--accent);
	text-decoration: none;
	border-bottom: 1px solid transparent;
	transition: border-color 0.15s ease;
}

a:hover {
	border-bottom-color: var(--accent);
}

p { margin-bottom: 1.25em; }

.prose p { margin-bottom: 1.75em; }

img {
	max-width: 100%;
	height: auto;
	border-radius: 4px;
}

/* Inline code */
code {
	font-family: 'Courier New', Courier, monospace;
	font-size: 0.875em;
	padding: 2px 6px;
	background-color: var(--gray-light);
	border-radius: 3px;
}

/* Code blocks */
pre {
	padding: 1.25em 1.5em;
	border-radius: 4px;
	overflow-x: auto;
	background-color: #f4f4f2 !important;
	border: 1px solid var(--gray-light);
}

pre > code {
	all: unset;
	font-family: 'Courier New', Courier, monospace;
	font-size: 0.875em;
}

blockquote {
	border-left: 3px solid var(--accent);
	margin: 0;
	padding: 0 0 0 1.25em;
	font-style: italic;
	color: var(--gray);
}

hr {
	border: none;
	border-top: 1px solid var(--gray-light);
	margin: 2em 0;
}

table {
	width: 100%;
	border-collapse: collapse;
}

th, td {
	text-align: left;
	padding: 0.5em 0.75em;
	border-bottom: 1px solid var(--gray-light);
}

/* Small-caps label utility */
.label {
	font-size: 0.7em;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: var(--gray);
	font-family: Georgia, serif;
}

/* KaTeX display math centering */
.katex-display {
	overflow-x: auto;
	overflow-y: hidden;
	padding: 0.5em 0;
}

@media (max-width: 720px) {
	body { font-size: 16px; }
	main { padding: 1.5em 1em; }
}

.sr-only {
	position: absolute !important;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

- [ ] **Step 2: Verify in browser**

```bash
cd website && npm run dev
```

Open `http://localhost:4321` — the page should now use Georgia serif with the warm off-white background. The starter template content will still show but with the new typography.

- [ ] **Step 3: Commit**

```bash
git add website/src/styles/global.css
git commit -m "feat: Literary Minimal CSS — Georgia serif, red accent, warm background"
```

---

## Task 4: Rewrite Header component

**Files:**
- Modify: `website/src/components/Header.astro`

- [ ] **Step 1: Replace Header.astro entirely**

Replace your LinkedIn, X, and email URLs where marked with `YOUR_*` placeholders — you'll fill these in once:

```astro
---
import HeaderLink from './HeaderLink.astro';
---

<header>
	<nav>
		<a href="/" class="site-name">AARYAN RAMPAL</a>
		<div class="nav-right">
			<div class="nav-links">
				<HeaderLink href="/">Home</HeaderLink>
				<HeaderLink href="/blog">Blog</HeaderLink>
			</div>
			<div class="social-links">
				<a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener" aria-label="LinkedIn">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href="https://x.com/YOUR_X_HANDLE" target="_blank" rel="noopener" aria-label="X (Twitter)">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
				<a href="mailto:YOUR_EMAIL" aria-label="Email">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
						<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
					</svg>
				</a>
			</div>
		</div>
	</nav>
</header>

<style>
	header {
		margin: 0;
		padding: 0 1.5em;
		background: var(--background);
		border-bottom: 1px solid var(--gray-light);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 720px;
		margin: 0 auto;
		height: 56px;
	}

	.site-name {
		font-size: 0.7em;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--black);
		font-family: Georgia, serif;
		text-decoration: none;
		border-bottom: none;
		font-weight: bold;
	}

	.site-name:hover {
		border-bottom: none;
		color: var(--accent);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1.5em;
	}

	.nav-links {
		display: flex;
		gap: 1.5em;
	}

	.social-links {
		display: flex;
		align-items: center;
		gap: 0.75em;
	}

	.social-links a {
		color: var(--gray);
		border-bottom: none;
		display: flex;
		align-items: center;
		transition: color 0.15s ease;
	}

	.social-links a:hover {
		color: var(--accent);
		border-bottom: none;
	}

	@media (max-width: 720px) {
		.social-links {
			display: none;
		}
	}
</style>
```

- [ ] **Step 2: Update HeaderLink.astro active style**

Read `website/src/components/HeaderLink.astro` and update the `.active` style to use a red underline instead of blue:

The existing file likely sets `border-bottom-color` in the active state. Find the `active` style and change the color to `var(--accent)`. The active detection logic (checking `Astro.url.pathname`) stays the same.

- [ ] **Step 3: Verify in browser**

Open `http://localhost:4321` — header should show "AARYAN RAMPAL" on left, "Home · Blog" nav + three social icons on right. Active page gets red underline.

- [ ] **Step 4: Commit**

```bash
git add website/src/components/Header.astro website/src/components/HeaderLink.astro
git commit -m "feat: new header — name left, nav + social icons right"
```

---

## Task 5: Simplify Footer

**Files:**
- Modify: `website/src/components/Footer.astro`

- [ ] **Step 1: Replace Footer.astro entirely**

```astro
---
const year = new Date().getFullYear();
---

<footer>
	<p>&copy; {year} Aaryan Rampal</p>
</footer>

<style>
	footer {
		text-align: center;
		padding: 2em 1em 3em;
		color: var(--gray);
		font-size: 0.85em;
		border-top: 1px solid var(--gray-light);
		margin-top: 4em;
	}

	footer p {
		margin: 0;
	}
</style>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321` — footer should show "© 2026 Aaryan Rampal" centered, no social icons.

- [ ] **Step 3: Commit**

```bash
git add website/src/components/Footer.astro
git commit -m "feat: simplify footer to copyright line"
```

---

## Task 6: Rewrite Homepage

**Files:**
- Modify: `website/src/pages/index.astro`
- Modify: `website/src/consts.ts`

- [ ] **Step 1: Update consts.ts**

```ts
export const SITE_TITLE = 'Aaryan Rampal';
export const SITE_DESCRIPTION = 'Personal website and blog.';
```

- [ ] **Step 2: Replace index.astro entirely**

Add your photo to `website/src/assets/` (any filename, e.g. `photo.jpg`) and update the import path. Until then, use one of the existing placeholder images:

```astro
---
import { Image } from 'astro:assets';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import photo from '../assets/blog-placeholder-about.jpg';
---

<!doctype html>
<html lang="en">
	<head>
		<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
	</head>
	<body>
		<Header />
		<main>
			<div class="profile">
				<Image
					src={photo}
					alt="Aaryan Rampal"
					width={72}
					height={72}
					class="avatar"
				/>
				<div class="profile-text">
					<h1>Aaryan Rampal</h1>
					<p class="tagline">Lorem ipsum · Dolor sit amet</p>
				</div>
			</div>

			<div class="bio">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
				</p>
			</div>

			<div class="interests">
				<p class="label">Interests</p>
				<p>Lorem ipsum · Dolor sit amet · Consectetur · Adipiscing elit · Sed eiusmod</p>
			</div>
		</main>
		<Footer />
	</body>
</html>

<style>
	.profile {
		display: flex;
		align-items: center;
		gap: 1.25em;
		margin-bottom: 2em;
	}

	.avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.profile-text h1 {
		font-size: 1.5em;
		margin: 0 0 0.15em 0;
	}

	.tagline {
		font-size: 0.75em;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0;
		font-family: Georgia, serif;
	}

	.bio {
		margin-bottom: 2em;
	}

	.interests .label {
		margin-bottom: 0.25em;
	}

	.interests p:last-child {
		color: var(--black);
		margin: 0;
	}
</style>
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:4321` — should show circular photo, name, red tagline, two bio paragraphs, interests section.

- [ ] **Step 4: Commit**

```bash
git add website/src/pages/index.astro website/src/consts.ts
git commit -m "feat: new homepage — photo, bio, interests layout"
```

---

## Task 7: Rewrite Blog index page

**Files:**
- Modify: `website/src/pages/blog/index.astro`

- [ ] **Step 1: Replace blog/index.astro entirely**

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';

const posts = (await getCollection('blog')).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
---

<!doctype html>
<html lang="en">
	<head>
		<BaseHead title={`Writing — ${SITE_TITLE}`} description={SITE_DESCRIPTION} />
	</head>
	<body>
		<Header />
		<main>
			<h1>Writing</h1>
			<ul class="post-list">
				{posts.map((post) => (
					<li>
						<a href={`/blog/${post.id}/`}>{post.data.title}</a>
						<span class="date">
							{post.data.pubDate.toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</span>
					</li>
				))}
			</ul>
		</main>
		<Footer />
	</body>
</html>

<style>
	h1 {
		margin-bottom: 1.5em;
	}

	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.post-list li {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0.75em 0;
		border-top: 1px solid var(--gray-light);
		gap: 1em;
	}

	.post-list li:last-child {
		border-bottom: 1px solid var(--gray-light);
	}

	.post-list a {
		color: var(--accent);
		font-size: 1em;
		flex: 1;
	}

	.post-list a:hover {
		border-bottom-color: var(--accent);
	}

	.date {
		font-size: 0.8em;
		color: var(--gray);
		white-space: nowrap;
		font-family: Georgia, serif;
	}
</style>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/blog` — should show "Writing" heading and a clean list of post titles (red, linked) with dates right-aligned.

- [ ] **Step 3: Commit**

```bash
git add website/src/pages/blog/index.astro
git commit -m "feat: Literary Minimal blog list — red titles, right-aligned dates"
```

---

## Task 8: Restyle BlogPost layout

**Files:**
- Modify: `website/src/layouts/BlogPost.astro`

- [ ] **Step 1: Replace BlogPost.astro entirely**

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import { SITE_TITLE } from '../consts';

type Props = CollectionEntry<'blog'>['data'];

const { title, description, pubDate } = Astro.props;

const formattedDate = pubDate.toLocaleDateString('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
---

<html lang="en">
	<head>
		<BaseHead title={`${title} — ${SITE_TITLE}`} description={description ?? title} />
	</head>
	<body>
		<Header />
		<main>
			<article class="prose">
				<header class="post-header">
					<p class="post-date label">{formattedDate}</p>
					<h1>{title}</h1>
					<hr />
				</header>
				<slot />
			</article>
		</main>
		<Footer />
	</body>
</html>

<style>
	.prose {
		max-width: 720px;
		margin: 0 auto;
	}

	.post-header {
		margin-bottom: 2em;
	}

	.post-date {
		margin: 0 0 0.5em 0;
	}

	.post-header h1 {
		margin: 0 0 1em 0;
		font-size: 2.25em;
		line-height: 1.15;
	}

	.post-header hr {
		margin-top: 0;
	}
</style>
```

- [ ] **Step 2: Verify in browser**

Open any blog post at `http://localhost:4321/blog/[slug]` — should show date in gray small-caps, large bold title, hr, then body prose. No hero image.

- [ ] **Step 3: Commit**

```bash
git add website/src/layouts/BlogPost.astro
git commit -m "feat: Literary Minimal blog post layout — date, title, prose"
```

---

## Task 9: Update content schema and replace sample posts

**Files:**
- Modify: `website/src/content.config.ts`
- Delete: all files in `website/src/content/blog/`
- Create: `website/src/content/blog/hello-world.md`

- [ ] **Step 1: Make description optional in content schema**

Replace `website/src/content.config.ts` with:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
```

- [ ] **Step 2: Delete all sample blog posts**

```bash
rm website/src/content/blog/first-post.md \
   website/src/content/blog/second-post.md \
   website/src/content/blog/third-post.md \
   website/src/content/blog/markdown-style-guide.md \
   website/src/content/blog/using-mdx.mdx
```

- [ ] **Step 3: Create first real post**

Create `website/src/content/blog/hello-world.md`:

```markdown
---
title: "Hey, I started this blog"
pubDate: 2026-04-14
---

Hey. I started this blog.

I'm not entirely sure what this will become — probably a mix of whatever I'm thinking about at any given time. Things I'm learning, things I'm building, things I'm reading. Maybe some math, maybe some code, maybe just words.

For now, this is just a place that's mine. Let's see where it goes.
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:4321/blog` — should show one post: "Hey, I started this blog". Click it — should render cleanly with the new layout.

- [ ] **Step 5: Commit**

```bash
git add website/src/content.config.ts website/src/content/blog/hello-world.md
git rm website/src/content/blog/first-post.md \
       website/src/content/blog/second-post.md \
       website/src/content/blog/third-post.md \
       website/src/content/blog/markdown-style-guide.md \
       website/src/content/blog/using-mdx.mdx
git commit -m "feat: replace sample posts with first real post, make description optional"
```

---

## Task 10: Verify math rendering end-to-end

**Files:**
- Create: `website/src/content/blog/math-test.md` (temporary, delete after)

- [ ] **Step 1: Create a temporary test post with math**

Create `website/src/content/blog/math-test.md`:

```markdown
---
title: "Math test"
pubDate: 2026-04-14
---

Inline math: $E = mc^2$ sits right in the sentence.

Display math:

$$\nabla^2 \phi = 4\pi G\rho$$

A matrix:

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

- [ ] **Step 2: Verify math renders in browser**

Open `http://localhost:4321/blog/math-test` — inline math should render as formatted equations (not raw `$...$` strings), display math should be centered on its own line, matrix should render correctly. KaTeX renders client-side via the CSS + remark plugin chain.

- [ ] **Step 3: Delete test post**

```bash
rm website/src/content/blog/math-test.md
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify math rendering, clean up test post"
```

---

## Authoring Reference (for Aaryan)

To write a new post:

1. Create `website/src/content/blog/my-post-slug.md` (or `.mdx`)
2. Add frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   pubDate: 2026-04-14
   ---
   ```
3. Write body in Markdown:
   - Inline math: `$x^2 + y^2 = r^2$`
   - Display math: `$$\int_0^\infty e^{-x} dx = 1$$`
   - Code: triple backtick with language tag
   - Images: `![alt text](./path-to-image.jpg)`
4. Save and commit — Astro handles the rest.

To swap in your real photo: add your photo to `website/src/assets/` and update the `import photo from` line in `website/src/pages/index.astro`.

To add your real social links: update the three `href` values in `website/src/components/Header.astro` where marked `YOUR_LINKEDIN`, `YOUR_X_HANDLE`, and `YOUR_EMAIL`.
