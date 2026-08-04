// Accessibility gate — WCAG 2.1 AA (PROJECT-BRIEF §8, EN 301 549).
//
// Required devDependencies (parent will add these):
//   - @playwright/test
//   - @axe-core/playwright
// Required package.json script (parent will add this):
//   "test:a11y": "playwright test"
//
// Run locally: `npm run build` then `npm run test:a11y`.

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

const paths = [
	'/',
	'/menu',
	'/over-ons',
	'/maaltijd-of-soep',
	'/fotos',
	'/contact',
	'/en',
	'/en/menu',
	'/en/over-ons',
	'/en/maaltijd-of-soep',
	'/en/fotos',
	'/en/contact'
];

for (const path of paths) {
	test(`a11y: ${path} has no WCAG 2.1 AA violations`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');

		// Scroll-reveals (use:reveal) zetten elementen tijdelijk op opacity:0 tot
		// ze in beeld scrollen — de enige inline `opacity` in de app. Voor de audit
		// zetten we alle transitions/animaties uit én forceren we de eind-toestand
		// (zichtbaar), zodat de reveal direct snapt en axe de échte, volledig
		// onthulde pagina meet i.p.v. een mid-animatie frame. Dit is óók hoe
		// reduced-motion-gebruikers de pagina direct zien.
		await page.addStyleTag({
			content:
				'*,*::before,*::after{transition:none !important;animation:none !important}' +
				'[style*="opacity"]{opacity:1 !important;transform:none !important}'
		});
		await page.waitForTimeout(50);

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze();

		const summary = results.violations
			.map((v) => {
				const nodes = v.nodes.map((n) => `      - ${n.target.join(' ')}`).join('\n');
				return `  [${v.id}] ${v.help} (impact: ${v.impact ?? 'n/a'})\n${nodes}`;
			})
			.join('\n');

		expect(results.violations, `Accessibility violations on ${path}:\n${summary}`).toEqual([]);
	});

	test(`structure: ${path} has valid title, single h1 and correct lang`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('load');

		const title = (await page.title()).trim();
		expect(title, `<title> must be non-empty on ${path}`).not.toBe('');

		const h1Count = await page.locator('h1').count();
		expect(h1Count, `expected exactly one <h1> on ${path}`).toBe(1);

		const expectedLang = path === '/en' || path.startsWith('/en/') ? 'en' : 'nl';
		const lang = await page.locator('html').getAttribute('lang');
		expect(lang, `<html lang> must be "${expectedLang}" on ${path}`).toBe(expectedLang);
	});
}
