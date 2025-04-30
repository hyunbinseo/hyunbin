<script lang="ts">
	import type { InferOutput } from 'valibot';
	import { digits, object, optional, parse, pipe, string, transform, trim } from 'valibot';
	import type { NotificationMessageSchema } from '.';
</script>

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

		const registration = await navigator.serviceWorker.ready;
		if (!registration?.active) {
			window.alert('Cannot schedule notification. Service worker unavailable.');
			return;
		}

		registration.active.postMessage({
			type: 'SHOW_NOTIFICATION',
			payload: {
				timestamp: Date.now() + form.delay * 1000,
				title: form.title,
				body: `${form.body} (delay ${form.delay}s)`,
				data: { url: 'https://github.com/hyunbinseo/' },
			},
		} satisfies InferOutput<typeof NotificationMessageSchema>);

		window.alert('Notification has been scheduled.');
	}}
	class="flex flex-col gap-y-4 *:w-fit"
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
			<option value="60">1 Minute</option>
			<option value="600">10 Minutes</option>
		</select>
	</label>
	<button class="rounded bg-blue-100 px-3 py-2">Schedule Notification</button>
</form>

<style>
	@reference "$app.css";
	label > span:first-child {
		@apply block text-sm;
	}
</style>
