import type { PageLoad } from './$types';
import { pageSeo } from '$lib/seo/page';
import { t } from '$lib/i18n';
import { getNews } from '$lib/news';

export const load: PageLoad = async ({ parent }) => {
	const { lang } = await parent();
	const d = t(lang);
	return {
		...pageSeo(lang, {
			path: '/nieuws',
			title: d.pages.news.title,
			description: d.pages.news.lead
		}),
		news: getNews()
	};
};
