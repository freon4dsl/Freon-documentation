<script lang="ts">
	interface ComponentProps {
		imageName: string;
		figureNumber: number;
		caption: string;
	}
	let { imageName, figureNumber = 1, caption }: ComponentProps = $props();
</script>

<figure class="figure">
	<img class="figure-image" src="/images/{imageName}" alt="Image '{imageName}' seems to be missing" />
	<div class="figcaption" id={imageName}>Figure {figureNumber}. {caption}</div>
</figure>
