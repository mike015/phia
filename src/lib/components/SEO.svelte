<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		ogImage?: string;
	}
	
	let { title = 'Phia\'s Smulparadijs - Surinaams-Creoolse Keuken in Den Haag', description = 'Kom en geniet van de Surinaams-Creoolse Keuken! Phia\'s gerechten en snacks zijn vanaf 13:30u verkrijgbaar. Voorkom lange wachttijden en bel ons van te voren.', canonical = 'https://phiassmulparadijs.nl', ogImage = 'https://phiassmulparadijs.nl/og-image.jpg' }: Props = $props();
	
	const businessSchema = {
		"@context": "https://schema.org",
		"@type": "Restaurant",
		"name": "Phia's Smulparadijs",
		"image": ogImage,
		"@id": canonical,
		"url": "https://phiassmulparadijs.nl",
		"telephone": "+31707851813",
		"priceRange": "€€",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Theresiastraat 279",
			"addressLocality": "Den Haag",
			"postalCode": "2593 AS",
			"addressCountry": "NL"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": 52.0705,
			"longitude": 4.2842
		},
		"openingHoursSpecification": [
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": [
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday"
				],
				"opens": "10:00",
				"closes": "18:00"
			}
		],
		"servesCuisine": "Surinaams-Creools",
		"acceptsReservations": "False",
		"identifier": {
			"@type": "PropertyValue",
			"propertyID": "KvK",
			"value": "70933200"
		}
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	
	<!-- Canonical URL -->
	<link rel="canonical" href={canonical} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonical} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogImage} />
	
	<!-- LocalBusiness Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`}
</svelte:head>
