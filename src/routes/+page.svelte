<script>
	import { PUBLIC_EMAIL, PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
</script>

<main class="p-4">
	<h1 class="text-2xl font-bold">안녕하세요!</h1>
	<p class="mt-2">
		<a href={PUBLIC_GITHUB} target="_blank">오픈소스 개발자</a>,
		<a href={PUBLIC_LINKEDIN} target="_blank">창업가</a>
		서현빈입니다.
	</p>

	<ul class="mt-8 list-disc space-y-2.5 pl-4">
		<li>
			<a href="mailto:{PUBLIC_EMAIL}">이메일</a> /
			<a href={PUBLIC_GITHUB} target="_blank">GitHub</a> /
			<a href={PUBLIC_LINKEDIN} target="_blank">LinkedIn</a>
		</li>
		<li>
			<a href="{PUBLIC_GITHUB}/holidays-kr#readme" target="_blank">대한민국의 공휴일</a>
			<span>구독용 캘린더, JS, JSON 등</span>
		</li>
		<li>
			<a href="https://jamoya.one/" target="_blank">자모야 모여라</a>
			<span>한글 파일명 <span aria-label="자소">ㅈㅏㅅㅗ</span> 분리 문제 해결</span>
		</li>
		<li>
			<a href="/markdown-to-sticky-notes">목록을 메모지로 변환</a>
			<span>쓰지 말고 인쇄해 자르세요.</span>
		</li>
		<li>
			<a href="https://github.com/hyunbinseo/better-surf#readme" target="_blank">Better Surf</a>
			<span>더 나은 웹 서핑을 위한 확장 프로그램</span>
		</li>
		<li>
			<a href="/bookmarklets">Bookmarklets</a>
			<span>북마크에 끌어놓고 쓰는 유틸리티</span>
		</li>
	</ul>
</main>

<style>
	@reference "$app.css";
	a {
		@apply underline underline-offset-4 hover:decoration-2;
	}
	li > a + span {
		@apply text-xs text-gray-500 before:content-['/\00a0'];
	}
</style>
