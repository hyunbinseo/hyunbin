import type { PageLoad } from './$types';

export const ssr = false;

export const load = (() => ({
	lang: 'en',
	title: 'Browser Caveats',
})) satisfies PageLoad;
