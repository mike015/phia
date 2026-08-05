<script lang="ts">
	import { onMount } from 'svelte';
	import { t, type Lang } from '$lib/i18n';

	let { lang, days, class: cls = '' }: { lang: Lang; days: string[]; class?: string } = $props();
	const d = $derived(t(lang));

	// Vaste weekvolgorde voor de opsomming; KEYS matcht JS getDay() (0=zo..6=za).
	const ORDER = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
	const KEYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

	// Volledige dagnamen in kleine letters, bv. "woensdag".
	const names = $derived(
		ORDER.filter((k) => days.includes(k)).map((k) =>
			((d.days as Record<string, string>)[k] ?? k).toLowerCase()
		)
	);

	// "woensdag" · "woensdag en vrijdag" · "dinsdag, donderdag en zaterdag"
	const list = $derived(
		names.length <= 1
			? names.join('')
			: `${names.slice(0, -1).join(', ')} ${d.pages.menu.availAnd} ${names[names.length - 1]}`
	);

	// Groen als het gerecht vandaag verkrijgbaar is, anders oranje. Client-berekend
	// (net als de open/dicht-indicator); de dag-tekst staat er altijd bij, dus de
	// kleur is extra nadruk en niet de enige informatie.
	let today = $state<boolean | null>(null);
	onMount(() => {
		today = days.includes(KEYS[new Date().getDay()]);
	});

	// Toegankelijke kleurcombinaties (>= 4.5:1 op de eigen achtergrond).
	const green = 'background:#DCEFE0;color:#0E7A33;border-color:#159641';
	const orange = 'background:#FDEBD0;color:#9A3412;border-color:#EA580C';
</script>

{#if days.length}
	<span
		class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold ${cls}`}
		style={today ? green : orange}
	>
		<span
			class="inline-block h-2.5 w-2.5 rounded-full"
			style={`background:${today ? 'var(--color-green-bright)' : '#EA580C'}`}
			aria-hidden="true"
		></span>
		{d.pages.menu.availOnly}
		{list}
	</span>
{/if}
