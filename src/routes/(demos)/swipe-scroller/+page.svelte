<script lang="ts">
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import Scroller from 'swipe-scroller/Scroller.svelte';
	import 'swipe-scroller/style';
	import { releases } from '.';

	let hangButtons = true;
	let invertButtons = false;
</script>

<div class="container-outer fixed inset-0"></div>

<div class="relative overflow-x-hidden py-16">
	<div class="container-inner">
		<h1 class="text-4xl font-extrabold tracking-tight">Swipe Scroller</h1>
		<p class="mt-1">
			<span>Modern Slider.</span>
			<a
				href="https://github.com/hyunbinseo/swipe-scroller#readme"
				target="_blank"
				class="underline">GitHub</a
			>
		</p>
		<hr class="my-10 w-12" />
		<h2 class="text-2xl font-bold">xiihu</h2>
		<p>Discography, from latest</p>
	</div>
	<div class="h-4"></div>
	<Scroller {hangButtons} {invertButtons} cardGap="0.5rem">
		{#each releases as release (release.spotify)}
			<a
				class="card"
				target="_blank"
				rel="noreferrer"
				href="https://open.spotify.com/album/{release.spotify}"
				style:background-color={release.color}
			>
				<img src={release.cover} draggable="false" alt="" />
				<div>{release.name}</div>
			</a>
		{/each}
	</Scroller>
	<div class="h-8"></div>
	<div class="container-inner coarse:hidden">
		<strong>Hover over the scroller to test these options.</strong>
		<StyledLabels>
			<ul class="mt-1">
				<li>
					<label>
						<input type="checkbox" bind:checked={hangButtons} />
						<span>Hang the arrow buttons at the inner container border.</span>
					</label>
				</li>
				<li>
					<label>
						<input type="checkbox" bind:checked={invertButtons} />
						<span>Invert the functions of the left and right arrow buttons.</span>
					</label>
				</li>
			</ul>
		</StyledLabels>
	</div>
</div>

<style lang="postcss">
	.card {
		&:is(a) {
			text-decoration: none;
			outline-offset: -2px;
		}
		width: 80%;
		min-width: 224px;
		max-width: 296px;
		overflow: hidden;
		border-radius: 0.75rem;
		@media (min-width: 640px) {
			border-radius: 1rem;
		}
		> div {
			padding: 1rem;
			color: white;
			text-align: center;
		}
	}
</style>
