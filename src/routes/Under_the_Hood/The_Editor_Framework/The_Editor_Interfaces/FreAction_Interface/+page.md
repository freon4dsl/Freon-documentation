# PiAction

An object that implements `PiAction` <!--- TODO -->

```ts
/* File: core/src/editor/PiAction.ts */

export interface PiActions {
  expressionCreators: PiExpressionCreator[];

  binaryExpressionCreators: PiBinaryExpressionCreator[];

  customBehaviors: PiCustomBehavior[];

  keyboardActions: KeyboardShortcutBehavior[];
}
```
