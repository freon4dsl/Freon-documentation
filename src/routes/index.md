
# ProjectIt -- A Projectional Editor for the Web

ProjectIt is a Language Workbench (...in the making <img src="/images/smile.png" alt="OOPS" width="20" height="20">, 
so please let us know if you find anything not yet correct). It is a tool for creating mini-languages,
which are also known as <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>.
ProjectIt is able to generate an integrated
set of editor, scoper, typer, and validator for your mini-language from a small set of definitions. Together we call this the work environment for your language.

## Upcoming: <i>ProjectIt</i> will change its name to <i>Freon</i>

Because the nature of this project has changed from a tool to create a projectional editor to a tool to create a DSL,
it was decided to change the name of the project. In the future, this tool will be called <i>'Freon'</i>.

If you want to know why this name was chosen, please read [Name Change](/010_Intro/060_Name_Change).

### The Core Framework
The core of ProjectIt is a TypeScript/JavaScript framework for building web-based, projectional
editors. Editing expressions in a projectional editor is a well-known challenge. What makes the
ProjectIt framework unique is the fact that it has built-in support for expressions, so you can
easily make a projectional editor that allows for a natural manner of editing.

### The Generators
On top of the core framework there are five generators, each of which generates part
of the work environment for your mini-language:

* The **language structure** defines all the concepts, properties, and relationships in the language.
* The **editor** defines how a model in the language looks like on the screen.
  It also defines what editing commands can be used to change the model.
* The **scoper** defines how names that refer to other elements are being resolved.
* The **typer** defines what the type of an element is.
* The **validator** defines what a correct model looks like and wil provide errors whenever a model breaks these rules.

### Why Is ProjectIt As It Is?
Currently, ProjectIt does not support the creation of debuggers, interpreters, generators, and
such. Indeed, we have a (large) [wish list](/010_Intro/090_Future_Developments) of extra features
that we would like to implement in the future.

In some cases, like e.g. code generators, we think that integration with existing tools is the best solution.
In other cases we plan to provide ProjectIt components for specific functionality.
Given time, we hope to realize many of these extra items. 

If you want to know why
we have chosen this development route, read our statement on the [philosophy](/010_Intro/020_Our_Philosophy)
behind the tool.

## What Are You: a _Language Engineer_ or a _User_?
We assume that people who want to use ProjectIt know at least the basics of making mini-languages. For instance,
the terms metamodel, abstract syntax tree, scope, concrete syntax, parsing, etc., should be familiar. When we address the ProjectIt
user we call them a **language engineer**. The people that will be using the generated work environment are simply called **users**.

## Welcome, Language Engineer
So welcome, language engineer, to the world of ProjectIt. This website is meant for you. It explains how ProjectIt can help 
you in creating a language and building a work environment for it. Please, browse through all the subjects. 
As a start, you could ..

* .. find out what [projectional editing](/010_Intro/010_Projectional_Editing) is.
* .. see how you can [install and use](/020_Getting_Started/010_Installation) ProjectIt.
* .. find out how to define a language and its editor, etc. in the [tutorials](/030_Developing_a_Language/010_Default_Level).
* .. dive deeper into the [structure of the generated code](/020_Getting_Started/020_Project_Structure).
* .. get to know more about the [meta-code](/060_Under_the_Hood) of ProjectIt.

**Have fun!** If you have questions that are not answered in this documentation, please email us at _info AT projectit.org_.
