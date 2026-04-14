// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],

  markdown: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
	},

  adapter: cloudflare(),
});