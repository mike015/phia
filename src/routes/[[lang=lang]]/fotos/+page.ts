import type { PageLoad } from './$types';
import { pageSeo } from '$lib/seo/page';
import { t } from '$lib/i18n';

export const load: PageLoad = async ({ parent }) => {
	const { lang } = await parent();
	const d = t(lang);
	return pageSeo(lang, {
		path: '/fotos',
		title: d.pages.photos.title,
		description: d.pages.photos.lead
	});
};
