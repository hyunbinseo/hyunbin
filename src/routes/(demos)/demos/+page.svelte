<script lang="ts">
	let { data } = $props();
</script>

<ul class="list-inside list-disc space-y-2 font-mono">
	{#each data.paths as href (href)}
		<li>
			<a {href}>{href}</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	@reference "$app.css";
	a {
		@apply underline;
	}
</style>
