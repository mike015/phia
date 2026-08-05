import type { RequestHandler } from './$types';
import { SITE } from '$lib/config';

export const prerender = true;

export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE.url}/sitemap.xml
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
