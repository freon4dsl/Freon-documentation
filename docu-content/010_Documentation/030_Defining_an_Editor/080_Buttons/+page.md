<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Adding Buttons

It is possible to add an extra button to any projection. To do so add
the following line in one of the projections. Note that there may not be
a space between the start square bracket `[` and `button`.

```freon
// DocuProject/src/defs/editor-fragments.edit#L18-L18

[button text="Push me!" boxRole="MyButton-role"]
```

The **text** is the text that will be shown on the button. The **boxRole** is the manner in which the button is coupled to an action.
For this you need to create a [custom action](/Documentation/Customizations/Editor_Customization#writing-custom-actions-4). 

Note that in the custom action you need to specify the
exact same **boxRole** as the one that has been supplied with the button in the .edit file.
When implementing this custom action, you can use `box.node` to get the node in the ast associated with the button.
For more information see [Writing_Actions](/Documentation/Customizations/Editor_Customization#writing-custom-actions-4).

Note that we are still working on exposing the in-built actions in the editor core.

[//]: # (See Samples/DocuProject/editor/CustomInsuranceModelActions.ts, line 30.)

## Icon Buttons

You can add an icon before or after the text using CSS or SCSS. The text for the button is optional.

As an example, buttons are added to a table definition.

```freon
// DocuProject/src/defs/editor-tables-with-button.edit#L6-L11

InsurancePart{
table [
    Name    | risk               | pay out          | is approved   | action
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved} | [button boxRole="MyTableButton-role"]
]
}
```

To style these buttons the following SCSS code is added.

```scss
// style/app.scss#L29-L43

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
