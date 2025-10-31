---
title: Adding Buttons
description: Learn how to add buttons to Freon projections, define their behavior using box roles and custom actions, and style them with icons using CSS or SCSS.
tags: buttons, editor customization, custom actions, boxRole, icon buttons, styling, projectional editor, Freon, DSL development
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Adding Buttons

It is possible to add an extra button to any projection. To do so, add
the following line in one of the projections. There must be no space between 
the opening square bracket `[` and `button`.

```proto
// Insurance/src/defs/editor-fragments.edit#L18-L18

[button text="Push me!" boxRole="MyButton-role"]
```

The **text** is the text that will be shown on the button. The **boxRole** defines how the button is linked to an action.
For this you need to create a [custom action](/Documentation/Customizations/Editor_Customization#writing-custom-actions-4). 

Note that in the custom action you need to specify the
exact same **boxRole** as the one that has been supplied with the button in the .edit file.
When implementing this custom action, you can use `box.node` to get the node in the AST associated with the button.
For more information see [Writing_Actions](/Documentation/Customizations/Editor_Customization#writing-custom-actions-4).

Work is ongoing to expose the built-in actions in the editor core.

[//]: # (See Samples/DocuProject/editor/CustomInsuranceModelActions.ts, line 30.)

## Icon Buttons

You can add an icon before or after the text using CSS or SCSS; the text itself is optional.

As an example, buttons are added to a table definition.

```proto
// Insurance/src/defs/editor-tables-with-button.edit#L6-L11

InsurancePart{
table [
    Name    | risk               | pay out          | is approved   | action
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved} | [button boxRole="MyTableButton-role"]
]
}
```

To style these buttons the following SCSS code is added.

```scss
// Styling/app.scss#L29-L43

.MyTableButton-role::before {
  font-family: "Font Awesome 6 Free", emoji;
  font-weight: 900;
  //content: 'plus';
  content: '\\2b'; // this number is called the icon's unicode in Font Awesome
  color: dodgerblue;
  font-size: 16px;
  rotate: 30deg;
}

.MyTableButton-role {
  min-width: 0.5em !important;
  min-height: 0.5em !important;
  border-radius: 50% !important;
}
```

This is displayed as follows.

<Figure
imageName={'documentation/Documentation-Buttons-screenshot1.png'}
caption={'Showing a button in each table row'}
figureNumber={1}
/>
