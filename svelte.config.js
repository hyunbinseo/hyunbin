import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: { '$app.css': './src/app.css' },
		typescript: {
			config: (obj) => {
				if (!Array.isArray(obj.include)) throw new TypeError();
				obj.include.push('../cli/**/*.js', '../cli/**/*.ts');
				return obj;
			},
		},
	},
};

export default config;
