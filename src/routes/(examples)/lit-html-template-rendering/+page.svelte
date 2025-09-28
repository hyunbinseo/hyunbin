<script>
	import { render } from 'lit-html';
	import { hello } from '.';
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
	{@attach (button) => {
		render(hello('Hyunbin'), button);
	}}
	onclick={({ currentTarget: button }) => {
		// only updates the parts of the template that have changed since the last render.
		// Reference https://lit.dev/docs/libraries/standalone-templates/#render-dynamic-data
		render(hello('World'), button); // only the name part is re-rendered.
	}}
></button>
