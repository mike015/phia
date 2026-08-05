/** Alle publieke logische paden (zonder taal-prefix) voor de sitemap. */
export const ROUTES: { path: string; priority: number; changefreq: string }[] = [
	{ path: '/', priority: 1.0, changefreq: 'daily' },
	{ path: '/menu', priority: 0.9, changefreq: 'weekly' },
	{ path: '/maaltijd-of-soep', priority: 0.8, changefreq: 'daily' },
	{ path: '/over-ons', priority: 0.6, changefreq: 'monthly' },
	{ path: '/fotos', priority: 0.6, changefreq: 'weekly' },
	{ path: '/nieuws', priority: 0.5, changefreq: 'weekly' },
	{ path: '/contact', priority: 0.7, changefreq: 'monthly' }
];
