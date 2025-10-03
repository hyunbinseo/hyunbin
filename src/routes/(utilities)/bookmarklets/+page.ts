import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '북마클릿 | Bookmarklets',
})) satisfies PageLoad;
