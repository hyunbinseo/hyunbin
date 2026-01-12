<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';

	const intent = $derived.by(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const url = new URL(page.url);
		url.hash = `#Intent;scheme=${url.protocol.slice(0, -1)};package=com.android.chrome;end`;
		// cannot be changed using the URL's protocol property
		// intent: is considered invalid is simply ignored
		return 'intent:' + url.href.slice(url.protocol.length);
	});
</script>

<div class="space-y-8">
	<Section
		h2="Chrome for Android"
		p="Chromium browsers include Samsung Internet, Brave, Vivaldi"
		anchors={[
			[intent, `Shows a 'Choose activity' dialog in Chromium browsers including self as an option`],
			[
				`googlechrome://navigate?url=${page.url.toString()}`,
				'Silently fails in Chromium browsers, probably because they share the URI scheme',
			],
		]}
	></Section>

	<Section
		h2="Microsoft Edge"
		p="Tested on Android, macOS, Windows 11"
		anchors={[
			[
				`microsoft-edge:${page.url.toString()}`,
				`Shows a 'Choose activity' dialog in Android Chromium browsers`,
			],
		]}
	></Section>
</div>
