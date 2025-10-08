<!-- src/routes/demoApp/+page.svelte -->
<!-- src/routes/demo/+page.svelte -->

<script lang="ts">
	/**
	 * WHY THIS FILE EXISTS (and why SSR stays ON)
	 * ------------------------------------------------------------
	 * We keep Server-Side Rendering (SSR) enabled site-wide for SEO (Search Engine Optimization).
	 * Search engines and link preview bots need real HTML on first load
	 * (head tags, JSON-LD, titles, descriptions). Disabling SSR turns the
	 * app into a blank shell until JS runs, which hurts discoverability.
	 *
	 * The demo bundle (insurance-packaged.js) auto-mounts itself by calling:
	 *   mount(FlowbiteFreonLayout, { target: document.getElementById('freon') })
	 * when the script executes. That means it does NOT export an init function.
	 * We just need to ensure the script is loaded in the BROWSER only, AFTER
	 * the #freon container exists. We accomplish that with `onMount`.
	 */

	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let scriptEl: HTMLScriptElement | null = null;

	// Used to show/hide a small spinner/placeholder for UX polish.
	let isLoading = true;
	let error: string | null = null;

	/**
	 * loadDemoBundle
	 * ------------------------------------------------------------
	 * Dynamically inject a <script type="module"> tag so the demo bundle
	 * runs only in the browser. This avoids SSR errors (e.g., "window is not defined")
	 * and keeps the rest of the page SSR-friendly.
	 *
	 * NOTE: Place your built bundle under `static/` so it’s served as a plain asset:
	 *   static/demoApp/assets/insurance-packaged.js
	 * It will then be accessible at:
	 *   /demoApp/assets/insurance-packaged.js
	 */
	function loadDemoBundle(src: string) {
		return new Promise<void>((resolve, reject) => {
			const s = document.createElement('script');
			s.type = 'module';
			s.async = true; // don’t block hydration
			s.src = src;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error(`Failed to load ${src}`));
			document.head.appendChild(s);
			scriptEl = s;
		});
	}

	onMount(async () => {
		// WHY: Guards ensure nothing runs on the server (where window/document don’t exist).
		if (!browser) return;

		try {
			/**
			 * WHY we load here:
			 * - The SSR step already produced HTML (including the #freon container).
			 * - Now, in the browser, we load the auto-mounting demo bundle.
			 * - The bundle will immediately call mount(..., { target: #freon }).
			 */
			await loadDemoBundle('/demoApp/assets/insurance-packaged.js');

			/**
			 * The script’s `onload` means it finished downloading and executed.
			 * Because the bundle is self-executing (auto-mounting), at this point
			 * it should have already mounted the demo into #freon (or be in the
			 * process of doing so). We can remove the spinner/placeholder.
			 */
			isLoading = false;
		} catch (e: any) {
			error = e?.message ?? String(e);
			isLoading = false;
		}
	});

	onDestroy(() => {
		// Optional cleanup in case of client-side navigation away from /demo.
		if (scriptEl && scriptEl.parentNode) {
			scriptEl.parentNode.removeChild(scriptEl);
			scriptEl = null;
		}
	});
</script>

<svelte:head>
	<!-- SSR still sets a proper title for SEO/link previews -->
	<title>Freon Demo</title>
</svelte:head>

<!--
  WHY the placeholder exists:
  - SSR returns meaningful HTML so crawlers see content.
  - Prevents layout shift (CLS) by reserving space.
  - Replaced by the mounted demo once the bundle loads.
-->
<div id="freon" class="demo" style="min-height: 420px; position: relative;">
	{#if isLoading}
		<div class="demo-loading" aria-live="polite">
			<!-- Simple spinner; replace with your own styles if you prefer -->
			<div class="spinner" aria-hidden="true"></div>
			<div>Loading interactive demo…</div>
		</div>
	{/if}
</div>

{#if error}
	<p class="demo-error" role="alert">Demo failed to load: {error}</p>
{/if}

<style>
	/* Minimal, neutral spinner styles (no external deps) */
	.demo-loading {
		display: grid;
		place-items: center;
		gap: 0.5rem;
		inset: 0;
		position: absolute;
		text-align: center;
	}
	.spinner {
		width: 28px;
		height: 28px;
		border: 3px solid rgba(0, 0, 0, 0.2);
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.demo-error {
		margin-top: 0.75rem;
		color: #b91c1c; /* red-700 */
	}
</style>
