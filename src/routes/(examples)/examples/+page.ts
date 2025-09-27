import type { PageLoad } from './$types';

export const load = (async () => ({
	title: '예제 | Examples',
	paths:
		// Reference https://github.com/vitejs/vite/pull/18666
		Object.keys(import.meta.glob(['../*/+page.ts', '!./+page.ts'])) //
			.map((path) => path.substring(2, path.length - 9)),
})) satisfies PageLoad;
