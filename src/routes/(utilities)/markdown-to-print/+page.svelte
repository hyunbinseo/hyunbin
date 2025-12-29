<script lang="ts">
	import { marked } from 'marked';
	import 'print-friendly';
	import 표준근로계약서 from './표준근로계약서.md?raw';

	marked.use({ gfm: true });

	let md = $state('');
</script>

<div class="page-container">
	<header class="mb-2 flex justify-between">
		<button type="button" onclick={() => window.print()}>Print</button>
		<button type="button" onclick={() => (md = 표준근로계약서)}>
			대한민국 표준 근로계약서 입력
		</button>
	</header>
	<textarea
		bind:value={md}
		placeholder="Enter markdown here"
		class="mb-(--page-gap-y) min-h-[30svh] resize-none"
	></textarea>
	<div class="page prose max-w-none empty:hidden">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html marked.parse(md)}
	</div>
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
</style>
