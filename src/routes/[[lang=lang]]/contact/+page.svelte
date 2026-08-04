<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd } from '$lib/seo/jsonld';
	import OpenStatus from '$lib/components/OpenStatus.svelte';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.contact.title, url: SITE.url + localizePath(lang, '/contact') }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.contact.title}
	lead={d.pages.contact.lead}
	crumb={d.pages.contact.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
	<div class="space-y-8">
		<div>
			<h2 class="text-sm font-bold uppercase tracking-widest text-[var(--color-lilac-text)]">
				{d.pages.contact.addressLabel}
			</h2>
			<address class="mt-2 text-lg not-italic leading-relaxed text-[var(--color-ink)]">
				{SITE.address.street}<br />
				{SITE.address.postalCode}
				{SITE.address.city}
			</address>
			<a
				class="mt-2 inline-block text-[var(--color-cta)] underline-offset-2 hover:underline"
				href={SITE.maps.url}
				target="_blank"
				rel="noopener"
			>
				{d.pages.contact.route} →
			</a>
		</div>

		<div>
			<h2 class="text-sm font-bold uppercase tracking-widest text-[var(--color-lilac-text)]">
				{d.pages.contact.phoneLabel}
			</h2>
			<a
				class="mt-2 inline-flex text-2xl font-bold text-[var(--color-ink)]"
				href={`tel:${SITE.phoneE164}`}
			>
				{SITE.phone}
			</a>
			<div class="mt-4">
				<a class="btn-primary" href={`tel:${SITE.phoneE164}`}>📞 {d.nav.callCta}</a>
			</div>
		</div>

		<div>
			<h2 class="text-sm font-bold uppercase tracking-widest text-[var(--color-lilac-text)]">
				{d.pages.contact.hoursLabel}
			</h2>
			<OpenStatus {lang} class="mt-2" />
			<table class="mt-3 w-full max-w-sm text-left text-[var(--color-ink)]">
				<caption class="sr-only">{d.pages.contact.hoursLabel}</caption>
				<tbody>
					{#each SITE.openingHours as h (h.day)}
						<tr class="border-b border-[var(--color-lilac-border)]">
							<th scope="row" class="py-2 pr-4 font-normal">{d.days[h.day]}</th>
							<td class="py-2 text-right font-medium">
								{#if h.closed}
									<span class="text-[var(--color-cta)]">{d.closed}</span>
								{:else}
									{h.open} – {h.close}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<p class="mt-2 text-sm text-[var(--color-muted)]">* {d.status.from} {SITE.servingFrom}</p>
		</div>
	</div>

	<!-- Kaart: consent-vrije statische kaart-kaart; embedded iframe komt achter consent (§5.5) -->
	<div>
		<a
			href={SITE.maps.url}
			target="_blank"
			rel="noopener"
			class="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-[var(--color-lilac-surface)] p-8 text-center"
			style="box-shadow: var(--shadow-soft);"
			aria-label={d.pages.contact.mapTitle}
		>
			<span class="text-4xl" aria-hidden="true">📍</span>
			<span class="font-display text-xl text-[var(--color-ink)]">{SITE.name}</span>
			<span class="text-[var(--color-muted)]">{SITE.address.street}, {SITE.address.city}</span>
			<span class="mt-2 font-bold text-[var(--color-cta)]">{d.pages.contact.route} →</span>
		</a>
	</div>
</div>
