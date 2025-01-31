<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from '$lib/Store.js';

	onMount(() => {
		// dark preference stored in local storage of browser has precedence
		if (localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') !== undefined) {
			if (localStorage.getItem('darkMode') === 'enabled') {
				window.document.body.classList.add('dark');
				$darkMode = true;
				console.log(`darkMode from layout LOCAL: ${$darkMode}`);
			}
			// if no local storage preference available, look at the global preference
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			window.document.body.classList.add('dark');
			$darkMode = true;
			console.log(`darkMode from layout GLOBAL: ${$darkMode}`);
		}

		// default is 'light', i.e. darkMode === false
	});
</script>

<div>
	<slot />
</div>
