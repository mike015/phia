<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import OpenStatus from '$lib/components/OpenStatus.svelte';
	import AvailabilityBadge from '$lib/components/AvailabilityBadge.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { t, localizePath } from '$lib/i18n';
	import { SITE } from '$lib/config';
	import { getReviews, getRatings } from '$lib/reviews';
	import { findMenuItem } from '$lib/menu';
	import { food, menuHighlights, instaPlaceholders } from '$lib/assets/images';

	let { data } = $props();
	const d = $derived(t(data.lang));
	const lang = $derived(data.lang);

	// Echte reviews komen via de dagelijkse GitHub Action (§5.3); toon er max 3.
	const reviews = getReviews(3);
	const ratings = getRatings();
</script>

<Seo seo={data.seo} />

<!-- ============ Korte intro (compacte band boven de hero) ============ -->
<section class="border-b border-[var(--color-lilac-border)] bg-[var(--color-cream)]">
	<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10" use:reveal>
		<p class="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-lilac-text)]">
			{d.home.aboutEyebrow}
		</p>
		<h2 class="mt-2 text-2xl text-[var(--color-ink)] sm:text-3xl">{d.home.aboutTitle}</h2>
		<p class="mt-3 max-w-2xl text-[var(--color-muted)]">{d.home.aboutText}</p>
	</div>
</section>

<!-- ============ HERO: split — tekst + video van vandaag ============ -->
<section
	class="relative overflow-hidden"
	style="background: radial-gradient(circle at 78% 38%, var(--color-lilac-surface) 0%, var(--color-cream) 62%);"
>
	<div
		class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:py-20"
	>
		<div use:reveal>
			<span
				class="inline-flex items-center gap-2 rounded-full bg-[var(--color-plum)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-yellow)]"
			>
				<span aria-hidden="true">▶</span>
				{d.home.kicker}
			</span>

			<h1 class="mt-5 text-4xl text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
				{d.home.h1Fallback}
			</h1>

			<p class="mt-4 max-w-xl text-lg text-[var(--color-muted)]">{d.home.sub}</p>

			<div class="mt-7 flex flex-wrap gap-3">
				<a class="btn-primary" href={localizePath(lang, '/menu')}>{d.home.ctaMenu}</a>
				<a class="btn-outline" href={`tel:${SITE.phoneE164}`}>📞 {SITE.phone}</a>
			</div>

			<OpenStatus {lang} class="mt-6 text-[0.95rem]" />
		</div>

		<!-- Video-frame (donker plum kader) -->
		<div use:reveal={80} class="lg:justify-self-end">
			<div
				class="floaty relative mx-auto w-full max-w-[640px] bg-[var(--color-plum)] p-3"
				style="border-radius: var(--radius-video); box-shadow: var(--shadow-lift);"
			>
				<a
					href={SITE.social.youtube}
					target="_blank"
					rel="noopener"
					class="group media-zoom relative block rounded-2xl"
					aria-label={d.home.playLabel}
				>
					<enhanced:img
						src={food.heriHeri}
						alt=""
						class="aspect-[3/2] w-full object-cover"
						sizes="(min-width: 1024px) 620px, 100vw"
						fetchpriority="high"
					/>
					<span class="absolute inset-0 bg-black/15"></span>

					<span
						class="absolute left-4 top-4 rounded-full bg-[var(--color-yellow)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] shadow"
					>
						{d.home.todayBadge}
					</span>

					<span
						class="play-pulse absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cta)] text-3xl text-white shadow-[0_0_0_12px_rgba(223,14,25,0.22)] transition duration-300 group-hover:scale-110"
						aria-hidden="true"
					>
						▶
					</span>

					<span
						class="absolute bottom-4 right-4 rounded-xl border border-[var(--color-accent)]/60 bg-[var(--color-plum)]/85 px-4 py-2.5 text-sm font-bold text-white"
					>
						▶ {d.home.watchYoutube}
					</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ============ Aangepaste-openingstijden-melding (role=status) ============ -->
<div class="mx-auto max-w-6xl px-4 sm:px-6">
	<p
		role="status"
		class="rounded-2xl border border-[#C9A9CD] bg-[#EFDFF1] px-6 py-4 text-[0.95rem] text-[#5A3A60]"
	>
		★ <b class="text-[var(--color-cta)]">{d.home.noticeLabel}:</b>
		{d.home.noticeExample}
	</p>
</div>

