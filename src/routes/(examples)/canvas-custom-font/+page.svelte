<script lang="ts">
	import suitVariableUrl from '@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.woff2?url';

	let text = $state('Point Nemo');
	let canvas = $state<HTMLCanvasElement>();
	let dataUrl = $state<string>();

	$effect(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(text, 0, 0);
		dataUrl = canvas.toDataURL('image/png');
	});
</script>

<input type="text" bind:value={text} />

<figure class="mt-4">
	<figcaption>DOM</figcaption>
	<span class="text-2xl">{text}</span>
</figure>

<figure class="mt-4">
	<figcaption>
		Canvas
		{#if dataUrl}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			[<a download="image.png" href={dataUrl}>Save as PNG</a>]
		{/if}
	</figcaption>
	<canvas
		class="mt-1.5"
		{@attach (c) => {
			// Reference https://web.dev/articles/canvas-hidipi
			const rect = c.getBoundingClientRect();
			c.style.width = rect.width + 'px';
			c.style.height = rect.height + 'px';
			c.width = rect.width * devicePixelRatio;
			c.height = rect.height * devicePixelRatio;

			const ctx = c.getContext('2d')!;
			ctx.scale(devicePixelRatio, devicePixelRatio);
			ctx.textAlign = 'left';
			ctx.textBaseline = 'top';

			const family = 'SUIT Variable';
			new FontFace(family, `url("${suitVariableUrl}")`).load().then(() => {
				ctx.font = `24px "${family}"`;
				canvas = c;
			});
		}}
	></canvas>
</figure>
