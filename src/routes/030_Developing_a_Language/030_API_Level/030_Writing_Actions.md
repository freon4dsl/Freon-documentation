<script>
    import Note from "../../../lib/notes/Note.svelte";
    import Figure from "../../../lib/figures/Figure.svelte";
</script>

# <a name="writing-actions"></a> Writing Actions in TypeScript

When you have created your own custom projection, this projection is exactly that: 
a projection. Other than the built-in default behavior (held in the file 
`~/picode/editor/<yourLanguageName>DefaultActions.ts`), there are no actions defined yet.
Actions are necessary to enable the user to change the model and add elements to it. 
The projections only describe what you will see in the editor.
Actions determine what you can do, how you interact with the editor.

As a convenience, the file `~/picode/editor/Custom<yourLanguageName>Actions.ts` is generated, which is a placeholder
for your own actions written in TypeScript. This file contains four constants for 
different kind of actions. What you need to
do is to define these constants. Then Freon will merge your actions
with the default actions. If a trigger for an action is identical to a default one,
your custom actions take precedence.

```ts
export const MANUAL_EXPRESSION_CREATORS: PiExpressionCreator[] = [
    // Add your own custom expression creators here
];

export const MANUAL_BINARY_EXPRESSION_CREATORS: PiBinaryExpressionCreator[] = [
    // Add your own custom binary expression creators here
];

export const MANUAL_CUSTOM_BEHAVIORS: PiCustomBehavior[] = [
    // Add your own custom behavior here
];

export const MANUAL_KEYBOARD: KeyboardShortcutBehavior[] = [
    // Add your own custom keyboard shortcuts here
];
```

## Creation of New Elements

Now, let's start with adding an element, e.g. adding a new `property` to an
`Entity`.

From [Actions](/060_Under_the_Hood/010_The_Editor_Framework#defining-actions) you will have learned
that an `AliasBox` is a predefined box where the user can type text to trigger some action.
Thus, we add an `AliasBox` to the projection of the property list.
Note the role of the box: *end-of-property-list*.

```ts
// tutorial-language/editor/CustomEntityProjection.ts#L141-L146

new VerticalListBox(entity,"attributes",
    entity.attributes.map(att => {
        return this.getBox(att);
    })
).addChild(new AliasBox(entity, "end-of-attribute-list",
    "add attribute"))
```

Then we create the actual action and attach it to the role of the `AliasBox`. Note that the projection 
and action
are defined in two different files, respectively `CustomEntityProjections.ts` and `CustomEntityActions.ts`.

```ts
// tutorial-language/editor/CustomEntityActions.ts#L40-L51

    {
        activeInBoxRoles: ["end-of-attribute-list"],                                            // <1>
        trigger: "attribute",                                                                   // <2>
        action: (box: Box, trigger: PiTriggerType, editor: PiEditor): PiElement | null => {     // <3>
            var entity: Entity = box.element as Entity;
            const attribute: AttributeWithLimitedType = new AttributeWithLimitedType();
            entity.attributes.push(attribute);
            return attribute;
        },
        boxRoleToSelect: "Attribute-name"                                                       // <4>
    },
];
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



