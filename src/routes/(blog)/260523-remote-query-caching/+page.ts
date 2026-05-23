import type { PageLoad } from './$types';

// FIXME hydration_mismatch happens due to client refetch
// See https://github.com/sveltejs/kit/issues/15826
export const ssr = false;

export const load = (() => ({
	lang: 'en',
	title: 'Remote Query Caching',
})) satisfies PageLoad;
