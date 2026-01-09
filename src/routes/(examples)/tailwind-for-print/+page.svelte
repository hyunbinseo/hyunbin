<script lang="ts">
	import 정관 from '$lib/static/정관.html?raw';

	const { data } = $props();
</script>

<div class="*:mx-auto *:w-full *:max-w-(--breakpoint-a4) not-print:bg-gray-200 not-print:py-16">
	<header class="mb-4 max-a4:text-center print:hidden">
		<span>문서/인쇄에 최적화된 Tailwind CSS</span>
		<span>/</span>
		<a
			href={data.url.source}
			rel="external"
			target="_blank"
			class="whitespace-nowrap text-blue-800"
		>
			소스코드
		</a>
	</header>
	<div
		class={[
			// Tailwind CSS Typography Plugin
			'prose max-w-none *:*:first:mt-0',
			// 0.5in = 3rem (1in = 2.54cm = 96px)
			'[--page-padding:1rem] sm:[--page-padding:1.5rem] a4:[--page-padding:3rem]',
			'flex flex-col gap-y-[max(2rem,var(--page-padding))]',
			'*:break-after-page *:not-print:bg-white *:not-print:p-(--page-padding) *:not-print:a4:min-h-[29.7cm]',
		]}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html 정관}
	</div>
</div>

<style>
	@page {
		size: A4 portrait;
		margin: 0.5in;
	}
</style>
