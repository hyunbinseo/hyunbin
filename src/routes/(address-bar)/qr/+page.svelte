<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_URL } from '$env/static/public';
	import QRCode from 'qrcode-svg';

	const size = 256;
	const scale = 3;

	let content = $derived.by(() => {
		if (!browser) return null;
		return page.url.hash.slice(1) || PUBLIC_URL;
	});

	const download = (href: string, extension: 'png' | 'svg') => {
		const a = document.createElement('a');
		a.href = href;
		a.download = `${Date.now()}.${extension}`;
		a.click();
		a.remove();
	};
</script>

<input type="text" bind:value={content} placeholder={PUBLIC_URL} />

{#if content}
	{@const svg = new QRCode({
		content,
		padding: 0,
		width: size,
		height: size,
		ecl: 'M',
		join: true,
		xmlDeclaration: false,
		container: 'svg-viewbox',
	}).svg()}
	{@const blob = new Blob([svg], { type: 'image/svg+xml' })}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="mt-4 size-40">{@html svg}</div>
	<div class="mt-4">
		다운로드:
		<button
			type="button"
			onclick={async () => {
				const canvas = document.createElement('canvas');
				canvas.width = size * scale;
				canvas.height = size * scale;

				const ctx = canvas.getContext('2d')!;
				ctx.scale(scale, scale);

				const img = new Image();
				const url = URL.createObjectURL(blob);

				try {
					await new Promise<void>((resolve, reject) => {
						img.onload = () => {
							ctx.drawImage(img, 0, 0);
							resolve();
						};
						img.onerror = reject;
						img.src = url;
					});
				} finally {
					URL.revokeObjectURL(url);
				}

				download(canvas.toDataURL('image/png'), 'png');
				canvas.remove();
			}}>PNG</button
		>,
		<button
			type="button"
			onclick={() => {
				const url = URL.createObjectURL(blob);
				download(url, 'svg');
				URL.revokeObjectURL(url);
			}}>SVG</button
		>
	</div>
{/if}

<style>
	button {
		color: var(--color-blue-700);
		text-decoration: underline;
	}
</style>
