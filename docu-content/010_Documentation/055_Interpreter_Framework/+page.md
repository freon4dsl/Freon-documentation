<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Interpreter Framework

Freon includes an interpreter framework which makes it easy to write an interpreter for a language.

## What is an Interpreter

Most articles on interpreters you will find start by describing lexers and parsers
and as a final step evaluation.
Forget about lexers, parsers, those are only needed when you start with plain text.
Because we use a projectional editor, in Freon we have the AST of our model already available and do not need to parse text to get the AST.

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
caption={'AST for Plus Expression'}
figureNumber={1}
/>

Let's evaluate the multiply (\*) node.
* We need to first evaluate the two children (+ and 5)
   * Evaluate the plus (+) node, we need to evaluate the children first.
       * Evaluate the "3" node, resulting in the value 3
       * Evaluate the "4" node, resulting in the value 4
   * Evaluate the plus based on the result of the children, result is 7
   * Evaluate the "5" node resulting in 5.
* Evaluate multiply of 6 and 5, result is 30
