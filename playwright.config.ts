import { defineConfig, devices } from '@playwright/test';

// Accessibility E2E config. Runs the prerendered site via `vite preview`
// and drives it with a single Chromium browser (see tests/a11y.spec.ts).
// CI runs `npm run build` before this so the `build/` output exists.
//
// Optioneel: zet PLAYWRIGHT_CHROMIUM_PATH om een reeds geïnstalleerde Chromium
// te gebruiken (bv. in een omgeving met voorgeïnstalleerde browsers). In CI
// blijft dit leeg en gebruikt Playwright de browser uit `playwright install`.
const chromiumPath = process.env.PLAYWRIGHT_CHROMIUM_PATH;

export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:4173',
		// Test in reduced-motion — de manier waarop a11y-gebruikers de site zien.
		// Scroll-reveals renderen dan direct op opacity:1 (geen mid-animatie
		// opacity:0 die axe als "onzichtbare tekst" zou aanmerken).
		reducedMotion: 'reduce'
	},
	webServer: {
		command: 'npm run preview -- --port 4173',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {})
			}
		}
	]
});
