/**
 * Volledig menu — bron: officiële menukaart PDF "JULI 2026" (static/menu/).
 * NL is leidend en 1-op-1 overgenomen van de kaart. EN-namen zijn een eerste
 * vertaling en moeten worden gereviewd (proper names blijven Surinaams).
 *
 * Prijzen letterlijk van de kaart. "Drukfouten voorbehouden" — bij twijfel de
 * PDF en Phia leidend. Owner beheert dit later via het CMS + eigen PDF-upload.
 */
export type Price = { label_nl?: string; label_en?: string; value: string };

export type MenuItem = {
	nl: string;
	en: string;
	prices: Price[];
	note_nl?: string;
	note_en?: string;
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

const NS = { label_nl: 'Normaal', label_en: 'Regular' };
const SP = { label_nl: 'Speciaal', label_en: 'Special' };
const KL = { label_nl: 'Klein', label_en: 'Small' };
const GR = { label_nl: 'Groot', label_en: 'Large' };
const XL = { label_nl: 'XL', label_en: 'XL' };

export const MENU: MenuCategory[] = [
	{
		id: 'gerechten',
		nl: "Phia's Gerechten",
		en: "Phia's Dishes",
		badge: 'halal',
		note_nl: 'De keuken is voor deze gerechten om 13.30 u geopend.',
		note_en: 'The kitchen opens at 13:30 for these dishes.',
		items: [
			{
				nl: 'Nasi of Bami kip',
				en: 'Nasi or Bami chicken',
				prices: [
					{ ...NS, value: '€ 12,00' },
					{ ...SP, value: '€ 14,50' }
				]
			},
			{
				nl: 'Nasi of Bami kipfilet',
				en: 'Nasi or Bami chicken fillet',
				prices: [
					{ ...NS, value: '€ 13,00' },
					{ ...SP, value: '€ 15,50' }
				]
			},
			{
				nl: 'Nasi of Bami kip groot',
				en: 'Nasi or Bami chicken large',
				prices: [
					{ ...NS, value: '€ 15,50' },
					{ ...SP, value: '€ 17,50' }
				]
			},
			{
				nl: 'Nasi of Bami kipfilet groot',
				en: 'Nasi or Bami chicken fillet large',
				prices: [
					{ ...NS, value: '€ 16,00' },
					{ ...SP, value: '€ 18,00' }
				]
			},
			{
				nl: 'Roti rol',
				en: 'Roti roll',
				prices: [
					{ ...NS, value: '€ 11,00' },
					{ ...SP, value: '€ 12,00' }
				]
			},
			{
				nl: 'Roti kip',
				en: 'Roti chicken',
				prices: [
					{ ...NS, value: '€ 13,00' },
					{ ...SP, value: '€ 15,00' }
				]
			},
			{
				nl: 'Roti kipfilet',
				en: 'Roti chicken fillet',
				prices: [
					{ ...NS, value: '€ 14,00' },
					{ ...SP, value: '€ 16,00' }
				]
			},
			{
				nl: 'Roti rol lams',
				en: 'Roti roll lamb',
				prices: [
					{ ...NS, value: '€ 12,50' },
					{ ...SP, value: '€ 13,50' }
				]
			},
			{
				nl: 'Roti lams',
				en: 'Roti lamb',
				prices: [
					{ ...NS, value: '€ 15,00' },
					{ ...SP, value: '€ 17,50' }
				]
			},
			{
				nl: 'Creoolse roti rol',
				en: 'Creole roti roll',
				prices: [
					{ ...NS, value: '€ 11,50' },
					{ ...SP, value: '€ 12,50' }
				]
			},
			{
				nl: 'Creoolse roti kip',
				en: 'Creole roti chicken',
				prices: [
					{ ...NS, value: '€ 14,50' },
					{ ...SP, value: '€ 16,50' }
				],
				note_nl: 'Kipfilet in ketjap, aardappelen, kousenband en spitskool.',
				note_en: 'Chicken fillet in ketjap, potatoes, long beans and pointed cabbage.'
			},
			{
				nl: 'Creoolse roti kipfilet',
				en: 'Creole roti chicken fillet',
				prices: [
					{ ...NS, value: '€ 15,00' },
					{ ...SP, value: '€ 17,00' }
				],
				note_nl: 'Kipfilet in ketjap, aardappelen, kousenband en spitskool.',
				note_en: 'Chicken fillet in ketjap, potatoes, long beans and pointed cabbage.'
			}
		]
	},
	{
		id: 'soep-maaltijd',
		nl: "Phia's Soep & Maaltijd",
		en: "Phia's Soup & Meal",
		note_nl:
			'Soep & maaltijd: elke dinsdag, donderdag en zaterdag. Maaltijden: elke woensdag en vrijdag. Is Phia’s soep of maaltijd bij jou al bekend? Zorg dan dat jij de 1e met reserveren bent!',
		note_en:
			'Soup & meal: every Tuesday, Thursday and Saturday. Meals: every Wednesday and Friday. Reserve early — these sell out!',
		items: [
			{
				nl: "Phia's soepen",
				en: "Phia's soups",
				prices: [{ label_nl: 'vanaf', label_en: 'from', value: '€ 10,50' }]
			},
			{
				nl: "Phia's maaltijden",
				en: "Phia's meals",
				prices: [{ label_nl: 'vanaf', label_en: 'from', value: '€ 17,50' }]
			}
		]
	},
	{
		id: 'broodjes',
		nl: "Phia's Broodjes",
		en: "Phia's Sandwiches",
		badge: 'halal',
		note_nl: 'Kies je beleg. Probeer ook eens 2 soorten beleg te mixen!',
		note_en: 'Choose your filling. Try mixing two fillings!',
		items: [
			{
				nl: 'Kerrie ei / dubbel',
				en: 'Curry egg / double',
				prices: [
					{ label_nl: 'enkel', label_en: 'single', value: '€ 3,75' },
					{ label_nl: 'dubbel', label_en: 'double', value: '€ 4,75' }
				]
			},
			{ nl: 'Kip kerrie', en: 'Chicken curry', prices: [{ value: '€ 4,75' }] },
			{ nl: 'Maagjes en levertjes', en: 'Gizzards and livers', prices: [{ value: '€ 4,75' }] },
			{ nl: 'Kip ketjap', en: 'Chicken ketjap', prices: [{ value: '€ 4,75' }] },
			{
				nl: 'Hete kip',
				en: 'Hot chicken',
				prices: [{ value: '€ 4,75' }],
				note_nl: 'Let op: echt heet!',
				note_en: 'Warning: really hot!'
			},
			{ nl: 'Surinaams gehakt', en: 'Surinamese minced meat', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Kousenband garnalen', en: 'Long beans with shrimp', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Saté', en: 'Saté', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Bakkeljauw', en: 'Salted cod (bakkeljauw)', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Stoofvlees', en: 'Stewed meat', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Pom met kip', en: 'Pom with chicken', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Kerrie lams', en: 'Lamb curry', prices: [{ value: '€ 5,00' }] },
			{
				nl: 'Mix (2 belegsoorten naar keuze)',
				en: 'Mix (2 fillings of choice)',
				prices: [{ label_nl: 'v.a.', label_en: 'from', value: '€ 5,50' }]
			}
		]
	},
	{
		id: 'broodjes-niet-halal',
		nl: 'Overige belegsoorten',
		en: 'Other fillings',
		badge: 'niet-halal',
		items: [
			{ nl: 'Bloedworst', en: 'Blood sausage', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Varkensspek', en: 'Pork belly', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Char siu', en: 'Char siu', prices: [{ value: '€ 5,00' }] },
			{ nl: 'Kipworst', en: 'Chicken sausage', prices: [{ value: '€ 5,00' }] }
		]
	},
	{
		id: 'vega-broodjes',
		nl: 'Vegetarisch — Broodjes',
		en: 'Vegetarian — Sandwiches',
		badge: 'vega',
		note_nl: 'Voor onze vegetarische gerechten gebruiken wij geen vleesvervangers.',
		note_en: 'We use no meat substitutes for our vegetarian dishes.',
		items: [
			{
				nl: 'Kerrie aardappel met kousenband',
				en: 'Curry potato with long beans',
				prices: [{ value: '€ 4,75' }]
			},
			{
				nl: 'Mix groente (van de dag)',
				en: "Mixed vegetables (today's)",
				prices: [{ value: '€ 4,75' }]
			},
			{ nl: 'Tempeh kousenband', en: 'Tempeh with long beans', prices: [{ value: '€ 4,75' }] }
		]
	},
	{
		id: 'vega-snacks',
		nl: 'Vegetarisch — Snacks',
		en: 'Vegetarian — Snacks',
		badge: 'vega',
		items: [
			{
				nl: 'Bara',
				en: 'Bara',
				prices: [{ value: '€ 3,50' }],
				note_nl: 'Elke vrijdag verkrijgbaar.',
				note_en: 'Available every Friday.'
			},
			{
				nl: 'Bara gevuld',
				en: 'Filled bara',
				prices: [{ label_nl: 'v.a.', label_en: 'from', value: '€ 5,50' }],
				note_nl: 'Elke vrijdag verkrijgbaar.',
				note_en: 'Available every Friday.'
			},
			{ nl: 'Bakabana (3 stuks)', en: 'Bakabana (3 pcs)', prices: [{ value: '€ 4,50' }] },
			{ nl: 'Bakje geb. cassave', en: 'Fried cassava (tub)', prices: [{ value: '€ 4,50' }] },
			{ nl: 'Pitjel', en: 'Pitjel', prices: [{ value: '€ 7,00' }] },
			{
				nl: 'Mix groente (van de dag)',
				en: "Mixed vegetables (today's)",
				prices: [{ value: '€ 7,50' }]
			}
		]
	},
	{
		id: 'vega-gerechten',
		nl: 'Vegetarische gerechten',
		en: 'Vegetarian dishes',
		badge: 'vega',
		items: [
			{ nl: 'Nasi', en: 'Nasi', prices: [{ value: '€ 12,00' }] },
			{ nl: 'Bami', en: 'Bami', prices: [{ value: '€ 12,00' }] },
			{ nl: 'Roti', en: 'Roti', prices: [{ value: '€ 13,00' }] }
		]
	},
	{
		id: 'snacks',
		nl: "Phia's Snacks",
		en: "Phia's Snacks",
		note_nl: 'De keuken is voor deze snacks om 13.30 u geopend.',
		note_en: 'The kitchen opens at 13:30 for these snacks.',
		items: [
			{ nl: 'Stokje saté', en: 'Saté skewer', prices: [{ value: '€ 3,25' }] },
			{
				nl: 'Bloedworst',
				en: 'Blood sausage',
				prices: [{ value: '€ 3,75' }],
				note_nl: 'Varkensvlees.',
				note_en: 'Pork.'
			},
			{
				nl: 'Kipworst',
				en: 'Chicken sausage',
				prices: [{ value: '€ 4,00' }],
				note_nl: 'Niet halal.',
				note_en: 'Not halal.'
			},
			{
				nl: 'Portie pittige teloballetjes',
				en: 'Portion spicy telo balls',
				prices: [{ value: '€ 4,50' }]
			},
			{ nl: 'Portie bloedworst', en: 'Portion blood sausage', prices: [{ value: '€ 6,75' }] },
			{ nl: 'Portie kipworst', en: 'Portion chicken sausage', prices: [{ value: '€ 7,00' }] },
			{
				nl: 'Portie bloed-/kipworst',
				en: 'Portion blood/chicken sausage',
				prices: [
					{ ...KL, value: '€ 7,50' },
					{ ...GR, value: '€ 11,00' }
				]
			},
			{
				nl: 'Saoto soep',
				en: 'Saoto soup',
				prices: [{ value: '€ 9,00' }],
				note_nl: 'Alleen op woensdag, vrijdag en zaterdag.',
				note_en: 'Only on Wednesday, Friday and Saturday.'
			},
			{
				nl: 'Telo bakkeljauw',
				en: 'Telo with salted cod',
				prices: [
					{ ...KL, value: '€ 7,50' },
					{ ...GR, value: '€ 11,00' },
					{ ...XL, value: '€ 15,00' }
				]
			},
			{
				nl: 'Telo trie',
				en: 'Telo with trie fish',
				prices: [
					{ ...KL, value: '€ 8,00' },
					{ ...GR, value: '€ 12,00' },
					{ ...XL, value: '€ 16,00' }
				]
			},
			{
				nl: 'Telo XL mix (bakkeljauw en trie)',
				en: 'Telo XL mix (cod and trie)',
				prices: [{ value: '€ 17,50' }]
			}
		]
	},
	{
		id: 'diverse',
		nl: "Phia's Diverse",
		en: "Phia's Extras",
		note_nl: 'Onze sambal staat bekend om zijn hoge hittegraad.',
		note_en: 'Our sambal is known for being seriously hot.',
		items: [
			{ nl: 'Extra sambal', en: 'Extra sambal', prices: [{ value: '€ 1,25' }] },
			{ nl: 'Extra pindasaus', en: 'Extra peanut sauce', prices: [{ value: '€ 1,50' }] },
			{ nl: 'Los kerrie ei', en: 'Curry egg (single)', prices: [{ value: '€ 2,25' }] },
			{ nl: 'Bakje kousenband', en: 'Long beans (tub)', prices: [{ value: '€ 3,00' }] },
			{
				nl: 'Bakje beleg',
				en: 'Filling (tub)',
				prices: [{ label_nl: 'v.a.', label_en: 'from', value: '€ 5,25' }],
				note_nl: 'Indien voorradig, bv. pom, kip kerrie of maagjes en levertjes.',
				note_en: 'If in stock, e.g. pom, chicken curry or gizzards and livers.'
			}
		]
	},
	{
		id: 'dranken',
		nl: "Phia's Koude dranken",
		en: "Phia's Cold drinks",
		items: [
			{
				nl: 'Div. frisdranken',
				en: 'Various soft drinks',
				prices: [{ label_nl: 'v.a.', label_en: 'from', value: '€ 1,50' }]
			},
			{
				nl: "Phia's stropen",
				en: "Phia's syrups",
				prices: [{ value: '€ 3,75' }],
				note_nl: 'Indien voorradig.',
				note_en: 'If in stock.'
			}
		]
	},
	{
		id: 'koeken',
		nl: "Phia's Surinaamse koeken",
		en: "Phia's Surinamese cakes",
		items: [
			{
				nl: 'Diverse soorten',
				en: 'Various kinds',
				prices: [{ label_nl: 'v.a.', label_en: 'from', value: '€ 4,75' }]
			}
		]
	}
];

/** Voorbeelden van Phia's maaltijden & soepen (van de kaart). */
export const MAALTIJD_EXAMPLES = [
	'Bitawiri Moksi Alesi',
	'Witte rijst met gevulde sopropo',
	'Masoes Moksi Alesi',
	'Cassave soep',
	"Her'Heri Moksi Alesi",
	"Her'Heri",
	'Bruine bonen',
	'Pindasoep',
	'Rijst, pom, kip en pastei'
];

/** Overige informatie (van de kaart). NL leidend, EN te reviewen. */
export const MENU_NOTES = {
	nl: [
		'Wilt u geen kipstuk of kipfilet (indien voorradig) bij het gerecht, dan kunt u een andere belegsoort kiezen voor een toeslag vanaf € 2,50 per gerecht.',
		"Roti Blanco € 2,50 (bij afname van meer dan 4 Roti Blanco's vooraf reserveren).",
		'Grote bestellingen (meer dan 5 pers.) bij voorkeur een dag van tevoren doorgeven.',
		"Nasi of Bami: circa 2 à 3 stukken kip (speciaal 1 saté erbij), Groot 3 à 4 stukken kip (speciaal 2 saté's erbij).",
		'Nasi of Bami wordt standaard geserveerd met kousenband, kip met bot of kipfilet, zuurgoed en sambal apart.',
		'Roti wordt standaard geserveerd met kip met bot of kipfilet, kousenband, aardappelen en een Roti Blanco. Bij speciaal extra vlees en een kerrie ei.',
		'Let op: er kunnen mogelijk graatjes in de vis zitten en botjes in de kip kerrie.',
		'Wij bezorgen niet — je kunt bellen, bestellen en afhalen.'
	],
	en: [
		'Prefer no chicken piece or fillet (if available) with your dish? Choose another filling for a surcharge from € 2.50 per dish.',
		'Roti Blanco € 2.50 (reserve in advance for more than 4).',
		'Large orders (more than 5 people) preferably one day in advance.',
		'Nasi or Bami: about 2–3 pieces of chicken (special +1 saté), Large 3–4 pieces (special +2 saté).',
		'Nasi or Bami is served with long beans, chicken on the bone or fillet, pickles and sambal on the side.',
		'Roti is served with chicken on the bone or fillet, long beans, potatoes and a Roti Blanco. Special comes with extra meat and a curry egg.',
		'Please note: there may be small bones in the fish and in the chicken curry.',
		'We do not deliver — you can call, order and collect.'
	]
};

export const ALLERGENS = {
	nl: 'In onze gerechten kunnen sporen van de volgende allergenen aanwezig zijn: gluten, ei, vis, pinda, noten, soja, melk (incl. lactose), schaaldieren, weekdieren, selderij, mosterd, sesamzaad, sulfiet en lupine.',
	en: 'Our dishes may contain traces of: gluten, egg, fish, peanut, nuts, soy, milk (incl. lactose), shellfish, molluscs, celery, mustard, sesame, sulphite and lupin.'
};

/** Downloadbare PDF-menukaart (owner uploadt de actuele versie). */
export const MENU_PDF = {
	href: '/menu/phias-menu-juli-2026.pdf',
	edition_nl: 'Menukaart — editie juli 2026',
	edition_en: 'Menu — July 2026 edition'
};
