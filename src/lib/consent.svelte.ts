/**
 * Gedeelde cookie-/consent-status. Reactief via een module-brede rune, zodat de
 * banner, de video-componenten én de analytics-loader meebewegen met de keuze.
 *
 * Categorieën:
 * - necessary → altijd aan (geen opslag nodig, functioneel).
 * - media     → YouTube-embeds insluiten (anders tonen we een link).
 * - analytics → Google Analytics laden (anders blijft die dormant).
 *
 * Opslag: één JSON-object in localStorage onder `phia-consent`:
 *   { media: boolean, analytics: boolean, decided: boolean }
 * `decided` bepaalt of de banner nog getoond moet worden.
 */
import { browser } from '$app/environment';

const KEY = 'phia-consent';

/** Voorkeuren die de bezoeker zelf kan aan-/uitzetten. */
export type ConsentPrefs = { media: boolean; analytics: boolean };

type StoredConsent = ConsentPrefs & { decided: boolean };

const DEFAULT: StoredConsent = { media: false, analytics: false, decided: false };

let state = $state<StoredConsent>({ ...DEFAULT });
// Heropenen via de footer: forceert de banner ook als er al een keuze is.
let forceOpen = $state(false);

function load(): StoredConsent {
	if (!browser) return { ...DEFAULT };
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return { ...DEFAULT };
		// Legacy-migratie: v1 sloeg de string 'accepted'/'declined' op.
		if (raw === 'accepted') return { media: true, analytics: false, decided: true };
		if (raw === 'declined') return { media: false, analytics: false, decided: true };
		const parsed = JSON.parse(raw);
		return {
			media: !!parsed.media,
			analytics: !!parsed.analytics,
			decided: !!parsed.decided
		};
	} catch {
		return { ...DEFAULT };
	}
}

if (browser) state = load();

function persist(next: StoredConsent) {
	state = next;
	if (browser) {
		try {
			localStorage.setItem(KEY, JSON.stringify(next));
		} catch {
			// localStorage geblokkeerd: keuze geldt dan alleen deze sessie.
		}
	}
}

/** Zijn media-cookies (YouTube-embeds) toegestaan? */
export function mediaAllowed(): boolean {
	return state.media;
}

/** Is Google Analytics toegestaan? */
export function analyticsAllowed(): boolean {
	return state.analytics;
}

/** Is er al een keuze gemaakt? */
export function consentDecided(): boolean {
	return state.decided;
}

/** Moet de banner nu zichtbaar zijn? (nog geen keuze, of heropend via footer) */
export function consentOpen(): boolean {
	return forceOpen || !state.decided;
}

/** Huidige voorkeuren, om de toggles in de banner te vullen. */
export function currentPrefs(): ConsentPrefs {
	return { media: state.media, analytics: state.analytics };
}

/** Alles accepteren (de grote primaire knop). */
export function acceptAll(): void {
	forceOpen = false;
	persist({ media: true, analytics: true, decided: true });
}

/** Alleen noodzakelijke cookies. */
export function onlyNecessary(): void {
	forceOpen = false;
	persist({ media: false, analytics: false, decided: true });
}

/** Zelfgekozen voorkeuren opslaan. */
export function saveConsent(prefs: ConsentPrefs): void {
	forceOpen = false;
	persist({ media: !!prefs.media, analytics: !!prefs.analytics, decided: true });
}

/** Alleen media aanzetten (gebruikt door de "video hier afspelen"-knop). */
export function acceptMedia(): void {
	persist({ ...state, media: true, decided: true });
}

/** Media weigeren (Escape in de banner, als er nog geen keuze was). */
export function declineMedia(): void {
	persist({ ...state, media: false, decided: true });
}

/** Heropen de banner vanuit de footer ("Cookievoorkeuren"). */
export function reopenConsent(): void {
	forceOpen = true;
}
