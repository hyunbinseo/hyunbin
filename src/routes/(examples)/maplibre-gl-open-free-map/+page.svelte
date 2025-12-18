<script lang="ts">
	import { CodeXml } from '@lucide/svelte';
	import maplibregl from 'maplibre-gl';
	import { fade } from 'svelte/transition';

	const { data } = $props();

	let map: maplibregl.Map | undefined = $state();
</script>

<div
	class="fixed inset-0"
	{@attach (div) => {
		map = new maplibregl.Map({
			container: div,
			attributionControl: false,
			style: 'https://tiles.openfreemap.org/styles/liberty',
			center: [126.5219, 33.5097],
			zoom: 13,
		});
	}}
></div>

{#if map}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		transition:fade
		href={data.url.source}
		target="_blank"
		class="fixed right-4 bottom-4 rounded-full p-3.5 text-white opacity-50 shadow-2xl transition-opacity duration-300 hover:opacity-100"
		style:background-color="#295DAA"
	>
		<CodeXml size={28}></CodeXml>
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{/if}
