<script lang="ts">
	const width = '240px';

	let dialog: HTMLDialogElement;
</script>

<button type="button" onclick={() => dialog.showModal()}>Open Drawer</button>

<dialog
	bind:this={dialog}
	onclick={(e) => {
		if (e.currentTarget !== e.target) return;

		const dialogRect = e.currentTarget.getBoundingClientRect();

		const isDialogClick =
			e.clientX >= dialogRect.left &&
			e.clientX <= dialogRect.right &&
			e.clientY >= dialogRect.top &&
			e.clientY <= dialogRect.bottom;

		const isBackdropClick = !isDialogClick;
		if (isBackdropClick) e.currentTarget.close();
	}}
	class="mr-auto h-full max-h-none w-(--width) p-4 backdrop:backdrop-blur backdrop:backdrop-brightness-50"
	style:--width={width}
>
	<form method="dialog">
		<p>I am a drawer!</p>
		<button class="mt-2">Close</button>
	</form>
</dialog>

<style lang="postcss">
	button {
		background-color: var(--color-gray-200);
		border-radius: var(--radius-lg);
		font-size: var(--text-sm);
		padding-block: calc(var(--spacing) * 1.5);
		padding-inline: calc(var(--spacing) * 2.5);
	}

	dialog {
		translate: calc(-1 * var(--width));
		&:modal {
			translate: 0;
			@starting-style {
				translate: calc(-1 * var(--width));
			}
		}
	}

	dialog,
	dialog::backdrop {
		opacity: 0;
	}

	dialog:modal,
	dialog:modal::backdrop {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		dialog,
		dialog::backdrop {
			transition-duration: 0.5s;
			transition-property: opacity, translate;
			@supports (transition-behavior: allow-discrete) and (overlay: auto) {
				transition-behavior: allow-discrete;
				transition-property: opacity, translate, display, overlay;
			}
		}
	}
</style>
