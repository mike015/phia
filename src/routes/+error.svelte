<script lang="ts">
	import { page } from '$app/state';
	import { SITE } from '$lib/config';
	import { localizePath, type Lang } from '$lib/i18n';

	const lang = $derived<Lang>(page.url.pathname.startsWith('/en') ? 'en' : 'nl');
	const is404 = $derived(page.status === 404);

	// Tweetalige teksten bewust inline in dit component (niet in i18n.ts).
	const copy = $derived(
		lang === 'nl'
			? {
					heading: is404 ? 'Pagina niet gevonden' : 'Er ging iets mis',
					message: is404
						? 'Deze pagina bestaat niet (meer). Misschien vind je wat je zoekt via het menu.'
						: 'Er is een fout opgetreden. Probeer het later opnieuw of neem telefonisch contact op.',
					home: 'Naar de homepage',
					menu: 'Bekijk het menu',
					callLabel: 'Bel ons'
				}
			: {
					heading: is404 ? 'Page not found' : 'Something went wrong',
					message: is404
						? 'This page doesn’t exist. You may find what you’re looking for via the menu.'
						: 'An error occurred. Please try again later or give us a call.',
					home: 'Back to home',
					menu: 'View the menu',
					callLabel: 'Call us'
				}
	);
</script>

<svelte:head>
	<title>{page.status} · Phia's Smulparadijs</title>
</svelte:head>

<div class="flag-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>

<main
	class="grid min-h-[70dvh] place-items-center px-4 py-16"
	style="background: radial-gradient(circle at 78% 38%, var(--color-lilac-surface) 0%, var(--color-cream) 62%);"
>
	<section
		class="mx-auto w-full max-w-xl rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-white p-8 text-center sm:p-10"
		style="box-shadow: var(--shadow-soft);"
	>
		<p
			class="font-display text-6xl font-medium leading-none text-[var(--color-cta)] sm:text-7xl"
			aria-hidden="true"
		>
			{page.status}
		</p>

		<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">{copy.heading}</h1>

		<p class="mt-4 text-lg text-[var(--color-muted)]">{copy.message}</p>

		{#if !is404 && page.error?.message}
			<p class="mt-3 text-sm text-[var(--color-muted)]">
				<code class="rounded bg-[var(--color-lilac-surface)] px-2 py-1 text-[var(--color-ink)]"
					>{page.error.message}</code
				>
			</p>
		{/if}

		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a class="btn-primary" href={localizePath(lang, '/')}>{copy.home}</a>
			<a class="btn-outline" href={localizePath(lang, '/menu')}>{copy.menu}</a>
		</div>

		<p class="mt-6 text-[0.95rem] text-[var(--color-muted)]">
			{copy.callLabel}:
			<a
				class="font-bold text-[var(--color-cta)] underline-offset-4 hover:underline"
				href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a
			>
		</p>

		<p class="mt-8 font-display text-lg text-[var(--color-lilac-text)]">{SITE.slogan}</p>
	</section>
</main>
