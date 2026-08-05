<script lang="ts">
	/**
	 * Vriendelijke, toegankelijke cookiebanner met granulaire keuzes. De bezoeker
	 * kan per categorie zelf aan/uit zetten (noodzakelijk is altijd aan) en heeft
	 * een grote primaire "Accepteer cookies"-knop.
	 *
	 * Toegankelijk: role="dialog" met aria-label, focus op de primaire knop bij
	 * tonen, Escape sluit (alleen-noodzakelijk als er nog geen keuze was), niet
	 * kleur-afhankelijk, en reduced-motion-veilig. Rendert uitsluitend client-side
	 * (onMount-gate) zodat de geprerenderde HTML geen vastzittende banner toont.
	 */
	import { onMount, tick } from 'svelte';
	import { t, type Lang } from '$lib/i18n';
	import {
		consentOpen,
		consentDecided,
		currentPrefs,
		acceptAll,
		onlyNecessary,
		saveConsent,
		declineMedia
	} from '$lib/consent.svelte';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));

	// Alleen client-side tonen (na mount) én zolang de banner "open" is.
	let mounted = $state(false);
	let acceptBtn = $state<HTMLButtonElement | null>(null);
	onMount(() => (mounted = true));

	const show = $derived(mounted && consentOpen());

	// Lokale toggle-status; volgt de opgeslagen voorkeuren wanneer de banner opent.
	let media = $state(false);
	let analytics = $state(false);
	let synced = $state(false);

	$effect(() => {
		if (show && !synced) {
			const p = currentPrefs();
			media = p.media;
			analytics = p.analytics;
			synced = true;
			tick().then(() => acceptBtn?.focus());
		}
		if (!show) synced = false;
	});

	function acceptEverything() {
		media = true;
		analytics = true;
		acceptAll();
	}

	function saveChoice() {
		saveConsent({ media, analytics });
	}

	function onKeydown(event: KeyboardEvent) {
		// Escape: sluit met alleen-noodzakelijk als er nog geen keuze was.
		if (event.key === 'Escape') {
			event.stopPropagation();
			if (consentDecided()) onlyNecessary();
			else declineMedia();
		}
	}
</script>

{#if show}
	<div
		class="consent-banner fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-4 sm:pb-4"
		role="dialog"
		aria-modal="false"
		aria-labelledby="consent-title"
		aria-describedby="consent-intro"
		tabindex="-1"
		onkeydown={onKeydown}
	>
		<div
			class="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-lilac-border)] bg-[var(--color-cream)]"
			style="box-shadow: var(--shadow-lift);"
		>
			<div class="flag-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
			<div class="p-5 sm:p-6">
				<p id="consent-title" class="font-display text-xl text-[var(--color-plum)]">
					{d.consent.title}
				</p>
				<p id="consent-intro" class="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
					{d.consent.intro}
				</p>

				<!-- Categorie-toggles -->
				<ul class="mt-4 space-y-2.5">
					<li
						class="flex items-start gap-3 rounded-xl border border-[var(--color-lilac-border)] bg-white/70 p-3"
					>
						<span
							class="mt-0.5 shrink-0 rounded-md bg-[var(--color-lilac-surface)] px-2 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-[var(--color-lilac-text)]"
						>
							{d.consent.alwaysOn}
						</span>
						<span class="min-w-0">
							<span class="block text-sm font-bold text-[var(--color-ink)]"
								>{d.consent.necessaryLabel}</span
							>
							<span class="block text-xs text-[var(--color-muted)]">{d.consent.necessaryDesc}</span>
						</span>
					</li>

					<li
						class="rounded-xl border border-[var(--color-lilac-border)] bg-white/70 p-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-plum)]"
					>
						<label class="flex cursor-pointer items-start gap-3">
							<input
								type="checkbox"
								class="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-plum)]"
								bind:checked={media}
							/>
							<span class="min-w-0">
								<span class="block text-sm font-bold text-[var(--color-ink)]"
									>{d.consent.mediaLabel}</span
								>
								<span class="block text-xs text-[var(--color-muted)]">{d.consent.mediaDesc}</span>
							</span>
						</label>
					</li>

					<li
						class="rounded-xl border border-[var(--color-lilac-border)] bg-white/70 p-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-plum)]"
					>
						<label class="flex cursor-pointer items-start gap-3">
							<input
								type="checkbox"
								class="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-plum)]"
								bind:checked={analytics}
							/>
							<span class="min-w-0">
								<span class="block text-sm font-bold text-[var(--color-ink)]"
									>{d.consent.analyticsLabel}</span
								>
								<span class="block text-xs text-[var(--color-muted)]">{d.consent.analyticsDesc}</span>
							</span>
						</label>
					</li>
				</ul>

				<!-- Acties: grote primaire "Accepteer cookies" + opslaan + alleen-noodzakelijk -->
				<div class="mt-5 flex flex-col gap-2.5 sm:flex-row-reverse sm:flex-wrap sm:items-center">
					<button
						bind:this={acceptBtn}
						type="button"
						class="btn-primary w-full py-3 text-base sm:w-auto"
						onclick={acceptEverything}
					>
						{d.consent.acceptAll}
					</button>
					<button type="button" class="btn-outline w-full sm:w-auto" onclick={saveChoice}>
						{d.consent.save}
					</button>
					<button
						type="button"
						class="w-full rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] underline underline-offset-2 hover:text-[var(--color-ink)] sm:mr-auto sm:w-auto"
						onclick={onlyNecessary}
					>
						{d.consent.decline}
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
