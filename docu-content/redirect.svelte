<script context="module">
	// this script redirects the user to the main page located at '/'
	// which is routes/index.md
	export async function load() {
		return {
			status: 302,
			redirect: '/'
		};
	}
</script>
