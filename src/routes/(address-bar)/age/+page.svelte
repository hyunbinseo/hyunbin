<script lang="ts">
	import { page } from '$app/state';
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import { digits, isoDate, length, pipe, safeParse, string, transform, union } from 'valibot';

	let yyyy_mm_dd = $derived.by(() => {
		const parsed = safeParse(
			union([
				pipe(string(), length(10), isoDate()),
				pipe(
					string(),
					digits(),
					length(6),
					transform((input) => {
						const yy = input.slice(0, 2);
						const mm = input.slice(2, 4);
						const dd = input.slice(4, 6);

						const actualYY = Number(yy);
						const currentYY = new Date().getFullYear() % 100;

						return (actualYY < currentYY ? '20' : '19') + `${yy}-${mm}-${dd}`;
					}),
					isoDate(),
				),
			]),
			page.url.hash.slice(1), //
		);
		return parsed.success ? parsed.output : null;
	});

	const age = $derived.by(() => {
		if (!yyyy_mm_dd) return;
		const birth = new Date(yyyy_mm_dd);
		const today = new Date();
		return (
			today.getFullYear() -
			birth.getFullYear() -
			(today.getMonth() < birth.getMonth() ||
			(today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
				? 1
				: 0)
		);
	});
</script>

<StyledLabels>
	<label>
		생년월일이 <input type="date" bind:value={yyyy_mm_dd} class="mr-0.5 ml-1" />이면,
	</label>
</StyledLabels>

만 나이는 <strong>{age || '?'}세</strong>입니다. (오늘 기준)
