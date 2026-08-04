<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { t, localizePath, LOCALES, type Lang } from '$lib/i18n';
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
		{ href: localizePath(lang, '/nieuws'), label: d.nav.news },
		{ href: localizePath(lang, '/contact'), label: d.nav.contact }
	]);

	// Mobiel hoofdmenu + de twee onafhankelijke taal-dropdowns (desktop/mobiel).
	let open = $state(false);
	let langOpenDesktop = $state(false);
	let langOpenMobile = $state(false);

	function closeLangMenus() {
		langOpenDesktop = false;
		langOpenMobile = false;
	}

	function toggleLang(kind: 'desktop' | 'mobile') {
		if (kind === 'desktop') {
			langOpenDesktop = !langOpenDesktop;
			langOpenMobile = false;
		} else {
			langOpenMobile = !langOpenMobile;
			langOpenDesktop = false;
		}
	}

	afterNavigate(() => {
		open = false;
		closeLangMenus();
	});

	// Sluit de taal-dropdown bij klik buiten en Escape (toetsenbord-bedienbaar).
	onMount(() => {
		const onDocClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			if (!target || !target.closest('[data-lang-switcher]')) closeLangMenus();
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeLangMenus();
		};
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onDocClick);
			document.removeEventListener('keydown', onKey);
		};
	});

	function isActive(href: string): boolean {
		const current = page.url.pathname.replace(/\/+$/, '') || '/';
		const target = href.replace(/\/+$/, '') || '/';
		return current === target;
	}
</script>

<!-- Herbruikbare, schaalbare taalkiezer (werkt voor 2 of 10 talen). -->
{#snippet langSwitcher(isOpen: boolean, kind: 'desktop' | 'mobile')}
	<div class="relative" data-lang-switcher>
		<button
			type="button"
			class="nav-link inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold tracking-wide text-[var(--color-lilac-text)] transition-colors hover:text-[var(--color-cta)]"
			aria-haspopup="menu"
			aria-expanded={isOpen}
			aria-controls={`lang-menu-${kind}`}
			onclick={() => toggleLang(kind)}
		>
			<span aria-hidden="true">🌐</span>
			<span aria-hidden="true">{lang.toUpperCase()}</span>
			<span class="sr-only">{d.nav.langMenu}</span>
			<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden="true"
				class="transition-transform duration-200"
				style={isOpen ? 'transform: rotate(180deg)' : undefined}
			>
				<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>

		{#if isOpen}
			<ul
				id={`lang-menu-${kind}`}
				role="menu"
				aria-label={d.nav.langMenu}
				class="absolute right-0 z-30 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-[var(--color-lilac-border)] bg-white py-1"
				style="box-shadow: var(--shadow-lift);"
			>
				{#each LOCALES as loc (loc.code)}
					<li role="none">
						<a
							role="menuitem"
							href={localizePath(loc.code, path)}
							hreflang={loc.code}
							aria-current={loc.code === lang ? 'true' : undefined}
							class="flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-lilac-surface)] hover:text-[var(--color-cta)] aria-[current=true]:bg-[var(--color-lilac-surface)] aria-[current=true]:text-[var(--color-cta)]"
						>
							<span>{loc.label}</span>
							{#if loc.code === lang}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
									><path
										d="M5 13l4 4L19 7"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/snippet}

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
			<div class="ml-1">
				{@render langSwitcher(langOpenDesktop, 'desktop')}
			</div>
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
				{@render langSwitcher(langOpenMobile, 'mobile')}
			</div>
		</nav>
	{/if}
</header>
