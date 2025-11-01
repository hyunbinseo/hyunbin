<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_URL } from '$env/static/public';
	import QRCode from 'qrcode-svg';
	import { onMount } from 'svelte';

	const size = 256;
	const scale = 3;

	let isTransparent = $state(false);
	const isKakaoTalk = $derived(browser && window.navigator.userAgent.includes('KAKAOTALK'));

	onMount(() => {
		if (isKakaoTalk)
			// when called in the svelte:head script tag, the site is not loaded and shows a blank page
			window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(window.location.href)}`;
	});

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

<label>
	<span class="text-sm font-bold">텍스트 (URL 등)</span>
	<input type="text" bind:value={content} placeholder={PUBLIC_URL} size="32" class="font-mono" />
</label>

<label class="mt-6 select-none">
	<input type="checkbox" bind:checked={isTransparent} />
	<span>투명 배경</span>
</label>

{#if content}
	{@const svg = new QRCode({
		content,
		padding: 0,
		width: size,
		height: size,
		background: isTransparent ? 'transparent' : 'white',
		ecl: 'M',
		join: true,
		xmlDeclaration: false,
		container: 'svg-viewbox',
	}).svg()}
	{@const blob = new Blob([svg], { type: 'image/svg+xml' })}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="mt-2.5 size-40 bg-gray-200">{@html svg}</div>
	{#if !isKakaoTalk}
		<div class="mt-4">
			저장:
			<button
				type="button"
				onclick={() => {
					const url = URL.createObjectURL(blob);
					download(url, 'svg');
					URL.revokeObjectURL(url);
				}}>SVG/벡터</button
			>,
			<button
				type="button"
				onclick={async () => {
					const canvas = document.createElement('canvas');
					canvas.width = size * scale;
					canvas.height = size * scale;

					const ctx = canvas.getContext('2d')!;
					const img = new Image();
					const url = URL.createObjectURL(blob);

					try {
						await new Promise<void>((resolve, reject) => {
							img.onload = () => {
								ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
			>
		</div>
	{/if}
{/if}

<style>
	button {
		color: var(--color-blue-700);
		text-decoration: underline;
	}
</style>
