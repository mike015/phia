/**
 * Nieuws-bibliotheek. Leest content/news/*.md (frontmatter-only markdown) in via
 * een eager Vite-glob als ruwe tekst en parseert de `---`-gescheiden frontmatter
 * met een kleine regex-parser — geen externe dependency. De eigenaren beheren de
 * bestanden via het CMS; hier normaliseren we ze naar een getypt NewsItem.
 *
 * Velden per bestand: title_nl, title_en, date (YYYY-MM-DD), image, body_nl, body_en.
 */

/** Eén genormaliseerd nieuwsbericht (taal-agnostisch: beide talen aanwezig). */
export type NewsItem = {
	slug: string;
	date: string;
	image?: string;
	title_nl: string;
	title_en: string;
	body_nl: string;
	body_en: string;
};

// Ruwe markdown-bestanden als string. Pad is relatief t.o.v. de projectroot.
const files = import.meta.glob('/content/news/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

/** Haal `slug` uit een pad: /content/news/2026-08-01-welkom.md → 2026-08-01-welkom. */
function slugFromPath(path: string): string {
	const base = path.split('/').pop() ?? path;
	return base.replace(/\.md$/, '');
}

/**
 * Minimale frontmatter-parser. Ondersteunt `key: value` per regel binnen het
 * eerste `---`…`---`-blok. Waarden mogen tussen enkele/dubbele quotes staan.
 * Geen geneste structuren nodig voor nieuws.
 */
function parseFrontmatter(raw: string): Record<string, string> {
	const match = raw.match(/^﻿?\s*---\r?\n([\s\S]*?)\r?\n---/);
	const out: Record<string, string> = {};
	if (!match) return out;
	for (const line of match[1].split(/\r?\n/)) {
		const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
		if (!m) continue;
		let value = m[2].trim();
		// Strip omringende quotes (enkele of dubbele).
		if (
			(value.startsWith("'") && value.endsWith("'")) ||
			(value.startsWith('"') && value.endsWith('"'))
		) {
			value = value.slice(1, -1);
		}
		out[m[1]] = value;
	}
	return out;
}

/** Alle nieuwsberichten, gesorteerd op datum (nieuwste eerst). */
export function getNews(): NewsItem[] {
	const items: NewsItem[] = Object.entries(files).map(([path, raw]) => {
		const fm = parseFrontmatter(raw);
		const image = fm.image?.trim();
		return {
			slug: slugFromPath(path),
			date: fm.date ?? '',
			image: image ? image : undefined,
			title_nl: fm.title_nl ?? '',
			title_en: fm.title_en ?? fm.title_nl ?? '',
			body_nl: fm.body_nl ?? '',
			body_en: fm.body_en ?? fm.body_nl ?? ''
		};
	});
	// Sorteer aflopend op datum; lege datums achteraan.
	return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
