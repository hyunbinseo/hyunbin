<script lang="ts">
	import { debounce } from 'es-toolkit/function';
	import { marked } from 'marked';
	import 'print-friendly';
	import { templates, TITLE } from '.';

	marked.use({ gfm: true });

	let md = $state('');
	let hash = $state<string>();

	$effect(() => {
		if (!navigator.userAgent.toLowerCase().includes('firefox')) return;
		md = 'Firefox generates image PDF without font embedding. Chromium-based browser is advised.';
	});

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

	const saveMarkdown = () => {
		if (!md || !hash) return;
		const blob = new Blob([md], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${hash.slice(0, 6)}.md`;
		a.click();
		URL.revokeObjectURL(url);
	};
</script>

<svelte:head>
	<title>{hash || TITLE}</title>
</svelte:head>

<div class="page-container">
	<header class="mb-2 flex flex-wrap items-end justify-between gap-2 max-a4:px-2">
		<div>
			{#if !md}
				<span>{TITLE}</span>
			{:else}
				<button type="button" onclick={() => window.print()} class="underline">Print</button>
				<span>/</span>
				<button type="button" onclick={() => saveMarkdown()} class="underline">Save</button>
			{/if}
		</div>
		<form
			onsubmit={async (e) => {
				e.preventDefault();
				const name = new FormData(e.currentTarget).get('template') as string;
				const loader = templates[`./${name}.md`];
				if (!loader) {
					window.alert('오류가 발생했습니다.');
					return;
				}
				md = await loader();
			}}
			class="flex gap-x-2"
		>
			<label>
				<span class="sr-only">양식</span>
				<select name="template" required>
					<option value="" disabled selected>선택하세요.</option>
					<option value="표준근로계약서">표준 근로계약서</option>
					<option value="재직증명서">재직증명서</option>
				</select>
			</label>
			<button class="rounded bg-amber-200 px-2.5">양식 입력</button>
		</form>
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
