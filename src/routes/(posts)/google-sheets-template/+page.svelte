<script lang="ts">
	const { data } = $props();
</script>

{#snippet checkbox(label: string, checked = true)}
	<li>
		<label>
			<input type="checkbox" {checked} disabled={checked} />
			<span>{label}</span>
		</label>
	</li>
{/snippet}

<h1 class="text-2xl font-bold">{data.title}</h1>
<a
	href="https://docs.google.com/spreadsheets/d/1L49Pv939JcWfxnmfHFUncMshtmTZ6VljmXkA-ChqUm0/copy"
	target="_blank"
	class="mt-0.5 inline-block text-blue-700 underline"
>
	양식 복사하기
</a>

<h3 class="mt-6 text-lg font-bold">적용 기능</h3>
<ul class="mt-0.5">
	{@render checkbox('연번 자동 입력')}
	{@render checkbox('앞뒤 공백 경고 (조건부 서식)')}
</ul>

<h3 class="mt-6 text-lg font-bold">적용 내역</h3>
<ul class="mt-0.5">
	{@render checkbox('글꼴 / Noto Sans KR')}
	{@render checkbox('열 크기 조정 / 데이터에 맞추기')}
	{@render checkbox('미사용 행⋅열 일괄 삭제')}
	{@render checkbox('서식 / 교차 색상')}
	{@render checkbox('보기 / 고정 / 행 1개')}
	{@render checkbox('보기 / 고정 / 열 2개', false)}
	{@render checkbox('삽입 / 표 생성 (필터 제공)', false)}
</ul>

<h3 class="mt-6 text-lg font-bold">미리 보기</h3>
<iframe
	title={data.title}
	width="400"
	height="320"
	src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRnllVlPYOGzRsSh--jfwppxdaucRBeBnWe9TE8h6PtOVbplbCSuuYcXd6UKhcE9er_9EmEUNWYZpz3/pubhtml?widget=true&amp;headers=false"
></iframe>

<style>
	label {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
	}
	input[type='checkbox']:disabled {
		background-color: var(--color-gray-400);
	}
</style>
