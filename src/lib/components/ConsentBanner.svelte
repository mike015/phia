<script lang="ts">
	/**
	 * Vriendelijke, functionele cookie-melding. We sluiten geen social media in,
	 * dus dit is géén tracking-toestemming maar een korte, on-brand notitie met een
	 * uitbreidbare consent-opslag voor de toekomst (localStorage `phia-consent`).
	 *
	 * Toegankelijk: role="dialog" met aria-label, focus op de accepteer-knop bij
	 * tonen, Escape sluit, niet kleur-afhankelijk, en reduced-motion-veilig
	 * (slide-up alleen als de gebruiker beweging toestaat). Rendert uitsluitend
	 * client-side (onMount-gate) zodat de geprerenderde HTML geen vastzittende
	 * banner toont.
	 */
	import { onMount, tick } from 'svelte';
	import { t, type Lang } from '$lib/i18n';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));

	const STORAGE_KEY = 'phia-consent';

	let show = $state(false);
	let acceptBtn = $state<HTMLButtonElement | null>(null);

	onMount(() => {
		// Alleen tonen als er nog geen keuze is opgeslagen.
		try {
			if (localStorage.getItem(STORAGE_KEY) !== 'accepted') {
				show = true;
			}
		} catch {
			// localStorage geblokkeerd (privacy-modus): toon de melding gewoon.
			show = true;
		}
	});

	$effect(() => {
		// Verplaats focus naar de primaire knop zodra de banner verschijnt.
		if (show && acceptBtn) {
			tick().then(() => acceptBtn?.focus());
		}
	});

	function accept() {
		try {
			localStorage.setItem(STORAGE_KEY, 'accepted');
		} catch {
			// Negeer: dan verschijnt de melding een volgende keer opnieuw.
		}
		show = false;
	}

	/** Sluiten zonder op te slaan: de melding komt de volgende sessie terug. */
	function dismiss() {
		show = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.stopPropagation();
			dismiss();
		}
	}
</script>

{#if show}
	<div
		class="consent-banner fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-4 sm:pb-4"
		role="dialog"
		aria-modal="false"
		aria-label={d.consent.title}
		tabindex="-1"
		onkeydown={onKeydown}
	>
		<div
			class="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-[var(--color-cream)]"
			style="box-shadow: var(--shadow-lift);"
		>
			<div class="flag-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
			<div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
				<div class="min-w-0 flex-1">
					<p class="font-display text-xl text-[var(--color-plum)]">{d.consent.title}</p>
					<p class="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{d.consent.text}</p>
				</div>
				<div class="flex shrink-0 items-center gap-2">
					<button bind:this={acceptBtn} type="button" class="btn-primary" onclick={accept}>
						{d.consent.accept}
					</button>
					<button
						type="button"
						class="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-lilac-surface)] hover:text-[var(--color-ink)]"
						aria-label={d.consent.close}
						onclick={dismiss}
					>
						<span aria-hidden="true" class="text-xl leading-none">×</span>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.consent-banner > div {
		animation: consent-slide-up 0.32s ease both;
	}

	@keyframes consent-slide-up {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.consent-banner > div {
			animation: none;
		}
	}
</style>
