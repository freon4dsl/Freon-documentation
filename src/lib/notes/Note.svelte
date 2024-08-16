<script lang="ts">
  import NoteIcon from "../icons/NoteIcon.svelte";
</script>

<div class="note">
  <span class="icon"><NoteIcon /></span><span class="head"
    ><slot name="header">Important!</slot></span
  >
  <div class="content">
    <slot name="content" />
  </div>
</div>

<style>
  .note {
    background: var(--theme-colors-note_background);
    margin: 20px 20px 20px 20px;
    border-radius: 3px;
    box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
    padding: 0em 0.5em 0.7em 0.5em;
    overflow-x: auto;
    color: var(--theme-colors-color);
  }
  .icon {
    position: relative;
    top: 8px; /* to align with the text */
  }
  .head {
    font-weight: bold;
    padding-left: 0.7em;
  }
  .content {
    padding: 0.5em;
  }
</style>
