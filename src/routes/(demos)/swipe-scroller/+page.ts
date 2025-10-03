import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Swipe Scroller for Svelte',
	description: 'Horizontal card slider for the modern web. Requires minimum JavaScript.',
	noindex: false,
	footer: false,
})) satisfies PageLoad;
