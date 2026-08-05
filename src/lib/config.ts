/**
 * Vaste bedrijfsgegevens (PROJECT-BRIEF §1).
 * Bron van waarheid voor SEO, structured data en footer.
 *
 * Tekst-loze instellingen komen nu uit databestanden zodat de eigenaren ze via
 * het CMS kunnen beheren: telefoon/social uit data/site.json, openingstijden en
 * uitzonderingen uit data/opening-hours.json. De overige constanten (naam,
 * adres, geo, maps, reviews, tagline, servingFrom) blijven hier.
 */
import site from '$data/site.json';
import hours from '$data/opening-hours.json';

/** Weekdag-sleutels (matchen data/opening-hours.json en het dagen-woordenboek). */
export type DayKey = 'ma' | 'di' | 'wo' | 'do' | 'vr' | 'za' | 'zo';

/** Vorm van één reguliere openingsdag (bestaande shape, gebruikt door de UI). */
export type OpeningDay = { day: DayKey; open: string; close: string; closed: boolean };

/** Vorm van een openingstijden-uitzondering (vakantie e.d.). */
export type OpeningException = {
	label_nl: string;
	label_en: string;
	date_start: string;
	date_end: string;
	closed: boolean;
	open: string;
	close: string;
};

// Map data/opening-hours.json `regular` → bestaande `openingHours` shape.
const openingHours: OpeningDay[] = hours.regular.map((d) => ({
	day: d.day as DayKey,
	open: d.open,
	close: d.close,
	closed: d.closed
}));

const exceptions: OpeningException[] = (hours.exceptions ?? []) as OpeningException[];

export const SITE = {
	name: "Phia's Smulparadijs",
	legalName: "Phia's Smulparadijs",
	tagline: 'Surinaams-Creools afhaal-eethuis in Den Haag',
	// Canonieke productie-URL. Vervang bij DNS-switch indien nodig.
	url: 'https://www.phiassmulparadijs.nl',
	owners: 'Phia & Dwight',
	slogan: 'Soso Lobi ❤',
	brandLine: 'Kom en geniet van de Surinaams-Creoolse keuken!',

	address: {
		street: 'Bouwlustlaan 111',
		postalCode: '2544 JP',
		city: 'Den Haag',
		country: 'NL'
	},
	geo: { lat: 52.0440954, lng: 4.2569385 },

	// Bron: data/site.json (CMS).
	phone: site.phone,
	phoneE164: site.phoneE164,
	servingFrom: '13:30',
	// Keuken opent (gerechten & snacks) — bron: data/opening-hours.json (CMS).
	kitchenFrom: hours.kitchenFrom,

	maps: {
		cid: '8461937955839483201',
		url: 'https://www.google.com/maps?cid=8461937955839483201'
	},

	social: {
		facebook: site.social.facebook,
		instagram: site.social.instagram,
		instagramHandle: site.social.instagramHandle,
		youtube: site.social.youtube,
		// Uitgelichte video (link, geen embed) voor hero + maaltijd-pagina.
		youtubeVideo: site.social.youtubeVideo || site.social.youtube
	},

	reviews: {
		google: { rating: 4.8, count: 294 },
		facebook: { rating: 4.9, count: 110 }
	},

	// Openingstijden — bron: data/opening-hours.json (CMS).
	// Di t/m za 12:00–19:00, zo + ma gesloten. De keuken (gerechten & snacks)
	// opent om 13:30. Uitzonderingen (vakantie) staan in `exceptions`.
	openingHours,
	exceptions
};
