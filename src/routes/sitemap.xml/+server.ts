import type { RequestHandler } from './$types';
import { SITE } from '$lib/config';
import { LANGS, langPrefix } from '$lib/i18n';
import { ROUTES } from '$lib/seo/routes';

export const prerender = true;

const abs = (path: string) => `${SITE.url}${path === '/' ? '' : path}`;

export const GET: RequestHandler = () => {
	const urls = ROUTES.flatMap((route) =>
		LANGS.map((lang) => {
			const loc = abs(`${langPrefix(lang)}${route.path === '/' ? '' : route.path}`);
			const alternates = LANGS.map(
				(l) =>
					`<xhtml:link rel="alternate" hreflang="${l}" href="${abs(
						`${langPrefix(l)}${route.path === '/' ? '' : route.path}`
					)}"/>`
			).join('');
			const xdefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(route.path)}"/>`;
			return `  <url>
    <loc>${loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
    ${alternates}${xdefault}
  </url>`;
		})
	).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
