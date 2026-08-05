<script lang="ts">
	import { SITE } from '$lib/config';
	import { t, localizePath, type Lang } from '$lib/i18n';
	import { reopenConsent } from '$lib/consent.svelte';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));
</script>

<div class="flag-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>

<footer class="bg-[var(--color-plum)] text-[#B9A6BC]">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
		<div>
			<p class="font-display text-xl text-[var(--color-accent)]">{SITE.name}</p>
			<p class="mt-2 text-sm">{SITE.brandLine}</p>
			<!-- Wit i.p.v. flag-rood: rood op plum haalt WCAG AA niet; ❤ blijft rood via emoji. -->
			<p class="mt-4 font-display text-lg text-white">{SITE.slogan}</p>
		</div>

		<div class="text-sm">
			<h2 class="mb-2 font-bold tracking-wide text-white">{d.pages.contact.title}</h2>
			<address class="not-italic leading-relaxed">
				{SITE.address.street}<br />
				{SITE.address.postalCode}
				{SITE.address.city}<br />
				<a class="underline-offset-2 hover:underline" href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a
				>
			</address>
			<p class="mt-3">{d.status.from} {SITE.servingFrom}</p>
		</div>

		<div class="text-sm">
			<h2 class="mb-2 font-bold tracking-wide text-white">{d.footer.follow}</h2>
			<ul class="space-y-1">
				<li>
					<a
						class="underline-offset-2 hover:underline"
						href={SITE.social.facebook}
						rel="me noopener"
						target="_blank">Facebook</a
					>
				</li>
				<li>
					<a
						class="underline-offset-2 hover:underline"
						href={SITE.social.instagram}
						rel="me noopener"
						target="_blank">Instagram</a
					>
				</li>
				<li>
					<a
						class="underline-offset-2 hover:underline"
						href={SITE.social.youtube}
						rel="me noopener"
						target="_blank">YouTube</a
					>
				</li>
			</ul>
			<ul class="mt-4 space-y-1">
				<li>
					<a class="underline-offset-2 hover:underline" href={localizePath(lang, '/menu')}
						>{d.nav.menu}</a
					>
				</li>
				<li>
					<a class="underline-offset-2 hover:underline" href={localizePath(lang, '/nieuws')}
						>{d.nav.news}</a
					>
				</li>
				<li>
					<a class="underline-offset-2 hover:underline" href={localizePath(lang, '/contact')}
						>{d.nav.contact}</a
					>
				</li>
			</ul>
		</div>
	</div>

	<div
		class="flex flex-col items-center gap-2 border-t border-white/10 px-4 py-5 text-center text-xs tracking-wide sm:flex-row sm:justify-center sm:gap-3"
	>
		<span
			>© {SITE.name} · {SITE.address.city} · {d.footer.rights}{#if d.footer.built} ·
				{d.footer.built}{/if}</span
		>
		<button
			type="button"
			class="underline underline-offset-2 hover:text-white"
			onclick={reopenConsent}
		>
			{d.consent.manage}
		</button>
	</div>
</footer>
