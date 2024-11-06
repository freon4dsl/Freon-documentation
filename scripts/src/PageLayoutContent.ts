export const pageContent: string =
`<script lang="ts">
  import { mySections } from './SectionStore.js';
  import type { Section } from '$lib/SectionType.js';
  import PageContent from './PageContent.svelte';

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
</script>

<div class="page-main">
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
  import SideBar from '$lib/sidebar/SideBar.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import { ${contentName} } from '$lib/sidebar/SidebarContent.js';
</script>

<div class="page-container">
  <section class="page-side-nav">
    <SideBar tocContent={${contentName}} />
  </section>

  <section class="page-content-container">
    <slot />
  </section>
</div>

<Footer />`;
}
