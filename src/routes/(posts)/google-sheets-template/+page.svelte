<script lang="ts">
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import { googleSheetsTemplateUrl as href } from '.';

	const { data } = $props();

	const features = [
		'연번 자동 입력',
		'연속 공백 경고',
		'셀/줄 앞뒤 공백 경고', //
	];

	const changes = [
		'글꼴 / Noto Sans KR',
		'열 크기 조정 / 데이터에 맞추기',
		'미사용 행⋅열 일괄 삭제',
		'서식 / 교차 색상',
		'보기 / 고정 / 행 1개',
	];
</script>

{#snippet checkbox(label: string)}
	<label>
		<input type="checkbox" checked disabled />
		<span>{label}</span>
	</label>
{/snippet}

<h1 class="text-2xl font-bold">{data.title}</h1>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} target="_blank" class="mt-1 inline-block text-blue-700 underline">양식 복사하기</a>

<h2 class="mt-6 text-lg font-bold">적용 기능</h2>
<StyledLabels>
	<ul class="mt-0.5">
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each features as feature}
			<li>{@render checkbox(feature)}</li>
		{/each}
	</ul>
</StyledLabels>

<h2 class="mt-6 text-lg font-bold">적용 내역</h2>
<StyledLabels>
	<ul class="mt-0.5">
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each changes as change}
			<li>{@render checkbox(change)}</li>
		{/each}
	</ul>
</StyledLabels>

<h2 class="mt-6 text-lg font-bold">미리 보기</h2>
<iframe
	title={data.title}
	width="400"
	height="320"
	src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRnllVlPYOGzRsSh--jfwppxdaucRBeBnWe9TE8h6PtOVbplbCSuuYcXd6UKhcE9er_9EmEUNWYZpz3/pubhtml?widget=true&amp;headers=false"
></iframe>

<p class="mt-6 font-bold">전역에 적용된 조건부 서식:</p>
<pre class="mt-1 w-fit border p-2">{String.raw`=OR(
  REGEXMATCH(A1, "\s{2,}"),
  REGEXMATCH(A1, "(?m)^\s|\s$")
)`}</pre>
