<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';

    let prevLink= '/Documentation/Intro';
    let nextLink='/Documentation/Developing_a_Language';
</script>

<PrevNextSection {prevLink} {nextLink} />

# Installing and Using Freon

Get ready to use Freon by having <a href="https://nodejs.org/" target="_blank">node.js</a>
and <a href="https://yarnpkg.com/" target="_blank">npm</a>
installed. We are typically using the latest versions of all,
although older versions likely work just as well.
You could also try, and use other packages managers instead of npm.

There are two ways to start using Freon, either use our
[Example project](#example-project-startup-2), or use our [Template project](#template-project-startup-3).
In the following explanations the root of the project will be indicated with '~'.

<Note>
<svelte:fragment slot="header">Use a recent browser version</svelte:fragment>
<svelte:fragment slot="content">
Please, use a fairly recent browser, for instance Chrome or Edge, because we cannot
ensure that the editor functions as it should in older browsers."
</svelte:fragment></Note>

## Example Project Startup

The simplest manner to start working with Freon is to clone the example project from GitHub.
The sources include the definitions for an example language. Clone branch `master` 
from <a href="https://github.com/freon4dsl/Freon-example.git" target="_blank">
  https://github.com/freon4dsl/Freon-example.git</a> in your preferred IDE.
  (For an explanation of the content of the project see
  [Project_Structure](/#project-structure-4)).

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

The last command opens your preferred browser with the generated editor for the language `Entity` 
on <a href="http://localhost:5000/" target="_blank">http://localhost:5000/</a>.

<Note><svelte:fragment slot="header"> Use Help Menu</svelte:fragment><svelte:fragment slot="content">
For easier use of the editor, have a look at the key-bindings under the <em>Help</em> menu.
</svelte:fragment></Note>

## Template Project Startup

You can also start by cloning our template project from GitHub. The template
project provides a shell for the generated editor that enables the user to work with multiple models and
[model units](/Background/Models_and_Model_Units), but does not include any Freon definition files.
Clone branch `master` from <a href="https://github.com/freon4dsl/Freon-template" target="_blank">
  https://github.com/freon4dsl/Freon-template</a>.
  (For an explanation of the content of the project see
  [Project_Structure](/Getting_Started/Project_Structure)).

Next, install all necessary packages by running:

  ```bash
  npm install
  ```

Create a folder for your language in `~/src`, to hold the definition files for your language.
  We usually call this folders _defs_, but any name will do.

<Note>
<svelte:fragment slot="header">You can use your own names for <i>defs</i> and <i>frecode</i></svelte:fragment>
<svelte:fragment slot="content">
  If you do use another name for the <i>defs</i>-folder, adjust 
the <code>scripts</code> entry in the _package.json_ file. The <code>generate</code>
  script should refer to your <i>defs</i> folder, as well as the folder where you want the
  generated code to be stored.
  In the following screenshot, we use <code>~/src/defs</code> and <code>~/src/frecode</code>, respectively.

(todo adjust screenshot of template project)

<Figure
imageName={'packagejsonadjustment.png'}
caption={'Screenshot of package.json'}
figureNumber={1}
/>
</svelte:fragment></Note>

Create a language definition file which defines the structure of your language. The
extension of this file must be `.ast`. You can, for instance, copy
`EntityLanguage.ast` from the Freon example to your own defs-folder. Or, you can follow the
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
import {EducationEnvironment} from "@freon4dsl/samples-edu-tutorial";
WebappConfigurator.getInstance().setEditorEnvironment(EducationEnvironment.getInstance());
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
  - **.../config**: code that provides the coupling between all parts of the generated workbench.
    This folder contains one file that will not be overwritten at regeneration: `FreonConfiguration.ts`.
    Here you can configure any [customization](/Documentation/API_Level) that you want the generated code to take into account.
  - **.../diagrams**: a number of UML diagrams generated from the language structure including a UML
    class diagram of the AST, an overview of all inheritance in the language, and one diagram per .ast file.
    You all of them both in ordinary HTML and in Markdown format. 
    In the future we plan to make the generation customizable.
  - **.../editor**: code for the editor. This folder contains two files that will not be overwritten
    at regeneration: `Custom<yourLanguageName>Actions.ts` and `Custom<yourLanguageName>Projection.ts`.
    (`<yourLanguageName>` will be replaced by the name you have given your language in the .ast files.)
    These two files are the placeholders for any [customization](/Documentation/API_Level) that you
    would like to do.
  - **.../language**: code that implements the language structure.
  - **.../reader**: a parser that is able to read [model units](/Background/Models_and_Model_Units)
    from a text string or file.
  - **.../scoper**: code for that determines which elements are visible for a certain element in the user's model.
  - **.../stdlib**: code that implements some standard elements of your language, for instance
    [limited concepts](/Documentation/Developing_a-Language/Defining_the_Language_Structure).
  - **.../typer**: code that that determines which type is associated with a certain element in the
    user's model. The file `Custom<yourLanguageName>TyperPart.ts` is the placeholder for any [customization](/Documentation/API_Level) that you
    would like to do.
  - **.../utils**: a default implementation of a visitor for your user's model.
  - **.../validator**: code that determines whether certain parts of your user's model contain
    errors. The file `Custom<yourLanguageName>Validator.ts` is the placeholder for any [customization](/Documentation/API_Level) that you
    would like to do.
  - **.../writer**: code that is able to write your user's [model units](/Background/Models_and_Model_Units)
    in string format to a file.
- **webapp**: source code for the web-application used for all generated languages. Noteworthy is the 
file `.../webapp/config/WebappConfiguration.ts`. This file holds the references to the generated language
  workbench, and the web address of the server which stores your user's models.
- **modelstore** This folder is a sibling of ~/src, it is where the simple server stores all models. It is created at the moment that the server is started.
  Each model is stored in a folder in which you can find its model units as separate `.json` files.


<Note>
<svelte:fragment slot="header">Be careful with handmade changes in <i>frecode</i>.</svelte:fragment>
<svelte:fragment slot="content">
The contents of all folders in <b>frecode</b> is divided into files (usually TypeScript classes) 
that are contained directly in the folder, and files
that are contained in the subfolder <b>gen</b>. The latter are always removed before regeneration, so be careful
not to add important code to the <b>gen</b> folder.
Code that is contained directly in each folder is not changed upon regeneration.
</svelte:fragment>
</Note>

## A Minimal Webapp and Server

For the language environment to function, more is needed than the code for the editor, validator, and so forth.
In particular, there is a need for a server which can hold and provide stored users models, and for a web application that
is able to show the editor, errors message, models that are available form the server, and so on.

For both the server, and the web application, we provide a minimal implementation for your convenience. We assume
that when Freon is used in a larger context, these two parts will be interchanged with
suitable choices made by the language engineer and team.

## Use of the Freon Generator

The Freon commandline tool generates code from the various definition files as described in
[A Language in Five Parts](/Background/A_Language_in_Five_Parts).
If you type ‘`freon`’ in a (bash) terminal you will see an overview of the different
arguments that can be used. For detailed help about a specific command, type: ‘`freon  <command> -h`’.

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

<Note>
<svelte:fragment slot="header"> Incomplete code</svelte:fragment>
<svelte:fragment slot="content">
Note that every command except <b>all</b>, used individually (i.e. without the other commands), generates code that
does not compile correctly.
For instance, both the scoper and validator might need to use the typer, therefore the
code seeks to include the typer class, which might not be generated yet. Likewise, the editor seeks to include
the scoper.
The best way to go about is to first use the <b>all</b> command. Next, when you focus on one of the aspects of your
language, you can use the specific command for that aspect. Thus, you can keep regeneration-time as short as possible.
</svelte:fragment>
</Note>

<PrevNextSection {prevLink} {nextLink} />
