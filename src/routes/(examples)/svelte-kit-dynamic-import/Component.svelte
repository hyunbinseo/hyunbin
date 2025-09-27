<script>
	import { browser } from '$app/environment';
</script>

<span>{browser ? 'browser' : 'server'}</span>
