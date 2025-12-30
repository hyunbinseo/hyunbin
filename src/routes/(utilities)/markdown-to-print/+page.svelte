<script lang="ts">
	import { debounce } from 'es-toolkit/function';
	import { marked } from 'marked';
	import 'print-friendly';
	import { TITLE } from '.';
	import 표준근로계약서 from './표준근로계약서.md?raw';

	marked.use({ gfm: true });

	let md = $state('');
	let hash = $state('');

	const html = $derived.by(() => {
		if (!md) return null;
		return marked.parse(md, { async: false });
	});

	$effect(() => {
		if (!html) hash = '';
		debouncedSetHash();
	});

	const debouncedSetHash = debounce(async () => {
		if (!html) return;
		const encoded = new TextEncoder().encode(html);
		const buffer = await window.crypto.subtle.digest('SHA-256', encoded);
		const array = Array.from(new Uint8Array(buffer));
		hash = array.map((b) => b.toString(16).padStart(2, '0')).join('');
	}, 300);
</script>

<svelte:head>
	<title>{hash || TITLE}</title>
</svelte:head>

<div class="page-container">
	<header class="mb-2 flex justify-between px-2">
		<button type="button" onclick={() => window.print()}>Print/인쇄</button>
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
		{#if html}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html html}
			<code class="text-xs empty:hidden">{hash}</code>
		{/if}
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
