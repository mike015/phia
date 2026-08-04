/**
 * Lichte i18n: NL is leidend (default, geen prefix), EN onder /en.
 * EN-teksten zijn door de bouwer geschreven en gemarkeerd "te reviewen"
 * (PROJECT-BRIEF CLAUDE.md).
 */
export const LANGS = ['nl', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'nl';

/** Prefix voor URL-opbouw: NL zonder prefix, EN met /en. */
export function langPrefix(lang: Lang): string {
	return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** Bouw een intern pad voor een taal. path begint met '/'. */
export function localizePath(lang: Lang, path: string): string {
	const clean = path === '/' ? '' : path;
	return `${langPrefix(lang)}${clean}` || '/';
}

export type Dict = (typeof dict)['nl'];

export const dict = {
	nl: {
		meta: { htmlLang: 'nl', localeOg: 'nl_NL', label: 'Nederlands' },
		nav: {
			home: 'Home',
			menu: 'Menu',
			about: 'Over ons',
			dish: 'Maaltijd of Soep',
			photos: "Foto's",
			contact: 'Contact',
			callCta: 'Bel & bestel',
			skip: 'Direct naar de inhoud',
			langSwitch: 'Switch to English',
			openMenu: 'Menu openen',
			closeMenu: 'Menu sluiten'
		},
		status: {
			openToday: 'Vandaag geopend',
			closedToday: 'Vandaag gesloten',
			from: 'vanaf'
		},
		home: {
			kicker: 'Maaltijd of soep · vandaag',
			h1Fallback: 'Vers gekookt, elke dag opnieuw',
			sub: 'Elke dag kookt Phia een verse maaltijd of soep en zet de video op YouTube. Bekijk wat er vandaag in de pan staat — of bel direct om te bestellen.',
			ctaMenu: 'Bekijk het menu',
			playLabel: 'Speel de video van vandaag af',
			todayBadge: 'Vandaag',
			watchYoutube: 'Bekijk op YouTube',
			noticeLabel: 'Aangepaste openingstijden',
			noticeExample: 'Tijdelijke wijzigingen in de openingstijden verschijnen hier altijd direct.',
			menuHeading: 'Uit de keuken van Phia',
			menuSub: 'Een greep uit het menu — met prijzen',
			menuMore: 'Bekijk het volledige menu',
			bandQuote: '“You don’t see food with this much passion and heart nowadays.”',
			bandSource: '4.8 op Google (294) · 4.9 op Facebook (110)',
			reviewsHeading: 'Wat gasten zeggen',
			reviewsScorePre: '',
			onGoogle: 'op Google',
			onFacebook: 'op Facebook',
			instaLabel: 'Volg ons op Instagram',
			instaFollow: 'Volg @phiassmulparadijs'
		},
		pages: {
			menu: {
				title: 'Menu',
				lead: 'Het volledige menu van Phia’s Smulparadijs — verse Surinaams-Creoolse gerechten en snacks, elke dag beschikbaar vanaf 13:30.',
				note: 'Prijzen en beschikbaarheid kunnen wijzigen. Bellen kan altijd via 070-7851813.',
				categoriesTodo:
					'De exacte menustructuur en prijzen worden nog bevestigd. Onderstaande categorieën zijn een voorbeeldindeling.'
			},
			about: {
				title: 'Over ons',
				lead: 'Phia en Dwight koken al jaren met liefde de Surinaams-Creoolse keuken in Den Haag.',
				body: 'Bij Phia’s Smulparadijs draait alles om vers, eerlijk en met liefde bereid eten. Elke dag staat er iets anders in de pan — van een rijke saoto tot een volle roti. Kom langs, proef en geniet. Soso Lobi ❤'
			},
			dish: {
				title: 'Maaltijd of Soep van vandaag',
				lead: 'Elke dag deelt Phia op YouTube welke verse maaltijd of soep er die dag klaarstaat.',
				body: 'Bekijk de nieuwste video hierboven en blader door het archief van eerdere gerechten. Iets gezien dat je lekker lijkt? Bel 070-7851813 om te bestellen.',
				archive: 'Recente video’s'
			},
			photos: {
				title: "Foto's",
				lead: 'Een kijkje in de keuken en het smulparadijs — gerechten, sfeer en gasten.'
			},
			contact: {
				title: 'Contact',
				lead: 'Bellen en reserveren kan telefonisch. Online bestellen is niet mogelijk.',
				addressLabel: 'Adres',
				phoneLabel: 'Telefoon',
				hoursLabel: 'Openingstijden',
				mapTitle: 'Kaart — Phia’s Smulparadijs, Bouwlustlaan 111, Den Haag',
				route: 'Route in Google Maps'
			}
		},
		footer: {
			rights: 'Alle rechten voorbehouden.',
			follow: 'Volg ons',
			built: 'Website door Blackgate'
		},
		days: {
			ma: 'Maandag',
			di: 'Dinsdag',
			wo: 'Woensdag',
			do: 'Donderdag',
			vr: 'Vrijdag',
			za: 'Zaterdag',
			zo: 'Zondag'
		},
		closed: 'Gesloten'
	},

	// --- EN: te reviewen ---
	en: {
		meta: { htmlLang: 'en', localeOg: 'en_GB', label: 'English' },
		nav: {
			home: 'Home',
			menu: 'Menu',
			about: 'About us',
			dish: 'Meal or Soup',
			photos: 'Photos',
			contact: 'Contact',
			callCta: 'Call & order',
			skip: 'Skip to content',
			langSwitch: 'Schakel naar Nederlands',
			openMenu: 'Open menu',
			closeMenu: 'Close menu'
		},
		status: {
			openToday: 'Open today',
			closedToday: 'Closed today',
			from: 'from'
		},
		home: {
			kicker: 'Meal or soup · today',
			h1Fallback: 'Freshly cooked, every single day',
			sub: 'Every day Phia cooks a fresh meal or soup and posts the video on YouTube. See what’s in the pan today — or call to order right away.',
			ctaMenu: 'View the menu',
			playLabel: 'Play today’s video',
			todayBadge: 'Today',
			watchYoutube: 'Watch on YouTube',
			noticeLabel: 'Adjusted opening hours',
			noticeExample: 'Temporary changes to our opening hours always appear here right away.',
			menuHeading: 'From Phia’s kitchen',
			menuSub: 'A taste of the menu — with prices',
			menuMore: 'View the full menu',
			bandQuote: '“You don’t see food with this much passion and heart nowadays.”',
			bandSource: '4.8 on Google (294) · 4.9 on Facebook (110)',
			reviewsHeading: 'What guests say',
			reviewsScorePre: '',
			onGoogle: 'on Google',
			onFacebook: 'on Facebook',
			instaLabel: 'Follow us on Instagram',
			instaFollow: 'Follow @phiassmulparadijs'
		},
		pages: {
			menu: {
				title: 'Menu',
				lead: 'The full menu of Phia’s Smulparadijs — fresh Surinamese-Creole dishes and snacks, available daily from 13:30.',
				note: 'Prices and availability may change. You can always call us on 070-7851813.',
				categoriesTodo:
					'The exact menu structure and prices are still being confirmed. The categories below are an example layout.'
			},
			about: {
				title: 'About us',
				lead: 'Phia and Dwight have cooked the Surinamese-Creole kitchen with love in The Hague for years.',
				body: 'At Phia’s Smulparadijs it’s all about fresh, honest food, prepared with love. Every day there’s something different in the pan — from a rich saoto to a hearty roti. Come by, taste and enjoy. Soso Lobi ❤'
			},
			dish: {
				title: 'Today’s Meal or Soup',
				lead: 'Every day Phia shares on YouTube which fresh meal or soup is ready that day.',
				body: 'Watch the latest video above and browse the archive of earlier dishes. Seen something you like? Call 070-7851813 to order.',
				archive: 'Recent videos'
			},
			photos: {
				title: 'Photos',
				lead: 'A peek into the kitchen and the smulparadijs — dishes, atmosphere and guests.'
			},
			contact: {
				title: 'Contact',
				lead: 'Calling and reserving is done by phone. Online ordering is not available.',
				addressLabel: 'Address',
				phoneLabel: 'Phone',
				hoursLabel: 'Opening hours',
				mapTitle: 'Map — Phia’s Smulparadijs, Bouwlustlaan 111, The Hague',
				route: 'Directions in Google Maps'
			}
		},
		footer: {
			rights: 'All rights reserved.',
			follow: 'Follow us',
			built: 'Website by Blackgate'
		},
		days: {
			ma: 'Monday',
			di: 'Tuesday',
			wo: 'Wednesday',
			do: 'Thursday',
			vr: 'Friday',
			za: 'Saturday',
			zo: 'Sunday'
		},
		closed: 'Closed'
	}
} as const;

export function t(lang: Lang): Dict {
	return dict[lang] as Dict;
}
