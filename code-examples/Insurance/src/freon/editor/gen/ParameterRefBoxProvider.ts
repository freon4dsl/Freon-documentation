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

import { ParameterRef, Parameter } from "../../language/gen/index.js";

import { InsuranceModelEnvironment } from "../../config/gen/InsuranceModelEnvironment.js";

/**
 * This class implements the box provider for a single node of type ParameterRef.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class ParameterRefBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "ParameterRef";
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
            this._node as ParameterRef,
            [
                BoxFactory.horizontalLayout(
                    this._node as ParameterRef,
                    "ParameterRef-hlist-line-0",
                    "",
                    [
                        BoxUtil.referenceBox(
                            this._node as ParameterRef,
                            "parameter",
                            (selected: string) => {
                                (this._node as ParameterRef).parameter = FreNodeReference.create<Parameter>(selected, "Parameter");
                            },
                            InsuranceModelEnvironment.getInstance().scoper,
                        ),
                        BoxFactory.optional2(
                            this._node as ParameterRef,
                            "optional-attribute",
                            () => !!(this._node as ParameterRef).attribute,
                            BoxFactory.horizontalLayout(
                                this._node as ParameterRef,
                                "ParameterRef-optional-attribute-hlist-line-0",
                                "",
                                [
                                    BoxUtil.labelBox(this._node as ParameterRef, ".", "top-2-line-0-item-0"),
                                    BoxUtil.getBoxOrAction(this._node as ParameterRef, "attribute", "AttributeRef", this.mainHandler),
                                ],
                                { selectable: false },
                            ),
                            false,
                            BoxFactory.action(this._node, "optional-attribute", "."),
                        ),
                    ],
                    { selectable: false },
                ),
            ],
            { selectable: false },
        );
    }
}
