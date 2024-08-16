<script>
  import { getContext } from "svelte";
  import Button from "$lib/buttons/Button.svelte";
  import InvertColors from "$lib/icons/InvertColors.svelte";

  const { toggle } = getContext("theme");
</script>

<Button on:click={toggle} icon={true}>
  <InvertColors />
</Button>
