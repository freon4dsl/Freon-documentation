# Projections for Limited Concepts

The next example shows the special manner in which properties of type **boolean** can be
projected. The concept `Entity` has a simple property of type boolean called `isCompany`. Normally,
its value would be displayed according to the boolean keyword projection in the default editor.

```ts
// DocuProject/src/defs/language-extras.ast#L34-L37

concept Entity {
    isCompany: boolean;
    name: identifier;
    reference baseEntity?: Entity;
```

```ts
// DocuProject/src/defs/editor-main-default.edit#L5-L5

global {
```

By defining that the property must be represented by a **keyword**, we can change the default.
In the next example, the property `isCompany` will be shown as the keyword `COMPANY`. When the value
of the property is `true`, the keyword is shown. When the value is `false`, the keyword is not shown.

```ts
// DocuProject/src/defs/editor-main-default.edit#L57-L59

]}

CalcFunction {
```

This example would be displayed as one of ...

```
COMPANY entity PhilipsEnterPrises { // the value of isCompany is true
  ...
}
entity FritsPhilips { // the value of isCompany is false
  ...
}
```

Another way to display boolean properties is to use **two** keywords. Depending on
the value of the property either the first or second keyword is shown.

```ts
// DocuProject/src/defs/editor-specials.edit#L11-L13

First Card
    is still under construction: ${self.isUnderConstruction switch}
    is approved level1: ${self.isApprovedLevel1 radio}
```

This would be displayed as one of ...

```
COMPANY entity PhilipsEnterPrises { // the value of isCompany is true
  ...
}
PERSON entity FritsPhilips { // the value of isCompany is false
  ...
}
```

<Note>
<svelte:fragment slot="header">Keywords defined within a projection overwrite the standard boolean keywords</svelte:fragment>
<svelte:fragment slot="content">
In the default editor you can define standard boolean keywords. These will not be used when either of the two keyword projections
is present.
</svelte:fragment>
</Note>
