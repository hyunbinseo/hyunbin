<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_EMAIL, PUBLIC_GITHUB, PUBLIC_LINKEDIN } from '$env/static/public';
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
</svelte:head>

{#if page.url.pathname !== '/'}
	<div class="flex min-h-screen flex-col *:p-4">
		<main class="flex-1 overflow-y-auto">
			{@render children()}
		</main>
		<footer class="bg-gray-200 text-right *:text-blue-800">
			<a href="mailto:{PUBLIC_EMAIL}">이메일</a>,
			<a href={PUBLIC_LINKEDIN} target="_blank">LinkedIn</a>,
			<a href={PUBLIC_GITHUB} target="_blank">GitHub</a>,
			<a href="{PUBLIC_GITHUB}/hyunbin.cc/tree/main/src/routes{page.route.id}" target="_blank">
				Source
			</a>
		</footer>
	</div>
{:else}
	<main class="p-4">
		{@render children()}
	</main>
{/if}
