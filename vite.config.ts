import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: { cssTarget: ['firefox121'] },
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 5000,
		strictPort: true,
	},
});
