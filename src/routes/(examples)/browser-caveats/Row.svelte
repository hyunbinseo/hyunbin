<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		fn,
		note,
	}: {
		fn: () => string;
		note?: Snippet | string;
	} = $props();
</script>

<tr>
	<td>{fn.toString().replace(/^\(\) => (?=[^{])/, '')}</td>
	<td>{fn()}</td>
	<td>
		{#if typeof note === 'string'}
			{note}
		{:else}
			{@render note?.()}
		{/if}
	</td>
</tr>

<style>
	td {
		white-space: pre;
		:global > * {
			white-space: initial;
		}
	}
</style>
