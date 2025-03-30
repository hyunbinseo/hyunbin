<script lang="ts">
	import '../app.css';
	import favicon from './favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href="https://pages.hyunbin.cc/" />
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen flex-col *:p-4">
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
	<footer class="bg-gray-200 text-right *:text-blue-800">
		<a href="https://www.linkedin.com/in/hyunbinseo/" target="_blank">LinkedIn</a>,
		<a href="https://github.com/hyunbinseo/" target="_blank">GitHub</a>,
		<a href="https://github.com/hyunbinseo/pages" target="_blank">Source</a>
	</footer>
</div>
