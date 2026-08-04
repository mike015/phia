<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd } from '$lib/seo/jsonld';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';
	import { food, instaPlaceholders } from '$lib/assets/images';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);

	const crumbs = $derived([
		{ name: 'Home', url: SITE.url + localizePath(lang, '/') },
		{ name: d.pages.dish.title, url: SITE.url + localizePath(lang, '/maaltijd-of-soep') }
	]);
</script>

<Seo seo={data.seo} />
<JsonLd data={breadcrumbJsonLd(crumbs)} />

<PageHeader
	{lang}
	title={d.pages.dish.title}
	lead={d.pages.dish.lead}
	crumb={d.pages.dish.title}
	homeLabel={d.nav.home}
/>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<!-- Consent-placeholder voor YouTube-embed (§5.5): laadt pas na consent -->
	<div
		class="relative overflow-hidden bg-[var(--color-plum)] p-3"
		style="border-radius: var(--radius-video); box-shadow: var(--shadow-lift);"
	>
		<a
			href={SITE.social.youtube}
			target="_blank"
			rel="noopener"
			class="group relative block overflow-hidden rounded-2xl"
			aria-label={d.home.playLabel}
		>
			<enhanced:img
				src={food.warm}
				alt=""
				class="aspect-video w-full object-cover"
				sizes="(min-width: 1024px) 900px, 100vw"
			/>
			<span class="absolute inset-0 bg-black/20"></span>
			<span
				class="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cta)] text-3xl text-white shadow-[0_0_0_12px_rgba(223,14,25,0.22)] transition group-hover:scale-105"
				aria-hidden="true">▶</span
			>
		</a>
	</div>

	<p class="mt-8 text-lg leading-relaxed text-[var(--color-ink)]/90">{d.pages.dish.body}</p>

	<h2 class="mt-12 text-2xl text-[var(--color-ink)]">{d.pages.dish.archive}</h2>
	<ul class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
		{#each instaPlaceholders.slice(0, 6) as img, i (i)}
			<li class="overflow-hidden rounded-xl border border-[var(--color-lilac-border)]">
				<a
					href={SITE.social.youtube}
					target="_blank"
					rel="noopener"
					aria-label={`${d.pages.dish.archive} — YouTube`}
					class="block"
				>
					<enhanced:img src={img} alt="" class="aspect-video w-full object-cover" sizes="300px" />
				</a>
			</li>
		{/each}
	</ul>
</div>
