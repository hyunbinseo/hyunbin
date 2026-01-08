<script lang="ts">
	import { dev } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
	import '$lib/layout.css';
	import { CodeXml, Github, House, Linkedin } from '@lucide/svelte';
	import suitVariableWoff2 from '@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.woff2?url';
	import favicon from './favicon.png';

	let { children, data } = $props();

	$effect(() => {
		// Reference https://github.com/sveltejs/kit/issues/11018
		document.documentElement.lang = page.data.lang || 'ko';
	});
</script>

<svelte:head>
	{#if page.data.title}
		<title>{page.data.title}</title>
	{/if}
	{#if page.data.description}
		<meta name="description" content={page.data.description} />
	{/if}
	<link
		rel="preload"
		href={suitVariableWoff2}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link rel="canonical" href="https://hyunb.in/" />
	<meta itemprop="lang" content={page.data.lang || 'ko'} />
	{#if page.data.noindex !== false}
		<meta name="robots" content="noindex" />
	{/if}
	{#if page.data.icon !== false}
		<!-- Reference https://github.com/sveltejs/svelte/issues/15337 -->
		<!-- Source https://www.flaticon.com/free-icon/sunfish_1717915 -->
		<link rel="icon" type="image/png" href={favicon} />
	{/if}
	{#if !dev}
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
		<footer class="flex items-center gap-x-4 bg-gray-100 print:hidden">
			<a href={resolve('/')}><House></House></a>
			<a href={PUBLIC_GITHUB} rel="external" target="_blank">
				<Github></Github>
			</a>
			<a href={data.url.source} rel="external" target="_blank">
				<CodeXml></CodeXml>
			</a>
			<a href={PUBLIC_LINKEDIN} rel="external" target="_blank" class="ml-auto">
				<Linkedin></Linkedin>
			</a>
		</footer>
	</div>
{:else}
	{@render children()}
{/if}
