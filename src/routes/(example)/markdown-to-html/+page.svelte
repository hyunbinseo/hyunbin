<script lang="ts">
	let { data } = $props();
</script>

<article class="mx-auto prose">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.html}
</article>

<style>
	article :global(img) {
		width: 100%;
	}
</style>
