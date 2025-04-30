/// <reference types="../.svelte-kit/ambient.d.ts" />
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Reference https://svelte.dev/docs/kit/service-workers#During-development
// Reference https://caniuse.com/mdn-api_serviceworker_ecmascript_modules

import { object, parse, pipe, safeParse, string, url } from 'valibot';
import { NotificationMessageSchema } from './routes/(poc)/client-side-notification-schedule';

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('message', (e) => {
	try {
		const { title, ...opts } = parse(NotificationMessageSchema, e.data).payload;
		setTimeout(
			() => sw.registration.showNotification(title, opts),
			Math.max(0, opts.timestamp - Date.now()),
		);
		// eslint-disable-next-line no-empty
	} catch {}
});

// Reference https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow#examples
sw.addEventListener('notificationclick', (e) => {
	e.notification.close();
	const parsed = safeParse(object({ url: pipe(string(), url()) }), e.notification.data);
	if (!parsed.success) return;
	sw.clients
		.openWindow(parsed.output.url)
		.then((windowClient) => (windowClient ? windowClient.focus() : null));
});
