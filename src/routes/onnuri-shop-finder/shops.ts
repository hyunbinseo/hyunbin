import { boolean, check, looseObject, number, object, pipe, string, transform } from 'valibot';

export const keywords = ['이마트24', 'CU', '씨유', 'GS25', '지에스25', '세븐일레븐'] as const;

export const ShopSchema = pipe(
	looseObject({}),
	check((v) => v.type === '기타 소매업'),
	object({
		id: string(),
		name: string(),
		// type
		// marketcc
		// marketcname
		lat: pipe(string(), transform(Number), number()),
		lng: pipe(string(), transform(Number), number()),
		// address1
		address2: string(),
		// phone
		coupon: boolean(),
		qr: boolean(),
		card: boolean(),
	}),
);
