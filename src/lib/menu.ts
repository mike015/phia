/**
 * Volledig menu — bron: data/menu.json (door de eigenaren te beheren via het
 * CMS, incl. eigen PDF-upload). NL is leidend en 1-op-1 overgenomen van de
 * officiële menukaart "JULI 2026". EN-namen zijn een eerste vertaling en moeten
 * worden gereviewd (proper names blijven Surinaams).
 *
 * Prijzen letterlijk van de kaart. "Drukfouten voorbehouden" — bij twijfel de
 * PDF en Phia leidend.
 *
 * De geëxporteerde namen en types (MENU, MENU_NOTES, ALLERGENS,
 * MAALTIJD_EXAMPLES, MENU_PDF) blijven ongewijzigd; alleen de bron is nu JSON.
 */
import menuData from '$data/menu.json';

export type Price = { label_nl?: string; label_en?: string; value: string };

/** Eén link bij een gerecht: bv. een Instagram-post, een review of een video. */
export type MenuLink = { label: string; url: string };

export type MenuItem = {
	nl: string;
	en: string;
	prices: Price[];
	note_nl?: string;
	note_en?: string;
	image?: string;
	/** Optionele links (social-posts, reviews, video's) bij dit gerecht. */
	links: MenuLink[];
	/** Dagcodes (ma..zo) waarop dit gerecht verkrijgbaar is; leeg = altijd. */
	availableDays: string[];
};

export type MenuCategory = {
	id: string;
	nl: string;
	en: string;
	badge?: 'halal' | 'niet-halal' | 'vega';
	note_nl?: string;
	note_en?: string;
	items: MenuItem[];
};

/** Lege strings uit de JSON worden weer `undefined` (bewaart bestaande shape). */
const blank = (v: string | undefined): string | undefined => (v ? v : undefined);

export const MENU: MenuCategory[] = menuData.categories.map((cat) => ({
	id: cat.id,
	nl: cat.nl,
	en: cat.en,
	badge: (cat.badge ? cat.badge : undefined) as MenuCategory['badge'],
	note_nl: blank(cat.note_nl),
	note_en: blank(cat.note_en),
	items: cat.items.map((item) => ({
		nl: item.nl,
		en: item.en,
		note_nl: blank(item.note_nl),
		note_en: blank(item.note_en),
		image: blank(item.image),
		links: ((item.links ?? []) as { label?: string; url: string }[])
			.filter((l) => !!l && !!l.url)
			.map((l) => ({ label: l.label ?? '', url: l.url })),
		availableDays: ((item.availableDays ?? []) as string[]).filter(Boolean),
		prices: item.prices.map((p) => ({
			label_nl: blank(p.label_nl),
			label_en: blank(p.label_en),
			value: p.value
		}))
	}))
}));

/** Voorbeelden van Phia's maaltijden & soepen (van de kaart). */
export const MAALTIJD_EXAMPLES: string[] = menuData.examples;

/** Overige informatie (van de kaart). NL leidend, EN te reviewen. */
export const MENU_NOTES: { nl: string[]; en: string[] } = {
	nl: menuData.notes_nl,
	en: menuData.notes_en
};

export const ALLERGENS: { nl: string; en: string } = {
	nl: menuData.allergens_nl,
	en: menuData.allergens_en
};

/** Downloadbare PDF-menukaart (owner uploadt de actuele versie). */
export const MENU_PDF: { href: string; edition_nl: string; edition_en: string } = {
	href: menuData.pdf,
	edition_nl: menuData.edition_nl,
	edition_en: menuData.edition_en
};

/**
 * URL-vriendelijke slug: kleine letters, accenten weg, niet-alfanumeriek → '-',
 * meerdere streepjes samengevouwen en randstreepjes verwijderd.
 */
export function slugify(s: string): string {
	return s
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // diakritische tekens strippen (é → e)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/-{2,}/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Eén platgeslagen gerecht met zijn unieke slug en categorie-context. */
export type MenuItemFlat = {
	slug: string;
	categoryId: string;
	categoryNl: string;
	categoryEn: string;
	item: MenuItem;
};

/**
 * Alle gerechten uit alle categorieën platgeslagen, elk met een UNIEKE slug.
 * Botsingen (zelfde slug) krijgen deterministisch '-2', '-3', … in leesvolgorde.
 * De `item`-referenties zijn identiek aan die in `MENU` (handig voor lookups).
 */
export function menuItemsFlat(): MenuItemFlat[] {
	const out: MenuItemFlat[] = [];
	const seen = new Map<string, number>();
	for (const cat of MENU) {
		for (const item of cat.items) {
			const base = slugify(item.nl);
			const n = (seen.get(base) ?? 0) + 1;
			seen.set(base, n);
			out.push({
				slug: n === 1 ? base : `${base}-${n}`,
				categoryId: cat.id,
				categoryNl: cat.nl,
				categoryEn: cat.en,
				item
			});
		}
	}
	return out;
}

/** Vooraf berekende, stabiele lijst (menu is statisch tijdens build/runtime). */
const MENU_FLAT: MenuItemFlat[] = menuItemsFlat();

/** Zoek een platgeslagen gerecht op zijn slug; `undefined` als het niet bestaat. */
export function findMenuItem(slug: string): MenuItemFlat | undefined {
	return MENU_FLAT.find((e) => e.slug === slug);
}

// Woorden die niets zeggen over "waar lijkt dit op" (voor de similar-logica).
const STOPWORDS = new Set([
	'of',
	'en',
	'met',
	'or',
	'and',
	'the',
	'van',
	'de',
	'het',
	'a',
	'speciaal',
	'special',
	'groot',
	'grote',
	'klein',
	'kleine',
	'xl',
	'normaal',
	'regular',
	'portie',
	'bakje',
	'los',
	'losse',
	'div',
	'diverse',
	'soorten',
	'naar',
	'keuze',
	'mix',
	'dag',
	'stuks'
]);

/** Betekenisvolle trefwoorden uit een gerechtnaam (voor overeenkomst-matching). */
function keywords(name: string): string[] {
	return slugify(name)
		.split('-')
		.filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

/**
 * Verwante gerechten bij een detailpagina:
 * - `sameCategory`: andere gerechten uit dezelfde categorie ("andere broodjes").
 * - `similar`: gerechten uit ANDERE categorieën die een trefwoord delen
 *   (bv. broodje "Kip kerrie" → "Nasi of Bami kip"; "Saté" → "Stokje saté").
 */
export function relatedItems(
	slug: string,
	opts: { sameMax?: number; similarMax?: number } = {}
): { sameCategory: MenuItemFlat[]; similar: MenuItemFlat[] } {
	const sameMax = opts.sameMax ?? 6;
	const similarMax = opts.similarMax ?? 6;
	const current = findMenuItem(slug);
	if (!current) return { sameCategory: [], similar: [] };

	const sameCategory = MENU_FLAT.filter(
		(e) => e.categoryId === current.categoryId && e.slug !== current.slug
	).slice(0, sameMax);

	const keys = new Set(keywords(current.item.nl));
	const taken = new Set([current.slug, ...sameCategory.map((e) => e.slug)]);
	const similar = MENU_FLAT.filter((e) => {
		if (taken.has(e.slug) || e.categoryId === current.categoryId) return false;
		return keywords(e.item.nl).some((w) => keys.has(w));
	}).slice(0, similarMax);

	return { sameCategory, similar };
}
