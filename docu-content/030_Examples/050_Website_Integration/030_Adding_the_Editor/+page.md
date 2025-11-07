---
title: Adding the Editor
description: Embed the Freon editor into your custom web page. Learn how to connect the editor to the WebappConfigurator, apply Flowbite and Tailwind CSS styling, and enable dark mode support.
tags: Freon, Svelte, Integration, Editor, Flowbite, Tailwind, dark mode, WebappConfigurator, FreonComponent, CSS, Freon4DSL, core-svelte
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Adding the Editor

Now at last, we come to the part you have been waiting for: adding the editor to the webpage.
Because of all the previous work, this is now easy. Add a single line to your Svelte component,
and add a single line to the `showUnit` function in the `WebappConfigurator`. The rest of
the `showUnit` function is merely administration to keep some of the state variables in sync.

```html
// IntegrationExample/webapp/src/lib/main-app/WebappLayout.svelte#L64-L64

<FreonComponent editor={WebappConfigurator.getInstance().editorEnvironment?.editor} />
```

```ts
// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L158-L158

this.editorEnvironment.editor.rootElement = newUnit;
```

But wait, we are forgetting the styling.

## CSS Styling

The choice for the <a href="https://flowbite-svelte.com/" target="_blank">Flowbite</a> UI library means that we
must work with <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> as a CSS framework. Furthermore, the
dark mode button provided by Flowbite depends on dark mode being toggled based on
a CSS selector instead of the `prefers-color-scheme` media query
(see <a href="https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually" target="_blank">Tailwind Dark mode</a>).
So we need to adjust our CSS files.

For this we have copied the CSS files from the `@freon4dsl/core-svelte` package and imported them in
the main CSS file.

```scss
// IntegrationExample/webapp/src/app.css#L5-L8

@import '../static/freon.css';
@import '../static/freon-dark.css';
@import '../static/freon-light.css';
```

Furthermore, in the CSS for the dark mode every entry has been prefixed with `.dark`.

```scss
// IntegrationExample/webapp/static/freon-dark.css#L7-L12

.dark .freon-component {
    color: whitesmoke;
    background-color: darkslategray;
    --md-sys-color-primary: whitesmoke;
    --md-sys-color-on-surface-variant: whitesmoke; /* color for the one that is not checked */
}
```

## The Result

Now, drum roll, please! Here is the Freon editor integrated in the webpage of your choice!

<Figure
imageName={'examples/WebsiteIntegration/app-with-editor.png'}
caption={'Webpage showing the Freon editor'}
figureNumber={1}
/>
