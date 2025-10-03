import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '만 나이 계산기',
})) satisfies PageLoad;
