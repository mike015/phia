import type { PageLoad } from './$types';
import { pageSeo } from '$lib/seo/page';
import { t } from '$lib/i18n';

export const load: PageLoad = async ({ parent }) => {
	const { lang } = await parent();
	const d = t(lang);
	return pageSeo(lang, {
		path: '/maaltijd-of-soep',
		title: d.pages.dish.title,
		description: d.pages.dish.lead,
		type: 'article'
	});
};
