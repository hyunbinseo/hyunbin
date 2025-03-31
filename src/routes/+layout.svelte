<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
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

<div class="flex min-h-screen flex-col *:p-4">
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
	<footer class="bg-gray-200 text-right *:text-blue-800">
		<a href="mailto:public@hyunbin.cc">이메일</a>,
		<a href="https://www.linkedin.com/in/hyunbinseo/" target="_blank">LinkedIn</a>,
		<a href="https://github.com/hyunbinseo/" target="_blank">GitHub</a>
		{#if page.url.pathname !== '/'}
			{@const href =
				'https://github.com/hyunbinseo/hyunbin.cc/tree/main/src/routes' + page.route.id}
			/ <a {href} target="_blank">Source</a>
		{/if}
	</footer>
</div>
