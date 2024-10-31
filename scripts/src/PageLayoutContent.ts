export const layoutContent: string =
	`<script lang="ts">
		import {mySections} from './SectionStore.js';
		import type { Section } from '$lib/SectionType.js';
    $: current = getCurrent($mySections);

    function getCurrent(internalSections: Section[]): number {
      let previous = current;
      for (let i=0; i < internalSections.length; i++) {
        if (internalSections[i].visible) {
          return i;
        }
      }
      return previous;
    }
</script>

<div class="main">
    <div class="column-left">
        <slot/>
   </div>
    <div class="column-right">
        <nav class="side-nav" >
        <h3>On this page</h3>
            <ul>
                {#each $mySections as sec, index}
                    <li>
                        <a class:visible={index === current} class:nonvisible={index !== current} href={sec.ref}> {sec.title} </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</div>


<style>
    .side-nav {
      position: fixed;
      top: 25px;
      right: 25px;
      width: 15em;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    .visible  {
        border-left: solid 4px #d54309;
    }
    .nonvisible  {
      margin-left: 4px;
    }
    li {
        margin: 5px;
    }
    a {
      padding: 5px;
      color: black;
    }
    * {
        box-sizing: border-box;
    }
    .main {
        display: flex;
        overflow: auto;
    }
    .column-left {
        flex: 75;
        background: #aaa;
      padding: 8px;
    }
    .column-right {
        flex: 25;
        padding: 2px;
        background: #bbb;
    }
</style>
`
