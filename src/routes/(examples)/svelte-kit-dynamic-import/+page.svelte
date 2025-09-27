<script lang="ts">
	const { data } = $props();
</script>

<p>Dynamically loading Svelte components using <code>await import</code>:</p>

<table class="mt-6 divide-y divide-gray-300">
	<thead>
		<tr>
			<th>Loaded At</th>
			<th>Rendered In</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-200">
		<tr>
			<td><code>+page.ts</code></td>
			<td><data.comp></data.comp></td>
		</tr>
		<tr>
			<td><code>+page.svelte</code></td>
			<td>
				{#await import('./Component.svelte') then comp}
					<comp.default></comp.default>
				{/await}
			</td>
		</tr>
	</tbody>
</table>

<style>
	th,
	td {
		padding: 0.5rem 0.75rem;
	}
</style>
