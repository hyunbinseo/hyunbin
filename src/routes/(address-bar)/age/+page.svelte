<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	let date = $state(
		!browser
			? undefined
			: (() => {
					const entry = page.url.searchParams.entries().next().value;
					if (!entry || !/^\d{4}-\d{2}-\d{2}$/.test(entry[0])) return;
					return entry[0];
				})(),
	);

	const age = $derived(
		date &&
			(() => {
				const birth = new Date(date);
				const today = new Date();
				return (
					today.getFullYear() -
					birth.getFullYear() -
					(today.getMonth() < birth.getMonth() ||
					(today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
						? 1
						: 0)
				);
			})(),
	);
</script>

<label>
	생년월일이 <input bind:value={date} type="date" />이면,
</label>
만 나이는 <strong>{age || '?'}세</strong>입니다. (오늘 기준)
