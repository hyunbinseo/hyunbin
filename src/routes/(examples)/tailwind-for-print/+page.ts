import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'ko',
	title: 'Tailwind CSS for Print',
	footer: false,
})) satisfies PageLoad;
