import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteOptions} */
export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		sourceMap: true,
	}),

	compilerOptions: {
		dev: true,
		enableSourcemap: true,
	},
};
