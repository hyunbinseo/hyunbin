<script lang="ts">
	let { data } = $props();
</script>

<ul class="list-inside list-disc space-y-2 font-mono">
	{#each data.paths as path (path)}
		<li>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={path}>
				<code>{path}</code>
			</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	@reference "$lib/layout.css";
	a {
		@apply underline;
	}
</style>
