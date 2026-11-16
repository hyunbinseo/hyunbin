<script>
	import { browser } from '$app/env';
</script>

<span>{browser ? 'browser' : 'server'}</span>
