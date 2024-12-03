// Generated by the Freon Language Generator.
import {
    Box,
    BoxUtil,
    FreBoxProvider,
    FreProjectionHandler,
    FreNodeReference,
    BoxFactory,
    createDefaultExpressionBox,
} from "@freon4dsl/core";

import { FunctionCallExpression, EntityFunction } from "../../language/gen/index.js";

import { EntityModelEnvironment } from "../../config/gen/EntityModelEnvironment.js";

/**
 * This class implements the box provider for a single node of type FunctionCallExpression.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class FunctionCallExpressionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["StartEditor", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "FunctionCallExpression";
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
            this._node as FunctionCallExpression,
            [
                BoxFactory.horizontalLayout(
                    this._node as FunctionCallExpression,
                    "FunctionCallExpression-hlist-line-0",
                    "",
                    [
                        BoxUtil.labelBox(this._node as FunctionCallExpression, "CALL", "top-1-line-0-item-0"),
                        BoxUtil.referenceBox(
                            this._node as FunctionCallExpression,
                            "functionDefinition",
                            (selected: string) => {
                                (this._node as FunctionCallExpression).functionDefinition = FreNodeReference.create<EntityFunction>(
                                    selected,
                                    "EntityFunction",
                                );
                            },
                            EntityModelEnvironment.getInstance().scoper,
                        ),
                        BoxUtil.labelBox(this._node as FunctionCallExpression, "(  )", "top-1-line-0-item-2"),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }

    private getDefault(): Box {
        return createDefaultExpressionBox(
            this._node as FunctionCallExpression,
            [
                BoxFactory.verticalLayout(this._node as FunctionCallExpression, "FunctionCallExpression-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as FunctionCallExpression,
                        "FunctionCallExpression-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as FunctionCallExpression, "FunctionCallExpression", "top-1-line-0-item-0"),
                            BoxUtil.labelBox(this._node as FunctionCallExpression, "{", "top-1-line-0-item-1"),
                        ],
                        { selectable: false },
                    ),
                    BoxFactory.optional2(
                        this._node as FunctionCallExpression,
                        "optional-appliedfeature",
                        () => !!(this._node as FunctionCallExpression).appliedfeature,
                        BoxUtil.indentBox(
                            this._node as FunctionCallExpression,
                            4,
                            "0",
                            BoxFactory.horizontalLayout(
                                this._node as FunctionCallExpression,
                                "FunctionCallExpression-optional-appliedfeature-hlist-line-0",
                                "",
                                [
                                    BoxUtil.labelBox(this._node as FunctionCallExpression, "appliedfeature", "top-2-line-0-item-0"),
                                    BoxUtil.getBoxOrAction(
                                        this._node as FunctionCallExpression,
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
                    BoxUtil.indentBox(
                        this._node as FunctionCallExpression,
                        4,
                        "2",
                        BoxFactory.horizontalLayout(
                            this._node as FunctionCallExpression,
                            "FunctionCallExpression-hlist-line-2",
                            "",
                            [
                                BoxUtil.labelBox(this._node as FunctionCallExpression, "functionDefinition", "top-1-line-2-item-0"),
                                BoxUtil.referenceBox(
                                    this._node as FunctionCallExpression,
                                    "functionDefinition",
                                    (selected: string) => {
                                        (this._node as FunctionCallExpression).functionDefinition = FreNodeReference.create<EntityFunction>(
                                            selected,
                                            "EntityFunction",
                                        );
                                    },
                                    EntityModelEnvironment.getInstance().scoper,
                                ),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxUtil.labelBox(this._node as FunctionCallExpression, "}", "top-1-line-3-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }
}
