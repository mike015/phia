#!/usr/bin/env node
/**
 * scrape-site.mjs — migreert content + beelden van de oude WordPress-site.
 *
 * PROJECT-BRIEF §9 stap 1: scrape home, /menu/, /about/, /informatie/,
 * /phias-fotos/, /contact/ → menu-JSON + alle beelden, ter bevestiging aan Mike.
 *
 * VEREIST netwerktoegang tot phiassmulparadijs.nl. In de standaard web-sessie is
 * uitgaand verkeer geblokkeerd door de egress-policy (alleen package-registries);
 * draai dit script daarom in een omgeving/policy die de site toestaat, of lokaal.
 *
 *   node scripts/scrape-site.mjs
 *   node scripts/scrape-site.mjs --base https://www.phiassmulparadijs.nl
 *
 * Output:
 *   src/lib/content/menu.scraped.json     — menu (categorieën + items + prijs)
 *   src/lib/content/pages.scraped.json     — ruwe tekst per pagina
 *   static/scraped/                        — alle gedownloade beelden
 *   scrape/REPORT.md                       — overzicht + wat te controleren
 *
 * Niets van de output is "waarheid": alles is UNVERIFIED tot Mike bevestigt.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const argv = process.argv.slice(2);
const arg = (k, d) => {
	const i = argv.indexOf(k);
	return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};
const BASE = arg('--base', 'https://www.phiassmulparadijs.nl').replace(/\/$/, '');

// Paden zoals in de brief (§9). Slugs kunnen afwijken; pas aan indien nodig.
const PAGES = {
	home: '/',
	menu: '/menu/',
	about: '/about/',
	informatie: '/informatie/',
	fotos: '/phias-fotos/',
	contact: '/contact/'
};

const UA =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

const PRICE_RE = /€\s?\d{1,3}(?:[.,]\d{2})?|\d{1,3}[.,]\d{2}\s?€?/;

async function fetchText(url) {
	const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'nl,en' } });
	if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
	return await res.text();
}

async function fetchBuffer(url) {
	const res = await fetch(url, { headers: { 'User-Agent': UA } });
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
	return Buffer.from(await res.arrayBuffer());
}

function absolutize(src) {
	if (!src) return null;
	if (src.startsWith('data:')) return null;
	try {
		return new URL(src, BASE + '/').href;
	} catch {
		return null;
	}
}

/** Verzamel alle beeld-URLs: <img src/srcset/data-src>, CSS background, og:image. */
function collectImages(root, html) {
	const urls = new Set();
	for (const img of root.querySelectorAll('img')) {
		for (const a of ['src', 'data-src', 'data-lazy-src']) {
			const u = absolutize(img.getAttribute(a));
			if (u) urls.add(u);
		}
		const srcset = img.getAttribute('srcset') || img.getAttribute('data-srcset');
		if (srcset) {
			for (const part of srcset.split(',')) {
				const u = absolutize(part.trim().split(/\s+/)[0]);
				if (u) urls.add(u);
			}
		}
	}
	for (const s of root.querySelectorAll('source')) {
		const srcset = s.getAttribute('srcset');
		if (srcset)
			for (const part of srcset.split(',')) {
				const u = absolutize(part.trim().split(/\s+/)[0]);
				if (u) urls.add(u);
			}
	}
	for (const m of root.querySelectorAll('meta[property="og:image"]')) {
		const u = absolutize(m.getAttribute('content'));
		if (u) urls.add(u);
	}
	// CSS background-image: url(...)
	for (const m of html.matchAll(/background(?:-image)?\s*:\s*url\(['"]?([^'")]+)['"]?\)/gi)) {
		const u = absolutize(m[1]);
		if (u) urls.add(u);
	}
	// Alleen echte beeldbestanden
	return [...urls].filter((u) => /\.(jpe?g|png|webp|avif|gif|svg)(\?|$)/i.test(u));
}

/**
 * Menu-parser (heuristisch). WordPress-markup verschilt per theme; strategie:
 * loop door het hoofd-content-blok, houd de laatst-geziene kop aan als categorie,
 * en beschouw elke regel/element met een prijs als een item.
 */
