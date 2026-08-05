<script lang="ts">
	import type { Snippet } from 'svelte';
	import { mediaAllowed, acceptMedia } from '$lib/consent.svelte';
	import { t, type Lang } from '$lib/i18n';

	let {
		url,
		title,
		lang,
		poster,
		activate = true,
		class: cls = ''
	}: {
		url: string;
		title: string;
		lang: Lang;
		/** Weergave zonder consent: de gestylede thumbnail met link naar YouTube. */
		poster: Snippet;
		/** Toon de "hier afspelen (accepteer cookies)"-knop onder de poster. */
		activate?: boolean;
		class?: string;
	} = $props();

	const d = $derived(t(lang));

	/** Video-ID uit een YouTube-URL (watch?v=, youtu.be/, /embed/). */
	function videoId(u: string): string {
		try {
			const parsed = new URL(u);
			if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1);
			if (parsed.searchParams.get('v')) return parsed.searchParams.get('v') as string;
			const m = parsed.pathname.match(/\/embed\/([^/?]+)/);
			if (m) return m[1];
		} catch {
			// val terug op leeg
		}
		return '';
	}

	const embedSrc = $derived(
		`https://www.youtube-nocookie.com/embed/${videoId(url)}?rel=0&modestbranding=1`
	);
</script>

{#if mediaAllowed() && videoId(url)}
	<div class={`aspect-video overflow-hidden ${cls}`}>
		<iframe
			class="h-full w-full"
			src={embedSrc}
			{title}
			loading="lazy"
			referrerpolicy="strict-origin-when-cross-origin"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
{:else}
	<div class={cls}>
		{@render poster()}
		{#if activate}
			<button
				type="button"
				class="mt-2 text-xs font-semibold text-[var(--color-lilac-text)] underline underline-offset-2"
				onclick={acceptMedia}
			>
				{d.consent.playHere}
			</button>
		{/if}
	</div>
{/if}
