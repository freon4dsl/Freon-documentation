<script lang="ts">
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import { documentationToc } from '$lib/sidebar/SidebarContent.js';
	import AppBar from '$lib/appbar/AppBar.svelte';
</script>

<main class="main-window">
	<AppBar />
	<div class="content-box">
		<div class="page-container">
			<section class="page-side-nav">
				<Sidebar tocContent={documentationToc} />
			</section>

			<section class="page-content-container">
				<slot />
			</section>
		</div>
	</div>
	<Footer />
</main>
