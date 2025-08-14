<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

	interface ComponentProps {
		x: number;
		y: number;
		sizeIn: number;
		size: number;
		speed: number;
		rippleBlur: number;
	}
	let { x, y, sizeIn, size, speed, rippleBlur }: ComponentProps = $props();

	onMount(() => {
		rippleOpacity.set(0);
		rippleSize.set(size);
	});

	const rippleSize = new Tween(sizeIn, { duration: speed }),
		rippleOpacity = new Tween(0.5, {
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
<circle style="fill: var(--color-button-active);" cx={x} cy={y} r={rippleSize.current} opacity={rippleOpacity.current} filter="url(#f1)" />
