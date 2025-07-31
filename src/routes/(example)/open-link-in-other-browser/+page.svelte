<script lang="ts">
	import { page } from '$app/state';

	type Anchors = [string, string?][];

	const [scheme, urlFromHostname] = $derived(page.url.toString().split('://'));
	const chromeForAndroid = $derived<Anchors>([
		[
			`intent://${urlFromHostname}#Intent;scheme=${scheme};package=com.android.chrome;end`,
			`Shows a 'Choose activity' dialog in Chromium browsers including self as an option`,
		],
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
			<a {href}>
				<code>{href}</code>
			</a>
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

<style>
	@reference "$app.css";
	ul {
		@apply mt-2 list-disc space-y-2 pl-4;
	}
	a {
		@apply underline;
	}
</style>
