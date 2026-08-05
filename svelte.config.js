import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'node:fs';

// Locale-roots expliciet meegeven aan de prerender-crawler: de taalkiezer zit in
// een dichtgeklapte dropdown, dus die links worden niet vanzelf gecrawld. Zo
// prerenderen ook nieuwe talen automatisch (voeg ze toe in data/locales.json).
const localesConfig = JSON.parse(readFileSync('./data/locales.json', 'utf8'));
// Feeds-worker-host uit data/site.json meenemen in connect-src (indien ingesteld),
// zodat de client-side fetch naar de feeds-worker niet door CSP wordt geblokkeerd.
const siteConfig = JSON.parse(readFileSync('./data/site.json', 'utf8'));
const feedsBase = (siteConfig.feeds && siteConfig.feeds.base) || '';
const feedsConnect = feedsBase ? [feedsBase] : [];
const localeRoots = localesConfig.locales
	.map((l) => l.code)
	.filter((code) => code !== localesConfig.default)
	.map((code) => `/${code}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Static-first: prerender everything (PROJECT-BRIEF §2).
		// De build (./build) wordt als statische assets naar Cloudflare Workers
		// gedeployd (zie wrangler.toml [assets]). Stap over op
		// @sveltejs/adapter-cloudflare zodra er /api/* Workers bijkomen.
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
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				// gtag.js (Google Analytics) laadt van googletagmanager.com; pas na consent.
				'script-src': ['self', 'https://www.googletagmanager.com'],
				'style-src': ['self', 'unsafe-inline'],
				// GA-pixels; Instagram-foto's (§5.2) van *.cdninstagram.com/*.fbcdn.net.
				'img-src': [
					'self',
					'data:',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com',
					'https://*.cdninstagram.com',
					'https://*.fbcdn.net'
				],
				'font-src': ['self'],
				// GA-metingen; de feeds-worker (indien ingesteld).
				'connect-src': [
					'self',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com',
					'https://region1.google-analytics.com',
					...feedsConnect
				],
				// YouTube-embeds (na media-consent) in een iframe van youtube-nocookie.
				'frame-src': ['self', 'https://www.youtube-nocookie.com', 'https://www.youtube.com'],
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
