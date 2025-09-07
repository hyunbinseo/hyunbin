import { error } from '@sveltejs/kit';
import { isoDate, parse, pipe, string } from 'valibot';
import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load = (({ params }) => {
	try {
		return {
			title: '만 나이 계산기',
			date: parse(pipe(string(), isoDate()), params.date),
		};
	} catch {
		error(400, 'yyyy-mm-dd 형식으로 전달하세요.');
	}
}) satisfies PageLoad;
