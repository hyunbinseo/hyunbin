import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '서현빈 | Hyunbin Seo',
	footer: false,
})) satisfies PageLoad;
