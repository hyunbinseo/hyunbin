<script>
	import { resolve } from '$app/paths';
	import { EMAIL_ADDRESS, GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '$lib/constants';

	let showHiddenMenu = $state(false);
</script>

<main class="p-4">
	<h1 class="text-2xl font-bold">안녕하세요!</h1>
	<p class="mt-2">
		<a href={GITHUB_PROFILE_URL} rel="external" target="_blank">오픈소스 개발자</a>,
		<a href={LINKEDIN_PROFILE_URL} rel="external" target="_blank">창업가</a>
		서현빈입니다.
	</p>

	<ul class="mt-8 list-disc space-y-2.5 pl-4">
		<li>
			<a href="mailto:{EMAIL_ADDRESS}">이메일</a> /
			<a href={GITHUB_PROFILE_URL} rel="external" target="_blank">GitHub</a> /
			<a href={LINKEDIN_PROFILE_URL} rel="external" target="_blank">LinkedIn</a>
		</li>
		<li class:hidden={!showHiddenMenu}>
			<a href={resolve('/demos')}>Open Source Demos</a> /
			<a href={resolve('/examples')}>Examples</a>
		</li>
		<li>
			<a href="{GITHUB_PROFILE_URL}/holidays-kr#readme" rel="external" target="_blank">
				대한민국의 공휴일
			</a>
			<span>구독용 캘린더, JS, JSON 등</span>
		</li>
		<li>
			<a href="https://jamoya.one/" target="_blank">자모야 모여라</a>
			<span>한글 파일명 <span aria-label="자소">ㅈㅏㅅㅗ</span> 분리 문제 해결</span>
		</li>
		<li>
			<a href={resolve('/markdown-to-print')}>마크다운 인쇄용으로 변환</a>
			<span>PDF, 해시 생성 등</span>
		</li>
		<li>
			<a href={resolve('/google-sheets-template')}>구글 스프레드시트 템플릿</a>
			<span>연번 자동 입력 등</span>
		</li>
		<li>
			<a href={resolve('/qr')}>QR 코드 생성</a>
			<span>광고 없음. PNG, SVG(벡터) 저장</span>
		</li>
		<li>
			<a href="https://github.com/hyunbinseo/better-surf#readme" target="_blank">Better Surf</a>
			<span>더 나은 웹 서핑을 위한 확장 프로그램</span>
		</li>
		<li>
			<a href={resolve('/bookmarklets')}>Bookmarklets</a>
			<span>북마크에 끌어놓고 쓰는 유틸리티</span>
		</li>
		<li>
			<a href={resolve('/markdown-to-sticky-notes')}>목록을 메모지로 변환</a>
			<span>쓰지 말고 인쇄해 자르세요.</span>
		</li>
	</ul>
</main>

<button
	aria-hidden="true"
	type="button"
	class="fixed right-0 bottom-0 size-16"
	ondblclick={() => (showHiddenMenu = true)}
>
</button>

<style>
	a {
		text-decoration-line: underline;
		text-underline-offset: 4px;
		&:hover {
			@media (hover: hover) {
				text-decoration-thickness: 2px;
			}
		}
	}
	li > a + span {
		font-size: var(--text-xs);
		color: var(--color-gray-500);
		&::before {
			content: '/\00a0';
		}
	}
</style>
