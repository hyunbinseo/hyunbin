<script lang="ts">
	import { page } from '$app/state';
	import { isoDate, length, pipe, safeParse, string } from 'valibot';

	let yyyy_mm_dd = $derived.by(() => {
		const parsed = safeParse(
			pipe(string(), length(10), isoDate()),
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

<label>
	생년월일이 <input type="date" bind:value={yyyy_mm_dd} class="mr-0.5 ml-1" />이면,
</label>

만 나이는 <strong>{age || '?'}세</strong>입니다. (오늘 기준)
