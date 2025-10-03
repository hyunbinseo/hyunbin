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
		typescript: {
			config: (obj) => {
				if (!Array.isArray(obj.include)) throw new TypeError();
				obj.include.push('../cli/**/*.js', '../cli/**/*.ts');
				return obj;
			},
		},
	},
	compilerOptions: {
		experimental: { async: true },
	},
};

export default config;
