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

	// Placeholder-galerij (echte foto's + Instagram nog nodig — IMAGES-TODO.md).
	const gallery = [
		food.warm,
		food.purple,
		food.table,
		food.dark,
		food.purple,
		food.warm,
		food.dark,
		food.table
	];

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.photos.title, url: SITE.url + localizePath(lang, '/fotos') }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.photos.title}
	lead={d.pages.photos.lead}
	crumb={d.pages.photos.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
	<ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
		{#each gallery as img, i (i)}
			<li
				class="overflow-hidden rounded-xl border border-[var(--color-lilac-border)]"
				style="box-shadow: var(--shadow-soft);"
			>
				<enhanced:img
					src={img}
					alt=""
					class="aspect-square w-full object-cover transition hover:scale-[1.04]"
					sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw"
					loading="lazy"
				/>
			</li>
		{/each}
	</ul>
</div>
