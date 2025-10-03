<script lang="ts">
	import { page } from '$app/state';
	import { controlDialogWithUrlHash } from 'hash-dialog-modal';
</script>

<!-- TODO Update style -->

<main>
	<div>
		<span>
			<a href="https://github.com/hyunbinseo/hash-dialog-modal#readme" target="_blank">GitHub</a>
			<a href="https://www.npmjs.com/package/hash-dialog-modal" target="_blank">npm</a>
		</span>
		<h1>hash-dialog-modal</h1>
		<p>
			<span>Open the modal with anchors:</span>
			<a href="#1" data-sveltekit-reload>#1</a>
			<a href="#2" data-sveltekit-reload>#2</a>
		</p>
	</div>
</main>

<dialog
	{@attach (dialog) => {
		const { removeEventListeners } = controlDialogWithUrlHash(dialog, 'auto');
		return removeEventListeners;
	}}
>
	<form method="dialog">
		<h1>This is a Modal</h1>
		<ul>
			<li>Current hash value is {page.url.hash}</li>
			<li><button>Close</button> or press the Esc key.</li>
		</ul>
	</form>
</dialog>
