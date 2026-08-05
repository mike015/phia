import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, LANGS, type Lang } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	// Taal uit het eerste padsegment als dat een niet-default locale-code is.
	const seg = event.url.pathname.split('/')[1];
	const lang: Lang = seg && seg !== DEFAULT_LANG && LANGS.includes(seg) ? seg : DEFAULT_LANG;
	event.locals.lang = lang;

	return resolve(event, {
		// Zet <html lang="..."> correct per taal (PROJECT-BRIEF §8).
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
