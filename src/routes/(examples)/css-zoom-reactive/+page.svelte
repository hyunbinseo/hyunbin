<script lang="ts">
	const size = { w: 200, h: 80 } as const;
	const viewport = $state({ w: 0, h: 0 });

	const zoom = $derived.by(() => {
		if (!viewport.w || !viewport.h) return;
		return viewport.w / viewport.h > size.w / size.h
			? viewport.h / size.h //
			: viewport.w / size.w;
	});
</script>

<svelte:window bind:innerWidth={viewport.w} bind:innerHeight={viewport.h} />

{#snippet block(bg: 'bg-red-400' | 'bg-yellow-200', zoom?: number)}
	<div
		class={[
			bg,
			'grid place-items-center opacity-80',
			typeof zoom === 'number' && 'fixed inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden',
		]}
		style:width="{size.w}px"
		style:height="{size.h}px"
		style:zoom
	>
		<code>{size.w}*{size.h}px</code>
	</div>
{/snippet}

<p class="mb-4">
	Same HTML element, but
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/zoom" target="_blank">
		zoomed using CSS
	</a>. Try resizing the viewport:
</p>

{@render block('bg-red-400')}

{@render block('bg-yellow-200', zoom)}
