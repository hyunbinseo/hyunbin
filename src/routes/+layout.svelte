<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
	import GitHub from '$lib/logos/GitHub.svg';
	import LinkedIn from '$lib/logos/LinkedIn.svg';
	import '../app.css';
	import favicon from './favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href="https://hyunbin.cc/" />
	<meta name="robots" content="noindex" />
	{#if !dev}
		<link rel="icon" type="image/svg+xml" href={favicon} />
		<script defer src="https://assets.onedollarstats.com/stonks.js"></script>
	{/if}
	<script>
		if (!CSS.supports('selector(:has(*)) and selector(&)'))
			alert('지원되지 않는 브라우저입니다. 일부 기능이 작동하지 않을 수 있습니다.');
	</script>
</svelte:head>

{#if page.data.footer !== false}
	<div class="flex min-h-dvh flex-col *:p-4">
		<main class="flex-1 overflow-y-auto">
			{@render children()}
		</main>
		<footer
			class="flex items-center gap-x-4 overflow-x-auto bg-gray-100 *:flex-shrink-0 *:text-blue-800"
		>
			<a href="/">처음으로</a>
			<a
				href="{PUBLIC_GITHUB}/hyunbin.cc/tree/main/src/routes{page.route.id}"
				target="_blank"
				class="mr-auto"
			>
				소스코드
			</a>
			<a href={PUBLIC_GITHUB} target="_blank">
				<img src={GitHub} alt="GitHub" class="h-6" />
			</a>
			<a href={PUBLIC_LINKEDIN} target="_blank">
				<img src={LinkedIn} alt="LinkedIn" class="h-6" />
			</a>
		</footer>
	</div>
{:else}
	{@render children()}
{/if}
