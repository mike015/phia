import type { LayoutLoad } from './$types';
import { DEFAULT_LANG, type Lang } from '$lib/i18n';

export const load: LayoutLoad = ({ params, url }) => {
	const lang: Lang = params.lang === 'en' ? 'en' : DEFAULT_LANG;

	// Logisch pad zonder taal-prefix — voor taalwissel, canonical en hreflang.
	let path = url.pathname;
	if (path === '/en' || path.startsWith('/en/')) path = path.slice(3) || '/';
	if (path.length > 1) path = path.replace(/\/+$/, '') || '/';

	return { lang, path };
};
