import type { PageLoad } from './$types';
import { pageSeo } from '$lib/seo/page';
import { t } from '$lib/i18n';

export const load: PageLoad = async ({ parent }) => {
	const { lang } = await parent();
	const d = t(lang);
	const title =
		lang === 'nl'
			? "Phia's Smulparadijs — Surinaams-Creools eethuis in Den Haag"
			: "Phia's Smulparadijs — Surinamese-Creole eatery in The Hague";
	return pageSeo(lang, { path: '/', title, description: d.home.sub, isHome: true });
};
