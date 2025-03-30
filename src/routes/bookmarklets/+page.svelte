<script lang="ts">
	import snuLibraryProxy from './snu-library-proxy.js?raw';
	import snuSugangEnter from './snu-sugang-enter.js?raw';
</script>

<svelte:head>
	<title>Bookmarklets</title>
</svelte:head>

{#snippet anchor(label: string, fn: string)}
	<a href={`javascript:(function(){${fn}}());`}>
		{label}
	</a>
{/snippet}

<p>북마크바에 끌어놓아 추가합니다:</p>
<ul class="mt-3 space-y-3">
	<li>{@render anchor('서울대 도서관 학외 접속', snuLibraryProxy)}</li>
	<li>{@render anchor('서울대 수강신청 프로그램 사용 중 우회', snuSugangEnter)}</li>
</ul>

<style>
	@reference "$app.css";
	ul > li > a {
		@apply inline-block rounded border p-2;
	}
</style>
