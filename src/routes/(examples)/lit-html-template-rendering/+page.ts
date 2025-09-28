import type { PageLoad } from './$types';

// Server-side rendering is experimental.
// Reference https://lit.dev/docs/ssr/overview
export const ssr = false;

export const load = (() => ({
	lang: 'en',
	title: 'lit-html JavaScript Template',
})) satisfies PageLoad;
