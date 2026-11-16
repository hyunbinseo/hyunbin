<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import { Modal } from 'svelte-html-modal';

	let isDrawerOpen = $state(false);
</script>

{#snippet elongate()}
	{let isChecked = $state(false)}
	<label class="my-4 flex w-fit items-center gap-2">
		<input type="checkbox" bind:checked={isChecked} />
		Elongate
	</label>
	{#if isChecked}
		<div class="h-[300vh]"></div>
	{/if}
{/snippet}

<div class="contents lg:hidden">
	<Modal
		bind:isOpen={isDrawerOpen}
		closeOnBackdropClick={true}
		class={[
			'm-0 ml-auto h-full max-h-none overscroll-y-none',
			'backdrop:backdrop-blur-sm backdrop:backdrop-brightness-50',
			// dialog transition
			'translate-x-full opacity-0 duration-300',
			'open:translate-x-0 open:opacity-100',
			'starting:open:translate-x-full starting:open:opacity-0',
			'motion-safe:transition motion-safe:supports-overlay:transition-discrete',
			// backdrop transition
			'backdrop:opacity-0 backdrop:duration-200',
			'open:backdrop:opacity-100 starting:open:backdrop:opacity-0',
			'motion-safe:backdrop:transition motion-safe:supports-overlay:backdrop:transition-discrete',
		]}
	>
		<aside
			class="min-h-full w-68 bg-linear-to-b from-violet-100 from-10% via-fuchsia-100 via-30% to-pink-100 to-90% p-4"
		>
			<h2 class="font-bold">Sidebar (Drawer)</h2>
			{@render elongate()}
		</aside>
	</Modal>
	<button
		type="button"
		onclick={() => (isDrawerOpen = true)}
		class="fixed right-4 bottom-4 rounded-full bg-blue-600 p-4 text-white shadow-2xl transition-colors hover:bg-blue-700"
	>
		<Menu></Menu>
	</button>
</div>

<div class="flex min-h-dvh flex-col lg:mx-auto lg:max-w-7xl lg:shadow-2xl">
	<nav
		class="sticky top-0 z-20 flex h-sticky-header items-center-safe justify-center-safe overflow-x-auto bg-white/70 shadow-box-bottom backdrop-blur"
		data-sticky-header
	>
		Top Nav (Sticky)
	</nav>
	<div class="flex flex-1">
		<aside class="sidebar z-10 w-68 shrink-0 shadow-box-right max-lg:hidden">
			<div
				class="min-h-full bg-linear-to-b from-amber-100 from-10% via-orange-100 via-30% to-rose-100 to-90% p-4"
			>
				<h2 class="font-bold">Sidebar (Sticky, Scrolls Independently)</h2>
				{@render elongate()}
			</div>
		</aside>
		<main
			class="min-w-0 flex-1 bg-linear-to-b from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% p-4"
		>
			<h2 class="font-bold">Main (Document Scroll)</h2>
			{@render elongate()}
		</main>
	</div>
</div>
