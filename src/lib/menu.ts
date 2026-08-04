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

export type MenuItem = {
	nl: string;
	en: string;
	prices: Price[];
	note_nl?: string;
	note_en?: string;
	image?: string;
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
