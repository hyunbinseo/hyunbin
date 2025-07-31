<script lang="ts">
	const width = 400;
	const height = 320;
</script>

<div class="w-full overflow-x-hidden">
	<!-- NOTE Match .gap-x and .pr values to avoid jump between loops. -->
	<div class="carousel flex h-80 w-fit gap-x-2 pr-2">
		{#each { length: 2 }, outerIndex}
			{#each { length: 4 }, innerIndex}
				<!-- NOTE div needed to correctly calculate carousel width. -->
				<div style:aspect-ratio="{width} / {height}">
					<!-- svelte-ignore a11y_missing_attribute -->
					<img
						{width}
						{height}
						src="https://picsum.photos/id/{100 + innerIndex}/{width}/{height}"
						aria-hidden={outerIndex ? true : null}
						draggable="false"
					/>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.carousel {
		animation: scroll 5s linear infinite;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
