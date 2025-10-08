export function pageContent(headers): string {
	let sectionInit: string = '';
	let headerInfo = [];
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

  let showDetails: boolean = $state(false);
  
  ${sectionInit}
	
	// keep 'current' in parent so both Nav and Content can read it
  let current = $state(0);

  // Keep current in sync reactively
  $effect(() => {
    const idx = sections.findIndex(s => s.visible);
    current = idx >= 0 ? idx : 0;
  });

  // callback to update visible elements from child
  function setVisible(id: string, isVisible: boolean) {
	    console.log(id + ' is visible: ' + isVisible);
    const s = sections.find(s => s.ref === id);
    if (s) s.visible = isVisible; // $state tracks deep mutations
  }
</script>

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
  
  let { children } = $props();
</script>


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
