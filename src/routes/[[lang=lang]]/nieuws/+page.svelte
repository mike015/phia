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
	const news = $derived(data.news);

	const crumbs = $derived([
		{ name: d.nav.home, url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.news.title, url: SITE.url + localizePath(lang, '/nieuws') }
	]);

	/** Kies de titel in de actieve taal (NL is leidend). */
	function title(item: (typeof news)[number]): string {
		return lang === 'nl' ? item.title_nl : item.title_en;
	}

	/** Kies de body in de actieve taal (NL is leidend). */
	function body(item: (typeof news)[number]): string {
		return lang === 'nl' ? item.body_nl : item.body_en;
	}

	/** Datum netjes opmaken in de actieve taal; valt terug op de ruwe string. */
	function formatDate(date: string): string {
		if (!date) return '';
		const dt = new Date(date);
		if (Number.isNaN(dt.getTime())) return date;
		return new Intl.DateTimeFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(dt);
	}
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.news.title}
	lead={d.pages.news.lead}
	crumb={d.pages.news.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto max-w-5xl px-4 py-14 sm:px-6">
	{#if news.length === 0}
		<p class="text-lg text-[var(--color-muted)]">{d.pages.news.empty}</p>
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each news as item (item.slug)}
				<li
					class="card-lift flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-white"
					style="box-shadow: var(--shadow-soft);"
				>
					{#if item.image}
						<div class="media-zoom overflow-hidden">
							<img
								src={item.image}
								alt={title(item)}
								loading="lazy"
								class="aspect-[16/9] w-full object-cover"
							/>
						</div>
					{/if}
					<div class="flex flex-1 flex-col p-6">
						{#if item.date}
							<p class="text-sm font-semibold tracking-wide text-[var(--color-lilac-text)]">
								<time datetime={item.date}>{formatDate(item.date)}</time>
							</p>
						{/if}
						<h2 class="mt-2 text-2xl text-[var(--color-ink)]">{title(item)}</h2>
						<p class="mt-3 leading-relaxed text-[var(--color-muted)]">{body(item)}</p>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
