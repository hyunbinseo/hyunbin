<script lang="ts">
	import { fly } from 'svelte/transition';
	import { wmoCodeToEmoji } from './index';

	const { data } = $props();

	let departure = $derived(data.forecasts.find(([, code]) => code === 0)?.[0]);
	let arrival = $derived(data.forecasts.findLast(([, code]) => code === 0)?.[0]);
</script>

<div class="mx-auto w-fit">
	<table>
		<thead>
			<tr>
				<th>날짜</th>
				<th>날씨</th>
				<th>출발</th>
				<th>도착</th>
			</tr>
		</thead>
		<tbody>
			{#each data.forecasts as [date, code] (date)}
				<tr>
					<td>{date}</td>
					<td>{wmoCodeToEmoji(code)}</td>
					<td>
						<input type="radio" name="departure" bind:group={departure} value={date} required />
					</td>
					<td>
						<input type="radio" name="arrival" bind:group={arrival} value={date} required />
					</td>
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
					`/a:CJU-c:SEL-${arrival.replaceAll('-', '')}`}
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
