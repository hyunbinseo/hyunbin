<script lang="ts">
	import { Locate } from '@lucide/svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import shops from './shops.json';

	let map = $state<maplibregl.Map>();

	$effect(() => {
		if (!map) return;
		for (const shop of shops) {
			const element = document.createElement('button');
			element.dataset.name = shop.name;
			new maplibregl.Marker({ element }).setLngLat([shop.lng, shop.lat]).addTo(map);
		}
	});
</script>

<div class="fixed inset-0">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			if (!(e.submitter instanceof HTMLButtonElement)) return;
			const name = e.submitter.dataset.name;
			if (!name) return;
			window.alert(name);
		}}
		class="size-full"
		{@attach (div) => {
			map = new maplibregl.Map({
				container: div,
				attributionControl: false,
				style: 'https://tiles.openfreemap.org/styles/liberty',
				center: [127.0232, 37.4921],
				zoom: 10,
			});
		}}
	></form>
	<button
		type="button"
		onclick={() => {
			navigator.geolocation.getCurrentPosition((position) => {
				const { longitude, latitude } = position.coords;
				map?.setZoom(12);
				map?.setCenter([longitude, latitude]);
			});
		}}
		class="absolute right-4 bottom-4 rounded-full bg-white p-3.5 shadow-2xl"
	>
		<Locate></Locate>
	</button>
</div>

<style>
	.size-full :global {
		.maplibregl-marker {
			width: 12px;
			height: 12px;
			border-radius: calc(infinity * 1px);
			background-color: rgba(0, 0, 0, 0.7);
		}
	}
</style>
