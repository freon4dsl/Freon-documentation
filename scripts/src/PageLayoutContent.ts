export const pageContent: string =
`<script lang="ts">
  import { mySections } from './SectionStore.js';
  import type { Section } from '$lib/section/SectionType.js';
  import PageContent from './PageContent.svelte';
  import Breadcrumb from '$lib/breadcrumbs/Breadcrumb.svelte';

  let showDetails: boolean = false;
  $: current = getCurrent($mySections);

  function getCurrent(internalSections: Section[]): number {
    let previous = current;
    for (let i = 0; i < internalSections.length; i++) {
      if (internalSections[i].visible) {
        return i;
      }
    }
    return previous;
  }
  function toggleTocDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="page-main">
  <div class='page-toc-small'>
    <p class='page-toc-small-title'>On this page ...</p>
    <button class='page-toc-small-expand-button' on:click={() => {toggleTocDetails()}  }>
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
return	`<script lang="ts">
  import Sidebar from '$lib/sidebar/Sidebar.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import { ${contentName} } from '$lib/sidebar/SidebarContent.js';
  import AppBar from '$lib/appbar/AppBar.svelte';
</script>


<main class="main-window">
  <AppBar />
  <div class="content-box">
    <div class="page-container">
      <section class="page-side-nav">
        <Sidebar tocContent={${contentName}} />
      </section>

      <section class="page-content-container">
        <slot />
      </section>
    </div>
  </div>
  <Footer />
</main>`;
}
