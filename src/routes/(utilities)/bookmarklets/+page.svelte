<script lang="ts">
	import {
		copyZwsp,
		generatePINString,
		getViewportSize,
		normalizeString,
		snuLibraryProxy,
		snuSugangEnter,
	} from './functions';
</script>

{#snippet anchor(label: string, fn: () => void)}
	<a href={`javascript:((${fn.toString()})())`}>
		{label}
	</a>
{/snippet}

<p>북마크바에 끌어놓아 추가할 수 있습니다.</p>
<ul class="mt-3 space-y-3">
	<li>{@render anchor('무작위 숫자 비밀번호 생성', generatePINString)}</li>
	<li>{@render anchor('뷰포트 크기 확인', getViewportSize)}</li>
	<li>{@render anchor('폭 없는 공백 (ZWSP) 복사', copyZwsp)}</li>
	<li>{@render anchor('한글 자소 분리 해결 ⭐', normalizeString)}</li>
	<!-- 서울대학교 -->
	<li>{@render anchor(`서울대 도서관 학외 접속`, snuLibraryProxy)}</li>
	<li>{@render anchor(`서울대 수강신청 '이미 프로그램 사용 중' 우회`, snuSugangEnter)}</li>
</ul>

<style lang="postcss">
	@reference "$app.css";
	ul > li > a {
		@apply inline-block rounded border p-2;
		font-size: 0.9375rem;
	}
</style>
