<script lang="ts">
	const width = 200;
	const height = 80;

	let innerWidth = $state<number>();
	let innerHeight = $state<number>();

	const zoom = $derived.by(() => {
		if (!innerWidth || !innerHeight) return;
		return innerWidth / innerHeight > width / height
			? innerHeight / height //
			: innerWidth / width;
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#snippet block(bg: 'bg-red-400' | 'bg-yellow-200', zoom?: number)}
	<div
		class={[bg, 'flex items-center justify-center opacity-80']}
		style:width="{width}px"
		style:height="{height}px"
		style:zoom
	>
		<code>{width}*{height}px</code>
	</div>
{/snippet}

<header>
	<p>
		Same HTML element, but the latter is using
		<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/zoom" target="_blank">CSS Zoom</a>
		to fit inside the viewport.
	</p>
	<p class="mt-8">Try resizing the viewport:</p>
</header>

<div class="mt-4">
	{@render block('bg-red-400')}
</div>

<div
	class={[
		'pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden *:pointer-events-auto',
		!zoom && 'hidden',
	]}
>
	{@render block('bg-yellow-200', zoom)}
</div>
