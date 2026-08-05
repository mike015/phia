<script lang="ts">
	import { onMount } from 'svelte';
	import { SITE } from '$lib/config';
	import { t, type Lang } from '$lib/i18n';

	let { lang, class: cls = '' }: { lang: Lang; class?: string } = $props();
	const d = $derived(t(lang));

	// JS-getDay(): 0=zo..6=za  ->  onze sleutels
	const KEYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'] as const;
	type DayKey = (typeof KEYS)[number];

	type Exception = {
		label_nl: string;
		label_en: string;
		date_start: string;
		date_end: string;
		closed: boolean;
		open: string;
		close: string;
	};
	// SITE.exceptions komt uit data/opening-hours.json (kan leeg/afwezig zijn).
	const exceptions: readonly Exception[] =
		(SITE as unknown as { exceptions?: readonly Exception[] }).exceptions ?? [];

	type Slot = { closed: boolean; open: string; close: string };

	function isoOf(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${day}`;
	}

	// Effectieve openingstijd voor een datum: actieve uitzondering gaat vóór de reguliere dag.
	function slotFor(date: Date): Slot {
		const iso = isoOf(date);
		const exc = exceptions.find((e) => iso >= e.date_start && iso <= e.date_end);
		if (exc) return { closed: exc.closed, open: exc.open, close: exc.close };
		const key = KEYS[date.getDay()];
		const reg = SITE.openingHours.find((h) => h.day === key);
		return reg
			? { closed: reg.closed, open: reg.open, close: reg.close }
			: { closed: true, open: '', close: '' };
	}

	function toMinutes(hhmm: string): number {
		const [h, m] = hhmm.split(':').map(Number);
		return h * 60 + m;
	}

	type State = { open: boolean; label: string } | null;
	let state = $state<State>(null);

	onMount(() => {
		const now = new Date();
		const mins = now.getHours() * 60 + now.getMinutes();
		const today = slotFor(now);

		const openNow =
			!today.closed &&
			!!today.open &&
			!!today.close &&
			mins >= toMinutes(today.open) &&
			mins < toMinutes(today.close);

		if (openNow) {
			state = { open: true, label: `${d.status.openToday} · ${today.open}–${today.close}` };
			return;
		}

		// Gesloten nu → bereken de eerstvolgende opening (tot 7 dagen vooruit).
		const next = nextOpening(now, mins);
		state = {
			open: false,
			label: next
				? `${d.status.closedNow} · ${d.status.reopen} ${next.whenDay} ${d.status.at} ${next.time}`
				: d.status.closedNow
		};
	});

	function nextOpening(now: Date, mins: number): { whenDay: string; time: string } | null {
		// Opent het vandaag nog later?
		const today = slotFor(now);
		if (!today.closed && today.open && mins < toMinutes(today.open)) {
			return { whenDay: d.status.today, time: today.open };
		}
		// Anders: scan de komende dagen.
		for (let i = 1; i <= 7; i++) {
			const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
			const slot = slotFor(dt);
			if (!slot.closed && slot.open) {
				const key: DayKey = KEYS[dt.getDay()];
				return { whenDay: d.days[key], time: slot.open };
			}
		}
		return null;
	}
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
	<!-- Server/prerender fallback: geen kleur-only, toont reguliere tijden -->
	<p class={`inline-flex items-center gap-2 font-bold text-[var(--color-muted)] ${cls}`}>
		{d.status.summary}
	</p>
{/if}
