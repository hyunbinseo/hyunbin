import { error } from '@sveltejs/kit';
import {
	array,
	isoDate,
	length,
	object,
	parse,
	picklist,
	pipe,
	string,
	transform,
	type InferOutput,
} from 'valibot';
import { wmoCodes } from '.';

const DAYS = 7;

const request = (() => {
	const url = new URL('https://api.open-meteo.com/v1/forecast');
	url.searchParams.append('daily', 'weather_code');
	url.searchParams.append('latitude', '33.5097');
	url.searchParams.append('longitude', '126.5219');
	url.searchParams.append('timezone', 'Asia/Seoul');
	return new Request(url);
})();

const Schema = pipe(
	object({
		daily: object({
			time: pipe(array(pipe(string(), isoDate())), length(DAYS)),
			weather_code: pipe(array(picklist(wmoCodes)), length(DAYS)),
		}),
	}),
	transform(({ daily }) =>
		daily.time.map((date, index) => [date, daily.weather_code[index]!] as const),
	),
);

export type Forecasts = InferOutput<typeof Schema>;

export const getForecasts = async () => {
	const response = await fetch(request);
	if (!response.ok) error(500);
	return parse(Schema, await response.json());
};
