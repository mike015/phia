import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, type Lang } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const lang: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG;
	event.locals.lang = lang;

	return resolve(event, {
		// Zet <html lang="..."> correct per taal (PROJECT-BRIEF §8).
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
