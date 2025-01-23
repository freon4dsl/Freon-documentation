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

const euroIcon = "M640 789.333333c-106.88 0-199.68-60.586667-245.973333-149.333333H640v-85.333333H366.293333c-2.133333-13.866667-3.626667-28.16-3.626666-42.666667s1.493333-28.8 3.626666-42.666667H640v-85.333333H394.026667c46.293333-88.746667 138.88-149.333333 245.973333-149.333333 68.906667 0 131.84 25.173333 180.266667 66.773333L896 226.133333A382.72 382.72 0 0 0 640 128c-167.04 0-308.906667 106.88-361.6 256H128v85.333333h130.56c-1.706667 14.08-2.56 28.16-2.56 42.666667 0 14.506667 0.853333 28.586667 2.56 42.666667H128v85.333333h150.4c52.693333 149.12 194.56 256 361.6 256 98.346667 0 188.16-37.333333 256-98.133333l-75.733333-75.52A275.818667 275.818667 0 0 1 640 789.333333z"

/**
 * Class CustomInsuranceModelProjection provides an entry point for the language engineer to
 * define custom build additions to the editor.
 * These are merged with the custom build additions and other definition-based editor parts
 * in a three-way manner. For each modelelement,
 * (1) if a custom build creator/behavior is present, this is used,
 * (2) if a creator/behavior based on one of the editor definition is present, this is used,
 * (3) if neither (1) nor (2) yields a result, the default is used.
 */
export class CustomInsuranceModelProjection implements FreProjection {
    name: string = "Euro-symbol";
    nodeTypeToBoxMethod: Map<string, (node: FreNode) => Box> = new Map<string, (node: FreNode) => Box>([
        // register your custom box methods here
        ['EuroLiteral', this.EuroLiteralWithSVG],
    ]);
    nodeTypeToTableDefinition: Map<string, () => FreTableDefinition> = new Map<string, () => FreTableDefinition>([
        // register your custom table definition methods here
        // ['NAME_OF_CONCEPT', this.TABLE_DEFINITION_FOR_CONCEPT],
    ]);

    // add your custom methods here

    // BOX_FOR_CONCEPT(node: NAME_OF_CONCEPT) : Box { ... }
    EuroLiteralWithSVG(node: EuroLiteral): Box {
        return createDefaultExpressionBox(
            node,
            [
                BoxFactory.horizontalLayout(
                    node,
                    "EuroLiteral-hlist-line-0",
                    "",
                    [
                        new SvgBox(node, "euro-icon", euroIcon, {
                            viewPortWidth: 20,
                            viewPortHeight: 20,
                            viewBoxWidth: 1024,
                            viewBoxHeight: 1024,
                            selectable: false
                        }),
                        BoxUtil.numberBox(node, "euros", NumberDisplay.SELECT),
                        BoxUtil.labelBox(node, ",", "top-1-line-0-item-2"),
                        BoxUtil.numberBox(node, "cents", NumberDisplay.SELECT),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }

    // TABLE_DEFINITION_FOR_CONCEPT() : FreTableDefinition { ... }
}

```

<Note><svelte:fragment slot="header">Use another filename and/or location</svelte:fragment>
<svelte:fragment slot="content">
You can rename the file <code>~/frecode/editor/CustomYourLanguageNameProjection.ts</code>, and/or put it in another location.
In that case, you need to adjust the file <code>~/frecode/config/FreonConfiguration</code>. 
See <a href="/Documentation/Customizations#adding-typeScript-files-4">Adding TypeScript Files</a>.
</svelte:fragment>
</Note>


## Writing Custom Actions

When you have created your own custom projection, this projection is exactly that:
a projection. Other than the built-in default behavior, there are no actions defined yet.
Actions are necessary to enable the user to change the model and add elements to it.
The projections only describe what you will see in the editor.
Actions determine what you can do, how you interact with the editor.

As a convenience, the file `~/frecode/editor/CustomYourLanguageNameActions.ts` is 
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
