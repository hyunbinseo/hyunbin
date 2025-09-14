import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Responsive Dialog with Conditional Modal',
	footer: false,
})) satisfies PageLoad;
