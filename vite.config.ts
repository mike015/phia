import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		// enhancedImages MUST come before sveltekit()
		enhancedImages(),
		tailwindcss(),
		sveltekit()
	]
});
