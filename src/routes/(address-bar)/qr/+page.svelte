<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_URL } from '$env/static/public';
	import QRCode from 'qrcode-svg';

	let content = $derived.by(() => {
		if (!browser) return null;
		return page.url.hash.slice(1) || PUBLIC_URL;
	});
</script>

<input type="text" bind:value={content} placeholder={PUBLIC_URL} />

{#if content}
	{@const svg = new QRCode({
		content,
		padding: 0,
		width: 256,
		height: 256,
		ecl: 'M',
		join: true,
		xmlDeclaration: false,
		container: 'svg-viewbox',
	}).svg()}
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
