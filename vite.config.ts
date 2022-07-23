import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
	base: '',

	build: {
		minify: false,
	},

	plugins: [
		svelte({
			experimental: { generateMissingPreprocessorSourcemaps: true },
		}),
		viteSingleFile(),
	],
});
