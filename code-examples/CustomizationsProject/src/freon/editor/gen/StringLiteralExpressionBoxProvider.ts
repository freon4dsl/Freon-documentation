// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory, createDefaultExpressionBox } from "@freon4dsl/core";

import { StringLiteralExpression } from "../../language/gen/index.js";

/**
 * This class implements the box provider for a single node of type StringLiteralExpression.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class StringLiteralExpressionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["StartEditor", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "StringLiteralExpression";
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
            if (projectionName === "StartEditor") {
                return this.getStartEditor();
            } else if (projectionName === "default") {
                return this.getDefault();
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getStartEditor(): Box {
        return createDefaultExpressionBox(
            this._node as StringLiteralExpression,
            [
                BoxFactory.horizontalLayout(
                    this._node as StringLiteralExpression,
                    "StringLiteralExpression-hlist-line-0",
                    "",
                    [
                        BoxUtil.labelBox(this._node as StringLiteralExpression, "\'", "top-1-line-0-item-0"),
                        BoxUtil.textBox(this._node as StringLiteralExpression, "value"),
                        BoxUtil.labelBox(this._node as StringLiteralExpression, "\'", "top-1-line-0-item-2"),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }

    private getDefault(): Box {
        return createDefaultExpressionBox(
            this._node as StringLiteralExpression,
            [
                BoxFactory.verticalLayout(this._node as StringLiteralExpression, "StringLiteralExpression-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as StringLiteralExpression,
                        "StringLiteralExpression-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as StringLiteralExpression, "StringLiteralExpression", "top-1-line-0-item-0"),
                            BoxUtil.labelBox(this._node as StringLiteralExpression, "\{", "top-1-line-0-item-1"),
                        ],
                        { selectable: false },
                    ),
                    BoxUtil.indentBox(
                        this._node as StringLiteralExpression,
                        4,
                        "1",
                        BoxFactory.horizontalLayout(
                            this._node as StringLiteralExpression,
                            "StringLiteralExpression-hlist-line-1",
                            "",
                            [
                                BoxUtil.labelBox(this._node as StringLiteralExpression, "value", "top-1-line-1-item-0"),
                                BoxUtil.textBox(this._node as StringLiteralExpression, "value"),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxFactory.optional2(
                        this._node as StringLiteralExpression,
                        "optional-appliedfeature",
                        () => !!(this._node as StringLiteralExpression).appliedfeature,
                        BoxUtil.indentBox(
                            this._node as StringLiteralExpression,
                            4,
                            "0",
                            BoxFactory.horizontalLayout(
                                this._node as StringLiteralExpression,
                                "StringLiteralExpression-optional-appliedfeature-hlist-line-0",
                                "",
                                [
                                    BoxUtil.labelBox(this._node as StringLiteralExpression, "appliedfeature", "top-2-line-0-item-0"),
                                    BoxUtil.getBoxOrAction(
                                        this._node as StringLiteralExpression,
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
                    BoxUtil.labelBox(this._node as StringLiteralExpression, "}", "top-1-line-3-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }
}
