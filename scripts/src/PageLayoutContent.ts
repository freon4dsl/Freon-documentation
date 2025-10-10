export function pageContent(headers): string {
	let sectionInit: string = '';
	const headerInfo = [];
	if (Array.isArray(headers)) {
		headers.forEach((head) => {
			headerInfo.push(`{id: "${head.id}", title: "${head.text}", visible: false, ref: '#${head.id}'}`);
		});
	} else {
		console.log('NO HEADERS ARRAY');
	}
	if (headerInfo.length > 0) {
		sectionInit = `
						const sections = $state<Section[]>([
																${headerInfo.map((hh) => `${hh}`).join(',\n')}
														]);
						`;
	}
	return `<script lang="ts">
  import type { Section } from '$lib/section/SectionType.js';
  import PageContent from './PageContent.svelte';
  import Breadcrumb from '$lib/breadcrumbs/Breadcrumb.svelte';
	import type { PageProps } from '$lib/metadataTypes/MetaTypes';
	import { page } from '$app/state';
	  
	let { data }: PageProps = $props();  
  let showDetails: boolean = $state(false);
  
  ${sectionInit}
	
	// keep 'current' in parent so both Nav and Content can read it
  let current = $state(0);

  // callback to update visible elements from child
  function setVisible(id: string, isVisible: boolean) {
  	const s = sections.find((s) => s.id === id);
   	if (s) s.visible = isVisible; // $state tracks deep mutations
    const idx = sections.findIndex((s) => s.visible); // set current to the top most visible heading
    if (idx >= 0) {
       current = idx;
    }
  }
	
	// the stuff below ensures that meta data is added to the page
  const fullTitle = $derived(
    data.pageTitle
      ? \`\${data.pageTitle} – \${data.category.title} – \${data.site.title}\`
      : \`\${data.category.title} – \${data.site.title}\`
  );
  const description = $derived(data.description ?? data.category.description);
  const image = 'https://freon4dsl.dev/images/freon-banner.png';
  let canonical = $derived.by(() => {
    const p = page.url.pathname;
    const normalized = p === '/' ? '/' : p.replace(/\\/$/, '');
    return \`https://freon4dsl.dev\${normalized}\`;
  });
  const jsonLd  = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline: fullTitle,
      description,
      url: canonical,
      datePublished: data?.publishedTime,
      dateModified: data?.modifiedTime,
      image: image,
      publisher: data?.site?.title
        ? { "@type": "Organization", name: data.site.title }
        : undefined
    }
</script>

<svelte:head>
  <!-- Basic SEO -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="robots" content='index,follow' />
  <link rel="canonical" href={canonical} />
  
  {#if data.publishedTime}
    <meta property="article:published_time" content={data.publishedTime} />
  {/if}
  {#if data.modifiedTime}
    <meta property="article:modified_time" content={data.modifiedTime} />
  {/if}

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={data.site.title} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={canonical} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  
   <!-- JSON-LD -->
  {@html \`<script type="application/ld+json">\${JSON.stringify(jsonLd)}</script>\`}
</svelte:head>

<div class="page-main">
  <div class='page-toc-small'>
    <p class='page-toc-small-title'>On this page ...</p>
    <button class='page-toc-small-expand-button' onclick={() => {showDetails = !showDetails}  }>
      {#if showDetails }
        <img class='page-toc-small-img' src="/icons/upload.png" alt="arrow up"/>
      {:else}
        <img class='page-toc-small-img' src="/icons/down-arrow.png" alt="arrow down"/>
      {/if}
    </button>
  </div>
    {#if showDetails }
      <div class='toc-details'>
        <ul class="page-ul">
          {#each sections as sec, index (sec)}
            <li class="page-toc-text">
              <a class:page-visible={index === current} class:page-nonvisible={index !== current} href={sec.ref}>
                {sec.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

	<Breadcrumb />
  <PageContent {setVisible} />
</div>

<nav class="page-toc">
  <h3 class="page-toc-title">On this page</h3>
  <ul class="page-ul">
    {#each sections as sec, index (sec)}
      <li class="page-toc-text">
        <a class:page-visible={index === current} class:page-nonvisible={index !== current} href={sec.ref}>
          {sec.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
`;
}

export function categoryLayoutContent(contentName: string): string {
return	`<script lang="ts">
  import Sidebar from '$lib/sidebar/Sidebar.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import { ${contentName} } from '$lib/sidebar/SidebarContent.js';
  import AppBar from '$lib/appbar/AppBar.svelte';
  import type { CategoryProps } from '$lib/metadataTypes/MetaTypes';

	let { children,  data }: CategoryProps = $props();
	
	// --- Derived title (recomputes when \`data\` changes)
	const fullTitle: string = $derived(
		data?.pageTitle
			? \`\${data.pageTitle} – \${data.category.title} – \${data.site.title}\`
			: \`\${data.category.title} – \${data.site.title}\`
	);
</script>

<svelte:head>
  <title>{fullTitle}</title>

  <!-- Section-level defaults (safe fallbacks pages can override) -->
  <meta name="description" content={data.category.description} />
  <meta property="og:site_name" content={data.site.title} />
  <meta property="og:type" content="website" />
  {#if data.category.ogImage}
    <meta property="og:image" content={data.category.ogImage} />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>


<main class="main-window">
  <AppBar />
  <div class="content-box">
    <div class="page-container">
      <section class="page-side-nav">
        <Sidebar tocContent={${contentName}} />
      </section>

      <section class="page-content-container">
        {@render children()}
      </section>
    </div>
  </div>
  <Footer />
</main>`;
}
