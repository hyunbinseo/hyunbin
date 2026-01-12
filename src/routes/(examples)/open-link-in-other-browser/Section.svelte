<script lang="ts">
	const {
		h2,
		p,
		anchors,
	}: {
		h2: string;
		p: string;
		anchors: [string, string][];
	} = $props();
</script>

<section>
	<h2 class="text-xl font-bold">{h2}</h2>
	<p class="mt-1">{p}</p>
	<ul class="mt-2 list-disc space-y-2 pl-4">
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
	</ul>
</section>

<style>
	a {
		text-decoration-line: underline;
	}
</style>
