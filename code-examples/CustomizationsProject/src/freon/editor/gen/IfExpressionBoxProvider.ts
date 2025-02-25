// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory, createDefaultExpressionBox } from "@freon4dsl/core";

import { IfExpression } from "../../language/gen/index.js";

/**
 * This class implements the box provider for a single node of type IfExpression.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class IfExpressionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["StartEditor", "specials", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "IfExpression";
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
            } else if (projectionName === "specials") {
                return this.getSpecials();
            } else if (projectionName === "default") {
                return this.getDefault();
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getStartEditor(): Box {
        return createDefaultExpressionBox(
            this._node as IfExpression,
            [
                BoxFactory.verticalLayout(this._node as IfExpression, "IfExpression-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as IfExpression,
                        "IfExpression-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as IfExpression, "if", "top-1-line-0-item-0"),
                            BoxUtil.getBoxOrAction(this._node as IfExpression, "condition", "EntityExpression", this.mainHandler),
                            BoxUtil.labelBox(this._node as IfExpression, "then", "top-1-line-0-item-2"),
                        ],
                        { selectable: false },
                    ),
                    BoxUtil.indentBox(
                        this._node as IfExpression,
                        4,
                        "1",
                        BoxUtil.getBoxOrAction(this._node as IfExpression, "whenTrue", "EntityExpression", this.mainHandler),
                    ),
                    BoxUtil.labelBox(this._node as IfExpression, "else", "top-1-line-2-item-0"),
                    BoxUtil.indentBox(
                        this._node as IfExpression,
                        4,
                        "3",
                        BoxUtil.getBoxOrAction(this._node as IfExpression, "whenFalse", "EntityExpression", this.mainHandler),
                    ),
                    BoxUtil.labelBox(this._node as IfExpression, "endif", "top-1-line-4-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }

    private getSpecials(): Box {
        return createDefaultExpressionBox(
            this._node as IfExpression,
            [
                BoxFactory.horizontalLayout(
                    this._node as IfExpression,
                    "IfExpression-hlist-line-0",
                    "",
                    [
                        BoxUtil.labelBox(this._node as IfExpression, "(", "top-1-line-0-item-0"),
                        BoxUtil.getBoxOrAction(this._node as IfExpression, "condition", "EntityExpression", this.mainHandler),
                        BoxUtil.labelBox(this._node as IfExpression, "?", "top-1-line-0-item-2"),
                        BoxUtil.getBoxOrAction(this._node as IfExpression, "whenTrue", "EntityExpression", this.mainHandler),
                        BoxUtil.labelBox(this._node as IfExpression, ":", "top-1-line-0-item-4"),
                        BoxUtil.getBoxOrAction(this._node as IfExpression, "whenFalse", "EntityExpression", this.mainHandler),
                        BoxUtil.labelBox(this._node as IfExpression, ")", "top-1-line-0-item-6"),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }

    private getDefault(): Box {
        return createDefaultExpressionBox(
            this._node as IfExpression,
            [
                BoxFactory.verticalLayout(this._node as IfExpression, "IfExpression-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as IfExpression,
                        "IfExpression-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as IfExpression, "IfExpression", "top-1-line-0-item-0"),
                            BoxUtil.labelBox(this._node as IfExpression, "\{", "top-1-line-0-item-1"),
                        ],
                        { selectable: false },
                    ),
                    BoxUtil.indentBox(
                        this._node as IfExpression,
                        4,
                        "1",
                        BoxFactory.horizontalLayout(
                            this._node as IfExpression,
                            "IfExpression-hlist-line-1",
                            "",
                            [
                                BoxUtil.labelBox(this._node as IfExpression, "condition", "top-1-line-1-item-0"),
                                BoxUtil.getBoxOrAction(this._node as IfExpression, "condition", "EntityExpression", this.mainHandler),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxUtil.indentBox(
                        this._node as IfExpression,
                        4,
                        "2",
                        BoxFactory.horizontalLayout(
                            this._node as IfExpression,
                            "IfExpression-hlist-line-2",
                            "",
                            [
                                BoxUtil.labelBox(this._node as IfExpression, "whenTrue", "top-1-line-2-item-0"),
                                BoxUtil.getBoxOrAction(this._node as IfExpression, "whenTrue", "EntityExpression", this.mainHandler),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxUtil.indentBox(
                        this._node as IfExpression,
                        4,
                        "3",
                        BoxFactory.horizontalLayout(
                            this._node as IfExpression,
                            "IfExpression-hlist-line-3",
                            "",
                            [
                                BoxUtil.labelBox(this._node as IfExpression, "whenFalse", "top-1-line-3-item-0"),
                                BoxUtil.getBoxOrAction(this._node as IfExpression, "whenFalse", "EntityExpression", this.mainHandler),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxFactory.optional2(
                        this._node as IfExpression,
                        "optional-appliedfeature",
                        () => !!(this._node as IfExpression).appliedfeature,
                        BoxUtil.indentBox(
                            this._node as IfExpression,
                            4,
                            "0",
                            BoxFactory.horizontalLayout(
                                this._node as IfExpression,
                                "IfExpression-optional-appliedfeature-hlist-line-0",
                                "",
                                [
                                    BoxUtil.labelBox(this._node as IfExpression, "appliedfeature", "top-2-line-0-item-0"),
                                    BoxUtil.getBoxOrAction(
                                        this._node as IfExpression,
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
                    BoxUtil.labelBox(this._node as IfExpression, "}", "top-1-line-5-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }
}
