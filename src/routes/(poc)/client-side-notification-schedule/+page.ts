import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (() => {
	if (browser) {
		if (!('Notification' in window)) error(400, 'Notification is not supported.');
		if (!('serviceWorker' in navigator)) error(400, 'Service Worker is not supported.');
	}
	return {
		lang: 'en',
		title: 'Schedule Web Notification Using Service Worker',
	};
}) satisfies PageLoad;
