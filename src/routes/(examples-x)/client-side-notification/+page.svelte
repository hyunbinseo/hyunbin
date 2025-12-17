<script lang="ts">
	import StyledLabels from '$lib/components/StyledLabels.svelte';
	import { digits, object, optional, parse, pipe, string, transform, trim } from 'valibot';
</script>

<StyledLabels>
	<form
		onsubmit={async (e) => {
			e.preventDefault();

			const form = parse(
				object({
					title: pipe(string(), trim()),
					body: optional(pipe(string(), trim())),
					delay: pipe(string(), digits(), transform(Number)),
				}),
				Object.fromEntries(new FormData(e.currentTarget)),
			);

			if ((await Notification.requestPermission()) !== 'granted') {
				window.alert('Please allow notification permission.');
				return;
			}

			setTimeout(() => {
				const notification = new Notification(form.title, { body: form.body ?? '' });
				notification.onclick = (e) => {
					e.preventDefault();
					window.open('https://github.com/hyunbinseo', '_blank');
				};
			}, form.delay * 1000);

			if (form.delay) window.alert('Notification has been scheduled.');
		}}
		class="flex flex-col gap-y-4"
	>
		<label>
			<span>Title</span>
			<input type="text" name="title" defaultValue="Hello, World!" required />
		</label>
		<label>
			<span>Body</span>
			<input type="text" name="body" defaultValue="Can you see me? 👀" />
		</label>
		<label>
			<span>Delay</span>
			<select name="delay" required>
				<option value="0">None</option>
				<option value="5" selected>5 Seconds</option>
			</select>
		</label>
		<button class="w-fit rounded bg-blue-100 px-3 py-2">Send Notification</button>
	</form>
</StyledLabels>
