---
title: Using External Svelte Components
description: Learn how to customize the Freon editor with external Svelte components—adding icons, buttons, accordions, and a sortable table—using libraries like SMUI or your own components.
tags: Freon, Svelte, external components, editor customization, SMUI, styling, Accordion, icons, buttons, sortable table, CourseSchedule, projections
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using External Svelte Components

Freon offers a variety of native <a href="https://svelte.dev/" target="_blank">Svelte</a> components, each
associated with one of the box types in the
[editor framework](/Documentation/Under_the_Hood/Editor_Framework). You can significantly modify their appearance
via [styling](/Documentation/Defining_an_Editor/Styling).
However, you can give the editor a completely different look—or add custom functionality—
by incorporating your own Svelte components, whether from a library or custom-made. For an introduction, see
[customization using external components](/Documentation/Customizations/External_Components).

In this extended example, you’ll learn how to use external Svelte components to customize the Freon editor.
We’ll demonstrate how to add icons and buttons, use an Accordion component from a library, and create
a sorted table component. Since the complementary web app already uses the
<a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library, we’ll use it in our example.
You’re free to choose any HTML component library and CSS tooling you prefer.

The source code for this example is available on GitHub—see
[Getting Started](/Documentation/Overview/Getting_Started#example-project-startup-2).
Choose the language **CourseSchedule**. The files for each phase of the example are in folders
named `phase1`, `phase2`, and so on.

When following along in your IDE, you may notice that after regeneration the browser occasionally shows a blank page.
This happens because the browser refresh is sometimes faster than the regeneration process. (In the browser’s developer
tools console you’ll see `Uncaught SyntaxError: Unexpected end of input`.) Don’t worry—just reload the page and everything
will work correctly.
