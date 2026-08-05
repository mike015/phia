<script lang="ts">
	/**
	 * Google Analytics (gtag.js), consent-gated. Blijft volledig dormant tot:
	 *  1) er een GA-meet-ID is ingesteld (data/site.json → analytics.ga, via CMS), en
	 *  2) de bezoeker analytics-cookies heeft geaccepteerd (consent.svelte).
	 *
	 * De initialisatie gebeurt via gebundelde JS (geen inline <script>), zodat de
	 * strikte CSP (hash-mode, geen 'unsafe-inline') intact blijft. Alleen het
	 * externe gtag.js-script wordt toegevoegd; googletagmanager.com staat daarvoor
	 * in de script-src/connect-src van de CSP.
	 */
	import { browser } from '$app/environment';
	import { analyticsAllowed } from '$lib/consent.svelte';
	import { SITE } from '$lib/config';

	// gtag verwacht een globale dataLayer + gtag()-functie op window.
	interface GtagWindow extends Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}

	let loaded = false;

	$effect(() => {
		if (!browser) return;
		const id = SITE.analytics.ga;
		// Alleen laden bij een geldig ID én toestemming; en maar één keer.
		if (!id || !analyticsAllowed() || loaded) return;
		loaded = true;

		const w = window as GtagWindow;
		w.dataLayer = w.dataLayer || [];
		const gtag = (...args: unknown[]) => {
			w.dataLayer!.push(args);
		};
		w.gtag = gtag;
		gtag('js', new Date());
		// IP-anonimisering aan; geen ad-personalisatie (privacyvriendelijk).
		gtag('config', id, { anonymize_ip: true });

		const s = document.createElement('script');
		s.async = true;
		s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
		document.head.appendChild(s);
	});
</script>
