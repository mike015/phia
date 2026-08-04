<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd } from '$lib/seo/jsonld';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);
	const isNl = $derived(lang === 'nl');

	const entry = $derived(data.entry);
	const item = $derived(entry.item);
	const name = $derived(isNl ? item.nl : item.en);
	const category = $derived(isNl ? entry.categoryNl : entry.categoryEn);
	const note = $derived(isNl ? item.note_nl : item.note_en);

	// Kruimelpad-structured data: Home → Menu → gerecht.
	const crumbs = $derived([
		{ name: d.nav.home, url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.menu.title, url: SITE.url + localizePath(lang, '/menu') },
		{ name, url: SITE.url + localizePath(lang, `/menu/${entry.slug}`) }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader {lang} title={name} crumb={d.pages.menu.title} homeLabel={d.nav.home} />

<div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<!-- Categorie -->
	<p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-lilac-text)]">
		{d.pages.menuItem.inCategory}: {category}
	</p>

	<!-- Prijzen (zelfde stijl als op de menukaart) -->
	<div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-lg font-bold text-[var(--color-cta)]">
		{#each item.prices as p, i (i)}
			<span class="whitespace-nowrap">
				{#if isNl ? p.label_nl : p.label_en}
					<span class="text-xs font-semibold uppercase text-[var(--color-muted)]"
						>{isNl ? p.label_nl : p.label_en}</span
					>
				{/if}
				{p.value}
			</span>
		{/each}
	</div>

	<!-- Notitie -->
	{#if note}
		<p class="mt-6 text-[var(--color-muted)]">{note}</p>
	{/if}

	<!-- Optionele foto van het gerecht (owner uploadt via CMS naar /uploads) -->
	{#if item.image}
		<img
			src={item.image}
			alt={name}
			loading="lazy"
			class="mt-6 w-full max-w-full rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] object-cover"
		/>
	{/if}

	<!-- Acties -->
	<div class="mt-8 flex flex-wrap gap-3">
		<a class="btn-primary" href={`tel:${SITE.phoneE164}`}>📞 {d.pages.menuItem.order}</a>
		{#if item.link}
			<a class="btn-outline" href={item.link} target="_blank" rel="noopener noreferrer">
				{d.pages.menuItem.viewPost}
			</a>
		{/if}
	</div>

	<!-- Terug naar het menu -->
	<div class="mt-8">
		<a
			class="text-[var(--color-plum)] underline-offset-2 hover:underline"
			href={localizePath(lang, '/menu')}
		>
			← {d.pages.menuItem.back}
		</a>
	</div>
</div>
