import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Svelte Inline Script Tag',
})) satisfies PageLoad;
