<!-- An svg as reusable svelte component -->
<!-- Content: material ui menu icon -->

<script lang="ts">
  export let height: number = 24;
  export let width: number = 24;
  export let fill: string = "var(--theme-colors-inverse_color)";
  export let background: string = "var(--theme-colors-bg_app_bar)";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="{width}px"
  height="{height}px"
  viewBox="0 0 {width} {height}"
  {fill}
>
  <path d="M0 0h24v24H0z" fill={background} />
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
</svg>
