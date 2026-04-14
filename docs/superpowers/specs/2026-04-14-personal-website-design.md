# Personal Website Design Spec
**Date:** 2026-04-14

## Overview

A minimalist personal website for Aaryan Rampal. The primary goal is a friction-free authoring workflow: Aaryan writes everything in Markdown/MDX and never touches component code. AI handles all coding changes. The site has two pages (Home, Blog) plus social icons in the header.

## Visual Design

**Style:** Literary Minimal — serif typography, stark black/white with a single red accent, wide margins. Feels like a well-designed essay, not a portfolio.

**Typography:**
- Font: Georgia (serif), falling back to system serif
- Body: ~18px, line-height ~1.75
- Headings: bold, tight line-height
- All-caps small-caps for labels and bylines (letter-spacing: 3px)

**Color palette:**
- Black: `#111111` — text, headings, name
- Red: `#c0392b` — accent: links, active nav underline, post titles on blog list
- Gray: `#888888` — secondary text, dates, labels
- Background: `#fafaf8` (warm off-white)

**Layout:** Single centered column, max-width ~720px, generous padding.

## Pages & Navigation

**Header (on every page):**
- Left: "AARYAN RAMPAL" in small-caps, links to `/`
- Right: nav links `Home` · `Blog`, then social icons for LinkedIn, X (Twitter), and Email
- Active page indicated by a red underline on the nav link
- On mobile: social icons hidden, nav links remain

**Pages:**
- `/` — Homepage (Astro component)
- `/blog` — Blog index (lists all posts)
- `/blog/[slug]` — Individual blog post (rendered from MDX)

No `/about` page — bio lives on the homepage.

## Homepage (`index.astro`)

Layout (top to bottom):
1. **Photo + name block** — circular photo (~72px), name in bold, tagline in red small-caps below
2. **Bio paragraph** — 2–3 sentences, lorem ipsum placeholder until Aaryan writes it
3. **Interests section** — labeled "INTERESTS" in small-caps, comma-separated list

This is an Astro component. Aaryan edits it directly (once) to fill in real content. No Markdown file needed.

## Blog

**Blog index (`/blog`):**
- Heading: "Writing"
- List of posts sorted newest-first
- Each row: post title (red, links to post) · date (right-aligned, gray)
- Separated by thin horizontal rules

**Blog post layout:**
- Date in small-caps gray at top
- Large bold title
- MDX body content below

**Authoring workflow:**
- Aaryan creates `.md` or `.mdx` files in `src/content/blog/`
- Frontmatter: `title`, `date`, optional `description`
- Everything else is written in Markdown — no component code to touch

## Rich Content in Blog Posts

All three content types must feel native to the Literary Minimal aesthetic:

**Images:**
- Standard Markdown `![alt](path)` syntax
- Rendered full-width with a subtle border-radius
- No styled captions in scope — images are standalone

**Code blocks:**
- Fenced triple-backtick with language tag (` ```python `)
- Syntax highlighting via Astro's built-in Shiki (already included in starter)
- Styled with a light gray background, monospace font, subtle border-radius
- Inline code uses same gray background, slightly smaller

**LaTeX / Math:**
- Inline math: `$E = mc^2$`
- Display math: `$$\nabla^2 \phi = 4\pi G\rho$$`
- Rendered via `remark-math` + `rehype-katex`
- KaTeX CSS loaded globally (small overhead, simplest approach)
- Auto-detects math syntax — no boolean flag needed, no math = no rendering cost

## Tech Stack

- **Framework:** Astro (existing starter, not rebuilt from scratch)
- **Content:** Astro Content Collections with MDX support (already configured)
- **Math:** `remark-math` + `rehype-katex`
- **Syntax highlighting:** Shiki (built into Astro)
- **Fonts:** Georgia via CSS font-stack (no web font download needed — system font)
- **Deployment:** unchanged from whatever the starter configures

## What Gets Changed vs. Kept

| File | Action |
|------|--------|
| `src/styles/global.css` | Rewrite — new color palette, Georgia font, red accent |
| `src/components/Header.astro` | Rewrite — new nav structure, social icons (LinkedIn, X, Email) |
| `src/components/Footer.astro` | Simplify to a single centered line: "© 2026 Aaryan Rampal" |
| `src/pages/index.astro` | Rewrite — new homepage layout |
| `src/pages/blog/index.astro` | Restyle — post list with red titles, date alignment |
| `src/layouts/BlogPost.astro` | Restyle — date + title header, prose width |
| `src/consts.ts` | Update site title and description |
| `astro.config.mjs` | Add `remark-math`, `rehype-katex` plugins; remove Atkinson font |
| `src/content/blog/*.md` | Delete sample posts; add one real first post |
| `src/components/BaseHead.astro` | Add KaTeX CSS link |
| `src/assets/fonts/` | Remove Atkinson woff files (switching to system serif) |
| Everything else | Keep as-is |

## Authoring Workflow (ongoing)

1. Create `src/content/blog/my-post.mdx`
2. Add frontmatter: `title`, `date`, optional `description`
3. Write in Markdown — use `$...$` for inline math, `$$...$$` for display, triple-backtick for code, standard `![]()` for images
4. Commit — Astro handles the rest
5. For any layout/style changes: describe what you want, AI writes the code
