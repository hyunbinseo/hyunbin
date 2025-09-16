<script>
	let height = $state('100%');
	let width = $state('100%');
</script>

<div
	class={[
		'fixed inset-0 flex flex-col justify-center-safe overflow-auto p-8',
		'bg-linear-to-r/longer from-indigo-500 to-teal-400',
	]}
>
	<div
		style:height
		style:width
		class="min-h-48 shrink-0 space-x-2 overflow-y-auto bg-white p-4 *:inline-block"
	>
		<label>
			Height
			<br />
			<select bind:value={height}>
				<option>100%</option>
				<option>192px</option>
				<option>125vh</option>
			</select>
		</label>
		<label>
			Width
			<br />
			<select bind:value={width}>
				<option>100%</option>
				<option>125vw</option>
			</select>
		</label>
	</div>
</div>

<style>
	@supports not (justify-content: safe center) {
		/* 12rem + 2rem + 2rem */
		@media (max-height: 256px) {
			.justify-center-safe {
				justify-content: flex-start;
			}
		}
	}
</style>
