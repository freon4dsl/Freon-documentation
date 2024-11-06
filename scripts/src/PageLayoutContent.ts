export const layoutContent: string =
`<script lang="ts">
  import { mySections } from './SectionStore.js';
  import type { Section } from '$lib/SectionType.js';
  import TreeView from '$lib/tree/TreeView.svelte';
  import Footer from '$lib/footer/Footer.svelte';

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

<div class="page-container">
  <section class="page-side-nav">
    <TreeView />
  </section>

  <section class="page-content-container">
    <div class="page-main">
      <slot />
    </div>

    <nav class="page-toc">
      <h3 class='page-toc-title'>On this page</h3>
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
  </section>
</div>

<Footer />
`;
