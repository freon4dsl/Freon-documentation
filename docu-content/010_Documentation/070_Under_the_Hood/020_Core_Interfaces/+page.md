# The Freon Core Interfaces

## FreNode

As Freon uses the AST for projections and behavior, it needs to know about the type of elements in the AST.
To allow Freon to work, each element type that occurs in the AST needs to implement the `FreElement` interface.
This interface is kept as small as possible, to allow Freon to be used for any AST.

```ts
/* File: core/src/language/FreNode.ts */

export interface FreElement {
	piId(): string;

	piLanguageConcept(): string;

	piContainer(): FreContainerDescriptor;

	piIsModel(): boolean;

	piIsUnit(): boolean;

	piIsExpression(): boolean;

	piIsBinaryExpression(): boolean;
}
```

The main two elements in this interface are:

- `piId()`, which should return en unique id for each element in the AST.
- `piContainer()` which should return a descriptor for the container (parent) of an element in the AST.

The two functions `piIsExpression()` and `piIsBinaryExpression()` are only needed when your language
contains expressions, as Freon includes special handling of expressions.
To start with, these functions can be defined to simply return `false`.

Note that Freon does not need to know anything about the structure of your language.
No need to know the available element type, nor the properties of en element type, nor anything else.
This is by design, as Freon is not meant to be a full Language Workbench,
but instead meant to be used with multiple language workbenches , or none.


## FreNamedElement

An object that implements `FreNamedElement` can be a node in a model AST, similar to
xref:element-interface[`FreElement`]
implementations. The difference is that `FreNamedElements` have a name property.

```ts
/* File: core/src/language/FreNamedElement.ts  */

export interface FreNamedElement extends FreElement {
	name: string;
}
```

## FreAction

```ts
/* File: core/src/language/FreAction.ts  */

export abstract class FreAction {
	/**
	 * The trigger to activate this behavior
	 */
	trigger: FreTriggerType;

	/**
	 * The box roles in which this trigger is active
	 */
	activeInBoxRoles: string[];

	/**
	 * Optional callback function that returns whether the trigger is applicable for the specific box.
	 */
	isApplicable?: (box: Box) => boolean;

	/**
	 * The role of the box that should be selected after the action has been executing.
	 */
	boxRoleToSelect?: string;

	/**
	 * The caret position where the cursor should be positioned after the action has been executed.
	 * Only applicable if the selected box is a TextBox.
	 */
	caretPosition?: FreCaret;

	/**
	 * The property name of the reference for which this is a shortcut.
	 */
	referenceShortcut?: ReferenceShortcut;

	/**
	 * Execute the action
	 * @param box       The selected box on which this action is executed
	 * @param trigger   The trigger that causes this action to execute
	 * @param editor    The editor
	 * @param index     The index in the list, if there is any
	 */
	abstract execute(box: Box, trigger: FreTriggerUse, editor: FreEditor, index?: number): FrePostAction;
}
```

## FreCustomAction

```ts
/* File: core/src/language/FreCustomAction.ts  */

import { AST } from "../../change-manager/index.js";
import { FreUtils } from "../../util/index.js";
import { Box } from "../boxes/index.js";
import { FreEditor } from "../FreEditor.js";
import {
    FreAction,
    CustomAction,
    FreTriggerUse,
    FrePostAction,
    triggerTypeToString,
    ACTION_LOGGER
} from "./internal.js";

export class FreCustomAction extends FreAction {
    static create(initializer?: Partial<FreCustomAction>) {
        const result = new FreCustomAction();
        FreUtils.initializeObject(result, initializer);
        return result;
    }
    /**
     * The action function that will be performed
     */
    action: CustomAction;

    constructor() {
        super();
    }

    /**
     * @see FreAction.execute
     * @param box
     * @param trigger
     * @param editor
     */
    override execute(box: Box, trigger: FreTriggerUse, editor: FreEditor): FrePostAction {
        ACTION_LOGGER.log("FreCustomCommand: trigger [" + triggerTypeToString(trigger) + "]");
        ACTION_LOGGER.log("FreCustomCommand: action [" + this.action + "]");
        const self = this;
        let selected
        AST.change( () => {
            selected = self.action(box, triggerTypeToString(trigger), editor);
        })
        if (!!selected) {
            if (!!self.boxRoleToSelect) {
                return function () {
                    ACTION_LOGGER.log("FreCustomCommand select " + box.node.freLanguageConcept() + " box " + self.boxRoleToSelect);
                    editor.selectElementBox(selected, self.boxRoleToSelect, self.caretPosition);
                };
            } else {
                // Default: select the first editable child of the selected element
                return function () {
                    ACTION_LOGGER.log("editor.selectFirstEditableChildBox(selected) ");
                    editor.selectFirstEditableChildBox(selected);
                };
            }
        }
        return function(): void {
            if (self.boxRoleToSelect === "REFERENCE") {
                const index = (box.node[box.propertyName] as Array<any>).length -1
                // const empty = editor.findBoxForNode(box.node, box.propertyName)
                editor.selectElement(box.node, box.propertyName, index)
                editor.selectNextLeaf()
                ACTION_LOGGER.log(`REFERENCE node ${box.node.freId()} prop ${box.propertyName} index ${index}`)
            }
        }
        // return EMPTY_POST_ACTION;
    }

}
```
