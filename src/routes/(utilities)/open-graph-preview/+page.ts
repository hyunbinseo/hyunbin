import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '오픈그래프 카드 미리 보기',
})) satisfies PageLoad;
