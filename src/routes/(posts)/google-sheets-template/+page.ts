import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: '구글 스프레드시트 템플릿',
})) satisfies PageLoad;
