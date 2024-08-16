# PiBinaryExpression

An object that implements `PiBinaryExpression` can be a node in the model AST. It represents
an expression that has exactly two operands, which are usually written to the left and right of
the operator symbol. For example, '4+5'.

This interface extends the xref:expression-interface[`PiExpression`] interface.

```ts
/* File: core/src/language/PiBinaryExpression.ts */

export interface PiBinaryExpression extends PiExpression {
    piLeft(): PiExpression;

    piSetLeft(left: PiExpression): void;

    piRight(): PiExpression;

    piSetRight(right: PiExpression): void;

    piPriority(): number;
}
 */
```
