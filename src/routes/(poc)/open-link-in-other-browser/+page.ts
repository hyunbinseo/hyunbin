import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Open Link in Other Browser',
})) satisfies PageLoad;
