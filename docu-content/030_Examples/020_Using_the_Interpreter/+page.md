<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

[//]: # (todo write section on interpreter)

# Feedback from an Interpreter

Freon includes an interpreter framework which makes it easy to write an interpreter for a language.

## What is an Interpreter

Most articles on interpreters you will find start by describing lexers and parsers
and as a final step evaluation.
Forget about lexers, parsers, those are ponly needed when you start with plain text.
In Freon we have the AST of our model already available and do not need to parse text to get this AST.

The interpreter in Freon helps to calculate something based on the AST of the model.
The general way to build an inbterpreter is as follows:

```proto
Select the start node you want to evaluate
   If the node has children/parts
      Evaluate the parts 
      Evaluate the node, using the evaluation of the parts
   Else if the node is a leaf
      Evaluate the node
```

Take the following AST as an example.
<Figure
imageName={'interpreter/plus-tree.png'}
caption={'AST for Plus Expression'}
figureNumber={1}
/>
Let's evaluate the node.

```ts
// Interpreter/plus.ts#L2-L6

function evaluate(node): number {
	const leftValue = evaluate(node.left)
	const rightValue = evaluate(node.right)
	return leftValue + rightValue
}
```
