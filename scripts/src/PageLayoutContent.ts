export const pageContent: string =
`<script lang="ts">
  import { mySections } from './SectionStore.js';
  import type { Section } from '$lib/section/SectionType.js';
  import PageContent from './PageContent.svelte';
  import Breadcrumb from '$lib/breadcrumbs/Breadcrumb.svelte';
  import { page } from '$app/state';

  // ✅ Page-specific values (override section/root defaults)
  const title = 'Some title';
  const description = 'Learn how to install Freon 2.0 and set up your environment.'; // TODO change into the right text
  const image = 'https://freon4dsl.dev/images/freon-banner.png';
  
  let canonical = $derived.by(() => {
    const p = page.url.pathname;
    const normalized = p === '/' ? '/' : p.replace(/\\/$/, '');
    return \`https://freon4dsl.dev\${normalized}\`;
  });

  let showDetails: boolean = $state(false);
  let current = $state(getCurrent($mySections));

  function getCurrent(internalSections: Section[]): number {
    let previous = current;
    for (let i = 0; i < internalSections.length; i++) {
      if (internalSections[i].visible) {
        return i;
      }
    }
    return previous;
  }
</script>

<svelte:head>
  <!-- Basic SEO -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={canonical} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>

<div class="page-main">
  <div class='page-toc-small'>
    <p class='page-toc-small-title'>On this page ...</p>
    <button class='page-toc-small-expand-button' onclick={() => (showDetails = !showDetails)}>
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
          {#each $mySections as sec, index}
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
  <PageContent />
</div>

<nav class="page-toc">
  <h3 class="page-toc-title">On this page</h3>
  <ul class="page-ul">
    {#each $mySections as sec, index}
      <li class="page-toc-text">
        <a class:page-visible={index === current} class:page-nonvisible={index !== current} href={sec.ref}>
          {sec.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
`;

export function categoryLayoutContent(contentName: string): string {
	const title: string = "\"Freon 2.0 Docs — Guides & Reference\"";
	const description: string = "\"Official Freon 2.0 documentation: installation, metamodels, editors, generators, and API reference.\"";
return	`<script lang="ts">
  import Sidebar from '$lib/sidebar/Sidebar.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import { ${contentName} } from '$lib/sidebar/SidebarContent.js';
  import AppBar from '$lib/appbar/AppBar.svelte';
  import { page } from '$app/state';

  // Svelte 5 children API
  let { children } = $props();

  // Section-level defaults for everything under /docs/*
  const siteName = 'Freon 2.0';
  const sectionTitle = ${title};
  const sectionDescription =
    ${description};
  const sectionImage = 'https://freon4dsl.dev/images/freon-banner.png';

  // Build canonical from current path (absolute URL is important for SEO)
  let canonical = $derived(\`https://freon4dsl.dev\${page.url.pathname}\`);
</script>

<svelte:head>
  <!-- Section-level defaults (pages inside /docs can override these) -->
  <title>{sectionTitle}</title>
  <meta name="description" content={sectionDescription} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={sectionTitle} />
  <meta property="og:description" content={sectionDescription} />
  <meta property="og:image" content={sectionImage} />
  <meta property="og:url" content={canonical} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={sectionTitle} />
  <meta name="twitter:description" content={sectionDescription} />
  <meta name="twitter:image" content={sectionImage} />

  <!-- Optional: tell crawlers to index this section -->
  <meta name="robots" content="index,follow" />
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
