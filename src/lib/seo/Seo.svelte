<script lang="ts">
	import { resolveSeo, type SeoInput } from './meta';
	import { SITE } from '$lib/config';

	let { seo }: { seo: SeoInput } = $props();
	const r = $derived(resolveSeo(seo));
</script>

<svelte:head>
	<title>{r.title}</title>
	<meta name="description" content={r.description} />
	<meta name="robots" content={r.robots} />
	<link rel="canonical" href={r.canonical} />

	<!-- hreflang alternates -->
	{#each r.alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}

	<!-- Open Graph -->
	<meta property="og:type" content={r.type} />
	<meta property="og:site_name" content={r.siteName} />
	<meta property="og:title" content={r.title} />
	<meta property="og:description" content={r.description} />
	<meta property="og:url" content={r.canonical} />
	<meta property="og:locale" content={r.ogLocale} />
	{#each r.ogLocaleAlt as alt (alt)}
		<meta property="og:locale:alternate" content={alt} />
	{/each}
	<meta property="og:image" content={r.image} />
	<meta property="og:image:alt" content={r.imageAlt} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={r.title} />
	<meta name="twitter:description" content={r.description} />
	<meta name="twitter:image" content={r.image} />
	<meta name="twitter:image:alt" content={r.imageAlt} />

	<meta name="author" content={SITE.legalName} />
	<meta name="geo.region" content="NL-ZH" />
	<meta name="geo.placename" content={SITE.address.city} />
	<meta name="geo.position" content={`${SITE.geo.lat};${SITE.geo.lng}`} />
	<meta name="ICBM" content={`${SITE.geo.lat}, ${SITE.geo.lng}`} />
</svelte:head>
