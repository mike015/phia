/**
 * Data-gedreven i18n. De taalregistratie staat in data/locales.json en alle
 * UI-teksten in data/ui/<code>.json — beide door de eigenaren te beheren via
 * het CMS. NL is leidend (default, geen prefix); elke andere taal onder /<code>.
 *
 * Klaar voor MEER dan 2 talen: voeg een locale toe in locales.json + een
 * data/ui/<code>.json en de rest schaalt mee (switcher, hreflang, sitemap).
 * EN-teksten zijn door de bouwer geschreven en gemarkeerd "te reviewen".
 */
import localesConfig from '$data/locales.json';
import nl from '$data/ui/nl.json';
import en from '$data/ui/en.json';

/** Eén locale-registratie uit data/locales.json. */
export type Locale = { code: string; label: string; og: string; html: string };

/** Alle geregistreerde talen (bron: data/locales.json). */
export const LOCALES: Locale[] = localesConfig.locales as Locale[];

/** Open taal-type: elke geregistreerde locale-code (was een union, nu N talen). */
export type Lang = string;

/** De default-taal wordt op `/` geserveerd (zonder prefix). */
export const DEFAULT_LANG: Lang = localesConfig.default;

/** Alle taalcodes (handig voor iteraties). */
export const LANGS: Lang[] = LOCALES.map((l) => l.code);

/** De vorm van het woordenboek (afgeleid van de NL-bron). */
export type Dict = typeof nl;

/** Woordenboeken per taalcode. */
const dicts: Record<string, Dict> = {
	nl: nl as Dict,
	en: en as Dict
};

/** Prefix voor URL-opbouw: default-taal zonder prefix, overige met /<code>. */
export function langPrefix(lang: Lang): string {
	return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** Bouw een intern pad voor een taal. path begint met '/'. */
export function localizePath(lang: Lang, path: string): string {
	const clean = path === '/' ? '' : path;
	return `${langPrefix(lang)}${clean}` || '/';
}

/** Registratie van alle talen (voor de taalswitcher). */
export function locales(): Locale[] {
	return LOCALES;
}

/** Diepe merge: `override` wint, ontbrekende keys vallen terug op `base`. */
function deepMerge<T>(base: T, override: unknown): T {
	if (
		override === null ||
		typeof override !== 'object' ||
		Array.isArray(override) ||
		typeof base !== 'object' ||
		base === null ||
		Array.isArray(base)
	) {
		return override === undefined ? base : (override as T);
	}
	const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
	const ov = override as Record<string, unknown>;
	for (const key of Object.keys(ov)) {
		out[key] = deepMerge((base as Record<string, unknown>)[key], ov[key]);
	}
	return out as T;
}

/**
 * Woordenboek voor `lang`, diep gemerged OVER de default-taal zodat nog niet
 * vertaalde keys terugvallen op de default (veilig bij een nieuwe locale).
 */
export function t(lang: Lang): Dict {
	const base = dicts[DEFAULT_LANG];
	const target = dicts[lang];
	if (!target || lang === DEFAULT_LANG) return base;
	return deepMerge(base, target);
}
