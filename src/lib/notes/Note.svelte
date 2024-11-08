<script lang="ts">
	import NoteIcon from '../icons/NoteIcon.svelte';
</script>

<div class="note">
	<span class="note-icon"><NoteIcon /></span><span class="head"><slot name="header">Important!</slot></span>
	<div class="content">
		<slot name="content" />
	</div>
</div>
