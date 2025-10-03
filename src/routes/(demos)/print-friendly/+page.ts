import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Print Friendly',
	description: 'Responsive CSS for screen and paper. Optimized for printing and PDF conversion.',
	noindex: false,
})) satisfies PageLoad;
