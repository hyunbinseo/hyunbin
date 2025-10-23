<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_URL } from '$env/static/public';
	import QRCode from 'qrcode-svg';

	let content = $derived(page.url.hash.slice(1) || PUBLIC_URL);

	const svg = $derived(
		!content
			? null
			: new QRCode({
					content,
					padding: 0,
					width: 256,
					height: 256,
					ecl: 'M',
					join: true,
					xmlDeclaration: false,
					container: 'svg-viewbox',
				}).svg(),
	);
</script>

<input type="text" bind:value={content} placeholder={PUBLIC_URL} />

{#if svg}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="mt-4 size-40">{@html svg}</div>
	<button
		type="button"
		class="mt-2"
		onclick={() => {
			const blob = new Blob([svg], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${Date.now()}.svg`;
			a.click();
			URL.revokeObjectURL(url);
		}}>다운로드</button
	>
{/if}
