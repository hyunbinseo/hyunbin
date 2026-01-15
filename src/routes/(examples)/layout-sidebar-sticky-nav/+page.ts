import type { PageLoad } from './$types';

export const load = (() => ({
	lang: 'en',
	title: 'Layout with Responsive Sidebar and Sticky Navigation',
	footer: false,
})) satisfies PageLoad;
