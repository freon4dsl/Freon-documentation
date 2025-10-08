<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from '$lib/Store.js';

	let { children } = $props();

	const siteName = 'Freon 2.0';
	const defaultTitle = 'Freon 2.0 — DSL Toolkit for TypeScript';
	const defaultDescription = 'Build domain-specific languages, editors, and modeling tools with TypeScript.';
	const defaultImage = 'https://freon4dsl.dev/images/freon-banner.png'; // 1200x630

	onMount(() => {
		// dark preference stored in local storage of browser has precedence
		if (localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') !== undefined) {
			if (localStorage.getItem('darkMode') === 'enabled') {
				window.document.body.classList.add('dark');
				$darkMode = true;
				console.log(`darkMode from layout LOCAL: ${$darkMode}`);
			}
			// if no local storage preference available, look at the global preference
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			window.document.body.classList.add('dark');
			$darkMode = true;
			console.log(`darkMode from layout GLOBAL: ${$darkMode}`);
		}

		// default is 'light', i.e. darkMode === false
	});
</script>

<svelte:head>
	<!-- Fallbacks: pages should override these -->
	<title>{defaultTitle}</title>
	<meta name="description" content={defaultDescription} />

	<!-- Open Graph defaults -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={defaultTitle} />
	<meta property="og:description" content={defaultDescription} />
	<meta property="og:image" content={defaultImage} />

	<!-- Twitter defaults -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={defaultTitle} />
	<meta name="twitter:description" content={defaultDescription} />
	<meta name="twitter:image" content={defaultImage} />
</svelte:head>

<div>
	{@render children()}
</div>
