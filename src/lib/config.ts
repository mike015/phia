/**
 * Vaste bedrijfsgegevens (PROJECT-BRIEF §1).
 * Bron van waarheid voor SEO, structured data en footer.
 */
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
	phone: '070-7851813',
	phoneE164: '+31707851813',
	servingFrom: '13:30',

	maps: {
		cid: '8461937955839483201',
		url: 'https://www.google.com/maps?cid=8461937955839483201'
	},

	social: {
		facebook: 'https://facebook.com/phiassmulparadijs',
		instagram: 'https://instagram.com/phiassmulparadijs',
		instagramHandle: '@phiassmulparadijs',
		youtube: 'https://www.youtube.com/@phiassmulparadijs'
	},

	reviews: {
		google: { rating: 4.8, count: 294 },
		facebook: { rating: 4.9, count: 110 }
	},

	// Openingstijden — bron: officiële menukaart PDF (juli 2026).
	// Di t/m za 12:00–19:00, zo + ma gesloten. De keuken (gerechten & snacks)
	// opent om 13:30. In vakantieperiodes gelden afwijkende tijden (CMS-melding).
	openingHours: [
		{ day: 'ma', open: '', close: '', closed: true },
		{ day: 'di', open: '12:00', close: '19:00', closed: false },
		{ day: 'wo', open: '12:00', close: '19:00', closed: false },
		{ day: 'do', open: '12:00', close: '19:00', closed: false },
		{ day: 'vr', open: '12:00', close: '19:00', closed: false },
		{ day: 'za', open: '12:00', close: '19:00', closed: false },
		{ day: 'zo', open: '', close: '', closed: true }
	]
} as const;
