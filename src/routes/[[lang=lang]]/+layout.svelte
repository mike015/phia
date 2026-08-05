<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ConsentBanner from '$lib/components/ConsentBanner.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { restaurantJsonLd, websiteJsonLd } from '$lib/seo/jsonld';
	import { t } from '$lib/i18n';

	let { data, children } = $props();
	const d = $derived(t(data.lang));
</script>

<!-- Site-brede structured data: 1x per pagina, drijft rich results -->
<JsonLd data={[restaurantJsonLd(data.lang), websiteJsonLd()]} />

<a class="skip-link" href="#main">{d.nav.skip}</a>

<Header lang={data.lang} path={data.path} />

<main id="main">
	{@render children()}
</main>

<Footer lang={data.lang} />

<ConsentBanner lang={data.lang} />

<!-- Google Analytics: dormant tot GA-ID ingesteld én analytics-consent gegeven. -->
<Analytics />
