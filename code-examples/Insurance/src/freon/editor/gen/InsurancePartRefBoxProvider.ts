// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, FreNodeReference, createDefaultExpressionBox } from "@freon4dsl/core";

import { InsurancePartRef, InsurancePart } from "../../language/gen/index.js";

import { InsuranceModelEnvironment } from "../../config/gen/InsuranceModelEnvironment.js";

/**
 * This class implements the box provider for a single node of type InsurancePartRef.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class InsurancePartRefBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "InsurancePartRef";
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
            this._node as InsurancePartRef,
            [
                BoxUtil.referenceBox(
                    this._node as InsurancePartRef,
                    "part",
                    (selected: string) => {
                        (this._node as InsurancePartRef).part = FreNodeReference.create<InsurancePart>(selected, "InsurancePart");
                    },
                    InsuranceModelEnvironment.getInstance().scoper,
                ),
            ],
            { selectable: false },
        );
    }
}
