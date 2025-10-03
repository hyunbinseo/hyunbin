import type { PageLoad } from './$types';

const paths = // Reference https://github.com/vitejs/vite/pull/18666
	Object.keys(import.meta.glob(['../*/+page.ts', '../*/+server.ts'])) //
		.map((path) => path.slice(2, -(path.length - path.lastIndexOf('/+'))));

export const load = (async () => ({
	lang: 'en',
	title: 'Examples',
	paths,
})) satisfies PageLoad;
