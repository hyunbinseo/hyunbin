<script lang="ts">
	import { onMount } from 'svelte';

	let wakeLock: WakeLockSentinel | undefined = undefined;

	const requestWakeLock = async () => {
		if (!('wakeLock' in navigator)) return;
		wakeLock = await navigator.wakeLock.request('screen').catch(() => undefined);
	};

	onMount(() => {
		requestWakeLock();
		return () => wakeLock?.release();
	});
</script>

<svelte:document
	on:visibilitychange={async () => {
		// NOTE WakeLock is automatically released when the page is hidden
		if (document.visibilityState === 'visible') await requestWakeLock();
	}}
/>

<button
	type="button"
	onclick={(e) => {
		const span = e.currentTarget.nextElementSibling as HTMLSpanElement;
		span.innerText = !('wakeLock' in navigator)
			? 'API is not supported'
			: !wakeLock
				? 'request has failed'
				: wakeLock.released
					? 'is inactive'
					: 'is active (keep screen on)';
	}}
	class="mr-1 rounded bg-gray-200 p-1 text-sm font-bold">Check WakeLock Status</button
>

<span></span>
