<script lang="ts">
	import { localizePath, type Lang } from '$lib/i18n';

	let {
		lang,
		title,
		lead,
		crumb,
		homeLabel = 'Home'
	}: { lang: Lang; title: string; lead?: string; crumb: string; homeLabel?: string } = $props();
</script>

<section class="bg-[var(--color-lilac-surface)]">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
		<nav aria-label="Kruimelpad" class="mb-4 text-sm text-[var(--color-lilac-text)]">
			<a class="hover:underline" href={localizePath(lang, '/')}>{homeLabel}</a>
			<span aria-hidden="true" class="mx-2">/</span>
			<span class="text-[var(--color-muted)]">{crumb}</span>
		</nav>
		<h1 class="text-4xl text-[var(--color-ink)] sm:text-5xl">{title}</h1>
		{#if lead}
			<p class="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">{lead}</p>
		{/if}
	</div>
</section>
