---
title: Interpreter Framework
description: Learn how Freon’s interpreter framework allows you to evaluate models directly from their AST without parsing text, and how to implement a basic interpreter for your DSL.
tags: interpreter, interpretation, AST, evaluation, projectional editor, Freon, DSL development, semantics
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Interpreter Framework

Freon includes an interpreter framework that makes it easy to build an interpreter for your language.

<Note> 
{#snippet header()}The Interpreter Framework is still in Development{/snippet}
{#snippet content()}
<p>The use of an interpreter in the Freon editor is still in development. In particular, 
the way results are presented may still change. Despite this, the current framework is already usable.</p>
{/snippet}
</Note>

## What Is an Interpreter

Most articles on interpreters start by describing lexers and parsers, and finish with evaluation.
Forget about lexers and parsers — those are only needed when working directly with plain text.
Since Freon uses a projectional editor, the AST of your model is already available — there’s no 
need to parse text to obtain it.

The interpreter in Freon helps to calculate something based on the AST of the model.
The general way to build an interpreter is as follows:

```proto
Select the start node you want to evaluate
   If the node has children/parts
      Evaluate the parts 
      Evaluate the node, using the evaluated value of the parts
   else if the node is a leaf
      Evaluate the node
```

Take the following AST as an example.

<Figure
imageName={'interpreter/plus-tree.png'}
caption={'AST for a Plus Expression'}
figureNumber={1}
/>

Let's evaluate the multiply (\*) node.
* We need to first evaluate the two children (+ and 5)
  * Evaluate the plus (+) node, we need to evaluate the children first.
    * Evaluate the "3" node, resulting in the value 3
    * Evaluate the "4" node, resulting in the value 4
  * Evaluate the plus node using the results of its children — the result is 7.
  * Evaluate the "5" node resulting in 5.
* Evaluate multiply of 7 and 5, result is 35.
