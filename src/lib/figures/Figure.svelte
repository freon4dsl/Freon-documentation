<script lang="ts">
	export let imageName: string;
	export let figureNumber: number = 1;
	export let caption: string;
</script>

<figure class="figure">
	<img class="figure-image" src="/images/{imageName}" alt="Image '{imageName}' seems to be missing" />
	<figcaption id={imageName}>Figure {figureNumber}. {caption}</figcaption>
</figure>