<!-- ============ Menu-uitlichting ============ -->
<section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
	<div class="text-center" use:reveal>
		<h2 class="text-3xl text-[var(--color-ink)] sm:text-4xl">{d.home.menuHeading}</h2>
		<p class="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
			{d.home.menuSub}
		</p>
	</div>

	<ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each menuHighlights as item, i (item.nl)}
			<li
				use:reveal={i * 60}
				class="card-lift media-zoom overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-white"
				style="box-shadow: var(--shadow-soft);"
			>
				<a href={localizePath(lang, `/menu/${item.slug}`)} class="block">
					<enhanced:img
						src={item.img}
						alt={lang === 'nl' ? item.nl : item.en}
						class="aspect-[4/3] w-full object-cover"
						sizes="(min-width: 1024px) 250px, (min-width: 640px) 45vw, 90vw"
					/>
					<div class="p-4">
						<p class="font-display text-lg text-[var(--color-ink)]">
							{lang === 'nl' ? item.nl : item.en}
						</p>
						<p class="mt-1 font-bold text-[var(--color-cta)]">{item.price}</p>
						{#if (findMenuItem(item.slug)?.item.availableDays.length ?? 0) > 0}
							<div class="mt-2">
								<AvailabilityBadge
									{lang}
									days={findMenuItem(item.slug)?.item.availableDays ?? []}
								/>
							</div>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<div class="mt-10 text-center">
		<a class="btn-primary" href={localizePath(lang, '/menu')}>{d.home.menuMore}</a>
	</div>
</section>

<!-- ============ Sfeer-band met review-quote ============ -->
<section class="relative">
	<enhanced:img
		src={food.jarpesi}
		alt=""
		class="h-[320px] w-full object-cover sm:h-[380px]"
		sizes="100vw"
	/>
	<div class="absolute inset-0 bg-[#14081680]"></div>
	<div class="absolute inset-0 grid place-items-center px-4">
		<figure
			class="mx-auto max-w-2xl rounded-[22px] bg-[var(--color-cream)]/96 p-8 text-center sm:p-10"
			style="box-shadow: var(--shadow-lift);"
			use:reveal
		>
			<blockquote class="font-display text-xl leading-snug text-[var(--color-ink)] sm:text-2xl">
				{d.home.bandQuote}
			</blockquote>
			<figcaption class="mt-4 text-xs font-bold uppercase tracking-widest text-[var(--color-cta)]">
				★★★★★ · {d.home.bandSource}
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ Reviews ============ -->
<section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
	<div class="text-center" use:reveal>
		<h2 class="text-3xl text-[var(--color-ink)] sm:text-4xl">{d.home.reviewsHeading}</h2>
		<p class="mt-3 text-[var(--color-muted)]">
			<b class="text-[var(--color-cta)]">★ {ratings.google.rating}</b>
			{d.home.onGoogle} ·
			<b class="text-[var(--color-cta)]">★ {ratings.facebook.rating}</b>
			{d.home.onFacebook}
		</p>
	</div>

	<ul class="mt-10 grid gap-6 md:grid-cols-3">
		{#each reviews as r, i (i)}
			<li
				use:reveal={i * 60}
				class="card-lift rounded-2xl border border-[var(--color-lilac-border)] border-l-4 border-l-[var(--color-accent)] bg-white p-6 text-[var(--color-ink)]/90"
				style="box-shadow: var(--shadow-soft);"
			>
				<p class="leading-relaxed">“{r.quote}”</p>
				<p class="mt-3 text-xs font-bold uppercase tracking-wide text-[var(--color-ink)]">
					{r.who} · {r.src}
				</p>
			</li>
		{/each}
	</ul>
</section>

<!-- ============ Instagram-feed ============ -->
<section class="bg-[var(--color-lilac-surface)] py-16 text-center">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<p class="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-lilac-text)]">
			{d.home.instaLabel}
		</p>
		<h2 class="mt-3 text-2xl text-[var(--color-ink)] sm:text-3xl">{SITE.social.instagramHandle}</h2>

		<ul class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
			{#each instaPlaceholders as img, i (i)}
				<li>
					<a
						href={SITE.social.instagram}
						target="_blank"
						rel="noopener"
						aria-label={`${d.home.instaLabel} ${SITE.social.instagramHandle}`}
						class="card-lift media-zoom hover-veil block rounded-2xl border-4 border-white shadow-lg"
					>
						<enhanced:img
							src={img}
							alt=""
							class="h-28 w-28 object-cover sm:h-40 sm:w-40"
							sizes="160px"
						/>
					</a>
				</li>
			{/each}
		</ul>

		<a
			class="btn-primary mt-8 inline-flex"
			href={SITE.social.instagram}
			target="_blank"
			rel="noopener"
		>
			{d.home.instaFollow}
		</a>
	</div>
</section>
