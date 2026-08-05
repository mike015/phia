/**
 * Gedeelde cookie-/consent-status (media & social). Reactief via een module-brede
 * rune, zodat de banner én de video-componenten meebewegen met de keuze.
 *
 * - 'accepted' → media-cookies toegestaan: YouTube-video's worden ingesloten.
 * - 'declined' → alleen noodzakelijk: video's tonen als link.
 * - null       → nog geen keuze gemaakt (banner tonen).
 */
import { browser } from '$app/environment';

const KEY = 'phia-consent';

let choice = $state<string | null>(null);

if (browser) {
	try {
		choice = localStorage.getItem(KEY);
	} catch {
		choice = null;
	}
}

function persist(value: string) {
	choice = value;
	if (browser) {
		try {
			localStorage.setItem(KEY, value);
		} catch {
			// localStorage geblokkeerd: keuze geldt dan alleen deze sessie.
		}
	}
}

/** Zijn media-cookies (YouTube-embeds) geaccepteerd? */
export function mediaAllowed(): boolean {
	return choice === 'accepted';
}

/** Is er al een keuze gemaakt (accepteren of weigeren)? */
export function consentDecided(): boolean {
	return choice === 'accepted' || choice === 'declined';
}

export function acceptMedia(): void {
	persist('accepted');
}

export function declineMedia(): void {
	persist('declined');
}
