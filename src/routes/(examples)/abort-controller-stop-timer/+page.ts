import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Timer using AbortController',
})) satisfies PageLoad;
