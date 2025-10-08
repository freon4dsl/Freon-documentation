<script lang="ts">
	import { page } from '$app/state';
	import type { BreadcrumbItem } from './BreadcrumbTypes';
	// We import resolve to support GitHub pages. It introduces the 'base' path.
	import { resolve as kitResolve } from '$app/paths';
	// Patch: cast to the actual runtime signature, because the typings are not up to date
	const resolve = kitResolve as unknown as (path: string) => string;

	let crumbs: BreadcrumbItem[] = $state([]);

	$effect(() => {
		// Remove zero-length tokens.
		const tokens = page.url.pathname.split('/').filter((t) => t !== '');

		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			t = t.replace(/_/g, ' ');
			return {
				label: page.data.label || t,
				href: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'Home', href: '/' });
	});
</script>

<div class="breadcrumb">
	{#each crumbs as c, i (i)}
		{#if i == crumbs.length - 1}
			<span class="label">
				{c.label}
			</span>
		{:else}
			<a href={resolve(c.href)}>{c.label}</a> &gt;&nbsp;
		{/if}
	{/each}
</div>
