<script>
    import Note from "../../lib/notes/Note.svelte";
    import Figure from "../../lib/figures/Figure.svelte";
</script>

# Installing and Using Freon

Be sure to have <a href="https://nodejs.org/" target="_blank">node.js</a> 
and <a href="https://yarnpkg.com/" target="_blank">yarn</a>
running. We are typically using the latest versions of all,
although older versions likely work just as well.
You could also try and use <a href="https://www.npmjs.com/" target="_blank">npm</a> instead of yarn.

There are two ways to start with Freon, either use our
Example project or use our Template project.

## Start with the Example Project
The simplest manner to start working with Freon is to clone the example project from GitHub.
In the following the root of your project will be indicated with '~'.

*   Clone branch `master` from <a href="https://github.com/projectit-org/ProjectIt-example" target="_blank">
    https://github.com/projectit-org/ProjectIt-example</a> in your preferred IDE.
    (For an explanation of the content of the project see 
    [Project_Structure](/020_Getting_Started/020_Project_Structure)).
    
*   Next, install all necessary packages by running: 
    ```bash
    yarn install
    ```

*   Run the generator and see the generated files appearing in the folder ~/src/picode:
    ```bash
    yarn generate
    ```

*   Start the server (note that anything that is saved in the editor will be stored in ~/modelstore):
    ```bash
    yarn model-server
    ```

*	Open another (bash) terminal, and start the generated editor from it:
    ```bash
    yarn prepare-app   # Needed to generate the runtime CSS files.
    yarn dev
    ```
     
<Note>
<svelte:fragment slot="header">Open browser at localhost</svelte:fragment>
<svelte:fragment slot="content">
The last command opens your preferred browser with the generated editor for the language `Entity` on
`<a href="http://localhost:5000/" target="_blank">http://localhost:5000/</a>`. If Chrome is not
your preferred browser, please open the above page in Chrome, because we cannot
ensure that the editor functions as it should in other browsers."
</svelte:fragment></Note>

*   Try out the editor

<Note><svelte:fragment slot="header"> Use Help Menu</svelte:fragment><svelte:fragment slot="content">
If you are having trouble using the editor, have a look at the key-bindings under the <em>Help</em> menu.
</svelte:fragment></Note>

## Start with the Template project

Another way to start working with Freon is to clone our template project from GitHub. The template 
project provides a shell for the generated editor that enables the user to work with multiple models and
[model units](/010_Intro/030_Models_and_Model_Units).
In the following the root of the project will be indicated with '~'.

*   Clone branch `master` from <a href="https://github.com/projectit-org/ProjectIt-template" target="_blank">
    https://github.com/projectit-org/ProjectIt-template</a>.
    (For an explanation of the content of the project see
    [Project_Structure](/020_Getting_Started/020_Project_Structure)).

*   Next, install all necessary packages by running:
    ```bash
    yarn install
    ```

*   Create a folder for your language in `~/src`, to hold the definition files for your language.
    We usually call it *defs*, but any name will do. (Here the name *defs* will be used.)

*	Create a language definition file which defines the structure of your language. The 
     extension of this file must be `.ast`. You can, for instance, copy
     `EntityLanguage.ast` from the Freon example to your own `defs`-folder. Or, you can follow the 
     tutorial on [language structure definition](/030_Developing_a_Language/010_Default_Level).

<Note>
    <svelte:fragment slot="header"> Only the language structure is required</svelte:fragment>
    <svelte:fragment slot="content">
    To start, you only need to define the language structure,
    defaults will be generated for the editor, scoper, typer, and validator. This is called the first
    level of customization.
    </svelte:fragment>
</Note>

*   Next, adjust the `scripts` entry in the *package.json* file. The `generate`
    script should include your *defs* folder as well as the folder where you want the 
    generated code to be stored.
    In the following screenshot, we use `~/src/defs` and `~/src/picode`, respectively.

<Figure 
imageName={'packagejsonadjustment.png'} 
caption={'Screenshot of package.json'}
figureNumber={1}
/>

*   Run the generator and see the generated files appearing in the folder where you
decided to store the generated code (in the screenshot we used `src/picode`):
    
```bash
    yarn generate
```

*   Adjust the configuration of the web application by changing the two lines in the file
`~/src/webapp/config/WebappConfiguration.ts`.
<Figure 
imageName={'webappconfiguration.png'} 
caption={'Screenshot of WebappConfiguration'}
figureNumber={2}
/>

*   Start the server (note that anything that is saved in the editor will be stored in `~/modelstore`): 
    ```bash
    yarn model-server
    ```

*	Open another (bash) terminal, and start the generated editor from it: 
    ```bash
    yarn prepare-app   # Needed to generate the runtime CSS files.
    yarn dev
    ```
     
<Note>
<svelte:fragment slot="header">Open browser at localhost</svelte:fragment>
<svelte:fragment slot="content">
    The last command opens your preferred browser with the generated editor for the language
    `Entity` on `<a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a>`. 
    If Chrome is not your preferred browser, please open the above page in Chrome, because we 
    cannot ensure that the editor functions as it should in other browsers.
</svelte:fragment>
</Note>

*   Try out the editor
    
<Note>
<svelte:fragment slot="header">Use Help Menu</svelte:fragment>
<svelte:fragment slot="content">
If you are having trouble using the editor, have a look at the key-bindings under the <em>Help</em> menu.
</svelte:fragment>
</Note>

## Next steps
Now you are ready for a closer look at Freon. You can for instance:

* Have a look at how the example language is defined by browsing through the language definition
files in the <a href="https://github.com/projectit-org/ProjectIt-example" target="_blank">ProjectIt Example project</a>.
  You can find them in `~/src/defs`.
* Read [Developing a language](/030_Developing_a_Language) to see how you can create your own language.
* Have a look at the [structure](/020_Getting_Started/020_Project_Structure) of the generated project.
* See what the different options there are for calling the [Freon generator](/020_Getting_Started/030_Calling_the_Generator).

If you are working with Webstorm, you might consider installing the 
plugin <a href="https://plugins.jetbrains.com/plugin/7677-awesome-console" target="_blank">Awesome Console</a>.
This plugin redirects a click on an error message in the console to the correct position in any of the language definition files.
