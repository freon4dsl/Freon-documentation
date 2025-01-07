<script lang="ts">
	import { darkMode } from '$lib/Store';

	export let prevLink: string = '';
	export let nextLink: string = '';
</script>

<div class="prev-next">
	{#if !!prevLink && prevLink.length > 0}
		<a href={prevLink} class="prev-next-a">
			{#if $darkMode}
				<img src="/icons/left_arrow_white.svg" alt="Arrow left" style="width:24px" />
			{:else}
				<img src="/icons/left_arrow_icon.svg" alt="Arrow left" style="width:24px" />
			{/if}
			<p>Previous</p>
		</a>
	{/if}
	<span class="prev-next-spacer">&nbsp</span>
	{#if !!nextLink && nextLink.length > 0}
		<a href={nextLink} class="prev-next-a">
			<p>Next</p>
			{#if $darkMode}
				<img src="/icons/right_arrow_white.svg" alt="Arrow left" style="width:24px" />
			{:else}
				<img src="/icons/right_arrow_icon.svg" alt="Arrow right" style="width:24px" />
			{/if}
		</a>
	{/if}
</div>
