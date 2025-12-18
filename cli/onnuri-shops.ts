import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { array, object, parse, pipe, transform, type InferOutput } from 'valibot';
import { keywords, ShopSchema } from '../src/routes/onnuri-shop-finder/shops.ts';
import { root } from './utilities.ts';

const requests = keywords.map(
	(keyword) =>
		new Request('https://onnurishopfinder.or.kr/itboard/front/map.list.ajax.php', {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			body: new URLSearchParams({ sh: keyword, indCode8: '08' }), // 기타 소매업
			method: 'POST',
		}),
);

const ResponseSchema = pipe(
	object({ LIST: array(ShopSchema) }),
	transform(({ LIST }) => LIST),
);

const allShops: InferOutput<typeof ShopSchema>[] = [];

for (const request of requests) {
	const response = await fetch(request);
	if (!response.ok) throw new Error();

	const shops = parse(ResponseSchema, await response.json());
	allShops.push(...shops);
}

writeFileSync(
	join(root, 'src/routes/onnuri-shop-finder/shops.json'),
	JSON.stringify(allShops, null, '\t') + '\n',
);
