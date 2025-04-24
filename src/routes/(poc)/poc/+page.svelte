<script lang="ts">
	// Reference https://github.com/vitejs/vite/pull/18666
	const paths = Object.keys(import.meta.glob(['../*/+page.ts', '!./+page.ts'])) //
		.map((path) => path.substring(2, path.length - 9));
</script>

<ul class="list-inside list-disc space-y-2 font-mono">
	<!-- eslint-disable-next-line svelte/require-each-key -->
	{#each paths as href}
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
