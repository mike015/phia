/**
 * Reviews-laag (§5.3).
 *
 * Leest de twee databestanden die door de dagelijkse GitHub Action
 * (scripts/fetch-reviews.mjs) worden bijgewerkt en levert:
 * - getReviews(limit?) → samengevoegde reviews, nieuwste eerst, klaar voor de UI
 *   (shape {quote, who, src}) zodat de bestaande markup ongewijzigd blijft.
 * - getRatings() → {google, facebook} met {rating, count}; valt terug op
 *   SITE.reviews wanneer een bron nog geen echte telling heeft (count 0).
 *
 * De bestanden worden statisch geïmporteerd; bij een nieuwe sync draait de
 * prerender opnieuw met de bijgewerkte JSON.
 */
import google from '$data/reviews-google.json';
import facebook from '$data/reviews-facebook.json';
import { SITE } from '$lib/config';

/** Eén ruwe review zoals opgeslagen in de databestanden. */
type RawReview = {
	author: string;
	rating: number;
	text: string;
	time: string;
};

/** Vorm van een bronbestand (google/facebook). */
type ReviewSource = {
	source: string;
	rating: number;
	count: number;
	updated: string;
	reviews: RawReview[];
};

/** UI-vorm van een review (matcht de bestaande home-markup). */
export type Review = {
	quote: string;
	who: string;
	src: string;
	rating: number;
	time: string;
};

const sources: ReviewSource[] = [google as ReviewSource, facebook as ReviewSource];

/** Mooie weergavenaam per bron voor de "who · src"-regel. */
function sourceLabel(source: string): string {
	if (source === 'google') return 'Google';
	if (source === 'facebook') return 'Facebook';
	return source.charAt(0).toUpperCase() + source.slice(1);
}

/** Sorteersleutel: parseerbare tijd → epoch ms, anders 0 (onderaan). */
function timeKey(time: string): number {
	if (!time) return 0;
	const t = Date.parse(time);
	return Number.isNaN(t) ? 0 : t;
}

/**
 * Samengevoegde reviews over alle bronnen, nieuwste eerst.
 * @param limit optioneel maximum aantal (de home toont er 3).
 */
export function getReviews(limit?: number): Review[] {
	const merged: Review[] = [];
	for (const s of sources) {
		const label = sourceLabel(s.source);
		for (const r of s.reviews) {
			if (!r || !r.text) continue;
			merged.push({
				quote: r.text,
				who: r.author,
				src: label,
				rating: r.rating,
				time: r.time
			});
		}
	}

	// Nieuwste eerst; stabiel voor lege tijden (blijven in bronvolgorde).
	merged.sort((a, b) => timeKey(b.time) - timeKey(a.time));

	return typeof limit === 'number' ? merged.slice(0, limit) : merged;
}

/** Één beoordelingscijfer + telling per bron. */
export type Rating = { rating: number; count: number };

/**
 * Beoordelingen per bron. Valt terug op de vaste SITE.reviews-waarden zolang
 * een bron nog geen echte telling heeft (count 0 = nog niet gesynct).
 */
export function getRatings(): { google: Rating; facebook: Rating } {
	return {
		google:
			google.count > 0
				? { rating: google.rating, count: google.count }
				: { rating: SITE.reviews.google.rating, count: SITE.reviews.google.count },
		facebook:
			facebook.count > 0
				? { rating: facebook.rating, count: facebook.count }
				: { rating: SITE.reviews.facebook.rating, count: SITE.reviews.facebook.count }
	};
}
