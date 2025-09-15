import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Canvas with Custom Font',
})) satisfies PageLoad;
