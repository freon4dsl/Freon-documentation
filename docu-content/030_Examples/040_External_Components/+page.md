<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using External Svelte Components

Freon offers a variety of native <a href="https://svelte.dev/" target="_blank">Svelte</a> components, each 
associated with one of the box types in
the [editor framework](/Documentation/Under_the_Hood/Editor_Framework). You can significantly modify the appearance
of these components by adjusting the [styling](/Documentation/Defining_an_Editor/Styling).
However, you can give the editor a completely different look, or add custom functionality, 
by incorporating your own Svelte components, either from a library or custom-made. For an introduction, please refer
to [customization using external components](/Documentation/Customizations/External_Components).

In this extended example, you’ll learn how to use external Svelte components to customize the Freon editor.
We will demonstrate how to add icons and buttons, use an Accordion component from a library, and create
a sorted table component. Since we are already utilizing
the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library in the complementary web application,
we'll be using this library in our example. However, you're free to choose your own HTML library and CSS styling tools.

The source code for this example is available on GitHub, 
see [Getting Started](/Documentation/Overview/Getting_Started#example-project-startup-2). Choose the language called "CourseSchedule". The files for each phase of the example are in folders
called 'phase1', 'phase2', etc.

When you're following along with your own IDE, you may
notice that after regeneration, the browser sometimes displays an empty page. This happens because the browser's refresh is often
faster than the regeneration process. (In the browser's development tools console, you'll see the
message `Uncaught SyntaxError: Unexpected end of input`.) Don't worry—just reload the page, and everything will work fine.
