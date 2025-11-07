# How to Create and Include a Demo

## Create the Demo from Freon4dsl

In main project (`Freon4dsl`):

1. Copy the folder Freon-documentation/demo-helpers to webapp-flowbite/src, this includes a MockServer.ts file.
2. Change the server in webapp-flowbite/src/starter.ts to be a new MockServer instance.
3. Add this statement to webapp-flowbite/src/starter.ts, before `WebappConfigurator.getInstance().setEnvironment()`:

```ts
WebappConfigurator.getInstance().isDemo = true;
```

3. Make sure the sample project is 'Insurance' and that the external components are imported (in externals.ts).
4. Build the complete editor ('npm run build-dev' from top level/Freon4dsl), and check it in a browser (npm run dev).
5. Build an index-<SOMETHING>.js file by executing 'npm run build-app' in webapp-flowbite (the generated name is different every time). 
   You will find it in "webapp-flowbite/dist/assets".

Use the option to not minify the output ("vite build --minify false" or by changing vite.config.js as below) 
to check whether the final lines in the javascript bundle are
```js
mount(FlowbiteFreonLayout, {
  target: document.getElementById("freon")
});

```
```js
// the option in vite.config.js, next to plugins():
build: {
    minify: false
}
```

When all is fine, build the bundle using 'minify: true', and go back to this repo.

## Move the generated demo to the documentation repo

1. Copy the content of the folder Freon4dsl/webapp-flowbite/dist/ to Freon-documentation/static/demoApp
2. Rename the index-<SOMETHING>.js file in the above folder to insurance-packaged.js (the generated name is different every time).
3. Move the freonlogo.svg from demoApp to /static (if it is not already present)

## Add the demo to the documentation pages

Actually, the following should all be in place, but just to be sure it is repeated here.

1. Set the +page.svelte in src/routes/DocuProjectDemo to 

```sveltehtml
<svelte:head>
    <title>Freon Demo</title>
    <script type="module" src="./demoApp/assets/insurance-packaged.js"></script>
</svelte:head>

<div id="freon" class="demo"></div>
```

Where `src="` indicates the path to the javascript bundle created from freon4dsl. 
This bundle should be in /static, so as not to be tampered with by sveltekit. 
Obviously, the title may be adjusted, if you please.
But most important is that the id of the div is exactly the same as the id in the `document.getElementById()`
in the javascript bundle.

2. In the +layout.svelte import the corresponding css file.

```sveltehtml
<link rel="stylesheet" crossorigin href="./demoApp/site.css">
<slot />
```

Or, when working with svelte version 5:
```sveltehtml
<link rel="stylesheet" crossorigin href="./demoApp/site.css">
{@render children()}
```

3. Add `export const prerender = true;` in +layout.ts.
