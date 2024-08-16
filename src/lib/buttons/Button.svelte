<!-- copied and adjusted from https://www.reddit.com/r/sveltejs/comments/fkfpd8/svg_ripple_button_component/-->
<script lang="ts">
  import { onMount } from "svelte";
  import Ripple from "./Ripple.svelte";
  import { writable } from "svelte/store";

  export let icon: boolean = false;

  let myStyle = "materialStyle"; // default style

  // set the defaults for the ripple
  let rippleBlur = 0;
  let speed = 900;
  let sizeIn = 20;

  if (icon === true) {
    // override the defaults for the ripple settings
    (rippleBlur = 9), (speed = 500), (sizeIn = 20);
    // and set the style to a different value
    myStyle = "iconStyle";
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
      },
    };
  }

  const ripples = handleRipple();

  let rect,
    rippleBtn,
    w,
    h,
    x,
    y,
    offsetX,
    offsetY,
    deltaX,
    deltaY,
    locationY,
    locationX,
    scale_ratio,
    timer;
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
    if (type == "touch") {
      touch = true;
      ripples.add({
        x: e.pageX - locationX,
        y: e.pageY - locationY,
        size: scale_ratio,
      });
    } else {
      if (!touch) {
        ripples.add({
          x: e.clientX - locationX,
          y: e.clientY - locationY,
          size: scale_ratio,
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
  class={myStyle}
  bind:this={rippleBtn}
  on:touchstart={(e) => handleClick(e.touches[0], "touch")}
  on:mousedown={(e) => handleClick(e, "click")}
>
  <span>
    <slot />
  </span>
  <svg>
    {#each $ripples as ripple, index}
      <Ripple
        x={ripple.x}
        y={ripple.y}
        size={ripple.size}
        {speed}
        {sizeIn}
        {rippleBlur}
      />
    {/each}
  </svg>
</button>

<style>
  button {
    border: none;
    font-weight: 500;
    max-width: 100%;
    padding: 0;
    position: relative;
    cursor: pointer;
    transition: 200ms all ease-out;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  button.materialStyle {
    height: 36px;
    width: 115px;
    fontsize: 0.875rem;
    color: var(--theme-colors-button_color);
    background-color: var(--theme-colors-button_bg_color);
    border-radius: 0.2rem;
  }
  button.materialStyle:hover,
  button.materialStyle:focus {
    outline: none;
    background-color: var(--theme-colors-button_hover);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  button.materialStyle:active {
    outline: none;
    background-color: var(--theme-colors-button_active);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  button.iconStyle {
    height: 24px;
    width: 24px;
    color: var(--theme-colors-button_color);
    background-color: var(--theme-colors-button_bg_color);
    border-radius: 2rem;
  }
  button.iconStyle:hover button.iconStyle:focus {
    outline: none;
    background-color: var(--theme-colors-button_hover);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  button.iconStyle:active {
    outline: none;
    background-color: var(--theme-colors-button_active);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  span {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 1;
  }
  svg {
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
  }
</style>
