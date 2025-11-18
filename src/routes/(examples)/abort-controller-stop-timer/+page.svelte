<script lang="ts">
	import { settled } from 'svelte';

	const DURATION = 3000;

	let abortController = $state<AbortController>();
	let status = $state<'init' | 'running' | 'finished' | 'aborted'>('init');

	const startTimer = async (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		},
	) => {
		e.currentTarget.disabled = true;
		const ac = (abortController = new AbortController());
		await settled();
		let timeoutId: number | undefined = undefined;
		try {
			await new Promise<void>((resolve, reject) => {
				const abortHandler = () => {
					window.clearTimeout(timeoutId);
					reject();
				};
				ac.signal.addEventListener('abort', abortHandler);
				status = 'running';
				timeoutId = window.setTimeout(() => {
					ac.signal.removeEventListener('abort', abortHandler);
					resolve();
				}, DURATION);
			});
			status = 'finished';
		} catch {
			status = 'aborted';
		} finally {
			abortController = undefined;
		}
	};
</script>

<h1 class="text-xl font-bold">
	Timer using
	<a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController" target="_blank">
		<code>AbortController</code>
	</a>
</h1>

<nav class="mt-3">
	<span class="font-bold">[Control]</span>
	<button
		type="button"
		disabled={!!abortController}
		onclick={startTimer}
		class="disabled:opacity-50"
	>
		Start
	</button>
	<span>/</span>
	<button
		type="button"
		disabled={!abortController}
		onclick={() => abortController?.abort()}
		class="disabled:opacity-50"
	>
		Stop
	</button>
</nav>

<p class="mt-3">
	<span class="font-bold">[Status]</span>
	<span class="capitalize">{status}</span>
</p>
