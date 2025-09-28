<script lang="ts">
	import { dev } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
	import GitHub from '$lib/logos/GitHub.svg';
	import LinkedIn from '$lib/logos/LinkedIn.svg';
	import suitVariableWoff2 from '@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.woff2?url';
	import '../app.css';
	import favicon from './favicon.png';

	let { children, data } = $props();

	$effect(() => {
		document.documentElement.lang = page.data.lang || 'ko';
	});
</script>

<svelte:head>
	{#if page.data.title}
		<title>{page.data.title}</title>
	{/if}
	<link rel="preload" href={suitVariableWoff2} as="font" type="font/woff2" />
	<link rel="canonical" href="https://hyunb.in/" />
	<meta itemprop="lang" content={page.data.lang || 'ko'} />
	{#if page.data.noindex !== false}
		<meta name="robots" content="noindex" />
	{/if}
	{#if !dev}
		<!-- https://www.flaticon.com/free-icon/sunfish_1717915 -->
		<link rel="icon" type="image/png" href={favicon} />
		<script defer src="https://assets.onedollarstats.com/stonks.js"></script>
	{/if}
	<script>
		if (!CSS.supports('selector(:has(*)) and selector(&)'))
			alert('지원되지 않는 브라우저입니다. 일부 기능이 작동하지 않을 수 있습니다.');
	</script>
</svelte:head>

{#if page.data.footer !== false}
	<div class="flex min-h-dvh flex-col *:not-print:p-4">
		<main class="flex-1 overflow-y-auto">
			{@render children()}
		</main>
		<footer
			class="flex items-center gap-x-4 overflow-x-auto bg-gray-100 *:flex-shrink-0 *:text-blue-800 print:hidden"
		>
			<a href={resolve('/')}>
				{page.data.lang === 'en' ? 'Home' : '처음으로'}
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={data.url.source} target="_blank" class="mr-auto">
				{page.data.lang === 'en' ? 'Source' : '소스코드'}
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={PUBLIC_GITHUB} target="_blank">
				<img src={GitHub} alt="GitHub" class="h-6" />
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={PUBLIC_LINKEDIN} target="_blank">
				<img src={LinkedIn} alt="LinkedIn" class="h-6" />
			</a>
		</footer>
	</div>
{:else}
	{@render children()}
{/if}
