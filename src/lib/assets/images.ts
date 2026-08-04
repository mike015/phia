// Geoptimaliseerde beelden via @sveltejs/enhanced-img.
// Alles hier is PLACEHOLDER — zie IMAGES-TODO.md.
import warm from './ph-warm.jpg?enhanced';
import purple from './ph-purple.jpg?enhanced';
import table from './ph-table.jpg?enhanced';
import dark from './ph-dark.jpg?enhanced';

export const food = { warm, purple, table, dark };

// Voorbeeld-menukaarten voor de home-uitlichting (bevestiging menu volgt).
export const menuHighlights = [
	{ img: warm, nl: 'Broodje kip kerrie', en: 'Chicken curry sandwich', price: '€ 5,50' },
	{ img: purple, nl: 'Roti kipfilet speciaal', en: 'Roti chicken special', price: '€ 12,00' },
	{ img: table, nl: 'Saoto soep', en: 'Saoto soup', price: '€ 7,50' },
	{ img: dark, nl: 'Nasi speciaal', en: 'Nasi special', price: '€ 10,50' }
] as const;

// Instagram-grid placeholder (echte feed komt via /api/instagram — PROJECT-BRIEF §5.2).
export const instaPlaceholders = [warm, purple, table, dark, warm] as const;
