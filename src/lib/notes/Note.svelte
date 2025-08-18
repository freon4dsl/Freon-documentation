<script lang="ts">
	import NoteIcon from '../icons/NoteIcon.svelte';

	let { header = undefined, content = undefined } = $props();
</script>

<div class="note">
	<span class="note-icon"><NoteIcon /></span>
	<span class="head">
		{#if header}
			{@render header()}
		{:else}
			Important!
		{/if}
	</span>
	<div class="content">
		{#if content}
			{@render content()}
		{/if}
	</div>
</div>
