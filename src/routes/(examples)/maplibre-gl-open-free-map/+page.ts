import type { PageLoad } from './$types';

export const ssr = false;

export const load = (() => ({
	lang: 'en',
	title: 'MapLibre GL JS x OpenFreeMap',
	footer: false,
})) satisfies PageLoad;
