<script lang="ts">
	import { onMount } from 'svelte';
	import { t, type Lang } from '$lib/i18n';

	let { lang, days, class: cls = '' }: { lang: Lang; days: string[]; class?: string } = $props();
	const d = $derived(t(lang));

	// JS getDay(): 0=zo..6=za → onze dagcodes.
	const KEYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'] as const;

	// Korte weekdag-labels uit het dagen-woordenboek (bv. "Vrijdag" → "Vr").
	const short = (k: string) => ((d.days as Record<string, string>)[k] ?? k).slice(0, 2);
	const list = $derived(days.map(short).join(', '));

	// Pas op de client vaststellen of het vandaag verkrijgbaar is (zoals OpenStatus).
	let availableToday = $state<boolean | null>(null);
	onMount(() => {
		availableToday = days.includes(KEYS[new Date().getDay()]);
	});
</script>

{#if days.length}
	<span
		class={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}
		style={availableToday ? 'background:#DCEFE0;color:#0E7A33' : 'background:#EFDFF1;color:#7A4E82'}
		role="status"
	>
		<span
			class="inline-block h-2 w-2 rounded-full"
			style={`background:${availableToday ? 'var(--color-green-bright)' : 'var(--color-accent)'}`}
			aria-hidden="true"
		></span>
		{#if availableToday}
			{d.pages.menu.availToday}
		{:else}
			{d.pages.menu.availOnly}
			{list}
		{/if}
	</span>
{/if}
