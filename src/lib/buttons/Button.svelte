<!-- Button.svelte -->
<script lang="ts">
	interface Props {
		disabled?: boolean;
		ariaLabel: string | undefined;
		children?: import('svelte').Snippet;
		onclick?: (e: Event) => void; // parent handler
	}

	let {
		disabled = false,
		ariaLabel,
		children,
		onclick
	}: Props = $props();

	let btn: HTMLButtonElement;

	function handleClick(e: MouseEvent) {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		// Forward the native click (mouse or keyboard-generated) to the parent
		onclick?.(e);
	}

	function onPointerDown(e: PointerEvent) {
		if (disabled) return;
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		spawnRipple(e);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (disabled) return;

		if (e.key === 'Enter') {
			// Native will dispatch a click on keydown → DO NOT call onclick here
			spawnRipple(undefined, true);
		} else if (e.key === ' ') {
			// Prevent page scroll; native will dispatch click on keyup → DO NOT call onclick here
			e.preventDefault();
			spawnRipple(undefined, true);
		}
	}

	function spawnRipple(e?: PointerEvent, keyboard = false) {
		const node = btn;
		if (!node) return;

		const prefersReducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		const duration = prefersReducedMotion ? 500 : 1500;

		const rect = node.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const diameter = Math.ceil(Math.sqrt(rect.width ** 2 + rect.height ** 2)) * 2;

		const fromCenter = keyboard || !e;
		const x = fromCenter ? rect.width / 2 : (e!.clientX - rect.left);
		const y = fromCenter ? rect.height / 2 : (e!.clientY - rect.top);

		const el = document.createElement('span');
		el.className = 's-ripple';
		el.setAttribute('aria-hidden', 'true');

		const color = getComputedStyle(node).color;

		el.style.position = 'absolute';
		el.style.borderRadius = '9999px';
		el.style.pointerEvents = 'none';
		el.style.width = el.style.height = `${diameter}px`;
		el.style.left = `${x - diameter / 2}px`;
		el.style.top = `${y - diameter / 2}px`;
		el.style.background = color.trim();
		el.style.opacity = '0.25';
		el.style.transform = 'scale(0)';
		el.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

		node.appendChild(el);

		void el.offsetHeight;
		el.style.transform = `scale(${diameter / size})`;
		el.style.opacity = '0';

		el.addEventListener('transitionend', () => el.remove(), { once: true });
	}
</script>

<button
	bind:this={btn}
	class="rippleButton"
	aria-disabled={disabled}
	disabled={disabled}
	aria-label={ariaLabel}
	onclick={handleClick}
	onpointerdown={onPointerDown}
	onkeydown={onKeyDown}
>
	<span class="rippleButtonContent">{@render children?.()}</span>
</button>

