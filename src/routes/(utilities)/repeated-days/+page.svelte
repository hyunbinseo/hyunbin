<script lang="ts">
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import { days, formatDateString, getDates } from '.';

	let startDate = formatDateString({ date: new Date() });
	let selectedDays = [1, 3, 5];

	let options = {
		excludeHolidays: true,
		limitToCurrentMonth: true,
		includeNumbering: false,
	};

	// Should work regardless of system time-zone.
	$: dates = getDates({
		startDate,
		selectedDays,
		excludeHolidays: options.excludeHolidays,
		limitToCurrentMonth: options.limitToCurrentMonth,
		totalCount: 50, // TODO Limit to next year, stop if errored.
	});
</script>

<StyledLabels>
	<form onsubmit={(e) => e.preventDefault()} class="flex flex-col gap-y-4 *:w-fit">
		<label>
			<span>시작 날짜</span>
			<input bind:value={startDate} type="date" min="{new Date().getFullYear()}-01-01" />
		</label>
		<fieldset>
			<legend>요일</legend>
			<div class="flex gap-x-4">
				<!-- eslint-disable-next-line svelte/require-each-key -->
				{#each days as text, index}
					<label>
						<input bind:group={selectedDays} type="checkbox" value={index} />
						<span>{text}</span>
					</label>
				{/each}
			</div>
		</fieldset>
		<fieldset>
			<legend>설정</legend>
			<label>
				<input type="checkbox" bind:checked={options.excludeHolidays} />
				<span>공휴일 제외</span>
			</label>
			<label>
				<input type="checkbox" bind:checked={options.limitToCurrentMonth} />
				<span>이번 달만 생성</span>
			</label>
			<label>
				<input type="checkbox" bind:checked={options.includeNumbering} />
				<span>연번 (1. 2. 3. …)</span>
			</label>
		</fieldset>
		<label>
			<span>생성 날짜 (총 {dates.length}일)</span>
			<textarea
				value={dates
					.map((date, index) => (options.includeNumbering ? `${index + 1}. ${date}` : date))
					.join('\n')}
				rows={dates.length + 1}
				cols={18}
				readonly
				class="resize-none"
			></textarea>
		</label>
	</form>
</StyledLabels>

<style>
	fieldset {
		border-style: solid;
		border-width: 1px;
		padding: calc(var(--spacing) * 4);
		padding-top: calc(var(--spacing) * 2);
		> legend {
			margin-left: calc(var(--spacing) * -2);
			padding-inline: calc(var(--spacing) * 2);
		}
	}
</style>
