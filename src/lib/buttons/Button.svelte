<!-- copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/-->
<script lang="ts">
	import { onMount } from 'svelte';
	import Ripple from './Ripple.svelte';
	import { writable } from 'svelte/store';

	export let icon: boolean = false;

	let myStyle = 'materialStyle'; // default style

	// set the defaults for the ripple
	let rippleBlur = 0;
	let speed = 900;
	let sizeIn = 20;

	if (icon === true) {
		// override the defaults for the ripple settings
		(rippleBlur = 9), (speed = 500), (sizeIn = 20);
		// and set the style to a different value
		myStyle = 'iconStyle';
	}

	function handleRipple() {
		const ripples = writable([]);

		return {
			subscribe: ripples.subscribe,

			add: (item) => {
				ripples.update((items) => {
					return [...items, item];
				});
			},
			clear: () => {
				ripples.update((items) => {
					return [];
				});
			}
		};
	}

	const ripples = handleRipple();

	let rect, rippleBtn, w, h, x, y, offsetX, offsetY, deltaX, deltaY, locationY, locationX, scale_ratio, timer;
	let coords = { x: 50, y: 50 };

	$: (offsetX = Math.abs(w / 2 - coords.x)),
		(offsetY = Math.abs(h / 2 - coords.y)),
		(deltaX = w / 2 + offsetX),
		(deltaY = h / 2 + offsetY),
		(scale_ratio = Math.sqrt(Math.pow(deltaX, 2.2) + Math.pow(deltaY, 2.2)));

	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			ripples.clear();
		}, speed + speed * 2);
	};

	let touch: boolean;

	function handleClick(e, type) {
		if (type == 'touch') {
			touch = true;
			ripples.add({
				x: e.pageX - locationX,
				y: e.pageY - locationY,
				size: scale_ratio
			});
		} else {
			if (!touch) {
				ripples.add({
					x: e.clientX - locationX,
					y: e.clientY - locationY,
					size: scale_ratio
				});
			}
			touch = false;
		}
		debounce();
	}

	onMount(() => {
		w = rippleBtn.offsetWidth;
		h = rippleBtn.offsetHeight;
		rect = rippleBtn.getBoundingClientRect();
		locationY = rect.y;
		locationX = rect.x;
	});
</script>

<button
	on:click
	class="{myStyle} rippleButton"
	bind:this={rippleBtn}
	on:touchstart={(e) => handleClick(e.touches[0], 'touch')}
	on:mousedown={(e) => handleClick(e, 'click')}
>
	<span>
		<slot />
	</span>
	<svg>
		{#each $ripples as ripple, index}
			<Ripple x={ripple.x} y={ripple.y} size={ripple.size} {speed} {sizeIn} {rippleBlur} />
		{/each}
	</svg>
</button>
