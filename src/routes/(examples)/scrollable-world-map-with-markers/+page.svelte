<script>
	import gradient from './gradient.svg';
</script>

<div class="map-scroll fixed inset-0 flex bg-white">
	<div
		class={[
			'relative max-w-none shrink-0',
			'self-start', // correctly position markers on extreme viewport sizes
		]}
	>
		<img src={gradient} alt="" class="map-image max-w-none" />
		<div
			class="absolute grid aspect-square h-1/20 -translate-1/2 place-items-center rounded-full bg-black"
			style:left="25%"
			style:top="36.5%"
		></div>
	</div>
</div>

<style>
	/* avoid double scrollbars caused by `overflow: auto` reserving spaces */
	.map-scroll {
		overflow: hidden;
		@media (min-aspect-ratio: 2) {
			overflow-y: auto;
		}
		@media (max-aspect-ratio: 2) {
			overflow-x: auto;
		}
		.map-image {
			aspect-ratio: 2;
			height: auto;
			width: auto;
			@media (min-aspect-ratio: 2) {
				width: 100dvw;
			}
			@media (max-aspect-ratio: 2) {
				height: 100dvh;
			}
		}
	}
</style>
