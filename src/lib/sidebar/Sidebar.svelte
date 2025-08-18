<script lang="ts">
	import SidebarEntry from '$lib/sidebar/SidebarEntry.svelte';
	import type { TocContentsType } from '$lib/sidebar/TocContentsType';

	interface ComponentProps {
		tocContent: TocContentsType;
	}
	let { tocContent }: ComponentProps = $props();
	let categoryContent: TocContentsType[] = tocContent.content ? tocContent.content : [];
</script>

<nav>
	<ul class="sidebar-ul">
		{#each categoryContent as part, index (index)}
			<li>
				<div class="sidebar-header">
					<SidebarEntry name={part.name} path={part.path ? part.path : '/'} />
				</div>
				{#if part.content}
					<ul class="sidebar-ul">
						{#each part.content as pp, index2 (index2)}
							<li>
								<div class="sidebar-simple">
									<SidebarEntry name={pp.name} path={pp.path ? pp.path : '/'} />
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
