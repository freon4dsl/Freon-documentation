<script lang="ts">
	import Tree from './Tree.svelte';
	import { NavTree } from './NavTree';

	let root: NavTree[] = [];
</script>

<div class="navigator">
	<Tree content={root} expanded />
</div>

<style>
	.navigator {
		position: relative;
		width: 100%;
		heigth: 100%;
		background: var(--theme-colors-bg_color);
	}
</style>
