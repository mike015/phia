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
		// CSP wordt door SvelteKit beheerd (hash-mode): de inline hydration-script
		// krijgt automatisch een hash, zodat we GEEN 'unsafe-inline' voor script
		// nodig hebben. Injecteert een <meta http-equiv> in elke geprerenderde
		// pagina. Overige security-headers staan in static/_headers.
		// LATER (embeds achter consent): voeg youtube-nocookie.com / facebook.com
		// toe aan frame-src en de bijbehorende script-src.
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'connect-src': ['self'],
				'frame-ancestors': ['self'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'object-src': ['none'],
				'manifest-src': ['self']
			}
		},
		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;
