import type { PageServerLoad } from './$types';

const modules = import.meta.glob('../\\(poc\\)/*/+page.ts', { import: 'load' });

export const load = (async () => ({
	title: 'Proof of Concepts',
	paths: Object.keys(modules).map((path) => path.substring(8, path.length - 9)),
})) satisfies PageServerLoad;
