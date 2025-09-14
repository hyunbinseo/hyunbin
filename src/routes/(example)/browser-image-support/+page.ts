import type { PageLoad } from './$types';

export const csr = false;

export const load = (() => ({
	lang: 'en',
	title: 'Check Browser AVIF Support',
})) satisfies PageLoad;
