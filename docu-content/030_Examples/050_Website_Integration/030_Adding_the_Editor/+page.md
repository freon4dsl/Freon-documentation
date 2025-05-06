<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Adding the Editor

Now at last, we come to part you have been waiting for: adding the editor to the webpage.
Because of all the previous work, this is now easy. Add a single line to your Svelte component, 
and add a single line to the `showUnit` function in the `WebappConfigurator`. The rest of 
the `showUnit` function is merely administration to keep some of the state variables in sync.

```html
// IntegrationExample/webapp/src/lib/main-app/WebappLayout.svelte#L64-L64

<FreonComponent editor={WebappConfigurator.getInstance().editorEnvironment?.editor} />
```

```ts
// IntegrationExample/webapp/src/lib/language/WebappConfigurator.ts#L158-L158


```

But wait, we are forgetting the styling.

## CSS Styling

The choice for the [Flowbite](https://flowbite-svelte.com/) UI library, means that we 
must work with [Tailwind](https://tailwindcss.com/) as a CSS library. Furthermore, the
dark mode button provided by Flowbite depends on the dark mode being toggled based on
a CSS selector instead of the `prefers-color-scheme` media query 
(see [Tailwind Dark mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)).
So we need to adjust our css files.

For this we have copied the css files from the `@freon4dsl/core-svelte` package and imported them in
the main css file.

```scss
// IntegrationExample/webapp/src/app.css#L5-L8


```

Furthermore, in the css for the dark mode every entry has been prefixed with `.dark`.

```scss
// IntegrationExample/webapp/static/freon-dark.css#L7-L12


```

## The Result

Now, drum roll, please! Here is the Freon editor integrated in the webpage of your choice!

<Figure
imageName={'examples/WebsiteIntegration/app-with-editor.png'}
caption={'Webpage showing the Freon editor'}
figureNumber={1}
/>
