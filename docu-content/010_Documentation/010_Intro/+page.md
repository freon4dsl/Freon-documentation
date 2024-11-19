<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';

    let nextLink='/Documentation/Getting_Started';
</script>

# Overview

Freon is a Language Workbench, a tool for creating mini-languages,which are also known 
as <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>.
Freon generates an integrated set of editor, scoper, typer, and validator for your mini-language 
from a small set of definitions. Together we call this the work environment for your language.

The core of Freon is a TypeScript/JavaScript framework for building 
web-based, [projectional](/Documentation/Background/Projectional_Editing)
editors. Editing expressions in a projectional editor is a well-known challenge. What makes the
Freon framework unique is the fact that it has built-in support for expressions, so you can
easily make a projectional editor that allows for a natural manner of editing.

## Freon is a tool for Language Engineers

We assume that people who want to use Freon know at least the basics of making mini-languages. For instance,
the terms metamodel, abstract syntax tree, scope, concrete syntax, parsing, etc., should be familiar. 
When we address the Freon user we call them a **language engineer**. The people that will 
be using the generated work environment are simply called **users**.

So welcome, language engineer, to the world of Freon. This documentation is meant for you. It explains how Freon can help
you in creating a language, and building a work environment for it.

If you have questions that are not answered in this documentation, please get in contact with us,
for instance via email at _info AT freon4dsl.dev_.

**Have fun!**

<PrevNextSection {nextLink} />
