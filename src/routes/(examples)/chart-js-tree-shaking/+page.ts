import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Chart.js with Tree Shaking',
})) satisfies PageLoad;
