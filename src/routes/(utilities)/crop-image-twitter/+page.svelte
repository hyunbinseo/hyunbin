<script lang="ts">
	import StyledLabels from '$lib/components/StyledLabels.svelte';

	const { data } = $props();

	const TARGET_ASPECT = 8 / 9;

	let bitmap = $state<ImageBitmap>();

	let canvasCount = $derived.by(() => {
		if (!bitmap) return 0;
		if (position !== '분할') return 1;
		if (bitmap.width / bitmap.height < TARGET_ASPECT) {
			const targetHeight = Math.floor(bitmap.width / TARGET_ASPECT);
			return Math.ceil(bitmap.height / targetHeight);
		} else {
			const targetWidth = Math.floor(bitmap.height * TARGET_ASPECT);
			return Math.ceil(bitmap.width / targetWidth);
		}
	});

	let canvases = $state<HTMLCanvasElement[]>([]);

	// NOTE HEIF and HEIC are only supported by Safari as of 2025-10.
	const mimeTypes = [
		'image/jpeg', //
		'image/gif',
		'image/png',
		'image/webp',
		'image/avif',
	] as const;
	const mimeTypeSet = new Set(mimeTypes);
	type MimeType = (typeof mimeTypes)[number];

	const positions = ['분할', '시작', '가운데', '끝'] as const;
	type Position = (typeof positions)[number];
	let position = $state<Position>('가운데');

	$effect(() => {
		for (let i = 0; i < canvasCount; i += 1) {
			if (!canvases[i]) return;
		}

		if (!bitmap) return;
		const imageAspect = bitmap.width / bitmap.height;

		if (position === '분할') {
			if (imageAspect < TARGET_ASPECT) {
				const targetHeight = Math.floor(bitmap.width / TARGET_ASPECT);

				for (let i = 0; i < canvasCount; i += 1) {
					const canvas = canvases[i]!;
					canvas.width = bitmap.width;
					canvas.height = targetHeight;

					const ctx = canvas.getContext('2d')!;
					const sy = i * targetHeight;
					const sh = Math.min(targetHeight, bitmap.height - sy);

					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(bitmap, 0, sy, bitmap.width, sh, 0, 0, bitmap.width, sh);
				}
			} else {
				const targetWidth = Math.floor(bitmap.height * TARGET_ASPECT);

				for (let i = 0; i < canvasCount; i += 1) {
					const canvas = canvases[i]!;
					canvas.width = targetWidth;
					canvas.height = bitmap.height;

					const ctx = canvas.getContext('2d')!;
					const sx = i * targetWidth;
					const sw = Math.min(targetWidth, bitmap.width - sx);

					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(bitmap, sx, 0, sw, bitmap.height, 0, 0, sw, bitmap.height);
				}
			}
			return;
		}

		const canvas = canvases[0]!;
		let dx: number, dy: number;

		if (imageAspect > TARGET_ASPECT) {
			canvas.height = bitmap.height;
			canvas.width = Math.floor(canvas.height * TARGET_ASPECT);
			dy = 0;
			dx =
				position === '가운데'
					? -(bitmap.width - canvas.width) / 2
					: position === '끝'
						? -(bitmap.width - canvas.width)
						: 0;
		} else {
			canvas.width = bitmap.width;
			canvas.height = Math.floor(canvas.width / TARGET_ASPECT);
			dx = 0;
			dy =
				position === '가운데'
					? -(bitmap.height - canvas.height) / 2
					: position === '끝'
						? -(bitmap.height - canvas.height)
						: 0;
		}

		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bitmap, dx, dy);
	});

	const handleDropOrPaste = (items?: DataTransferItemList) => {
		for (const item of items ?? []) {
			if (item.kind !== 'file' || !mimeTypeSet.has(item.type as MimeType)) continue;

			const file = item.getAsFile();
			if (!file) continue;

			// NOTE for-await loop does not work in
			// Firefox Desktop's paste handler (143.0.4)
			createImageBitmap(file).then((_bitmap) => (bitmap = _bitmap));
			return;
		}
		window.alert('유효한 이미지를 찾지 못했습니다.');
	};
