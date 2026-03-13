import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '최저 월급 계산기',
})) satisfies PageLoad;
