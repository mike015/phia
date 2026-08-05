<script lang="ts">
	/**
	 * Facebook-presentatie (§5.4). Facebook weigert zijn Page Plugin in veel
	 * gevallen in een iframe ("geweigerd te verbinden"), en de voorkeur is sowieso
	 * linken i.p.v. embedden. Daarom tonen we een nette, klikbare kaart die naar de
	 * Facebook-pagina linkt — geen iframe, geen Facebook-cookies, niets dat kan
	 * weigeren.
	 */
	import { SITE } from '$lib/config';

	let { class: cls = '' }: { class?: string } = $props();

	// Toon een leesbare handle i.p.v. de volledige URL.
	const handle = SITE.social.facebook.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
</script>

<a
	href={SITE.social.facebook}
	target="_blank"
	rel="noopener"
	class={`card-lift group flex w-full max-w-md items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-white px-6 py-5 ${cls}`}
	style="box-shadow: var(--shadow-soft);"
>
	<span
		class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1877F2] font-display text-2xl font-bold text-white"
		aria-hidden="true">f</span
	>
	<span class="min-w-0 text-left">
		<span class="block font-display text-lg text-[var(--color-ink)]">{SITE.name}</span>
		<span class="block truncate text-sm text-[var(--color-muted)]">{handle}</span>
	</span>
</a>
