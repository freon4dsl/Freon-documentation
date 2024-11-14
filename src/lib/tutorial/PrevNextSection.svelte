<script lang="ts">
	export let prevLink: string = '';
	export let nextLink: string = '';
</script>


<div class="prev-next">
	{#if !!prevLink && prevLink.length > 0}
		<a href={prevLink} class='prev-next-a'>
			<img src="/icons/left_arrow_icon.svg" alt="Arrow left" style="width:24px"  />
			<p>Previous</p>
		</a>
	{/if}
	<span class='prev-next-spacer'>&nbsp</span>
	{#if !!nextLink && nextLink.length > 0}
		<a href={nextLink} class='prev-next-a'>
			<p>Next</p>
			<img src="/icons/right_arrow_icon.svg" alt="Arrow right" style="width:24px"  />
		</a>
	{/if}
</div>