function parseMenu(root) {
	const main =
		root.querySelector('main') ||
		root.querySelector('article') ||
		root.querySelector('#content') ||
		root.querySelector('.entry-content') ||
		root.querySelector('body');
	if (!main) return [];

	const categories = [];
	let current = null;

	const walk = (node) => {
		for (const el of node.childNodes) {
			if (el.nodeType !== 1) continue;
			const tag = el.rawTagName?.toLowerCase();
			const text = el.text.replace(/\s+/g, ' ').trim();

			if (/^h[1-4]$/.test(tag || '') && text && !PRICE_RE.test(text)) {
				current = { category: text, items: [] };
				categories.push(current);
				continue;
			}

			// Blad-element met een prijs → item
			const hasChildBlock = el.querySelector('li, tr, p, div, h1,h2,h3,h4');
			if (!hasChildBlock && text && PRICE_RE.test(text)) {
				const priceMatch = text.match(PRICE_RE);
				const price = priceMatch ? priceMatch[0].replace(/\s/g, '') : '';
				const name = text
					.replace(PRICE_RE, '')
					.replace(/[.·–-]{2,}/g, '')
					.trim();
				if (name) {
					(
						current ?? (categories.push((current = { category: 'Overig', items: [] })), current)
					).items.push({ name_nl: name, name_en: '', price, available: true });
				}
				continue;
			}
			if (el.childNodes.length) walk(el);
		}
	};
	walk(main);
	return categories.filter((c) => c.items.length);
}

function pageText(root) {
	const main =
		root.querySelector('.entry-content') ||
		root.querySelector('main') ||
		root.querySelector('body');
	return main
		? main.text
				.replace(/\n{3,}/g, '\n\n')
				.replace(/[ \t]+/g, ' ')
				.trim()
		: '';
}

async function main() {
	const report = [
		`# Scrape-rapport — ${BASE}`,
		'',
		'_Alles hieronder is UNVERIFIED — bevestig met Mike._',
		''
	];
	const pages = {};
	let menu = [];
	const allImages = new Set();

	for (const [key, path] of Object.entries(PAGES)) {
		const url = BASE + path;
		try {
			const html = await fetchText(url);
			const root = parse(html);
			pages[key] = {
				url,
				title: root.querySelector('title')?.text?.trim() || '',
				text: pageText(root)
			};
			collectImages(root, html).forEach((u) => allImages.add(u));
			if (key === 'menu') menu = parseMenu(root);
			report.push(`- ✅ ${key} — ${url}`);
			console.log(`✓ ${key}`);
		} catch (err) {
			pages[key] = { url, error: String(err.message || err) };
			report.push(`- ❌ ${key} — ${url} — ${err.message || err}`);
			console.error(`✗ ${key}: ${err.message || err}`);
		}
	}

	// Beelden downloaden
	const imgDir = join(ROOT, 'static/scraped');
	await mkdir(imgDir, { recursive: true });
	const downloaded = [];
	for (const url of allImages) {
		try {
			const buf = await fetchBuffer(url);
			let name = basename(new URL(url).pathname) || 'image';
			if (!extname(name)) name += '.jpg';
			name = name.replace(/[^\w.-]/g, '_');
			await writeFile(join(imgDir, name), buf);
			downloaded.push({ url, file: `static/scraped/${name}`, bytes: buf.length });
		} catch (err) {
			report.push(`- ⚠ beeld mislukt: ${url} — ${err.message || err}`);
		}
	}

	// Wegschrijven
	await mkdir(join(ROOT, 'src/lib/content'), { recursive: true });
	await mkdir(join(ROOT, 'scrape'), { recursive: true });
	await writeFile(
		join(ROOT, 'src/lib/content/menu.scraped.json'),
		JSON.stringify({ _unverified: true, source: BASE + PAGES.menu, categories: menu }, null, 2)
	);
	await writeFile(
		join(ROOT, 'src/lib/content/pages.scraped.json'),
		JSON.stringify({ _unverified: true, pages }, null, 2)
	);

	report.push(
		'',
		`## Menu — ${menu.length} categorieën, ${menu.reduce((n, c) => n + c.items.length, 0)} items`,
		...menu.flatMap((c) => [
			'',
			`### ${c.category}`,
			...c.items.map((i) => `- ${i.name_nl} — **${i.price || '?'}**`)
		]),
		'',
		`## Beelden — ${downloaded.length} gedownload`,
		...downloaded.map((d) => `- ${d.file} (${(d.bytes / 1024).toFixed(0)} kB) ← ${d.url}`)
	);
	await writeFile(join(ROOT, 'scrape/REPORT.md'), report.join('\n'));

	console.log(
		`\nKlaar. Menu: ${menu.length} cat. Beelden: ${downloaded.length}. Zie scrape/REPORT.md`
	);
	if (!menu.length && !downloaded.length) {
		console.error('\n⚠ Niets opgehaald — waarschijnlijk netwerk geblokkeerd (egress-policy).');
		process.exit(2);
	}
}

main().catch((e) => {
	console.error('Fataal:', e);
	process.exit(1);
});
