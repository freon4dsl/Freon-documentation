// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, TableUtil, FreNodeReference, TableRowBox, BoxFactory } from "@freon4dsl/core";

import { EntityFunction, Type } from "../../language/gen/index.js";

import { EntityModelEnvironment } from "../../config/gen/EntityModelEnvironment.js";

/**
 * This class implements the box provider for a single node of type EntityFunction.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class EntityFunctionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["tableRowFor_StartEditor"];
        this.conceptName = "EntityFunction";
    }

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
            } else if (projectionName === "tableRowFor_StartEditor") {
                return this.getTableRowFor_StartEditor();
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getTableRowFor_StartEditor(): TableRowBox {
        const cells: Box[] = [];
        cells.push(BoxUtil.textBox(this._node as EntityFunction, "name"));
        cells.push(
            TableUtil.tableBoxColumnOriented(
                this._node as EntityFunction,
                (this._node as EntityFunction).parameters,
                "parameters",
                this.mainHandler,
            ),
        );
        cells.push(
            BoxUtil.referenceBox(
                this._node as EntityFunction,
                "declaredType",
                (selected: string) => {
                    (this._node as EntityFunction).declaredType = FreNodeReference.create<Type>(selected, "Type");
                },
                EntityModelEnvironment.getInstance().scoper,
            ),
        );
        cells.push(BoxUtil.getBoxOrAction(this._node as EntityFunction, "expression", "EntityExpression", this.mainHandler));
        return TableUtil.rowBox(
            this._node,
            this._node.freOwnerDescriptor().propertyName,
            "EntityFunction",
            cells,
            this._node.freOwnerDescriptor().propertyIndex,
            true,
        );
    }

    private getDefault(): Box {
        return BoxFactory.verticalLayout(this._node as EntityFunction, "EntityFunction-overall", "", [
            BoxFactory.horizontalLayout(
                this._node as EntityFunction,
                "EntityFunction-hlist-line-0",
                "",
                [
                    BoxUtil.labelBox(this._node as EntityFunction, "EntityFunction", "top-1-line-0-item-0"),
                    BoxUtil.textBox(this._node as EntityFunction, "name"),
                    BoxUtil.labelBox(this._node as EntityFunction, "\{", "top-1-line-0-item-2"),
                ],
                { selectable: false },
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                4,
                "1",
                BoxUtil.labelBox(this._node as EntityFunction, "aliases", "top-1-line-1-item-0"),
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                8,
                "2",
                BoxFactory.verticalList(
                    this._node as EntityFunction,
                    "EntityFunction-aliases-vList",
                    "aliases",
                    (
                        (this._node as EntityFunction).aliases.map((item, index) =>
                            BoxUtil.textBox(this._node as EntityFunction, "aliases", index),
                        ) as Box[]
                    ).concat([BoxFactory.action(this._node as EntityFunction, "new-EntityFunction-aliases-vList", "<+ aliases>")]),
                ),
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                4,
                "3",
                BoxFactory.horizontalLayout(
                    this._node as EntityFunction,
                    "EntityFunction-hlist-line-3",
                    "",
                    [
                        BoxUtil.labelBox(this._node as EntityFunction, "expression", "top-1-line-3-item-0"),
                        BoxUtil.getBoxOrAction(this._node as EntityFunction, "expression", "EntityExpression", this.mainHandler),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                4,
                "4",
                BoxUtil.labelBox(this._node as EntityFunction, "parameters", "top-1-line-4-item-0"),
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                8,
                "5",
                BoxUtil.verticalPartListBox(
                    this._node as EntityFunction,
                    (this._node as EntityFunction).parameters,
                    "parameters",
                    null,
                    this.mainHandler,
                ),
            ),
            BoxUtil.indentBox(
                this._node as EntityFunction,
                4,
                "6",
                BoxFactory.horizontalLayout(
                    this._node as EntityFunction,
                    "EntityFunction-hlist-line-6",
                    "",
                    [
                        BoxUtil.labelBox(this._node as EntityFunction, "declaredType", "top-1-line-6-item-0"),
                        BoxUtil.referenceBox(
                            this._node as EntityFunction,
                            "declaredType",
                            (selected: string) => {
                                (this._node as EntityFunction).declaredType = FreNodeReference.create<Type>(selected, "Type");
                            },
                            EntityModelEnvironment.getInstance().scoper,
                        ),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.labelBox(this._node as EntityFunction, "}", "top-1-line-7-item-0"),
        ]);
    }
}
