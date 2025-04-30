import { any, integer, literal, number, object, optional, pipe, string } from 'valibot';

export const NotificationMessageSchema = object({
	type: literal('SHOW_NOTIFICATION'),
	payload: object({
		timestamp: pipe(number(), integer()),
		title: string(),
		body: optional(string()),
		data: optional(any()),
	}),
});
