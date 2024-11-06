<script lang="ts">
	import SidebarEntry from '$lib/sidebar/SidebarEntry.svelte';
	import type { TocContents } from '$lib/sidebar/TocContents';

	export let tocContent: TocContents;

	let categoryContent: TocContents[] = tocContent.content ? tocContent.content : [];
</script>

<nav>
	<ul class='sidebar-ul'>
		{#each categoryContent as part}
			<li>
				<div class='sidebar-header'>
					<SidebarEntry name={part.name} path={part.path ? part.path : '/'} />
				</div>
				{#if part.content}
					{#each part.content as pp}
						<li>
							<div class='sidebar-simple'>
								<SidebarEntry name={pp.name} path={pp.path ? pp.path : '/'} />
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
