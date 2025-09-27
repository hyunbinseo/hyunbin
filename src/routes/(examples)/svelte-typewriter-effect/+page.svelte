<script lang="ts">
	import { onMount } from 'svelte';

	let content = $state<[string, string]>([
		'',
		// 윤하 - 포인트 니모
		`마음을 좀 편히 먹어도 될걸
지금 아무도 없잖아 
너의 나와 하늘과 바다 그뿐인걸 

수많은 사람들 속 
어쩌면 지쳐 왔던 걸지 몰라 
수고했다 참 

고요한 일상도 
나쁘지는 않아 
마음껏 그리워할 수 있으니`,
	]);

	onMount(() => {
		const intervalId = window.setInterval(() => {
			content = [
				content[0] + content[1][0], //
				content[1].slice(1),
			];
			if (!content[1].length) window.clearInterval(intervalId);
		}, 175);
	});
</script>

<p class="whitespace-pre-line">
	<span>{content[0]}</span><span class="opacity-10">{content[1]}</span>
</p>
