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

	// Placeholder-openingstijden — echte tijden nog nodig van klant (PROJECT-BRIEF §10).
	// Alleen "vanaf 13:30" is bevestigd.
	openingHours: [
		{ day: 'ma', open: '13:30', close: '19:00', closed: false },
		{ day: 'di', open: '13:30', close: '19:00', closed: false },
		{ day: 'wo', open: '13:30', close: '19:00', closed: false },
		{ day: 'do', open: '13:30', close: '19:00', closed: false },
		{ day: 'vr', open: '13:30', close: '19:00', closed: false },
		{ day: 'za', open: '13:30', close: '19:00', closed: false },
		{ day: 'zo', open: '13:30', close: '19:00', closed: true }
	]
} as const;
