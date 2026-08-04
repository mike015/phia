<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { t, localizePath, type Lang } from '$lib/i18n';
	import logo from '$lib/assets/logo-trans.png?enhanced';

	let { lang, path }: { lang: Lang; path: string } = $props();
	const d = $derived(t(lang));

	// Zachte elevatie van de sticky header zodra je scrollt (rAF-throttled).
	let scrolled = $state(false);
	onMount(() => {
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				scrolled = window.scrollY > 8;
				raf = 0;
			});
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const nav = $derived([
		{ href: localizePath(lang, '/menu'), label: d.nav.menu },
		{ href: localizePath(lang, '/over-ons'), label: d.nav.about },
		{ href: localizePath(lang, '/maaltijd-of-soep'), label: d.nav.dish },
		{ href: localizePath(lang, '/fotos'), label: d.nav.photos },
		{ href: localizePath(lang, '/contact'), label: d.nav.contact }
	]);

	// Taalwissel: naar hetzelfde logische pad in de andere taal.
	const otherLang: Lang = $derived(lang === 'nl' ? 'en' : 'nl');
	const switchHref = $derived(localizePath(otherLang, path));

	let open = $state(false);
	afterNavigate(() => (open = false));

	function isActive(href: string): boolean {
		const current = page.url.pathname.replace(/\/+$/, '') || '/';
		const target = href.replace(/\/+$/, '') || '/';
		return current === target;
	}
</script>

<div class="flag-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>

<header class="site-header border-b border-[var(--color-lilac-border)]" data-scrolled={scrolled}>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
		<a
			href={localizePath(lang, '/')}
			class="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]"
			aria-label="Phia's Smulparadijs — home"
		>
			<enhanced:img
				src={logo}
				alt="Phia's Smulparadijs"
				class="h-11 w-auto sm:h-14"
				fetchpriority="high"
			/>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-1 lg:flex" aria-label="Hoofdmenu">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class="nav-link rounded-lg px-3 py-2 text-sm font-bold tracking-wide text-[var(--color-ink)] transition-colors hover:text-[var(--color-cta)] aria-[current=page]:text-[var(--color-cta)]"
				>
					{item.label}
				</a>
			{/each}
			<a
				href={switchHref}
				hreflang={otherLang}
				class="ml-1 rounded-lg px-2 py-2 text-sm font-bold text-[var(--color-lilac-text)] underline-offset-4 hover:underline"
				aria-label={d.nav.langSwitch}
			>
				{otherLang.toUpperCase()}
			</a>
			<a class="btn-primary ml-2 text-sm" href="tel:+31707851813">
				📞 {d.nav.callCta}
			</a>
		</nav>

		<!-- Mobile toggle -->
		<button
			class="inline-flex items-center justify-center rounded-lg border-2 border-[var(--color-ink)] p-2 lg:hidden"
			aria-expanded={open}
			aria-controls="mobile-nav"
			onclick={() => (open = !open)}
		>
			<span class="sr-only">{open ? d.nav.closeMenu : d.nav.openMenu}</span>
			{#if open}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
					><path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
					><path
						d="M4 7h16M4 12h16M4 17h16"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{/if}
		</button>
	</div>

	<!-- Mobile nav -->
	{#if open}
		<nav
			id="mobile-nav"
			class="border-t border-[var(--color-lilac-border)] px-4 pb-4 lg:hidden"
			aria-label="Hoofdmenu"
		>
			<ul class="flex flex-col gap-1 pt-2">
				{#each nav as item (item.href)}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class="block rounded-lg px-3 py-3 text-base font-bold text-[var(--color-ink)] aria-[current=page]:bg-[var(--color-lilac-surface)] aria-[current=page]:text-[var(--color-cta)]"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<div class="mt-3 flex items-center gap-3">
				<a class="btn-primary flex-1 text-sm" href="tel:+31707851813">📞 {d.nav.callCta}</a>
				<a
					href={switchHref}
					hreflang={otherLang}
					class="rounded-lg border-2 border-[var(--color-ink)] px-4 py-3 text-sm font-bold"
					aria-label={d.nav.langSwitch}
				>
					{otherLang.toUpperCase()}
				</a>
			</div>
		</nav>
	{/if}
</header>
