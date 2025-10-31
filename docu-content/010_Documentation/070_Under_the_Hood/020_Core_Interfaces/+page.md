---
title: "The Freon Core Interfaces"
description: "Overview of the essential TypeScript interfaces that define Freon’s core editor and model framework: FreNode, FreNamedElement, FreAction, and FreCustomAction."
tags: Core Interfaces, FreElement, FreAction, Freon, TypeScript
---

# The Freon Core Interfaces

## FreNode

As Freon uses the AST for projections and behavior, it needs to know about the type of elements in the AST.  
To allow Freon to work, each element type that occurs in the AST must implement the `FreElement` interface.  
This interface is kept as small as possible to allow Freon to be used for any AST.

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

The two most important members in this interface are:

- `piId()` — returns a unique ID for each element in the AST.
- `piContainer()` — returns a descriptor for the container (parent) of an element in the AST.

The functions `piIsExpression()` and `piIsBinaryExpression()` are only needed when your language
contains expressions, since Freon includes special handling for expression trees.  
To start with, these functions can simply return `false`.

Note that Freon does not need to know anything about the structure of your language:  
no available element types, no property names, and no model structure.  
This is intentional — Freon is not designed as a full *language workbench*,  
but as a flexible projectional editor that can integrate with multiple language workbenches (or none at all).

---

## FreNamedElement

An object that implements `FreNamedElement` can be a node in a model AST, similar to  
[`FreElement`](#frenode) implementations.  
The difference is that `FreNamedElement` objects have a `name` property.

```ts
/* File: core/src/language/FreNamedElement.ts */

export interface FreNamedElement extends FreElement {
name: string;
}
```

---

## FreAction

`FreAction` is the abstract base class for all editor actions that can be triggered from boxes.

```ts
/* File: core/src/language/FreAction.ts */

export abstract class FreAction {
trigger: FreTriggerType;
activeInBoxRoles: string[];
isApplicable?: (box: Box) => boolean;
boxRoleToSelect?: string;
caretPosition?: FreCaret;
referenceShortcut?: ReferenceShortcut;

    abstract execute(
        box: Box,
        trigger: FreTriggerUse,
        editor: FreEditor,
        index?: number
    ): FrePostAction;
}
```

---

## FreCustomAction

A concrete implementation of `FreAction`, `FreCustomAction` defines a customizable editor action
executed via a function stored in its `action` property.

```ts
/* File: core/src/language/FreCustomAction.ts */

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

    action: CustomAction;

    constructor() {
        super();
    }

    override execute(box: Box, trigger: FreTriggerUse, editor: FreEditor): FrePostAction {
        ACTION_LOGGER.log("FreCustomCommand: trigger [" + triggerTypeToString(trigger) + "]");
        ACTION_LOGGER.log("FreCustomCommand: action [" + this.action + "]");
        const self = this;
        let selected;

        AST.change(() => {
            selected = self.action(box, triggerTypeToString(trigger), editor);
        });

        if (!!selected) {
            if (!!self.boxRoleToSelect) {
                return function () {
                    ACTION_LOGGER.log(
                        "FreCustomCommand select " +
                            box.node.freLanguageConcept() +
                            " box " +
                            self.boxRoleToSelect
                    );
                    editor.selectElementBox(selected, self.boxRoleToSelect, self.caretPosition);
                };
            } else {
                return function () {
                    ACTION_LOGGER.log("editor.selectFirstEditableChildBox(selected)");
                    editor.selectFirstEditableChildBox(selected);
                };
            }
        }

        return function (): void {
            if (self.boxRoleToSelect === "REFERENCE") {
                const index = (box.node[box.propertyName] as Array<any>).length - 1;
                editor.selectElement(box.node, box.propertyName, index);
                editor.selectNextLeaf();
                ACTION_LOGGER.log(
                    \`REFERENCE node \${box.node.freId()} prop \${box.propertyName} index \${index}\`
                );
            }
        };
    }
}
```

---

**Related Topics**

- [The Projectional Editor Framework](/Documentation/Under_the_Hood/Editor_Framework)
- [Actions and Behaviors](/Documentation/Under_the_Hood/Editor_Framework/Actions)
- [Editor Customization](/Documentation/Customizations/Editor_Customization)
