import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '마크다운 메모지로 변환',
})) satisfies PageLoad;
