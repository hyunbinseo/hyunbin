<script lang="ts">
	import { marked } from 'marked';
	import { tick } from 'svelte';
	import example from './example.md?raw';
	import placeholder from './placeholder.md?raw';

	let textarea: HTMLTextAreaElement;
	const minRows = placeholder.match(/\n/g)!.length + 1;
	const setRows = () => {
		textarea.rows = Math.max(
			(textarea.value.match(/\n/g) || []).length + 1, //
			minRows,
		);
	};

	let html = $state<string>();

	const lengths = [50, 60, 70, 90] as const;
	let dimension = $state<[number, number]>([60, 60]);
</script>

<form
	onsubmit={async (e) => {
		e.preventDefault();
		html = await marked.parse(textarea.value);
		await tick();
		window.scrollTo(0, 0);
	}}
	class="mx-auto w-full max-w-[21cm]"
	class:hidden={!!html}
>
	<label>
		<span>마크다운을 입력하세요:</span>
		<textarea
			bind:this={textarea}
			oninput={setRows}
			{placeholder}
			rows={minRows}
			required
			class="mt-2 block w-full resize-none border"
		></textarea>
	</label>
	<nav class="mt-4 flex justify-between gap-4 break-keep">
		<button class="bg-blue-100">메모지로 변환하기</button>
		<button
			type="button"
			onclick={() => {
				textarea.value = example;
				setRows();
			}}
			class="bg-gray-100"
		>
			예시 입력
		</button>
	</nav>
</form>

<div class="flex flex-col gap-y-6" class:hidden={!html}>
	<nav class="flex flex-wrap items-end gap-2 whitespace-nowrap print:hidden">
		{#each { length: 2 }, index}
			<label>
				<span class="text-sm">{!index ? '가로' : '세로'} 길이</span>
				<br />
				<select bind:value={dimension[index]}>
					<!-- eslint-disable-next-line svelte/require-each-key -->
					{#each lengths as l}
						<option value={l}>{l}mm</option>
					{/each}
				</select>
			</label>
		{/each}
		<button type="button" onclick={() => window.print()} class="bg-blue-100">인쇄하기</button>
		<button type="button" onclick={() => (html = undefined)} class="bg-gray-200 sm:ml-auto">
			입력란으로
		</button>
	</nav>
	<hr class="print:hidden" />
	<section
		class="flex flex-wrap not-print:gap-4"
		style:--width={dimension[0]}
		style:--height={dimension[1]}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</section>
</div>

<style>
	@reference "$app.css";
	button {
		@apply px-3 py-2;
	}
	button,
	select {
		@apply rounded;
	}
	section :global {
		> :is(ul, ol) {
			@apply contents;
		}
		:is(h1, h2, h3, li) {
			width: calc(var(--width) * 1mm);
			height: calc(var(--height) * 1mm);
			@apply shrink-0 break-inside-avoid overflow-y-auto border p-4 text-3xl wrap-break-word break-keep print:overflow-hidden;
		}
		:is(h1, h2, h3) {
			@apply text-4xl font-bold;
		}
		h1 {
			background-color: rgba(246, 194, 217, 0.1);
		}
		h2 {
			background-color: rgba(188, 223, 201, 0.1);
		}
		h3 {
			background-color: rgba(161, 200, 223, 0.1);
		}
		li {
			background-color: rgba(255, 246, 155, 0.1);
		}
	}
</style>
