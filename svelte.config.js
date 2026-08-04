import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Static-first: prerender everything (PROJECT-BRIEF §2).
		// Deploys as-is to Cloudflare Pages. Swap to @sveltejs/adapter-cloudflare
		// once the /api/* Workers are added.
		adapter: adapter({
			fallback: '404.html',
			precompress: true
		}),
		prerender: {
			handleHttpError: 'warn',
			// Trailing-slash-agnostic; the WordPress URLs used trailing slashes,
			// keep that shape for the go-live redirects (PROJECT-BRIEF §9).
			entries: ['*']
		},
		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;
