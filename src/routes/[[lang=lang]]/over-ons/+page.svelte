<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { breadcrumbJsonLd } from '$lib/seo/jsonld';
	import { SITE } from '$lib/config';
	import { t, localizePath } from '$lib/i18n';
	import { food } from '$lib/assets/images';
	import haccpImg from '$lib/assets/haccp-allergenen-kennis.jpg?enhanced';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);

	// De body bevat meerdere alinea's, gescheiden door lege regels.
	const paragraphs = $derived(d.pages.about.body.split(/\n{2,}/).filter((p) => p.trim()));

	const crumbs = $derived([
		{ name: d.nav.home, url: SITE.url + localizePath(lang, '/') },
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

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<!-- Verhaal -->
	<div class="space-y-5 text-lg leading-relaxed text-[var(--color-ink)]/90">
		{#each paragraphs as p (p)}
			<p>{p}</p>
		{/each}
	</div>

	<p class="mt-8 font-display text-2xl text-[var(--color-cta)]">{SITE.slogan}</p>

	<!-- Sectie 1: passie/verhaal, met uitgelichte video (link, geen embed) -->
	<section
		class="mt-12 grid items-center gap-8 border-t border-[var(--color-lilac-border)] pt-10 sm:grid-cols-2"
	>
		<div>
			<h2 class="text-2xl text-[var(--color-ink)]">{d.pages.about.section1Heading}</h2>
			<p class="mt-3 text-lg leading-relaxed text-[var(--color-ink)]/90">
				{d.pages.about.section1Text}
			</p>
		</div>
		<a
			href={SITE.social.youtubeVideo}
			target="_blank"
			rel="noopener"
			aria-label={d.home.watchYoutube}
			class="group media-zoom relative block overflow-hidden rounded-[var(--radius-video)] bg-[var(--color-plum)] p-2"
			style="box-shadow: var(--shadow-lift);"
		>
			<enhanced:img
				src={food.jarpesi}
				alt=""
				class="aspect-video w-full rounded-2xl object-cover"
				sizes="(min-width: 640px) 360px, 90vw"
			/>
			<span class="absolute inset-2 rounded-2xl bg-black/25"></span>
			<span
				class="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cta)] text-2xl text-white shadow-[0_0_0_10px_rgba(223,14,25,0.22)] transition duration-300 group-hover:scale-110"
				aria-hidden="true">▶</span
			>
			<span
				class="absolute bottom-3 right-3 rounded-lg border border-[var(--color-accent)]/60 bg-[var(--color-plum)]/85 px-3 py-1.5 text-xs font-bold text-white"
			>
				▶ {d.home.watchYoutube}
			</span>
		</a>
	</section>

	<!-- Sectie 2: Kennis en ervaring, met HACCP/allergenen-certificering -->
	<section
		class="mt-10 grid items-center gap-8 border-t border-[var(--color-lilac-border)] pt-10 sm:grid-cols-2"
	>
		<div>
			<h2 class="text-2xl text-[var(--color-ink)]">{d.pages.about.section2Heading}</h2>
			<p class="mt-3 text-lg leading-relaxed text-[var(--color-ink)]/90">
				{d.pages.about.section2Text}
			</p>
		</div>
		<div
			class="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-lilac-border)]"
			style="box-shadow: var(--shadow-soft);"
		>
			<enhanced:img
				src={haccpImg}
				alt="HACCP- en allergenenkennis-gecertificeerd bij Phia's Smulparadijs"
				class="w-full object-cover"
				sizes="(min-width: 640px) 360px, 90vw"
			/>
		</div>
	</section>

	<a class="btn-primary mt-12 inline-flex" href={localizePath(lang, '/contact')}>{d.nav.contact}</a>
</div>
