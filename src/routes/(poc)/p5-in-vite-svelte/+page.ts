import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'p5.js inside Vite and Svelte',
})) satisfies PageLoad;
