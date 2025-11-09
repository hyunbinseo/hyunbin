import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '최소 뷰포트 크기 강제',
	footer: false,
})) satisfies PageLoad;
