<script lang="ts">
	import { categories } from './enums';
	import { getProduct, getProducts } from './products.remote';

	let category = $state(categories[0]);
</script>

<div class="space-y-4">
	<p>
		SvelteKit <code>query</code> caching behavior changed in
		<a
			href="https://github.com/sveltejs/kit/releases/tag/%40sveltejs/kit%402.61.0"
			target="_blank"
			class="text-blue-700"
		>
			<code>@sveltejs/kit@2.61.0</code>
		</a>
	</p>
	<blockquote class="max-w-lg">
		TL;DR, now you can use queries anywhere. So long as your app is referencing the query, it will
		remain cached.
		<span class="underline">It may stick around after you're done with it for a time,</span> until it
		gets garbage collected.
	</blockquote>
	<fieldset class="w-fit border py-2.5 pr-20 pl-4">
		<legend class="-ml-2 px-2 font-bold">Category</legend>
		<ul class="space-y-1">
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each categories as c}
				<li>
					<label>
						<input type="radio" name="category" value={c} bind:group={category} />
						<span>{c}</span>
					</label>
				</li>
			{/each}
		</ul>
	</fieldset>
	<table class="divide-y-2 font-mono">
		<thead>
			<tr>
				<th class="min-w-32">Name</th>
				<th>Updated At</th>
			</tr>
		</thead>
		<tbody class="divide-y">
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each await getProducts(category) as id}
				<tr>
					<td>{id}</td>
					<td>{(await getProduct(id)).calledAt}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	label {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
	}
	th,
	td {
		padding: 0.25rem 0.5rem;
	}
</style>
