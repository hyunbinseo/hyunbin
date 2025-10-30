<script lang="ts">
	const width = 200;
	const height = 50;

	let innerWidth = $state<number>();
</script>

<svelte:window bind:innerWidth />

{#snippet block(bg: 'red' | 'yellow', zoom?: number)}
	<div
		class={[
			bg === 'red' && 'bg-red-50',
			bg === 'yellow' && 'bg-yellow-50',
			'flex items-center justify-center',
		]}
		style:width="{width}px"
		style:height="{height}px"
		style:zoom
	>
		<code>{width}*{height}px</code>
	</div>
{/snippet}

<div class="space-y-4">
	<header>
		<p>
			Same HTML element, but the latter is using
			<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/zoom" target="_blank">CSS Zoom</a>
			to fit the width.
		</p>
		<p class="mt-8">Try resizing the viewport:</p>
	</header>
	{@render block('red')}
	<div class={[!innerWidth && 'hidden', '-mx-4']}>
		<div class="flex max-w-full justify-center overflow-x-hidden">
			{@render block('yellow', innerWidth && innerWidth / width)}
		</div>
	</div>
</div>
