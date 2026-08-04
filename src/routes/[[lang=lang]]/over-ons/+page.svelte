<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd } from '$lib/seo/jsonld';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';
	import { food } from '$lib/assets/images';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.about.title, url: SITE.url + localizePath(lang, '/over-ons') }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.about.title}
	lead={d.pages.about.lead}
	crumb={d.pages.about.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
	<div
		class="media-zoom overflow-hidden rounded-[var(--radius-card)]"
		style="box-shadow: var(--shadow-soft);"
	>
		<enhanced:img
			src={food.purple}
			alt="Sfeerbeeld van Phia's Smulparadijs"
			class="aspect-[4/3] w-full object-cover"
			sizes="(min-width: 1024px) 480px, 90vw"
		/>
	</div>
	<div>
		<p class="text-lg leading-relaxed text-[var(--color-ink)]/90">{d.pages.about.body}</p>
		<p class="mt-6 font-display text-2xl text-[var(--color-cta)]">{SITE.slogan}</p>
		<a class="btn-primary mt-6 inline-flex" href={localizePath(lang, '/contact')}>{d.nav.contact}</a
		>
	</div>
</div>
