import { dev } from '$app/environment';
import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// FIXME hydration_mismatch happens due to client refetch
// See https://github.com/sveltejs/kit/issues/15826
export const ssr = false;

export const load = (() => {
	if (!dev) redirect(307, resolve('/'));
	return {
		lang: 'en',
		title: 'Remote Query Caching',
	};
}) satisfies PageLoad;
