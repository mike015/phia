import { SITE } from '$lib/config';
import { LANGS, DEFAULT_LANG, langPrefix, type Lang } from '$lib/i18n';

export type SeoInput = {
	lang: Lang;
	/** Logisch pad zonder taal-prefix, begint met '/'. Bv '/menu'. */
	path: string;
	title: string;
	description: string;
	/** Absolute of app-relatieve OG-afbeelding. */
	image?: string;
	/** Home krijgt geen "· merknaam"-suffix. */
	isHome?: boolean;
	type?: 'website' | 'article';
	/** noindex bijv. voor /admin. */
	noindex?: boolean;
};

export type Alternate = { lang: Lang | 'x-default'; href: string; hreflang: string };

export type ResolvedSeo = {
	title: string;
	description: string;
	canonical: string;
	alternates: Alternate[];
	ogLocale: string;
	ogLocaleAlt: string[];
	image: string;
	imageAlt: string;
	type: 'website' | 'article';
	robots: string;
	siteName: string;
};

const absolute = (path: string) => `${SITE.url}${path === '/' ? '' : path}` || SITE.url;

/** hreflang-alternates voor elke taal + x-default (PROJECT-BRIEF §8, SEO-eis). */
export function buildAlternates(path: string): Alternate[] {
	const list: Alternate[] = LANGS.map((l) => ({
		lang: l,
		hreflang: l,
		href: absolute(`${langPrefix(l)}${path === '/' ? '' : path}`)
	}));
	list.push({
		lang: 'x-default',
		hreflang: 'x-default',
		href: absolute(`${langPrefix(DEFAULT_LANG)}${path === '/' ? '' : path}`)
	});
	return list;
}

export function resolveSeo(input: SeoInput): ResolvedSeo {
	const suffix = ` · ${SITE.name}`;
	const title = input.isHome ? input.title : `${input.title}${suffix}`;
	const canonical = absolute(`${langPrefix(input.lang)}${input.path === '/' ? '' : input.path}`);
	const ogLocale = input.lang === 'nl' ? 'nl_NL' : 'en_GB';
	const ogLocaleAlt = LANGS.filter((l) => l !== input.lang).map((l) =>
		l === 'nl' ? 'nl_NL' : 'en_GB'
	);

	return {
		title,
		description: input.description,
		canonical,
		alternates: buildAlternates(input.path),
		ogLocale,
		ogLocaleAlt,
		image: absolute(input.image ?? '/og-image.jpg'),
		imageAlt: `${SITE.name} — ${SITE.tagline}`,
		type: input.type ?? 'website',
		robots: input.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
		siteName: SITE.name
	};
}
