import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: 'Svelte 타자기 효과',
})) satisfies PageLoad;
