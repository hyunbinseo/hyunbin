<script lang="ts">
	const { data } = $props();
</script>

<ul class="list-inside list-disc space-y-2 font-mono">
	<!-- eslint-disable-next-line svelte/require-each-key -->
	{#each data.paths as href}
		<li>
			<a {href}>{href}</a>
		</li>
	{/each}
</ul>

<style>
	@reference "$app.css";
	a {
		@apply underline;
	}
</style>
