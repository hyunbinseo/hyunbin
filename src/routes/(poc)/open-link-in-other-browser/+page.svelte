<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.lang = 'en';
		return () => (document.documentElement.lang = 'ko');
	});

	const [scheme, urlFromHostname] = $derived(page.url.toString().split('://'));
	const chromeForAndroid = $derived<[string, string?][]>([
		[
			`intent://${urlFromHostname}#Intent;scheme=${scheme};package=com.android.chrome;end`,
			`Shows a 'Choose activity' dialog in Chromium browsers including self as an option`,
		],
		[
			`googlechrome://navigate?url=${page.url.toString()}`,
			'Silently fails in Chromium browsers, probably because they share the URI scheme',
		],
	]);
</script>

<section>
	<h2 class="text-xl font-bold">Chrome for Android</h2>
	<p class="mt-1">Chromium browsers include Samsung Internet, Brave, Vivaldi</p>
	<ul class="mt-4">
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each chromeForAndroid as [href, description]}
			<li>
				{#if description}
					<span>{description}</span><br />
				{/if}
				<a {href}>
					<code>{href}</code>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="mt-8">
	<h2 class="text-xl font-bold">Microsoft Edge for Desktop</h2>
	<p class="mt-1">Tested on macOS and Windows 11</p>
	<ul class="mt-4">
		<li>
			{#if true}
				{@const href = `microsoft-edge:${page.url.toString()}`}
				<a {href}>
					<code>{href}</code>
				</a>
			{/if}
		</li>
	</ul>
</section>

<style>
	@reference "$app.css";
	ul {
		@apply mt-2 list-disc space-y-2 pl-4;
	}
	a {
		@apply underline;
	}
</style>
