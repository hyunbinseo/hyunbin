<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<ul class="list-inside list-disc space-y-2 font-mono">
	<li>
		<a href="/hash-dialog-modal" rel="external">Hash Dialog Modal</a>
	</li>
	<li>
		<a href={resolve('/(demos)/print-friendly')}>Print Friendly</a>
	</li>
	<li>
		<!-- See https://github.com/hyunbinseo/swipe-scroller/issues/9 -->
		<a href={resolve('/(demos)/swipe-scroller')} data-sveltekit-reload>Swipe Scroller</a>
	</li>
</ul>

<style>
	a {
		text-decoration-line: underline;
	}
</style>
