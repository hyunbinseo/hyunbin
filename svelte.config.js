import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		experimental: { remoteFunctions: true },
		adapter: adapter(),
		prerender: { handleMissingId: 'warn' },
		alias: { '$app.css': './src/app.css' },
	},
	compilerOptions: {
		experimental: { async: true },
	},
};

export default config;
