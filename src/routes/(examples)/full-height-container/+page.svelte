<script>
	import StyledLabels from '$lib/components/StyledLabels.svelte';

	const { data } = $props();

	let height = $state('100%');
	let width = $state('100%');
</script>

<div
	class={[
		'fixed inset-0 flex flex-col justify-center-safe overflow-auto *:shrink-0',
		'bg-linear-to-r/longer from-indigo-500 to-teal-400',
	]}
>
	<div style:height style:width class="flex flex-col justify-between bg-white p-4">
		<StyledLabels>
			<div class="flex gap-x-4">
				<label>
					<span>Height</span>
					<select bind:value={height}>
						<option>100%</option>
						<option>24rem</option>
						<option>125vh</option>
					</select>
				</label>
				<label>
					<span>Width</span>
					<select bind:value={width}>
						<option>100%</option>
						<option>125vw</option>
					</select>
				</label>
			</div>
		</StyledLabels>
		<a href={data.url.source} rel="external" target="_blank">Source</a>
	</div>
</div>

<style lang="postcss">
	.justify-center-safe {
		/* NOTE Fallback options for Safari < 17.6 */
		justify-content: flex-start; /* 1 */
		justify-content: center; /* 2 */
		justify-content: safe center;
		padding: 2rem;
		> :first-child:last-child {
			min-height: 24rem;
		}
		@supports not (justify-content: safe center) {
			/* 2. Adjust to the actual content height */
			@media (max-height: calc(2 * 2rem + 24rem)) {
				justify-content: flex-start;
			}
		}
	}
</style>
