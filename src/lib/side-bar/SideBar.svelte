<script lang="ts">
	import SideBarEntry from '$lib/side-bar/SideBarEntry.svelte';
	import { NavTree } from '$lib';

	export let tocContent: NavTree[] = [];

</script>

<nav>
	<ul class='sidebar-ul'>
		{#each tocContent as part}
			<li>
				<div class='sidebar-header'>
					<SideBarEntry name={part.name} path={part.path} />
				</div>
				{#if part.content}
					{#each part.content as pp}
						<li>
							<div class='sidebar-simple'>
								<SideBarEntry name={pp.name} path={pp.path} />
							</div>
						</li>
					{/each}
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	.sidebar-ul {
			list-style: none;
			padding-left: 0;
	}
	.sidebar-header {
			font-weight: bold;
			margin-top: 0.5rem;
	}
  .sidebar-simple {
     padding-left: 1rem;
  }
</style>
