<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from '$lib/Store.js';
	import type { SiteProps } from '$lib/metadataTypes/MetaTypes';

	let { children, data }: SiteProps = $props();

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

	const jsonLd  = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		headline: data?.title,
		description: data?.description,
		url: 'https://freon4dsl.dev',
		image: data?.image,
		publisher: data?.title
			? { "@type": "Organization", name: data.title }
			: undefined
	}
</script>

<svelte:head>
	<!-- Basic SEO -->
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
	<meta name="robots" content='index,follow' />
	<link rel="canonical" href='https://freon4dsl.dev' />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:site_name" content={data.title} />
	<meta property="og:image" content={data.image} />
	<meta property="og:url" content='https://freon4dsl.dev' />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content='https://freon4dsl.dev' />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div>
	{@render children()}
</div>
