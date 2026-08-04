<script lang="ts">
	import { onMount } from 'svelte';
	import { SITE } from '$lib/config';
	import { t, type Lang } from '$lib/i18n';

	let { lang, class: cls = '' }: { lang: Lang; class?: string } = $props();
	const d = $derived(t(lang));

	// JS-getDay(): 0=zo..6=za  ->  onze sleutels
	const KEYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'] as const;

	type State = { open: boolean; label: string } | null;
	let state = $state<State>(null);

	onMount(() => {
		const now = new Date();
		const key = KEYS[now.getDay()];
		const today = SITE.openingHours.find((h) => h.day === key);
		if (!today || today.closed) {
			state = { open: false, label: d.status.closedToday };
			return;
		}
		const [oh, om] = today.open.split(':').map(Number);
		const [ch, cm] = today.close.split(':').map(Number);
		const mins = now.getHours() * 60 + now.getMinutes();
		const isOpen = mins >= oh * 60 + om && mins < ch * 60 + cm;
		state = {
			open: isOpen,
			label: `${isOpen ? d.status.openToday : d.status.closedToday} · ${today.open}–${today.close}`
		};
	});
</script>

{#if state}
	<p
		class={`inline-flex items-center gap-2 font-bold ${state.open ? 'text-[var(--color-green)]' : 'text-[var(--color-cta)]'} ${cls}`}
		role="status"
	>
		<span
			class="inline-block h-2.5 w-2.5 rounded-full"
			style={`background:${state.open ? 'var(--color-green-bright)' : 'var(--color-cta)'}`}
			aria-hidden="true"
		></span>
		{state.label}
	</p>
{:else}
	<!-- Server/prerender fallback: geen kleur-only, toont reguliere tijd -->
	<p class={`inline-flex items-center gap-2 font-bold text-[var(--color-muted)] ${cls}`}>
		{d.status.from}
		{SITE.servingFrom}
	</p>
{/if}
