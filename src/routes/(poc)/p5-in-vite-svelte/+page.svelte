<script lang="ts">
	import type Sketch from 'p5';
	import { onMount } from 'svelte';

	let { data } = $props();

	let parent: HTMLDivElement;

	const width = 200;
	const height = 100;

	onMount(async () => {
		const p5 = (await import('p5')).default;
		new p5((s: Sketch) => {
			s.setup = () => {
				s.createCanvas(width, height);
			};
			s.draw = () => {
				s.background(0);
				s.fill(255);
				s.rect(50, 50, 25, 25);
			};
		}, parent);
	});
</script>

<h1>{data.title}</h1>

<div bind:this={parent} style:aspect-ratio="{width} / {height}"></div>

<style>
	div > :global(canvas) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