</script>

<svelte:window
	onkeydown={(e) => {
		if (!bitmap) return;
		if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
			canvases[0]?.toBlob((blob) => {
				if (!blob) return;
				navigator.clipboard
					.write([new ClipboardItem({ [blob.type]: blob })])
					.then(() => window.alert('복사되었습니다.'))
					.catch((e) => {
						console.error(e);
						window.alert('클립보드에 복사할 수 없습니다.');
					});
			}, 'image/png');
		}
	}}
	ondragover={(e) => e.preventDefault()}
	ondrop={(e) => {
		e.preventDefault();
		handleDropOrPaste(e.dataTransfer?.items);
	}}
	onpaste={(e) => handleDropOrPaste(e.clipboardData?.items)}
/>

<hgroup>
	<h1 class="text-2xl font-extrabold">{data.title}</h1>
	<p>두 장 올릴 때 잘리지 않도록 8:9 비율로</p>
</hgroup>
<dl class="mt-6">
	<dt>이미지 파일을 선택하거나,</dt>
	<dd>
		<input
			type="file"
			accept={mimeTypes.join(', ')}
			onchange={async (e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;
				bitmap = await createImageBitmap(file);
			}}
			class="rounded border px-1 py-0.5 text-xs"
		/>
	</dd>
	<dt class="mt-6">이미지를 붙여 넣으세요.</dt>
	<dd class="mt-0.5 flex items-center gap-x-1">
		<svelte:boundary>
			{@const message = '여기에 붙여 넣거나'}
			<div
				contenteditable="true"
				onpaste={(e) => e.preventDefault()}
				oninput={(e) => (e.currentTarget.textContent = message)}
				class="rounded border px-1 py-0.5 text-xs"
			>
				{message}
			</div>
		</svelte:boundary>
		<span class="text-sm">키보드 단축키 사용</span>
	</dd>
</dl>

<StyledLabels>
	<fieldset class="mt-6">
		<legend>기준(정렬)</legend>
		<div
			class={[
				'mt-1 flex gap-x-3.5 gap-y-1', //
				bitmap && bitmap.height > bitmap.width && 'flex-col',
			]}
		>
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each positions as _position}
				<label>
					<input type="radio" value={_position} bind:group={position} />
					<span>{_position}</span>
				</label>
			{/each}
		</div>
	</fieldset>
</StyledLabels>

<div
	class={[
		'mt-6 flex gap-4 overflow-x-auto *:shrink-0',
		bitmap && bitmap.width / bitmap.height > TARGET_ASPECT ? 'flex-row' : 'flex-col',
	]}
>
	{#each { length: canvasCount }, index}
		<div class="relative w-fit">
			<canvas bind:this={canvases[index]} class={['w-full max-w-96 border']}></canvas>
			<button
				type="button"
				onclick={({ currentTarget }) => {
					// NOTE Does not work in Firefox Android (143.0.4)
					// DOMException: Clipboard write is not allowed.
					canvases[index]?.toBlob((blob) => {
						if (!blob) return;
						navigator.clipboard
							.write([new ClipboardItem({ [blob.type]: blob })])
							.then(() => (currentTarget.disabled = true))
							.catch((e) => {
								console.error(e);
								window.alert('클립보드에 복사할 수 없습니다.');
							})
							.finally(() => {
								setTimeout(() => (currentTarget.disabled = false), 2000);
							});
					}, 'image/png');
				}}
				class="absolute top-0 right-0 rounded-bl border bg-white px-2 py-1 text-sm disabled:after:content-['되었습니다!']"
				>복사</button
			>
		</div>
	{/each}
</div>

<style>
	dt,
	legend {
		font-weight: var(--font-weight-bold);
	}
</style>
