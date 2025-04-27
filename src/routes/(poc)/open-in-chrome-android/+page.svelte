<script lang="ts">
	import { page } from '$app/state';

	let { data } = $props();

	const [scheme, urlFromHostname] = $derived(page.url.toString().split('://'));

	const hrefArray = $derived<[string, string?][]>([
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

<h1 class="text-2xl font-bold">{data.title}</h1>

<ul class="mt-4 list-disc space-y-2 pl-4">
	<!-- eslint-disable-next-line svelte/require-each-key -->
	{#each hrefArray as [href, description]}
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

<p class="mt-4">Chromium browsers include Samsung Internet, Brave, Vivaldi.</p>

<style>
	@reference "$app.css";
	a {
		@apply underline;
	}
</style>
