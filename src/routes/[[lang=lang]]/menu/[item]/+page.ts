import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { pageSeo } from '$lib/seo/page';
import { findMenuItem } from '$lib/menu';
import { t } from '$lib/i18n';

export const load: PageLoad = async ({ params, parent }) => {
	const { lang } = await parent();
	const entry = findMenuItem(params.item);
	if (!entry) throw error(404, lang === 'en' ? 'Dish not found' : 'Gerecht niet gevonden');

	const isNl = lang === 'nl';
	const name = isNl ? entry.item.nl : entry.item.en;
	const note = isNl ? entry.item.note_nl : entry.item.note_en;
	const category = isNl ? entry.categoryNl : entry.categoryEn;

	// SEO-omschrijving: de notitie indien aanwezig, anders een korte afleiding.
	const description =
		note && note.trim()
			? note
			: isNl
				? `${name} — te vinden op de menukaart van Phia's Smulparadijs (${category}).`
				: `${name} — on the menu at Phia's Smulparadijs (${category}).`;

	return {
		entry,
		...pageSeo(lang, {
			path: `/menu/${entry.slug}`,
			title: name,
			description,
			image: entry.item.image || undefined
		})
	};
};
