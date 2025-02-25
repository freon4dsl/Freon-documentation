// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory, createDefaultExpressionBox } from "@freon4dsl/core";

import { BooleanLiteralExpression } from "../../language/gen/index.js";

/**
 * This class implements the box provider for a single node of type BooleanLiteralExpression.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class BooleanLiteralExpressionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "BooleanLiteralExpression";
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
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getDefault(): Box {
        return createDefaultExpressionBox(
            this._node as BooleanLiteralExpression,
            [
                BoxFactory.verticalLayout(this._node as BooleanLiteralExpression, "BooleanLiteralExpression-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as BooleanLiteralExpression,
                        "BooleanLiteralExpression-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as BooleanLiteralExpression, "BooleanLiteralExpression", "top-1-line-0-item-0"),
                            BoxUtil.labelBox(this._node as BooleanLiteralExpression, "\{", "top-1-line-0-item-1"),
                        ],
                        { selectable: false },
                    ),
                    BoxUtil.indentBox(
                        this._node as BooleanLiteralExpression,
                        4,
                        "1",
                        BoxFactory.horizontalLayout(
                            this._node as BooleanLiteralExpression,
                            "BooleanLiteralExpression-hlist-line-1",
                            "",
                            [
                                BoxUtil.labelBox(this._node as BooleanLiteralExpression, "value", "top-1-line-1-item-0"),
                                BoxUtil.textBox(this._node as BooleanLiteralExpression, "value"),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxFactory.optional2(
                        this._node as BooleanLiteralExpression,
                        "optional-appliedfeature",
                        () => !!(this._node as BooleanLiteralExpression).appliedfeature,
                        BoxUtil.indentBox(
                            this._node as BooleanLiteralExpression,
                            4,
                            "0",
                            BoxFactory.horizontalLayout(
                                this._node as BooleanLiteralExpression,
                                "BooleanLiteralExpression-optional-appliedfeature-hlist-line-0",
                                "",
                                [
                                    BoxUtil.labelBox(this._node as BooleanLiteralExpression, "appliedfeature", "top-2-line-0-item-0"),
                                    BoxUtil.getBoxOrAction(
                                        this._node as BooleanLiteralExpression,
                                        "appliedfeature",
                                        "AppliedFeature",
                                        this.mainHandler,
                                    ),
                                ],
                                { selectable: false },
                            ),
                        ),
                        false,
                        BoxFactory.action(this._node, "optional-appliedfeature", "appliedfeature"),
                    ),
                    BoxUtil.labelBox(this._node as BooleanLiteralExpression, "}", "top-1-line-3-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }
}
