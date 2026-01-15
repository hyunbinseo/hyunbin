<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import { Modal } from 'svelte-html-modal';

	let isDrawerOpen = $state(false);
</script>

{#snippet long()}
	<div
		class="min-h-[300vh] bg-linear-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-4"
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, asperiores similique ratione
		eligendi vero culpa ipsam cupiditate dolor neque numquam recusandae id vitae vel dignissimos
		voluptatum, natus fuga debitis quidem.
	</div>
{/snippet}

<div class="contents md:hidden">
	<div class="modal-wrapper">
		<Modal bind:isOpen={isDrawerOpen} closeOnBackdropClick={true}>
			<aside class="w-68 p-4">
				Sidebar
				{@render long()}
			</aside>
		</Modal>
	</div>
	<button
		type="button"
		onclick={() => (isDrawerOpen = true)}
		class="fixed right-4 bottom-4 rounded-full bg-blue-600 p-4 text-white shadow-2xl transition-colors hover:bg-blue-700"
	>
		<Menu></Menu>
	</button>
</div>

<div class="contents [--sidebar-w:17rem]">
	<!-- NOTE height: 100dvh; and inset-block: 0; both have delay on Android Chromium (e.g. Chrome, Samsung Internet) -->
	<aside
		class="fixed inset-y-0 left-0 z-10 w-(--sidebar-w) overflow-y-auto overscroll-contain p-4 shadow-box-right max-md:hidden"
	>
		Fixed Sidebar
		{@render long()}
	</aside>
	<div class="*:mx-4 md:ml-(--sidebar-w)">
		<nav class="sticky top-0 mx-0! bg-white/70 py-4 text-center backdrop-blur">Sticky Nav</nav>
		{@render long()}
	</div>
</div>

<style lang="postcss">
	.modal-wrapper :global > dialog {
		&::backdrop {
			backdrop-filter: blur(8px) brightness(0.5);
		}

		@media (prefers-reduced-motion: no-preference) {
			&,
			&::backdrop {
				transition-property: opacity, translate;
				@supports (transition-behavior: allow-discrete) and (overlay: auto) {
					transition-behavior: allow-discrete;
					transition-property: opacity, translate, display, overlay;
				}
			}
		}

		margin: 0;
		margin-left: auto;
		height: 100%;
		max-height: none;

		/* dialog transition */
		transition-duration: 0.3s;
		opacity: 0;
		translate: 100% 0;
		&:modal {
			opacity: 1;
			translate: 0;
			@starting-style {
				opacity: 0;
				translate: 100% 0;
			}
		}

		/* backdrop transition */
		&::backdrop {
			transition-duration: 0.2s;
			opacity: 0;
		}
		&:modal::backdrop {
			opacity: 1;
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
