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
	<Modal
		bind:isOpen={isDrawerOpen}
		closeOnBackdropClick={true}
		class={[
			'm-0 ml-auto h-full max-h-none',
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
		<aside class="w-68 p-4">
			Sidebar
			{@render long()}
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

<div class="contents md:mx-auto md:flex md:max-w-7xl md:shadow-2xl">
	<!-- NOTE height: 100dvh; and inset-block: 0; both have delay on Android Chromium (e.g. Chrome, Samsung Internet) -->
	<aside
		class={[
			'max-md:hidden',
			'sticky top-0 z-10 h-dvh w-68 shrink-0 overflow-y-auto overscroll-contain shadow-box-right',
		]}
	>
		<p class="py-4 text-center">Sidebar</p>
		{@render long()}
	</aside>
	<div class="flex-1 *:mx-4">
		<nav class="sticky top-0 mx-0! bg-white/70 py-4 text-center shadow-box-bottom backdrop-blur">
			Sticky Nav
		</nav>
		{@render long()}
	</div>
</div>

