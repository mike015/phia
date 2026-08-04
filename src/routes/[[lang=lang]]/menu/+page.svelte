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

	// VOORBEELDINDELING — exacte structuur + prijzen worden bevestigd na scrape (§9).
	const categories = [
		{
			nl: 'Broodjes',
			en: 'Sandwiches',
			items: [
				{ nl: 'Broodje kip kerrie', en: 'Chicken curry sandwich', price: '€ 5,50' },
				{ nl: 'Broodje bakkeljauw', en: 'Saltfish sandwich', price: '€ 5,50' },
				{ nl: 'Broodje pom', en: 'Pom sandwich', price: '€ 5,00' }
			]
		},
		{
			nl: 'Roti',
			en: 'Roti',
			items: [
				{ nl: 'Roti kip', en: 'Roti chicken', price: '€ 9,50' },
				{ nl: 'Roti kipfilet speciaal', en: 'Roti chicken fillet special', price: '€ 12,00' }
			]
		},
		{
			nl: 'Nasi & Bami',
			en: 'Nasi & Bami',
			items: [
				{ nl: 'Nasi speciaal', en: 'Nasi special', price: '€ 10,50' },
				{ nl: 'Bami speciaal', en: 'Bami special', price: '€ 10,50' }
			]
		},
		{
			nl: 'Soepen',
			en: 'Soups',
			items: [
				{ nl: 'Saoto soep', en: 'Saoto soup', price: '€ 7,50' },
				{ nl: 'Pindasoep met tom-tom', en: 'Peanut soup with tom-tom', price: '€ 8,00' }
			]
		}
	];

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.menu.title, url: SITE.url + localizePath(lang, '/menu') }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.menu.title}
	lead={d.pages.menu.lead}
	crumb={d.pages.menu.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<p class="rounded-xl border border-[#C9A9CD] bg-[#EFDFF1] px-5 py-3 text-sm text-[#5A3A60]">
		ℹ️ {d.pages.menu.categoriesTodo}
	</p>

	<div class="mt-10 space-y-12">
		{#each categories as cat (cat.nl)}
			<section>
				<h2
					class="border-b-2 border-[var(--color-accent)]/40 pb-2 text-2xl text-[var(--color-ink)]"
				>
					{lang === 'nl' ? cat.nl : cat.en}
				</h2>
				<ul class="mt-4 divide-y divide-[var(--color-lilac-border)]">
					{#each cat.items as item (item.nl)}
						<li class="flex items-baseline justify-between gap-4 py-3">
							<span class="text-[var(--color-ink)]">{lang === 'nl' ? item.nl : item.en}</span>
							<span
								class="shrink-0 border-b border-dotted border-[var(--color-muted)]/40"
								aria-hidden="true"
								style="flex:1;transform:translateY(-3px)"
							></span>
							<span class="shrink-0 font-bold text-[var(--color-cta)]">{item.price}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>

	<p class="mt-12 text-sm text-[var(--color-muted)]">{d.pages.menu.note}</p>
	<a class="btn-primary mt-6 inline-flex" href={`tel:${SITE.phoneE164}`}>📞 {SITE.phone}</a>
</div>
