import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'node:fs';

// Locale-roots expliciet meegeven aan de prerender-crawler: de taalkiezer zit in
// een dichtgeklapte dropdown, dus die links worden niet vanzelf gecrawld. Zo
// prerenderen ook nieuwe talen automatisch (voeg ze toe in data/locales.json).
const localesConfig = JSON.parse(readFileSync('./data/locales.json', 'utf8'));
const localeRoots = localesConfig.locales
	.map((l) => l.code)
	.filter((code) => code !== localesConfig.default)
	.map((code) => `/${code}`);

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
			// '*' crawlt vanaf de root; de locale-roots staan er expliciet bij omdat
			// hun links in een dichtgeklapte dropdown zitten (zie hierboven).
			entries: ['*', ...localeRoots]
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
			$lib: './src/lib',
			$data: './data'
		}
	}
};

export default config;
