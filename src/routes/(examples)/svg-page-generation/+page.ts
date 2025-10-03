import type { PageLoad } from './$types';

export const ssr = false;

export const load = (() => ({
	lang: 'ko',
	title: 'SVG 기반 동적 페이지 생성',
	footer: false,
})) satisfies PageLoad;
