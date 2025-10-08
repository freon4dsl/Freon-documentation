<script lang="ts">
	// We import resolve to support GitHub pages. It introduces the 'base' path.
	import { resolve as kitResolve } from '$app/paths';
	// Patch: cast to the actual runtime signature, because the typings are not up to date
	const resolve = kitResolve as unknown as (path: string) => string;

	interface ComponentProps {
		imageName: string;
		figureNumber: number;
		caption: string;
	}
	let { imageName, figureNumber = 1, caption }: ComponentProps = $props();
</script>

<figure class="figure">
	<img class="figure-image" src={resolve(`/images/${imageName}`)} alt={`Image '${imageName}' seems to be missing`} />
	<div class="figcaption" id={imageName}>Figure {figureNumber}. {caption}</div>
</figure>
