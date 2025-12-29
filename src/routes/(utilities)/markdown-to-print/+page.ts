import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Markdown to Printable HTML',
})) satisfies PageLoad;
