<!-- Copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/-->
<!-- svelte-check will find errors in this file, they do not hamper the execution for now. Must find a way to avoid them. -->
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Ripple from './Ripple.svelte';
	import { writable } from 'svelte/store';

	interface ComponentProps {
		children: Snippet;
		icon: boolean;
	}
	let { children, icon = false }: ComponentProps = $props();

	// **** TYPES *****
	interface RippleType {
		x: number;
		y: number;
		size: number;
	}

	// **** END TYPES *****

	let myStyle: string = $state('materialStyle'); // default style

	// set the defaults for the ripple
	let rippleBlur: number = $state(0);
	let speed: number = $state(900);
	let sizeIn: number = $state(20);

	if (icon === true) {
		// override the defaults for the ripple settings
		rippleBlur = 9;
		speed = 500;
		sizeIn = 20;
		// and set the style to a different value
		myStyle = 'iconStyle';
	}

	function handleRipple() {
		const ripples = writable<RippleType[]>([]);

		return {
			subscribe: ripples.subscribe,

			add: (item: RippleType) => {
				ripples.update((ripples) => {
					return [...ripples, item];
				});
			},
			clear: () => {
				ripples.update(() => {
					return [];
				});
			}
		};
	}

	const ripples = handleRipple();

	let w: number, h: number, offsetX: number, offsetY: number, deltaX: number, deltaY: number, locationY: number, locationX: number, scale_ratio: number;
	let rect: DOMRect, rippleBtn: HTMLButtonElement, timer: ReturnType<typeof setTimeout>;
	let coords = { x: 50, y: 50 };

	$effect(() => {
			offsetX = Math.abs(w / 2 - coords.x);
			offsetY = Math.abs(h / 2 - coords.y);
			deltaX = w / 2 + offsetX;
			deltaY = h / 2 + offsetY;
			scale_ratio = Math.sqrt(Math.pow(deltaX, 2.2) + Math.pow(deltaY, 2.2));
	});

	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(
			() => {
				ripples.clear();
			},
			speed + speed * 2
		);
	};

	function handleClick(e: MouseEvent | TouchEvent, type: string) {
		if (type == 'touch') {
			const touch = (e as TouchEvent).touches[0]; // e.touches is an array containing all touches
			ripples.add({
				x: touch.clientX - locationX,
				y: touch.clientY - locationY,
				size: scale_ratio
			});
		} else {
				ripples.add({
					x: (e as MouseEvent).clientX - locationX,
					y: (e as MouseEvent).clientY - locationY,
					size: scale_ratio
				});
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
	class="{myStyle} rippleButton"
	bind:this={rippleBtn}
	ontouchstart={(e) => handleClick(e, 'touch')}
	onmousedown={(e) => handleClick(e, 'click')}
>
	<span>
		{@render children()}
	</span>
	<svg>
		{#each $ripples as ripple, index (index)}
			<Ripple x={ripple.x} y={ripple.y} size={ripple.size} {speed} {sizeIn} {rippleBlur} />
		{/each}
	</svg>
</button>
