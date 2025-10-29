<script lang="ts">
	import { browser } from '$app/environment';
	import Row from './Row.svelte';
</script>

{#if browser}
	<div class="overflow-x-auto">
		<table class="divide-y divide-gray-300 border font-mono">
			<thead>
				<tr>
					<th>Code</th>
					<th>Value</th>
					<th>Note</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<Row fn={() => typeof document.documentElement.requestFullscreen}>
					{#snippet note()}
						<ul class="*:whitespace-pre">
							<li><code>iOS@26.0.1</code>: <code>undefined</code></li>
							<li><code>iPadOS@18.7</code>: <code>function</code></li>
						</ul>
					{/snippet}
				</Row>
			</tbody>
		</table>
	</div>
{/if}

<style lang="postcss">
	table :global {
		th,
		td {
			text-align: center;
			padding-inline: calc(var(--spacing) * 6);
		}
		th {
			padding-block: calc(var(--spacing) * 2);
		}
		td {
			padding-block: calc(var(--spacing) * 3);
			&:empty::after {
				content: '-';
			}
		}
	}
</style>
