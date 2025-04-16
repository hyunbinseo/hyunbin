import type { PageLoad } from './$types';

export const csr = false;

export const load = (() => ({ title: '브라우저 AVIF 지원 확인' })) satisfies PageLoad;
