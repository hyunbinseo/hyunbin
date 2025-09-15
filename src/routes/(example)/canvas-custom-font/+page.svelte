<script lang="ts">
	import suitVariableUrl from '@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.woff2?url';

	const text = 'Point Nemo';
	const filename = text.toLowerCase().replaceAll(' ', '-');

	let dataUrl = $state<string>();
</script>

<figure>
	<figcaption>DOM</figcaption>
	<span class="text-2xl">{text}</span>
</figure>

<figure class="mt-4">
	<figcaption>
		Canvas
		{#if dataUrl}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			[<a download="{filename}.png" href={dataUrl}>Save as PNG</a>]
		{/if}
	</figcaption>
	<canvas
		class="mt-1.5"
		{@attach (canvas) => {
			new FontFace('SUIT Variable', `url("${suitVariableUrl}")`).load().then(() => {
				const ctx = canvas.getContext('2d')!;

				// Reference https://web.dev/articles/canvas-hidipi
				const rect = canvas.getBoundingClientRect();
				canvas.style.width = rect.width + 'px';
				canvas.style.height = rect.height + 'px';
				canvas.width = rect.width * devicePixelRatio;
				canvas.height = rect.height * devicePixelRatio;
				ctx.scale(devicePixelRatio, devicePixelRatio);

				ctx.font = '24px "SUIT Variable"';
				ctx.textAlign = 'left';
				ctx.textBaseline = 'top';
				ctx.fillText(text, 0, 0);
				dataUrl = canvas.toDataURL('image/png');
			});
		}}
	></canvas>
</figure>
