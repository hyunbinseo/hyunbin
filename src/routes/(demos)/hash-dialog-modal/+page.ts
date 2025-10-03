import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Hash Dialog Modal',
	description:
		'Open and close <dialog> modals based on the URL hash value. A vanilla JavaScript library for all browsers and frameworks.',
	noindex: false,
})) satisfies PageLoad;
