import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: { cssTarget: ['firefox121'] },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				experimental: { async: true },
			},
			experimental: { remoteFunctions: true },
			adapter: adapter(),
			prerender: { handleMissingId: 'warn' },
			serviceWorker: { register: false },
		}),
	],
	server: {
		port: 5000,
		strictPort: true,
	},
});
