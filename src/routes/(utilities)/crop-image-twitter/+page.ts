import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '트위터 이미지 자르기 도구',
})) satisfies PageLoad;
