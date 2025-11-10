<script lang="ts">
	// NOTE Galaxy Tab A9's (8.7in) viewport is 1006 x 433px
	// NOTE Should be updated on the CSS media query as well
	const required = { w: 576, h: 432 } as const;
	const viewport = $state({ w: 0, h: 0 });
</script>

<!-- NOTE The values are rounded (575.5px becomes 576) -->
<svelte:window bind:innerWidth={viewport.w} bind:innerHeight={viewport.h} />

<div class="valid-viewport:hidden fixed inset-0 z-50 bg-white p-4">
	<h1 class="text-xl font-bold text-red-700">화면(창)이 요구사항보다 작습니다.</h1>
	<p class="landscape:hidden">기기를 가로로 회전해 보시기 바랍니다.</p>
	<dl class="mt-6">
		<dt class="text-lg font-bold">요구사항</dt>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each ['w', 'h'] as const as type}
			{#if viewport[type]}
				<dd>
					{type === 'h' ? '세로' : '가로'}: {required[type]}px
					{#if viewport[type] < required[type]}
						<span class="text-red-700">
							(현재: {viewport[type]}px)
						</span>
					{/if}
				</dd>
			{/if}
		{/each}
	</dl>
</div>

<div class="fixed inset-0 grid place-items-center bg-gray-200">
	<main class="bg-white p-4" style:aspect-ratio="{required.w}/{required.h}">
		<h1 class="text-xl font-bold">화면(창)이 요구사항을 만족합니다.</h1>
		<p>뷰포트 크기를 줄여보세요.</p>
	</main>
</div>

<style lang="postcss">
	@media (min-width: 576px) and (min-height: 432px) {
		.valid-viewport\:hidden {
			display: none;
		}
	}
	main {
		@media (min-aspect-ratio: 4/3) {
			height: 100%;
		}
		@media (max-aspect-ratio: 4/3) {
			width: 100%;
		}
	}
</style>
