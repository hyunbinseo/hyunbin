import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: 'QR 코드 생성기',
	icon: false,
})) satisfies PageLoad;
