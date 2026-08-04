<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd, menuJsonLd } from '$lib/seo/jsonld';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';
	import {
		MENU,
		MENU_NOTES,
		ALLERGENS,
		MAALTIJD_EXAMPLES,
		MENU_PDF,
		menuItemsFlat,
		type MenuCategory,
		type MenuItem
	} from '$lib/menu';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);
	const isNl = $derived(lang === 'nl');

	// Slug per gerecht via object-identiteit, dus botsende namen blijven uniek.
	const slugByItem = new Map<MenuItem, string>(menuItemsFlat().map((e) => [e.item, e.slug]));
	const itemHref = (item: MenuItem) => localizePath(lang, `/menu/${slugByItem.get(item)}`);

	const badgeLabel = (b: MenuCategory['badge']) =>
		b === 'halal'
			? d.pages.menu.badges.halal
			: b === 'niet-halal'
				? d.pages.menu.badges.nietHalal
				: d.pages.menu.badges.vega;

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.menu.title, url: SITE.url + localizePath(lang, '/menu') }
	]);

	// Menu structured data (SEO)
	const menuSections = $derived(
		MENU.map((c) => ({
			name: isNl ? c.nl : c.en,
			items: c.items.map((i) => ({
				name: isNl ? i.nl : i.en,
				price: i.prices[0]?.value.replace(/[^\d,]/g, '').replace(',', '.')
			}))
		}))
	);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />
<JsonLd data={menuJsonLd(lang, menuSections)} />

<PageHeader
	{lang}
	title={d.pages.menu.title}
	lead={d.pages.menu.lead}
	crumb={d.pages.menu.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<!-- Downloadbare PDF-menukaart -->
	<div
		class="card-lift flex flex-col items-start justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-[var(--color-lilac-surface)] p-5 sm:flex-row sm:items-center"
	>
		<div>
			<p class="font-display text-lg text-[var(--color-ink)]">
				{isNl ? MENU_PDF.edition_nl : MENU_PDF.edition_en}
			</p>
			<p class="text-sm text-[var(--color-muted)]">{d.pages.menu.downloadHint}</p>
		</div>
		<a
			class="btn-primary shrink-0"
			href={MENU_PDF.href}
			download
			type="application/pdf"
			data-sveltekit-reload
		>
			⬇ {d.pages.menu.downloadPdf}
		</a>
	</div>

	<p class="mt-6 text-sm text-[var(--color-muted)]">{d.pages.menu.note}</p>

	<!-- Categorieën -->
	<div class="mt-8 space-y-12">
		{#each MENU as cat (cat.id)}
			<section aria-labelledby={`cat-${cat.id}`}>
				<div
					class="flex flex-wrap items-center gap-3 border-b-2 border-[var(--color-accent)]/40 pb-2"
				>
					<h2 id={`cat-${cat.id}`} class="text-2xl text-[var(--color-ink)]">
						{isNl ? cat.nl : cat.en}
					</h2>
					{#if cat.badge}
						<span
							class="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide"
							style={cat.badge === 'niet-halal'
								? 'background:#EFDFF1;color:#7A4E82'
								: 'background:#DCEFE0;color:#0E7A33'}
						>
							{badgeLabel(cat.badge)}
						</span>
					{/if}
				</div>

				{#if cat.note_nl}
					<p class="mt-3 text-sm text-[var(--color-muted)]">{isNl ? cat.note_nl : cat.note_en}</p>
				{/if}

				<ul class="mt-3 divide-y divide-[var(--color-lilac-border)]">
					{#each cat.items as item (item.nl)}
						<li
							class="-mx-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg px-2 py-3 transition-colors hover:bg-[var(--color-lilac-surface)]"
						>
							<span class="min-w-0">
								<a
									class="text-[var(--color-ink)] underline-offset-2 hover:text-[var(--color-plum)] hover:underline"
									href={itemHref(item)}
								>
									{isNl ? item.nl : item.en}
								</a>
								{#if item.note_nl}
									<span class="block text-sm text-[var(--color-muted)]"
										>{isNl ? item.note_nl : item.note_en}</span
									>
								{/if}
							</span>
							<span
								class="flex shrink-0 flex-wrap justify-end gap-x-3 font-bold text-[var(--color-cta)]"
							>
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
							</span>
						</li>
					{/each}
				</ul>

				{#if cat.id === 'soep-maaltijd'}
					<div class="mt-4 rounded-xl bg-[var(--color-lilac-surface)] p-4">
						<p class="text-xs font-bold uppercase tracking-widest text-[var(--color-lilac-text)]">
							{d.pages.menu.examplesHeading}
						</p>
						<ul class="mt-2 flex flex-wrap gap-2">
							{#each MAALTIJD_EXAMPLES as ex (ex)}
								<li
									class="rounded-full border border-[var(--color-accent)]/40 bg-white px-3 py-1 text-sm text-[var(--color-ink)]"
								>
									{ex}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</section>
		{/each}
	</div>

	<!-- Goed om te weten -->
	<section class="mt-14" aria-labelledby="menu-notes">
		<h2 id="menu-notes" class="text-xl text-[var(--color-ink)]">{d.pages.menu.notesHeading}</h2>
		<ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
			{#each isNl ? MENU_NOTES.nl : MENU_NOTES.en as note (note)}
				<li>{note}</li>
			{/each}
		</ul>
	</section>

	<!-- Allergenen -->
	<section class="mt-10" aria-labelledby="menu-allergens">
		<h2 id="menu-allergens" class="text-xl text-[var(--color-ink)]">
			{d.pages.menu.allergensHeading}
		</h2>
		<p class="mt-3 text-sm text-[var(--color-muted)]">{isNl ? ALLERGENS.nl : ALLERGENS.en}</p>
	</section>

	<div class="mt-10 flex flex-wrap gap-3">
		<a class="btn-primary" href={`tel:${SITE.phoneE164}`}>📞 {SITE.phone}</a>
		<a class="btn-outline" href={MENU_PDF.href} download data-sveltekit-reload>⬇ PDF</a>
	</div>
</div>
