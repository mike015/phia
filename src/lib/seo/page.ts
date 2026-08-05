import type { SeoInput } from './meta';
import type { Lang } from '$lib/i18n';

/** Kleine helper zodat elke +page.ts alleen de essentie hoeft door te geven. */
export function pageSeo(lang: Lang, opts: Omit<SeoInput, 'lang'>): { seo: SeoInput } {
	return { seo: { lang, ...opts } };
}
