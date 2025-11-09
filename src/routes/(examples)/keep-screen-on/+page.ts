import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Keep Screen On with Wake Lock API',
})) satisfies PageLoad;
