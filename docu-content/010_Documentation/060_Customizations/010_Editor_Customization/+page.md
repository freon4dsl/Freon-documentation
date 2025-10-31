---
title: Editor Customization
description: Learn how to customize Freon’s projectional editor using generated box providers, custom projections, and custom actions, including how to register and configure them.
tags: editor, customization, projections, actions, box providers, Freon, DSL development, TypeScript
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Editor Customization

You can customize the editor by adding projections, actions, and/or external Svelte components. 
Before you dive into all this, we suggest that you become familiar with the Box Model,
as explained in the [Freon Editor Framework](/Documentation/Under_the_Hood/Editor_Framework).


## Generated Box Providers 

The generated editor is implemented by a set of **box providers**. Every box provider is capable of returning the
box for a specific type of AST node. For instance, the generated box provider for the `EuroLiteral` 
concept contains the following two methods:

```ts
// Insurance/src/freon/editor/gen/EuroLiteralBoxProvider.ts#L23-L62

    protected getContent(projectionName: string): Box {
        // console.log("GET CONTENT " + this._node?.freId() + ' ' +  this._node?.freLanguageConcept() + ' ' + projectionName);
        // see if we need to use a custom projection
        if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
            const BOX: Box = this.mainHandler.executeCustomProjection(this._node, projectionName);
            if (!!BOX) {
                // found one, so return it
                return BOX;
            }
        } else {
            // select the box to return based on the projectionName
            if (projectionName === "default") {
                return this.getDefault();
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getDefault(): Box {
        return createDefaultExpressionBox(
            this._node as EuroLiteral,
            [
                BoxFactory.horizontalLayout(
                    this._node as EuroLiteral,
                    "EuroLiteral-hlist-line-0",
                    "",
                    [
                        BoxUtil.labelBox(this._node as EuroLiteral, "EUR", "top-1-line-0-item-0"),
                        BoxUtil.numberBox(this._node as EuroLiteral, "euros", NumberDisplay.SELECT),
                        BoxUtil.labelBox(this._node as EuroLiteral, ",", "top-1-line-0-item-2"),
                        BoxUtil.numberBox(this._node as EuroLiteral, "cents", NumberDisplay.SELECT),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }
}
```

The first method shows that any custom projection is always handled first.
The second method returns a `Box` based on the current content of `this._node`. Note that the 
implementation relies heavily on the [predefined box types](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes), as well as on the predefined 
helper `createDefaultExpressionBox`, which returns the correct box for a (non-binary) expression concept.

## Writing a Custom Projection

Writing a custom projection does not require the implementation of a complete box provider. Instead,
a custom projection (set) is a series of methods, each returning a box object for an AST node. 
Every custom method needs to be registered in `nodeTypeToBoxMethod`.

Custom table projections are not yet supported.

In the example below, we copy the `getDefault` method and adjust it to display an SVG Euro symbol instead of the
string 'EUR'. Note that the method checks whether it is used for concepts of type `EuroLiteral`.

```ts
// Insurance/src/freon/editor/CustomInsuranceModelProjection.ts#L24-L85

    // add your custom methods here

    // BOX_FOR_CONCEPT(node: NAME_OF_CONCEPT) : Box { ... }

    // TABLE_DEFINITION_FOR_CONCEPT() : FreTableDefinition { ... }
}

```

<Note {header} {content}> {#snippet header()}Use another filename and/or location{/snippet}
{#snippet content()}
You can rename the file <code>~/freon/editor/CustomYourLanguageNameProjection.ts</code>, and/or place it in another location.
In that case, you need to adjust the file <code>~/freon/config/FreonConfiguration</code>. 
See <a href="/Documentation/Customizations#adding-typeScript-files-4">Adding TypeScript Files</a>.
{/snippet}
</Note>


## Writing Custom Actions

When you have created your own custom projection, this projection is exactly that:
a projection. Other than the built-in default behavior, there are no actions defined yet.
Actions are necessary to enable the user to change the model and add elements to it.
The projections only describe what you will see in the editor.
Actions determine what you can do, how you interact with the editor.

As a convenience, the file `~/freon/editor/CustomYourLanguageNameActions.ts` is 
generated, which is a placeholder for your own actions written in TypeScript. This
file defines two constants for different kinds of actions. The constant 
`MANUAL_CUSTOM_ACTIONS` is an array that contains all actions to be performed 
on normal concepts. Actions on binary expressions should be added to the array 
`MANUAL_BINARY_EXPRESSION_ACTIONS`. When you define these constants, Freon 
merges your actions with the default actions.

Any `CustomAction` must implement the [`FreCustomAction`](/Documentation/Under_the_Hood/Core_Interfaces#frecustomaction-4) 
interface. An easy way to create one is to use the predefined method `FreCustomAction.create()`, which 
takes a partial `CustomAction` object as a parameter. The most important properties of the `CustomAction` 
object are the action itself, and the box roles that indicate the action could be activated.

In the example below two actions are added, one for the button that was added to the `BaseProduct` projection in
[Buttons](/Documentation/Defining_an_Editor/Buttons#adding-buttons-1), and one for the buttons that were added 
to the table projection
of `InsurancePart` concepts in [Icon Buttons](/Documentation/Defining_an_Editor/Buttons#icon-buttons-2).
The first was defined with the box role "MyButton-role", the second with "MyTableButton-role". In this 
example, the action implementation is a simple alert shown to the user.


```ts
// Insurance/src/custom/editor/CustomInsuranceModelActions.ts#L19-L82

export class CustomInsuranceModelActions implements FreCombinedActions {
    binaryExpressionActions: FreCreateBinaryExpressionAction[] = MANUAL_BINARY_EXPRESSION_ACTIONS;
    customActions: FreCustomAction[] = MANUAL_CUSTOM_ACTIONS;
}

export const MANUAL_BINARY_EXPRESSION_ACTIONS: FreCreateBinaryExpressionAction[] = [
    // Add your own custom binary expression actions here
];

export const MANUAL_CUSTOM_ACTIONS: FreCustomAction[] = [
    // Add your own custom behavior here
    FreCustomAction.create({
        activeInBoxRoles: ["MyButton-role"],
        action: (box: Box, trigger: FreTriggerType, ed: FreEditor): FreNode | null => {
            // do something
            const thisNode: FreNode = box.node;
            // const thisParent: FreNode = box.element.freOwner();
            alert("You shouldn't have pushed the button with role 'MyButton-role' on element " + thisNode.freId() + ".\nPunishment awaits !!!!!!!!!!");
            return null;
        },
    }),
    FreCustomAction.create({
        activeInBoxRoles: ["MyTableButton-role"],
        action: (box: Box, trigger: FreTriggerType, ed: FreEditor): FreNode | null => {
            // do something
            const thisNode: FreNode = box.node;
            // const thisParent: FreNode = box.element.freOwner();
            alert("You shouldn't have pushed the button with role 'MyTableButton-role' on element " + thisNode.freId() + ".\nPunishment awaits !!!!!!!!!!");
            return null;
        },
    }),
];

```
