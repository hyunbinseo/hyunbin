<script>
	import { PUBLIC_EMAIL, PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
</script>

<svelte:head>
	<title>서현빈 | Hyunbin Seo</title>
</svelte:head>

<h1 class="text-2xl font-bold">안녕하세요!</h1>
<p class="mt-2">
	<a href={PUBLIC_GITHUB}>오픈소스 개발자</a>,
	<a href={PUBLIC_LINKEDIN}>창업가</a>
	서현빈입니다.
</p>

<ul class="mt-8 list-inside list-disc space-y-1.5">
	<li>
		<a href="mailto:{PUBLIC_EMAIL}">이메일</a>,
		<a href={PUBLIC_LINKEDIN}>LinkedIn</a>
	</li>
	<li><a href="{PUBLIC_GITHUB}/holidays-kr#readme">대한민국의 공휴일</a></li>
	<li><a href="https://jamoya.one/">자모야 모여라</a></li>
	<li><a href="/bookmarklets">Bookmarklets</a></li>
</ul>

<style>
	@reference "$app.css";
	a {
		@apply underline underline-offset-4 hover:decoration-2;
	}
</style>
