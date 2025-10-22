<script>
	import { browser } from '$app/environment';
	import { showModalScript } from './show-modal';
</script>

<p>
	If this page is server rendered, a modal will be shown.
	<button type="button" onclick={() => location.reload()}>Reload</button> the page to retry.
	Inspiration from
	<a href="https://ethanniser.dev/blog/a-clock-that-doesnt-snap" target="_blank">Ethan Niser</a>.
</p>

<dialog class="m-auto p-4">
	<form method="dialog" class="flex flex-col gap-y-2.5">
		This page has been server rendered.
		<button>Close</button>
	</form>
</dialog>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html !browser ? showModalScript : ''}

<style lang="postcss">
	@reference "$app.css";
	a,
	button {
		@apply cursor-pointer text-blue-800 underline;
	}
</style>
