// Beelden via @sveltejs/enhanced-img.
// heri-heri / jarpesi = ECHTE foto's uit de officiële menukaart-PDF (juli 2026).
// ph-*.jpg = design-PLACEHOLDERS (zie IMAGES-TODO.md).
import warm from './ph-warm.jpg?enhanced';
import purple from './ph-purple.jpg?enhanced';
import table from './ph-table.jpg?enhanced';
import dark from './ph-dark.jpg?enhanced';
import heriHeri from './heri-heri-moksi-alesie.jpg?enhanced';
import jarpesi from './jarpesi-moksi-alesie.jpg?enhanced';

export const food = { warm, purple, table, dark, heriHeri, jarpesi };

// Menu-uitlichting op home: echte gerechten & prijzen (menukaart juli 2026).
// `slug` verwijst naar de detailpagina /menu/<slug>, zodat elke kaart doorlinkt.
export const menuHighlights = [
	{ img: warm, slug: 'roti-kip', nl: 'Roti kip', en: 'Roti chicken', price: 'v.a. € 13,00' },
	{
		img: purple,
		slug: 'nasi-of-bami-kip',
		nl: 'Nasi of Bami kip',
		en: 'Nasi or Bami chicken',
		price: 'v.a. € 12,00'
	},
	{ img: table, slug: 'saoto-soep', nl: 'Saoto soep', en: 'Saoto soup', price: '€ 9,00' },
	{ img: dark, slug: 'bara', nl: 'Bara', en: 'Bara', price: 'v.a. € 3,50' }
] as const;

// Instagram-grid placeholder (echte feed volgt via /api/instagram, PROJECT-BRIEF §5.2).
export const instaPlaceholders = [heriHeri, jarpesi, warm, purple, table] as const;
