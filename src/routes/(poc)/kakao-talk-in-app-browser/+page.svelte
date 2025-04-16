<script lang="ts">
	import { page } from '$app/state';
	import type { Action } from 'svelte/action';

	const clickAfterDelay: Action<HTMLAnchorElement> = (a) => {
		setTimeout(() => a.click(), 5 * 1000);
	};
</script>

{#if navigator.userAgent.includes('KAKAOTALK')}
	<span>카카오톡 인앱 브라우저입니다.</span>
	<a
		use:clickAfterDelay
		data-sveltekit-reload
		href="kakaotalk://web/openExternal?url={encodeURIComponent(page.url.href)}"
		class="underline underline-offset-4"
	>
		외부 브라우저로 열기
	</a>
{:else}
	<p>카카오톡 인앱 브라우저가 아닙니다.</p>
{/if}
