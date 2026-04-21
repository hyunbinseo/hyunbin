<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import { digits, pipe, safeParse, string, transform } from 'valibot';

	const MINIMUM_WAGES = new Map([
		// [2027, 10_500],
		[2026, 10_320],
	]);

	const FALLBACK_YEAR = MINIMUM_WAGES.keys().next().value!;
	const CURRENT_YEAR = !browser ? null : new Date().getFullYear();

	let BASE_YEAR = $derived.by(() => {
		if (!CURRENT_YEAR) return FALLBACK_YEAR;
		return MINIMUM_WAGES.has(CURRENT_YEAR) ? CURRENT_YEAR : FALLBACK_YEAR;
	});

	const MINIMUM_WAGE = $derived(MINIMUM_WAGES.get(BASE_YEAR));

	let 주_소정근로시간 = $derived.by(() => {
		const parsed = safeParse(
			pipe(string(), digits(), transform(Number)),
			page.url.hash.slice(1), //
		);
		return parsed.success ? parsed.output : 40;
	});
</script>

<StyledLabels>
	<label>
		<select bind:value={BASE_YEAR}>
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each MINIMUM_WAGES as [year]}
				<option value={year}>{year}년</option>
			{/each}
		</select>
		기준 <span class="sr-only">연도</span>
	</label>
	<label>
		주 소정근로시간이 <input
			type="number"
			step="0.25"
			min="0.25"
			max="52"
			size="3"
			bind:value={주_소정근로시간}
			class="mr-0.5 ml-1"
		/>시간이면,
	</label>
</StyledLabels>

{#if 주_소정근로시간}
	<!-- NOTE 대법원은 주휴수당을 계산할 때 1주 소정근로시간 수를 5일로 나눠야 한다고 했다. -->
	<!-- See https://biz.chosun.com/topics/law_firm/2025/10/10/VWMAGNHYZFA7TCDEZSXF3S4XIE/ -->
	{@const 주휴수당_시간 = 주_소정근로시간 >= 15 ? 주_소정근로시간 / 5 : 0}
	<!-- NOTE 고용노동부는 소정근로시간 계산 시 발생하는 소수점 이하의 숫자는 반올림한 후, 임금 등을 계산할 것을 권장하고 있습니다. -->
	<!-- See https://www.shoplworks.com/blog-insight/contractual-working-hours-209-hours-calculation -->
	{@const 월_소정근로시간 = Math.ceil((주_소정근로시간 + 주휴수당_시간) * (365 / 7 / 12))}
	<ul class="mt-2 list-disc space-y-2 pl-6">
		<li>주휴수당 시간: {주휴수당_시간}시간</li>
		<li>월 소정근로시간: {월_소정근로시간}시간 - 반올림됨</li>
		{#if MINIMUM_WAGE}
			<li>최저월급: {(월_소정근로시간 * MINIMUM_WAGE).toLocaleString('ko-KR')}원</li>
		{/if}
	</ul>
{/if}
