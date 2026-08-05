<script lang="ts">
	/**
	 * Melding voor aangepaste openingstijden op de startpagina. Toont UITSLUITEND
	 * wanneer er vandaag een actieve uitzondering is in data/opening-hours.json
	 * (vakantie e.d.) — geen actieve uitzondering = niets tonen (geen placeholder).
	 *
	 * Client-side berekend (onMount), zodat de geprerenderde HTML nooit een
	 * vastzittende melding bevat. De tekst komt uit het CMS (label_nl/label_en).
	 */
	import { onMount } from 'svelte';
	import { SITE } from '$lib/config';
	import { t, type Lang } from '$lib/i18n';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));

	type Exception = {
		label_nl: string;
		label_en: string;
		date_start: string;
		date_end: string;
		closed: boolean;
		open: string;
		close: string;
	};
	const exceptions: readonly Exception[] =
		(SITE as unknown as { exceptions?: readonly Exception[] }).exceptions ?? [];

	function isoOf(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${day}`;
	}

	let active = $state<Exception | null>(null);
	onMount(() => {
		const iso = isoOf(new Date());
		active = exceptions.find((e) => iso >= e.date_start && iso <= e.date_end) ?? null;
	});

	const message = $derived(active ? (lang === 'nl' ? active.label_nl : active.label_en) : '');
</script>

{#if active && message}
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<p
			role="status"
			class="rounded-2xl border border-[#C9A9CD] bg-[#EFDFF1] px-6 py-4 text-[0.95rem] text-[#5A3A60]"
		>
			★ <b class="text-[var(--color-cta)]">{d.home.noticeLabel}:</b>
			{message}
		</p>
	</div>
{/if}
