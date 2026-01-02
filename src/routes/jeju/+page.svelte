<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getForecasts, type Forecasts } from './fetch';
	import { wmoCodeToEmoji } from './index';

	let forecasts = $state<Forecasts>();

	onMount(async () => {
		forecasts = await getForecasts();
	});

	let departure = $derived(forecasts && forecasts.find(([, code]) => code === 0)?.[0]);
	let arrival = $derived(forecasts && forecasts.findLast(([, code]) => code === 0)?.[0]);

	const formatter = new Intl.DateTimeFormat('ko-KR', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		weekday: 'short',
	});
</script>

<div class="mx-auto w-fit">
	<table>
		{#if forecasts}
			<thead>
				<tr>
					<th>날짜</th>
					<th>날씨</th>
					<th>출발</th>
					<th>도착</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each forecasts as [yyyy_mm_dd, code] (yyyy_mm_dd)}
				{@const date = new Date(yyyy_mm_dd)}
				<tr>
					<td>{formatter.format(date)}</td>
					<td>{wmoCodeToEmoji(code)}</td>
					<td>
						<input
							type="radio"
							name="departure"
							bind:group={departure}
							value={yyyy_mm_dd}
							required
						/>
					</td>
					<td>
						<input type="radio" name="arrival" bind:group={arrival} value={yyyy_mm_dd} required />
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4">데이터를 불러오는 중입니다.</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#if departure && arrival}
		<div
			transition:fly={{ y: 10 }}
			class="mt-2.5 flex gap-x-2.5 *:flex-1 *:rounded *:p-2 *:text-center *:text-sm *:font-bold *:text-white"
		>
			<a
				href={'https://flight.naver.com/flights/domestic' +
					`/GMP-CJU-${departure.replaceAll('-', '')}` +
					`/CJU-GMP-${arrival.replaceAll('-', '')}`}
				target="_blank"
				class="bg-[#03C75A]">네이버 항공권</a
			>
			<a
				href={'https://tour.yanolja.com/air/search' +
					`/c:SEL-a:CJU-${departure.replaceAll('-', '')}` +
					`/a:CJU-c:SEL-${arrival.replaceAll('-', '')}` +
					'?cabin=ALL&adult=1'}
				target="_blank"
				class="bg-[#3549FF]">NOL 항공권</a
			>
		</div>
	{/if}
</div>

<style>
	th,
	td {
		padding-inline: calc(var(--spacing) * 2);
		padding-block: calc(var(--spacing) * 1);
	}
	td {
		text-align: center;
		&:first-child {
			font-variant-numeric: tabular-nums;
			letter-spacing: var(--tracking-tight);
		}
	}
</style>
