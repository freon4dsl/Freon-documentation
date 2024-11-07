<script lang="ts">
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';

</script>


<ThemeContext>
	<main class="main-window">
		<AppBar />
		<div class="content-box">
			<slot />
		</div>
	</main>
</ThemeContext>
