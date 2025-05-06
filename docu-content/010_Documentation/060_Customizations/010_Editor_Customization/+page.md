<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Editor Customization

Editor customization can be done by adding projections, actions, and/or external Svelte components. But
before you dive into all this, we suggest that you become familiar with the information on the Box model,
as explained in the [Freon Editor Framework](/Documentation/Under_the_Hood/Editor_Framework).


## The Generated Box Providers 

The generated editor is implemented by a set of **box providers**. Every box provider is capable of returning the
box for a specific type of AST node. For instance, the generated box provider for the `EuroLiteral` 
concept contains the following to methods.

```ts
// Insurance/src/freon/editor/gen/EuroLiteralBoxProvider.ts#L22-L62


```

The first method shows that any custom projection is always handled first. The second method is an 
example of a method that returns a Box based on the current content of `this._node`. Note that the implementation replies on 
heavily on a number of [predefined box types](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes), as well as on
the predefined method `createDefaultExpressionBox`, which returns the correct box for a (non-binary) expression concept.


## Writing a Custom Projection

Writing a custom projection does not require the implementation of a complete box provider. Instead,
a custom projection (set) is basically a series of methods that each return a box
object for an AST node. Every custom method need to be registered. This is done in the property `nodeTypeToBoxMethod`.

Sorry, but custom table projections are not yet taken into account.

In the below example, a copy is taken of the `getDefault` method above, which is adjusted to display an SVG Euro symbol instead of the
 string 'EUR'. Note that the method is registered to be used for concepts of type `EuroLiteral`.

```ts
// Insurance/src/custom/editor/CustomInsuranceModelProjection.ts#L24-L79


```

<Note><svelte:fragment slot="header">Use another filename and/or location</svelte:fragment>
<svelte:fragment slot="content">
You can rename the file <code>~/freon/editor/CustomYourLanguageNameProjection.ts</code>, and/or put it in another location.
In that case, you need to adjust the file <code>~/freon/config/FreonConfiguration</code>. 
See <a href="/Documentation/Customizations#adding-typeScript-files-4">Adding TypeScript Files</a>.
</svelte:fragment>
</Note>


## Writing Custom Actions

When you have created your own custom projection, this projection is exactly that:
a projection. Other than the built-in default behavior, there are no actions defined yet.
Actions are necessary to enable the user to change the model and add elements to it.
The projections only describe what you will see in the editor.
Actions determine what you can do, how you interact with the editor.

As a convenience, the file `~/freon/editor/CustomYourLanguageNameActions.ts` is 
generated, which is a placeholder for your own actions written in TypeScript. This 
file contains two constants for different kind of actions. The constant 
`MANUAL_CUSTOM_ACTIONS` is an array that contains all actions to be performed 
on normal concepts. Actions on binary expressions should be added to the array 
`MANUAL_BINARY_EXPRESSION_ACTIONS`. When you define these constants, Freon will 
merge your actions with the default actions.

Any `CustomAction` must implement the [`FreCustomAction`](/Documentation/Under_the_Hood/Core_Interfaces#frecustomaction-4) 
interface. An easy way to create it, is using the predefined method `FreCustomAction.create()`, which 
takes a partial `CustomAction` object as parameter. The most important properties of the `CustomAction` 
object are the action itself, and the box roles, indicating where the action could be activated.

In the example below two actions are added, one for the button that was added to the `BaseProduct` projection in
[Buttons](/Documentation/Defining_an_Editor/Buttons#adding-buttons-1), and one for the buttons that were added 
to the table projection
of `InsurancePart` concepts in [Icon Buttons](/Documentation/Defining_an_Editor/Buttons#icon-buttons-2).
The first was defined with the box role "MyButton-role", the second with "MyTableButton-role". The implementation of
the action is here a simple alert with a message to the user.


```ts
// Insurance/src/custom/editor/CustomInsuranceModelActions.ts#L19-L82


```
