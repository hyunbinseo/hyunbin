<script lang="ts">
	import { page } from '$app/state';

	type Anchors = [string, string?][];

	const intent = $derived.by(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const url = new URL(page.url);
		url.hash = `#Intent;scheme=${url.protocol.slice(0, -1)};package=com.android.chrome;end`;
		// cannot be changed using the URL's protocol property
		// intent: is considered invalid is simply ignored
		return 'intent:' + url.href.slice(url.protocol.length);
	});

	const chromeForAndroid = $derived<Anchors>([
		[intent, `Shows a 'Choose activity' dialog in Chromium browsers including self as an option`],
		[
			`googlechrome://navigate?url=${page.url.toString()}`,
			'Silently fails in Chromium browsers, probably because they share the URI scheme',
		],
	]);

	const edge = $derived<Anchors>([
		[
			`microsoft-edge:${page.url.toString()}`,
			`Shows a 'Choose activity' dialog in Android Chromium browsers`,
		],
	]);
</script>

{#snippet anchorListItems(anchors: Anchors)}
	<!-- eslint-disable-next-line svelte/require-each-key -->
	{#each anchors as [href, description]}
		<li>
			{#if description}
				<span>{description}</span><br />
			{/if}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a {href}><code>{href}</code></a>
		</li>
	{/each}
{/snippet}

<section>
	<h2 class="text-xl font-bold">Chrome for Android</h2>
	<p class="mt-1">Chromium browsers include Samsung Internet, Brave, Vivaldi</p>
	<ul class="mt-4">
		{@render anchorListItems(chromeForAndroid)}
	</ul>
</section>

<section class="mt-8">
	<h2 class="text-xl font-bold">Microsoft Edge</h2>
	<p class="mt-1">Tested on Android, macOS, Windows 11</p>
	<ul class="mt-4">
		{@render anchorListItems(edge)}
	</ul>
</section>

<style lang="postcss">
	@reference "$lib/layout.css";
	ul {
		@apply mt-2 list-disc space-y-2 pl-4;
	}
	a {
		@apply underline;
	}
</style>
