<script lang="ts">
	import { snuLibraryProxy, snuSugangEnter } from './functions';
</script>

<svelte:head>
	<title>Bookmarklets</title>
</svelte:head>

{#snippet anchor(label: string, fn: () => void)}
	<a href={`javascript:((${fn.toString()})())`}>
		{label}
	</a>
{/snippet}

<p>북마크바에 끌어놓아 추가합니다:</p>
<ul class="mt-3 space-y-3">
	<li>{@render anchor('서울대 도서관 학외 접속', snuLibraryProxy)}</li>
	<li>{@render anchor(`서울대 수강신청 '이미 프로그램 사용 중' 우회`, snuSugangEnter)}</li>
</ul>

<style>
	@reference "$app.css";
	ul > li > a {
		@apply inline-block rounded border p-2;
	}
</style>
