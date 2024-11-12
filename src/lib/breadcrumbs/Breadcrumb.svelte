<script lang="ts">
	import { page } from '$app/stores';
	import type { BreadcrumbItem } from './BreadcrumbTypes';

	let crumbs: BreadcrumbItem[] = [];

	$: {
		// Remove zero-length tokens.
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');

		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			t = t.replace(/_/g, ' ');
			return {
				label: $page.data.label || t,
				href: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'Home', href: '/' });
	}
</script>

<div class="breadcrumb">
	{#each crumbs as c, i}
		{#if i == crumbs.length - 1}
			<span class="label">
				{c.label}
			</span>
		{:else}
			<a href={c.href}>{c.label}</a> &gt;&nbsp;
		{/if}
	{/each}
</div>
