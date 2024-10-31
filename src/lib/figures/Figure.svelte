<script lang="ts">
	export let imageName: string;
	export let figureNumber: number = 1;
	export let caption: string;
</script>

<figure class="figure">
	<img class="image" src="/images/{imageName}" alt="Image '{imageName}' seems to be missing" />
	<figcaption id={imageName}>Figure {figureNumber}. {caption}</figcaption>
</figure>

<style>
	.figure {
		background-color: var(--theme-colors-figure_background);
		margin: 20px 20px 20px 20px;
		padding: 20px 20px 20px 20px;
		border-radius: 3px;
	}
	.image {
		margin: 10px 10px 10px 10px;
		max-width: var(--max-image-width);
	}
</style>
