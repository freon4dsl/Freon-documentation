# How to Create and Include a Demo

[//]: # (TODO Expand this file)

## Create the demo from freon4dsl

In main project (`Freon4dsl`):

1. copy the file MockServer.ts to weblib-starter/src
2. change the server in weblib-starter/src/starter.ts to be the MockServer
3. make sure the sample project is 'Insurance'
4. build the editor ('npm run build-dev')
5. copy weblib-starter/public/build/dist/<some-name>.js to Freon-documentation/static or a subfolder of /static,
6. and rename it to insurance-packaged.mjs
7. copy the folder with test files called 'Insurance' from Freon/packages/server/modelstore/ to /lib/demo
8. make sure the styles for the Freon editor are present: demo-global.css, demo-site.css, and demo-site-dark.css.

Use the option to not minify the output to check whether the final lines in the javascript bundle are
```js
mount(FreonLayout, {
  target: document.getElementById("freon")
});

```
```js
// the option in vite.config.js, next to plugins():
build: {
    minify: false
}
```

## Add the demo to the documentation site

1. Set the +page/svelte in /InsuranceDemo to 

```sveltehtml
<svelte:head>
    <title>My App Demo</title>
    <script type="module" src="./myApp/assets/index-CqA7-OJj.js"></script>
</svelte:head>

<div id="freon" class="demo"></div>
```

Where `src=<>` indicates the path to the javascript bundle created from freon4dsl. 
The bundle should be in /static, so as not to be tampered with by sveltekit. 
Obviously the title may be adjusted as well.

But most important is that the id of the div is exactly the same as the id in the `document.getElementById()`
in the javascript bundle.

2. In the +layout.svelte import the corresponding css file. ==> TODO change this, it does not function!

```sveltehtml
<script lang="ts">
    import "./demo-global.css"

    let { children } = $props();
</script>

{@render children()}
```

3. Add `export const prerender = true;` in +layout.ts.
