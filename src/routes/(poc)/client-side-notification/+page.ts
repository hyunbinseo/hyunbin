import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (() => {
	if (browser && !('Notification' in window))
		error(400, 'Notification is not supported. iOS requires PWA installation.');

	return {
		lang: 'en',
		title: 'Notifications API Demo',
	};
}) satisfies PageLoad;
