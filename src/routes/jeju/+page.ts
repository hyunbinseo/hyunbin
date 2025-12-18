import { error } from '@sveltejs/kit';
import { array, isoDate, length, object, parse, picklist, pipe, string, transform } from 'valibot';
import { wmoCodes } from '.';
import type { PageLoad } from './$types';

export const ssr = false;

const url = new URL('https://api.open-meteo.com/v1/forecast');
url.searchParams.append('latitude', '33.5097');
url.searchParams.append('longitude', '126.5219');
url.searchParams.append('timezone', 'Asia/Seoul');
url.searchParams.append('daily', 'weather_code');

const DAYS = 7;

export const load = (async ({ fetch }) => {
	const response = await fetch(url);
	if (!response.ok) error(500);

	const forecasts = parse(
		pipe(
			object({
				daily: object({
					time: pipe(array(pipe(string(), isoDate())), length(DAYS)),
					weather_code: pipe(array(picklist(wmoCodes)), length(DAYS)),
				}),
			}),
			transform(({ daily }) =>
				daily.time.map((date, index) => [date, daily.weather_code[index]!] as const),
			),
		),
		await response.json(),
	);

	return {
		title: '제주 날씨 및 항공권 예약',
		lang: 'ko',
		forecasts,
	};
}) satisfies PageLoad;
