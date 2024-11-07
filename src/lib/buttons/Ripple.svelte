<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

	export let x: number, y: number, sizeIn, size: number, speed, rippleBlur: number;

	onMount(() => {
		rippleOpacity.set(0);
		rippleSize.set(size);
	});

	const rippleSize = tweened(sizeIn, { duration: speed }),
		rippleOpacity = tweened(0.5, {
			duration: speed + speed * 2.5,
			easing: backOut
		});
</script>

// copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/
<defs>
	<filter id="f1" x="0" y="0">
		<feGaussianBlur in="SourceGraphic" stdDeviation={rippleBlur} />
	</filter>
</defs>
<circle style="fill: var(--theme-colors-ripple-color);" cx={x} cy={y} r={$rippleSize} opacity={$rippleOpacity} filter="url(#f1)" />
