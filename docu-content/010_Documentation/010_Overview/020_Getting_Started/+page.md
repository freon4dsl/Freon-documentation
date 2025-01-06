<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Installing and Using Freon

Get ready to use Freon by having <a href="https://nodejs.org/" target="_blank">node.js</a>
and <a href="https://yarnpkg.com/" target="_blank">npm</a>
installed. We are typically using the latest versions of all,
although older versions likely work just as well.
You could also try, and use other packages managers instead of npm.

There are two ways to start using Freon, either use our
[Example project](/Documentation/Overview/Getting_Started#example-project-startup-2), 
or use our [Template project](/Documentation/Overview/Getting_Started#template-project-startup-3).
In the following explanations the root of the project will be indicated with '~'.

<Note>
<svelte:fragment slot="header">Use a recent browser version</svelte:fragment>
<svelte:fragment slot="content">
Please, use a recent version of a browser like Chrome or Edge, because we cannot
ensure that the editor functions as it should in older browsers.
</svelte:fragment></Note>

## Example Project Startup

The simplest manner to start working with Freon is start from the example project from GitHub.
The sources include the definitions for an example language called `Entity`. Do note that this 
DSL is different from the [running example](/Documentation/Overview/Running_Example) used 
in this documentation.

Clone branch `master` 
from <a href="https://github.com/freon4dsl/Freon-example.git" target="_blank">
  https://github.com/freon4dsl/Freon-example.git</a> in your preferred IDE.
  (For an explanation of the content of the project see
  [Project_Structure](/Documentation/Overview/Getting_Started#project-structure-4)).

Next, install all necessary packages by running:

  ```bash
  npm install
  ```

Run the generator and see the generated files appearing in the folder ~/src/frecode:

  ```bash
  npm run generate
  ```

Start the server (note that anything that is saved in the editor will be stored in ~/modelstore):

  ```bash
  npm run model-server
  ```

Open another (bash) terminal, and start the generated editor from it:
  ```bash
  npm run prepare-app   # Needed to generate the runtime CSS files. A single run will suffice.
  npm run dev
  ```

The last command opens your preferred browser with the generated editor for 
the `Entity` language
on <a href="http://localhost:5000/" target="_blank">http://localhost:5000/</a>.

<Note><svelte:fragment slot="header"> Use Help Menu</svelte:fragment><svelte:fragment slot="content">
For easier use of the editor, have a look at the key-bindings under the <em>Help</em> menu.
</svelte:fragment></Note>

## Template Project Startup

You can also start from our template project. The template
project provides everything, except a language definition.
You need to define your own.

To use the template project clone branch `main` from <a href="https://github.com/freon4dsl/Freon-template" target="_blank">
  https://github.com/freon4dsl/Freon-template</a>.
  (For an explanation of the content of the project see
  [Project Structure](/Documentation/Overview/Getting_Started#project-structure-4).)

Next, install all necessary packages by running:

  ```bash
  npm install
  ```

Create a folder for your language in `~/src`, to hold the definition files for your language.
  We usually call this folders **defs**, but any name will do.

<Note>
<svelte:fragment slot="header">You can use your own names for <i>defs</i> and <i>frecode</i></svelte:fragment>
<svelte:fragment slot="content">
  If you do use another name for the <i>defs</i>-folder, adjust 
the <code>scripts</code> entry in the _package.json_ file. The <code>generate</code>
  script should refer to your <i>defs</i>-folder, as well as the folder where you want the
  generated code to be stored.
  In the following screenshot, we use <code>~/src/defs</code> and <code>~/src/frecode</code>, respectively.

<Figure
imageName='documentation/packagejsonadjustment.png'
caption={'Screenshot of package.json'}
figureNumber={1}
/>
</svelte:fragment></Note>

Create a language definition file which defines the structure of your language. The
extension of this file must be `.ast`. You can, for instance, copy
`EntityLanguage.ast` from the Freon example to your own [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3). Or, you can follow the
[tutorial](/Tutorial).

Run the generator and see the generated files appearing in the folder where you
  decided to store the generated code (`~/src/frecode`):

```bash
    npm run generate
```

Adjust the configuration of the web application by changing two lines in the file
`~/src/webapp/config/WebappConfiguration.ts` to include the editor environment of your own language.

```ts
/**
 * The one and only reference to the actual language for which this editor runs
 */
import { EntityModelEnvironment } from "./frecode/config/gen/EntityModelEnvironment.js";
WebappConfigurator.getInstance().setEditorEnvironment(EntityModelEnvironment.getInstance());
```

Start the server (note that anything that is saved in the editor will be stored in `~/modelstore`):

  ```bash
  npm run model-server
  ```

Open another (bash) terminal, and start the generated editor from it:
  ```bash
  npm run prepare-app   # Needed to generate the runtime CSS files. A single run will suffice.
  npm run dev
  ```

<Note>
<svelte:fragment slot="header">Speed up the Development Cycle</svelte:fragment>
<svelte:fragment slot="content">
<p>
When developing a DSL, you often regenerate the Freon editor to reflect the changes made in the
metamodel, and/or other definitions. In order to speed up your development cycle the <code>dev</code>
command has the -watch flag set. Furthermore, you can use
the following as address in the web browser: <code>http://localhost:8000/?model=TestModel</code>, where
`TestModel` stands for the name of the model that you are using to test your language definition
and editor with. Thus, the browser responds to any regeneration with opening your test model instantaneously.
</p>
</svelte:fragment></Note>

<Note>
<svelte:fragment slot="header">WebStorm tip</svelte:fragment>
<svelte:fragment slot="content">
If you are working with WebStorm, you might consider installing the
plugin <a href="https://plugins.jetbrains.com/plugin/7677-awesome-console" target="_blank">Awesome Console</a>.
This plugin redirects a click on an error message in the console to the correct position in any of the language definition files.
</svelte:fragment></Note>

## Project Structure

The code in a Freon project under `~/src` is organised into the following subfolders.

- **defs**: the language definition files.
- **frecode**: the generated source code.
  - **.../commandline**: code that provides commandline access to models in the language.
  - **.../config**: code that provides the coupling between all parts of the generated workbench.
    This folder contains one file that will not be overwritten at regeneration: `FreonConfiguration.ts`.
    Here you can configure any [customization](/Documentation/Customizations) that you want the generated code to take into account.
  - **.../diagrams**: a number of UML diagrams generated from the language structure including a UML
    class diagram of the AST, an overview of all inheritance in the language, and one diagram per .ast file.
    You all of them both in ordinary HTML and in Markdown format. 
    In the future we plan to make the generation customizable.
  - **.../editor**: code for the editor. This folder contains two files that will not be overwritten
    at regeneration: `CustomYourLanguageNameActions.ts` and `CustomYourLanguageNameProjection.ts`.
    (`YourLanguageName` will be replaced by the name you have given your language in the .ast files.)
    These two files are the placeholders for any [customization](/Documentation/Customizations) that you
    would like to do.
  - **.../interpreter**: code that implements an interpreter [interpreter](/Examples/Using_the_Interpreter) for the language.
  - **.../language**: code that implements the language structure.
  - **.../reader**: a parser that is able to read [model units](/Background#models-and-model-units-4)
    from a text string or file.
  - **.../scoper**: code for that determines which elements are visible for a certain element in the user's model.
  - **.../stdlib**: code that implements some standard elements of your language, for instance
    [limited concepts](/Documentation/Creating_the_Metamodel/Language_Structure).
  - **.../typer**: code that that determines which type is associated with a certain element in the
    user's model. The file `CustomYourLanguageNameTyperPart.ts` is the placeholder for any [customization](/Documentation/Customizations) that you
    would like to do.
  - **.../utils**: a default implementation of a visitor for your user's model.
  - **.../validator**: code that determines whether certain parts of your user's model contain
    errors. The file `CustomYourLanguageNameValidator.ts` is the placeholder for any [customization](/Documentation/Customizations) that you
    would like to do.
  - **.../writer**: code that is able to write your user's [model units](/Background#models-and-model-units-4)
    in string format to a file.
- **webapp**: source code for the web-application used for all generated languages. Noteworthy is the 
file `.../webapp/config/WebappConfiguration.ts`. This file holds the references to the generated language
  workbench, and the web address of the server which stores your user's models.
- **modelstore** This folder is a sibling of ~/src, it is where the simple server stores all models. It is created at the moment that the server is started.
  Each model is stored in a folder in which you can find its model units as separate `.json` files.


<Note>
<svelte:fragment slot="header">Be careful with handmade changes in <i>frecode</i>.</svelte:fragment>
<svelte:fragment slot="content">
The contents of all folders in <code>frecode</code> is organized into two types of files: 
those located directly in the folder (typically TypeScript classes) and those within 
the <code>gen</code> subfolder. Files in the <code>gen</code> subfolder are 
always deleted before regeneration, so avoid placing important code 
In contrast, files directly within the folder remain unchanged during regeneration.
</svelte:fragment>
</Note>

## A Minimal Webapp and Server

The Freon projectional web editor needs to be embedded in an application to work propertly.
It also needs a server that allows to store and retrioeve the models the user creates in the editor.

For both the server we provide a minimal implementation for your convenience.
We also provide a complete application to embed the Freon editor. 

However, we anticipate that in the context where Freon is used, these components usually
need to be replaced with appropriate solutions that are for the company or organization where it is being used.

## The Five Definition Files

A Freon language definition can have five parts:

1. [The Ast file](/Documentation/Creating_the_Metamodel): the abstract syntax tree (AST) or meta-model is defined in files with extension `.ast`.
2. [The Edit file](/Documentation/Defining_an_Editor): the concrete syntax (CST), or editor definition, is defined in files with extension `.edit`.
3. [The Scope file](/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider): the scope rules are defined in files with extension `.scope`.
4. [The Type file](/Documentation/Scoping,_Typing,_and_Validating/Type_Provider): the typing rules are defined in files with extension `.type`.
5. [The Validation file:](/Documentation/Scoping,_Typing,_and_Validating/Validator): the validation rules are defined in files with extension `.valid`.

And yes, you can use multiple files to define one of the parts. For instance, Freon will combine
multiple .ast files into one AST definition, and multiple .scope files into one scope definition.

## Step-by-step Creation of the Language

There is no need to write all the five definition files right from the start. The only one that is
mandatory is the language structure (.ast). Freon will generate defaults for all the other elements.
This is what we call the Default Level of the [three levels of customization](/Documentation/Customizations).

## The Command Line Interface

The Freon commandline tool generates code from the various definition files.
If you type ‘`freon`’ in a (bash) terminal you will see the following overview of the different
arguments that can be used. For detailed help about a specific command, type: ‘`freon  <command> -h`’.

<Note>
<svelte:fragment slot="header"> Incomplete code</svelte:fragment>
<svelte:fragment slot="content">
<p>
Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining 
them with others), produce code that may not compile correctly. For example, the <code>scoper</code> 
and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, 
which might not yet be generated. Similarly, the <code>editor</code> may try to include 
the <code>scoper</code>.
</p>
<p>
To avoid such issues, it is best to start with the <code>all</code> command. Once this 
has been run, you can use specific commands for individual aspects of your language as needed. 
This approach ensures correct dependencies while minimizing regeneration time.
</p>
</svelte:fragment>
</Note>

```bash
freon -h
usage: freon [-h] [-v] [-w] <command> ...

Freon toolset for generating languages, scopers, editors, etc.

Positional arguments:
  <command>
    all          Generates the TypeScript code for all parts of the work
                 environment for your language, plus some diagrams that show
                 the AST
    ast-it       Generates the TypeScript code for your language
    edit-it      Generates the typeScript code for the projectional editor
                 for your language
    parse-it     Generates the typeScript code for the reader and writer of
                 your language
    diagram-it   Generates Mermaid diagrams of the AST of your language
    scope-it     Generates the TypeScript code for the scoper for your
                 language
    validate-it  Generates the TypeScript code for the validator for your
                 language
    type-it      Generates the TypeScript code for the typer for your language
    interpret-it
                 Generates interpreter for your language
    clean-it     Removes the generated TypeScript code for all parts of the
                 work environment for your language

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --verbose  Show extra logging detail
  -w, --watch    Start generator in watch mode (only in combination with
                 'all')

For detailed help about a specific command, use: freon <command> -h

```
