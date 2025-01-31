<script>
	import Button from '$lib/buttons/Button.svelte';
	import InvertColors from '$lib/icons/InvertColors.svelte';
	import { darkMode } from '$lib/Store';

	function toggle() {
		$darkMode = !$darkMode;
		window.document.body.classList.toggle('dark');
		// Set the local storage of the browser. This enables the user settings to be kept across browser sessions.
		localStorage.setItem('darkMode', $darkMode ? 'enabled' : 'disabled');
		console.log(`darkmode toggle: ${$darkMode}`);
	}
</script>

<Button on:click={toggle} icon={true}>
	<InvertColors />
</Button>
