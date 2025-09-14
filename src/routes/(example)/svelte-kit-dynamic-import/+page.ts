import type { PageLoad } from './$types';

export const load = (async () => ({
	lang: 'en',
	title: 'SvelteKit Dynamic Component Import',
	comp: (await import('./Component.svelte')).default,
})) satisfies PageLoad;
