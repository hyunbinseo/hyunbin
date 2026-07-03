import type { PageLoad } from './$types';

export const load = (async () => ({
	lang: 'en',
	title: 'Open Source Demos',
})) satisfies PageLoad;
