<script lang="ts">
	import { darkMode } from '$lib/Store';
	// We import resolve to support GitHub pages. It introduces the 'base' path.
	import { resolve as kitResolve } from '$app/paths';
	// Patch: cast to the actual runtime signature, because the typings are not up to date
	const resolve = kitResolve as unknown as (path: string) => string;

	interface ComponentProps {
		prevLink: string;
		nextLink: string;
	}
	let { prevLink = '', nextLink = '' }: ComponentProps = $props();
</script>

<div class="prev-next">
	{#if !!prevLink && prevLink.length > 0}
		<a href={resolve(prevLink)} class="prev-next-a">
			{#if $darkMode}
				<img src={resolve('/icons/left_arrow_white.svg')} alt="Arrow left" style="width:24px" />
			{:else}
				<img src={resolve('/icons/left_arrow_icon.svg')} alt="Arrow left" style="width:24px" />
			{/if}
			<p>Previous</p>
		</a>
	{/if}
	<span class="prev-next-spacer">&nbsp</span>
	{#if !!nextLink && nextLink.length > 0}
		<a href={resolve(nextLink)} class="prev-next-a">
			<p>Next</p>
			{#if $darkMode}
				<img src={resolve('/icons/right_arrow_white.svg')} alt="Arrow left" style="width:24px" />
			{:else}
				<img src={resolve('/icons/right_arrow_icon.svg')} alt="Arrow right" style="width:24px" />
			{/if}
		</a>
	{/if}
</div>
