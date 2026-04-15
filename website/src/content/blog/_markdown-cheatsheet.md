---
title: "markdown cheat sheet (dev only)"
pubDate: 2026-04-15
draft: true
description: "A reference for every markdown feature available in this blog."
---

> **Note:** This is a draft — visible locally in dev, hidden in production.

---

## Headings

```
# H1 — used for post title (auto-rendered from frontmatter)
## H2
### H3
#### H4
##### H5
```

## H2 looks like this

### H3 looks like this

#### H4 looks like this

##### H5 looks like this

---

## Text formatting

You can write **bold**, *italic*, ***bold italic***, and ~~strikethrough~~.

```
**bold**
*italic*
***bold italic***
~~strikethrough~~
```

---

## Blockquotes

> This is a single-line blockquote.

> This is a multi-line blockquote.
> It continues on the next line.
>
> And has a second paragraph.

```
> This is a blockquote.
```

---

## Lists

Unordered:

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered:

1. First
2. Second
   1. Nested
   2. Nested again
3. Third

```
- item
  - nested

1. item
   1. nested
```

---

## Horizontal rule

---

```
---
```

---

## Links and images

[This is a link](https://example.com)

![Alt text for an image](https://via.placeholder.com/400x200)

```
[link text](https://example.com)
![alt text](./path/to/image.jpg)
```

For local images, put them in `src/assets/` and reference with a relative path from the `.md` file. Astro will optimize them automatically.

---

## Inline code and code blocks

Use `inline code` for variable names, commands, or short snippets.

Fenced code block (no syntax highlighting configured, but renders cleanly):

```
function hello(name) {
  return `Hello, ${name}!`;
}
```

With a language hint (for readability, though highlighting isn't currently themed):

```js
function hello(name) {
  return `Hello, ${name}!`;
}
```

```python
def hello(name):
    return f"Hello, {name}!"
```

```
\`inline code\`

\`\`\`js
// fenced code block
\`\`\`
```

---

## Tables

| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | data     | more     |
| Row 2    | data     | more     |
| Row 3    | data     | more     |

Alignment:

| Left     | Center   | Right    |
|:---------|:--------:|---------:|
| text     | text     | text     |
| longer   | longer   | longer   |

```
| Col A | Col B |
|-------|-------|
| val   | val   |

| Left  | Center | Right |
|:------|:------:|------:|
```

---

## Math (KaTeX)

Inline math: $E = mc^2$

Display math (centered, own line):

$$
\int_0^\infty e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

Another example:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

```
Inline: $E = mc^2$

Display:
$$
\frac{d}{dx}\left(\int_a^x f(t)\,dt\right) = f(x)
$$
```

---

## MDX (`.mdx` files only)

Rename your file to `.mdx` to unlock component embedding. The content schema picks up both `.md` and `.mdx`.

```mdx
---
title: "my post"
pubDate: 2026-05-01
---

import MyComponent from '../../components/MyComponent.astro';

Normal markdown here.

<MyComponent prop="value" />

Back to markdown.
```

---

## Frontmatter reference

```yaml
---
title: "your post title"          # required
pubDate: 2026-05-01               # required — controls sort order and display date
description: "one-line summary"   # optional — used in <meta> and RSS
updatedDate: 2026-05-10           # optional — shown if present
heroImage: ./hero.jpg             # optional — used in OG image
---
```

---

## How to wire up a new post

1. Create `website/src/content/blog/your-slug.md`
2. Add the frontmatter block above (at minimum `title` + `pubDate`)
3. Write your content below the `---`
4. It auto-appears at `/blog/` sorted by `pubDate` descending — no registration needed

The URL will be `/blog/your-slug/` (the filename without `.md`).
