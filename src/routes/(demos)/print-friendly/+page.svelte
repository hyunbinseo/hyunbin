<script lang="ts">
	import 정관 from '$lib/static/정관.html?raw';
	import 'print-friendly';
</script>

<div class="page-container prose max-w-none">
	<header>
		Made with
		<a href="https://github.com/hyunbinseo/print-friendly#readme" target="_blank">
			print-friendly
		</a>
	</header>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html 정관}
</div>

<style>
	/* Set the page size for print and screen. */
	/* Example uses A4 portrait. 21cm x 29.7cm */
	/* Microsoft Word's Narrow margin is 0.5in */

	@page {
		size: A4 portrait;
		margin: 0.5in;
	}

	@media screen {
		.page-container {
			--background-color: lightgray;
			--page-color: white;
			--page-width: 21cm;
			--page-height: 29.7cm;
			--page-padding: 0.25in;
			--page-gap-y: 0.5in;
		}
	}

	@media screen and (min-width: 21cm) {
		.page-container {
			--page-min-height: var(--page-height);
			--page-padding: 0.5in;
			--page-gap-y: 0.75in;
		}
	}

	.page-container :global > .page {
		> *:first-child {
			margin-top: 0;
		}
		word-break: keep-all;
	}

	header {
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
