import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		experimental: { remoteFunctions: true },
		adapter: adapter(),
		prerender: { handleMissingId: 'warn' },
	},
	compilerOptions: {
		experimental: { async: true },
	},
};

export default config;
