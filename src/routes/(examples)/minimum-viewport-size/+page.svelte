<script lang="ts">
	const required = { w: 768, h: 576 } as const;
	const actual = $state({ w: 0, h: 0 });
</script>

<svelte:window bind:innerWidth={actual.w} bind:innerHeight={actual.h} />

<h1 class="text-xl font-bold">화면(창)이 요구사항을 만족합니다.</h1>
<p>뷰포트 크기를 줄여보세요.</p>

<div class="fixed inset-0 z-50 bg-white p-4">
	<h1 class="text-xl font-bold">화면(창)이 요구사항보다 작습니다.</h1>
	<p class="landscape:hidden">기기를 가로로 회전해 보시기 바랍니다.</p>
	<dl class="mt-6">
		<dt class="text-lg font-bold">요구사항</dt>
		<dd class="landscape:hidden">가로가 세로보다 길어야 함</dd>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each ['w', 'h'] as const as type}
			{#if actual[type] && actual[type] < required[type]}
				<dd>
					{type === 'h' ? '세로' : '가로'}: {required[type]}px
					<span class="text-red-700">
						(현재: {actual[type]}px)
					</span>
				</dd>
			{/if}
		{/each}
	</dl>
</div>

<style lang="postcss">
	.fixed.inset-0 {
		@media (orientation: landscape) and (width >= 768px) and (height >= 576px) {
			display: none;
		}
	}
</style>
