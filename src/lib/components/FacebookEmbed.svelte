<script lang="ts">
	/**
	 * Facebook Page Plugin (§5.4), consent-gated — net als YouTubeEmbed.
	 *
	 * Met media-consent tonen we de Page Plugin via een directe iframe
	 * (facebook.com/plugins/page.php) — geen Facebook-SDK/JS nodig, dus lichter en
	 * veiliger. Zonder consent tonen we alleen een nette link naar de pagina plus
	 * een knop om media-cookies te accepteren. De iframe zet Facebook-cookies, dus
	 * die laadt bewust pas na toestemming.
	 */
	import { mediaAllowed, acceptMedia } from '$lib/consent.svelte';
	import { t, type Lang } from '$lib/i18n';
	import { SITE } from '$lib/config';

	let { lang, class: cls = '' }: { lang: Lang; class?: string } = $props();
	const d = $derived(t(lang));

	const src = $derived(
		`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(SITE.social.facebook)}` +
			'&tabs=timeline&width=500&height=560&small_header=false' +
			'&adapt_container_width=true&hide_cover=false&show_facepile=true'
	);
</script>

{#if mediaAllowed()}
	<div class={`overflow-hidden ${cls}`}>
		<iframe
			title={`Facebook · ${SITE.name}`}
			{src}
			class="h-[560px] w-full max-w-[500px]"
			style="border: none; overflow: hidden;"
			scrolling="no"
			loading="lazy"
			referrerpolicy="strict-origin-when-cross-origin"
			allow="encrypted-media; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
{:else}
	<div
		class={`rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-white p-6 text-center ${cls}`}
		style="box-shadow: var(--shadow-soft);"
	>
		<p class="font-display text-lg text-[var(--color-plum)]">{d.footer.follow}</p>
		<a
			class="btn-outline mt-4 inline-flex"
			href={SITE.social.facebook}
			target="_blank"
			rel="noopener"
		>
			Facebook
		</a>
		<div class="mt-3">
			<button
				type="button"
				class="text-xs font-semibold text-[var(--color-lilac-text)] underline underline-offset-2"
				onclick={acceptMedia}
			>
				{d.consent.showHere}
			</button>
		</div>
	</div>
{/if}
