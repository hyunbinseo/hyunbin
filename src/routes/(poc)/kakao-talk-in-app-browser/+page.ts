import type { PageLoad } from './$types';

export const ssr = false;

export const load = (() => ({
	title: '카카오톡 인앱 브라우저에서 외부 브라우저 열기',
})) satisfies PageLoad;
