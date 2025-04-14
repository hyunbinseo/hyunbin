import type { PageLoad } from './$types';

export const ssr = false;

export const load = (() => ({ footer: false })) satisfies PageLoad;
