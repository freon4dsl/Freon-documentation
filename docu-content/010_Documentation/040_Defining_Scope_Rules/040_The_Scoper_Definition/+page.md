---
title: The Freon Scoper Definition
description: Learn how to write a Freon scoper definition in .scope files, declare namespaces, and define imports and alternatives using Freon’s scoping meta-language.
tags: scoper definition, scope provider, .scope, namespaces, imports, alternatives, meta-language, scoping rules, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Freon Scoper Definition

The **scope provider** (or **scoper** for short) is defined by a scoper definition, which must be in a file with 
the extension `.scope`. The scoper definition holds all your DSL's scoping rules. All files with the .scope extension in
the [_defs_ folder](/Documentation/Overview/Getting_Started#creating-a-project-2) (i.e. the folder where you keep your definition files) are combined into one scoper definition.
Any `.scope` file should start by declaring the language for which the scoper is defined.

```proto
// Insurance/src/defs/scoper-docu.scope#L1-L2

scoper for language InsuranceModel

```

The default scoper, which is the scoper provided when no scoper definition is given,
simply regards your user’s model as the one and only namespace, meaning that every node is visible everywhere.

## Defining Namespaces

Often, much of the necessary scoping can be defined simply by stating that certain concepts are namespaces. This is done in a single statement, which must come 
before any other rules. All metatypes that are regarded as namespaces are listed between curly brackets after the keyword `isNamespace`.
Model units and interfaces can be used as well. Any instance of a concept that implements a namespace interface will
be regarded as a namespace.

Have a look again at an earlier example:

```proto
// Insurance/src/defs/scoper-docu.scope#L3-L3

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }
```

## Defining Imports

The next parts of the scoper definition cover imports and alternatives; they may be mixed. 

To define an import use the name of the concept, model unit, or interface that identifies the namespace, 
and - between curly brackets - add the imported namespace after the keyword `imports`. You may add a 
list of properties; all of them will be imported. The keyword `recursive` 
(See [Recursive Imports](/Documentation/Defining_Scope_Rules/Namespace_Imports#recursive-imports-4)) may 
be added to each entry in the list individually.

```proto
InsuranceProduct {
    imports {
        self.basedOn;
        recursive self.themes;
        self.parts;
    } 
}
```

## Defining Alternatives

To define an alternative, you should use
the name of the concept, model unit or interface that identifies the namespace, and add the imported namespace after
the keyword `alternative`. Here too, you may add a list of properties to be included in the alternatives, and 
use the keyword `recursive` for each entry in the list individually.

```proto
InsuranceProduct {
    alternatives {
        self.basedOn;
        recursive self.themes;
        self.parts;
    } 
}
```

## Overview of Possibilities in the Scope Definition

The Freon meta-language for scoping provides 
a number of options for building an expression to indicate the required namespace.

First, you may use dots to traverse the AST.

```proto
    alternatives {
        self.xxx.yyy.rrr;
    } 
```

Second, you can use an instance of a limited concept. Put a `#` sign before the name of the limited concept, and
use the `:` sign as separator followed by the name of the limited instance.

```proto
    imports {
        #AttributeType:Integer;
    } 
```

Third, you may want to use the owning namespace of a property. For this you should use the predefined function `owner()`.

```proto
    imports {
        self.xxx.owner();
    } 
```

Fourth, you can indicate that you want to use a certain property, but only 
if it is of a certain metatype. To do this you use the predefined function `if()` which takes as its parameter the name of a 
concept or model unit (no interfaces!). If the node is not of the required type, no namespace is added.

```proto
    imports {
        self.xxx.if(ConceptY);
        self.if(Unit12);
    } 
```

You can combine all the options and make a really complex statement. But be careful, it is easy to get confused.
In the following example, the namespace that is imported is the namespace indicated by the `conceptA_prop` instance of 
the namespace that 'owns' the property `self.xxx` (i.e. `self.xxx` is
in the declared nodes of this namespace), but only if this owner is of (meta)type `ConceptA`.

```proto
    imports {
        self.xxx.owner().if(ConceptA).conceptA_prop;
    } 
```

Finally, when you have also defined a typer (See [Typing and Validating](/Documentation/Typing_and_Validating)), you may 
use the type of an instance as namespace. To do this you use the predefined function `type()`. Note that nothing may follow
a `type()` expression. Note also that the type of an instance is different from its metatype. The first is an instance of some
concept that is defined by the typer definition to represent the type of the node. The second is a concept, model unit, or 
interface that is defined in the .ast file. 

```proto
    alternatives {
        self.xxx.type();
        self.type();
        self.yyy.owner().type();
    } 
```


## Example Scope Definition

```proto
// Insurance/src/defs/scoper-docu.scope

scoper for language InsuranceModel

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }

InsuranceProduct {
    imports {
        self.basedOn;
    } 
}

AttributeRef {
	alternatives {
        self.owner().type();
    } 
}

Entity {
    imports {
        self.baseEntity;
    } 
}

```
