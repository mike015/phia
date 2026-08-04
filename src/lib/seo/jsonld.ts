import { SITE } from '$lib/config';
import type { Lang } from '$lib/i18n';

const DAY_SCHEMA: Record<string, string> = {
	ma: 'Monday',
	di: 'Tuesday',
	wo: 'Wednesday',
	do: 'Thursday',
	vr: 'Friday',
	za: 'Saturday',
	zo: 'Sunday'
};

/**
 * Restaurant / LocalBusiness structured data (schema.org).
 * Drijft rich results in Google (rating, adres, openingstijden).
 */
export function restaurantJsonLd(lang: Lang) {
	const openingHoursSpecification = SITE.openingHours
		.filter((h) => !h.closed)
		.map((h) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: `https://schema.org/${DAY_SCHEMA[h.day]}`,
			opens: h.open,
			closes: h.close
		}));

	return {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		'@id': `${SITE.url}/#restaurant`,
		name: SITE.name,
		description:
			lang === 'nl'
				? 'Surinaams-Creools afhaal-eethuis in Den Haag. Elke dag verse maaltijden en soepen.'
				: 'Surinamese-Creole takeaway in The Hague. Fresh meals and soups every day.',
		url: SITE.url,
		telephone: SITE.phoneE164,
		servesCuisine: ['Surinaams', 'Creools', 'Surinamese', 'Caribbean'],
		priceRange: '€€',
		image: `${SITE.url}/og-image.jpg`,
		hasMap: SITE.maps.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: SITE.address.street,
			postalCode: SITE.address.postalCode,
			addressLocality: SITE.address.city,
			addressCountry: SITE.address.country
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: SITE.geo.lat,
			longitude: SITE.geo.lng
		},
		openingHoursSpecification,
		sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.youtube],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: SITE.reviews.google.rating,
			reviewCount: SITE.reviews.google.count,
			bestRating: 5,
			worstRating: 1
		}
	};
}

export function websiteJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE.url}/#website`,
		name: SITE.name,
		url: SITE.url,
		inLanguage: ['nl-NL', 'en-GB'],
		publisher: { '@id': `${SITE.url}/#restaurant` }
	};
}

export type Crumb = { name: string; url: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: c.url
		}))
	};
}
