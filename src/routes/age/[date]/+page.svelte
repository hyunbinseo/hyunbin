<script lang="ts">
	const { data } = $props();

	let date = $state(data.date);

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
