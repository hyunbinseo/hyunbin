import type { PageLoad } from './$types';

export const load = (async () => ({
	lang: 'en',
	title: 'Open Source Demos',
	paths:
		// Reference https://github.com/vitejs/vite/pull/18666
		Object.keys(import.meta.glob(['../*/+page.ts', '!./+page.ts'])) //
			.map((path) => path.substring(2, path.length - 9)),
})) satisfies PageLoad;
