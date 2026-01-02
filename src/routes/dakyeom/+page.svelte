<script lang="ts">
	type Event = [`${number}-${number}-${number}`, string];

	const events: Event[] = [
		['2024-09-04', '산학연구실습을 함께 수강 🧡'],
		['2025-01-01', '현빈 님의 첫 트윗 답글'],
		['2025-03-27', '처음으로 둘이 만남!'],
		['2025-05-02', '다겸이가 고백 💚'],
		['2025-05-06', '0일 (1일) 💚'],
		['2025-08-09', '0일부터 세기로 변경'],
		['2025-08-14', '100일 💚'],
	];
</script>

<dl>
	{#each events, index}
		{@const reverseIndex = events.length - 1 - index}
		{@const [yyyy_mm_dd, title] = events[reverseIndex]!}
		<dt>
			<time datetime={yyyy_mm_dd}>{yyyy_mm_dd}</time>
		</dt>
		<dd>{title}</dd>
	{/each}
</dl>

<style>
	dt {
		font-variant-numeric: tabular-nums;
		font-weight: var(--font-weight-bold);
		&:not(:first-child) {
			margin-top: calc(var(--spacing) * 2);
		}
	}
</style>
