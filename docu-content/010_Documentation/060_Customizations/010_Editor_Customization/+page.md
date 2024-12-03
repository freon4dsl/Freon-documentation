<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Editor Customization

Editor customization is done by implementing one or both of two interfaces:
[`FreProjection`](/Documentation/Under_the_Hood/The_Editor_Interfaces#freprojection-2) and
[`FreCombinedActions`](/Documentation/Under_the_Hood/The_Editor_Interfaces#freaction-3). But
before you dive into all this, we suggest that you become familiar with the information on the Box model,
as explained in the [Freon Editor Framework](/Documentation/Under_the_Hood/The_Editor_Framework).


## Box Providers 

The generated editor is implemented by a set of **box providers**. Every box provider is capable of returning the
box for a specific type of AST node. For instance, the generated box provider for the `EuroLiteral` 
concept contains the following to methods.

```ts
// DocuProject/src/editor/gen/EuroLiteralBoxProvider.ts#L22-L62

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
heavily on a number of [predefined box types](/Documentation/Under_the_Hood/The_Editor_Framework/Predefined_Boxes), as well as on
the predefined method `createDefaultExpressionBox`, which returns the correct box for a (non-binary) expression concept.


## Writing a Custom Projection

Writing a custom projection does not require the implementation of a complete box provider. Instead,
a custom projection (set) is basically a series of methods that return a box
object for an AST node. Each of the methods need to be registered. This is done in the property `nodeTypeToBoxMethod`.

In the below example, a copy is taken of the `getDefault` method above, which is adjusted to display an SVG Euro symbol instead of the
 string 'EUR'. Note that the method is registered to be used for concepts of type `EuroLiteral`.

```ts
// DocuProject/src/editor/CustomInsuranceModelProjection.ts#L14-L69

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

<Note>
<svelte:fragment slot="header">Just One Custom Projection File Allowed</svelte:fragment>
<svelte:fragment slot="content">
Note that currently, all methods for various concepts that defined a custom projection must be included in one, single
class. This will likely be extended in future versions.
</svelte:fragment></Note>

[//]: # (todo decide whether we should mention that custom table projections are not yet taken into account)

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

As a convenience, the file `~/frecode/editor/CustomYourLanguageNameActions.ts` is generated, which is a placeholder
for your own actions written in TypeScript. This file contains two constants for
different kind of actions. When you define these constants, Freon will merge your actions
with the default actions. If a trigger for an action is identical to a default one,
your custom actions take precedence.

```ts
// DocuProject/src/editor/CustomInsuranceModelActions.ts#L13-L24

export class CustomInsuranceModelActions implements FreCombinedActions {
    binaryExpressionActions: FreCreateBinaryExpressionAction[] = MANUAL_BINARY_EXPRESSION_ACTIONS;
    customActions: FreCustomAction[] = MANUAL_CUSTOM_ACTIONS;
}

export const MANUAL_BINARY_EXPRESSION_ACTIONS: FreCreateBinaryExpressionAction[] = [
    // Add your own custom binary expression actions here
];

export const MANUAL_CUSTOM_ACTIONS: FreCustomAction[] = [
    // Add your own custom behavior here
];
```

## Creation of New Elements

Now, let's start with adding an element, e.g. adding a new `property` to an
`Entity`.

From [Actions](/Documentation/Under_the_Hood/The_Editor_Framework#defining-actions) you will have learned
that an `AliasBox` is a predefined box where the user can type text to trigger some action.
Thus, we add an `AliasBox` to the projection of the property list.
Note the role of the box: _end-of-property-list_.

```ts
// TutorialLanguage/src/editor/CustomEntityModelProjection.ts#L141-L146
```

Then we create the actual action and attach it to the role of the `AliasBox`. Note that the projection
and action
are defined in two different files, respectively `CustomEntityModelProjections.ts` and `CustomEntityModelActions.ts`.

```ts
// TutorialLanguage/src/editor/CustomEntityModelActions.ts#L40-L51
```

The numbers in the comments indicate what happens here:

1. The action is attached to each box with the role "end-of-property-list".
2. The action will be triggered when the user types `"attribute"` inside the `AliasBox`.
3. The executable code for the action. It creates a new `AttributeWithLimitedType` and attaches is to `entity`
4. The focus of the editor is returned to the `Box` with the role `"Attribute-name"`
   within the entity. This ensures that the user can immediately start typing the name of the entity after it has been created.

There can be many boxes with the same role in the editor, as long as their model element is different.
This way, the above action is available for each attribute list in each entity.

<!--- // TODO: describe the optional properties --->

## Custom Actions

// TODO document other custom actions

## Expressions and Binary Expressions

// TODO Advanced expression editing.

## Keyboard Shortcuts

// TODO A keyboard shortcut specifies an action that is triggered by special keys, like e.g. Ctrl-A.
