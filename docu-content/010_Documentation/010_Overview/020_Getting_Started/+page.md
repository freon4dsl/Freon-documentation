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

There best way to start using Freon is to use the command
```bash
npm create freon@latest
```
Youn can then select any of the languages used in this documentation,
or select the StarterLanguage for an empty language project. 
<Note>
<svelte:fragment slot="header">Use a recent browser version</svelte:fragment>
<svelte:fragment slot="content">
Please, use a recent version of a browser like Chrome or Edge, because we cannot
ensure that the editor functions as it should in older browsers.
</svelte:fragment></Note>

## Example Project Startup

[//]: # (todo add info on starter.ts)
The `npm create freon@latest` command create a project and runs the following commands for you:
```bash
npm install
npm run generate
```
The first command installs all required packages.
The second command runs the Freon generator, generating code in `src/freon`

To start the Freon editor, first start the server
(note that anything that is saved in the editor will be stored by the server in ~/modelstore):

  ```bash
  npm run server
  ```

Open another (bash) terminal, and start the generated editor from it:
```bash
npm run prepare-app   # Needed to generate the runtime CSS files. A single run will suffice.
npm run dev
```

The last command opens your preferred browser with the generated editor for 
the language in your project.

<Note><svelte:fragment slot="header"> Use Help Menu</svelte:fragment><svelte:fragment slot="content">
For easier use of the editor, have a look at the key-bindings under the <em>Help</em> menu.
</svelte:fragment></Note>

Now that everything is running, you can go to the `src/defs` folder and change the Freon definition files.
After chnage the files in `src/defs` youi need to re-run the generator,
amnd yoi will see the newly generated files appearing in the folder where you
  decided to store the generated code (`~/src/freon`):

```bash
    npm run generate
```

<Note>
<svelte:fragment slot="header">Speed up the Development Cycle</svelte:fragment>
<svelte:fragment slot="content">
<p>
When developing a DSL, you often regenerate the Freon editor to reflect the changes made in the
metamodel (.ast files), and/or other definitions. In order to speed up your development cycle the <code>npm run dev</code>
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
- **freon**: the generated source code.
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
- **external**: the external Svelte components and the code to plug these into Freon.
- **style**: All CSS and SCSS file for [styling Freon](/Documentation/Defining_an_Editor/Styling).
- **starter.ts**: the startup code for the web editor
- **logger.ts**: Code to turn logging on or off, used for debugging.

In the root of the project the following folder is also needed:
- **modelstore** This folder is where the simple server stores all models. If it is not there, the server will create it at startup.
  Each model is stored in a folder in which you can find its model units as separate `.json` files in [LionWeb](/LionWeb/Overview) format.


<Note>
<svelte:fragment slot="header">Be careful with handmade changes in <i>src/freon</i>.</svelte:fragment>
<svelte:fragment slot="content">
The contents of all folders in <code>src/freon</code> is organized into two types of files: 
those located directly in the folder (typically TypeScript classes) and those within 
the <code>gen</code> subfolder. Files in the <code>gen</code> subfolder are 
always deleted before regeneration, so avoid placing important code 
In contrast, files directly within the folder remain unchanged during regeneration.
</svelte:fragment>
</Note>

## A Minimal Webapp and Server

The Freon projectional web editor needs to be embedded in an application to work propertly.
It also needs a server that allows to store and retrieve the models the user creates in the editor.

For the server we provide a minimal implementation for your convenience.
We also provide a complete web application to embed the Freon editor. 

However, we anticipate that in the context where Freon is used, these components usually
need to be replaced with appropriate solutions that are for the company or organization where it is being used.

Note that Freon can optionally use the [LionWeb repository](/LionWeb/Overview).

## The Five Definition Files

A Freon language definition can have five parts:

1. [The Ast file](/Documentation/Creating_the_Metamodel): the abstract syntax tree (AST) or meta-model is defined in files with extension `.ast`.
2. [The Edit file](/Documentation/Defining_an_Editor): the concrete syntax (CST), or editor definition, is defined in files with extension `.edit`.
3. [The Scope file](/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider): the scope rules are defined in files with extension `.scope`.
4. [The Type file](/Documentation/Scoping,_Typing,_and_Validating/Type_Provider): the typing rules are defined in files with extension `.type`.
5. [The Validation file:](/Documentation/Scoping,_Typing,_and_Validating/Validator): the validation rules are defined in files with extension `.valid`.

And yes, you can use multiple files to define one of the parts. For instance, Freon will combine
multiple .ast files into one AST definition, and multiple .scope files into one scope definition.

See the [Documentation](/Documentation/Overview) and the [Tutorial](/Tutorial/Overview) 
for a detailed description of the five language parts.

## Step-by-step Language Creation

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
