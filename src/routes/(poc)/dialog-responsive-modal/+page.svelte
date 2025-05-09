<script lang="ts">
	import { onMount } from 'svelte';

	let dialog: HTMLDialogElement;
	let isOpen = $state(false);

	onMount(() => open());

	const open = () => {
		isOpen = true;
		if (window.innerWidth < 640) {
			try {
				dialog.showModal();
			} catch {
				dialog.close();
				dialog.showModal();
			}
		} else {
			try {
				if (dialog.open) {
					dialog.showModal();
					dialog.close();
				}
				// eslint-disable-next-line no-empty
			} catch {}
			dialog.show();
		}
	};

	const close = () => {
		isOpen = false;
		dialog.close();
	};
</script>

<svelte:window
	onresize={() => {
		if (isOpen) open();
	}}
/>

<main class="p-4">
	<strong>Resize the viewport:</strong>
	<ul class="list-inside list-disc">
		<li>Non-modal dialog on desktop</li>
		<li>Fullscreen modal on mobile</li>
	</ul>
</main>

<div class="fixed inset-6 flex flex-col-reverse items-end gap-y-4">
	<button
		type="button"
		aria-label={!isOpen ? 'Open' : 'Close'}
		onclick={!isOpen ? open : close}
		class="flex size-14 items-center justify-center rounded-3xl bg-indigo-700 text-white shadow-2xl"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="3"
			stroke="currentColor"
			class={[isOpen && 'rotate-45', 'size-7 transition-transform']}
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</button>
</div>

<dialog
	bind:this={dialog}
	oncancel={close}
	class={[
		'max-h-full max-w-full overflow-y-auto max-sm:w-full sm:right-6 sm:bottom-26 sm:ml-auto sm:h-160 sm:max-h-[calc(100%-var(--spacing)*32)] sm:w-96 sm:rounded-3xl sm:shadow-2xl',
		'flex-col gap-y-8 bg-gray-200 *:bg-white *:p-4 open:flex',
	]}
>
	<header class="sticky top-0 flex h-16 shrink-0 items-center justify-end sm:hidden">
		<button type="button" onclick={close}>Close</button>
	</header>
	{#each { length: 10 }}
		<article class="aspect-video">Lorem ipsum dolor sit amet consectetur adipisicing elit.</article>
	{/each}
	<footer class="flex h-24 shrink-0 items-center justify-center">End of Document</footer>
</dialog>

<style>
	header {
		box-shadow:
			0px 2px 4px -3px rgba(0, 0, 0, 0.2),
			0px 4px 5px -2px rgba(0, 0, 0, 0.14),
			0px 1px 10px -10px rgba(0, 0, 0, 0.12);
	}

	dialog[open] {
		translate: 0 0;
	}

	dialog[open],
	dialog[open]::backdrop {
		opacity: 1;
	}

	@starting-style {
		dialog[open] {
			translate: 0 2rem;
		}

		dialog[open],
		dialog[open]::backdrop {
			opacity: 0;
		}
	}

	dialog,
	dialog::backdrop {
		opacity: 0;
		transition-duration: 0.5s;
		transition-property: opacity, translate;
		transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@supports (transition-behavior: allow-discrete) and (overlay: auto) {
		dialog,
		dialog::backdrop {
			transition-behavior: allow-discrete;
			transition-property: opacity, translate, display, overlay;
		}
	}
</style>
