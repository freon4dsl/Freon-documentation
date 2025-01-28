<script lang="ts">
	import SidebarEntry from '$lib/sidebar/SidebarEntry.svelte';
	import type { TocContentsType } from '$lib/sidebar/TocContentsType';

	export let tocContent: TocContentsType;

	let categoryContent: TocContentsType[] = tocContent.content ? tocContent.content : [];
</script>

<nav>
	<ul class="sidebar-ul">
		{#each categoryContent as part}
			<li>
				<div class="sidebar-header">
					<SidebarEntry name={part.name} path={part.path ? part.path : '/'} />
				</div>
				{#if part.content}
					{#each part.content as pp}
						<li>
							<div class="sidebar-simple">
								<SidebarEntry name={pp.name} path={pp.path ? pp.path : '/'} />
							</div>
						</li>
					{/each}
				{/if}
			</li>
		{/each}
	</ul>
</nav>
