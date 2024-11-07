<script lang="ts">
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';
	import { menuShown, } from '$lib/Store';
	import TreeView from '$lib/tree/TreeView.svelte';

</script>


<ThemeContext>
	<main class="main-window">
		<AppBar />
		{#if $menuShown}
			<TreeView />
		{/if}
		<div class="content-box">
			<slot />
		</div>
	</main>
</ThemeContext>
