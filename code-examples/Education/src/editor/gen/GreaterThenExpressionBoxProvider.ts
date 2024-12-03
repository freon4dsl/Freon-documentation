// Generated by the Freon Language Generator.
import {
    Box,
    BoxUtil,
    FreBoxProvider,
    FreProjectionHandler,
    createDefaultBinaryBox,
    isFreBinaryExpression,
    FreBinaryExpression,
    BoxFactory,
} from "@freon4dsl/core";

import { GreaterThenExpression } from "../../language/gen/index.js";

import { EducationEnvironment } from "../../config/gen/EducationEnvironment.js";

/**
 * This class implements the box provider for a single node of type GreaterThenExpression.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class GreaterThenExpressionBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "GreaterThenExpression";
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
        }
        return this.getDefault();
    }

    /**
     *  Create a global binary box to ensure binary expressions can be edited easily
     */
    private getDefault(): Box {
        return createDefaultBinaryBox(
            this._node as FreBinaryExpression,
            "GreaterThenExpression",
            EducationEnvironment.getInstance().editor,
            this.mainHandler,
        );
    }

    private getBrackets(): Box {
        const binBox = this.getDefault();
        if (!!this._node.freOwnerDescriptor().owner && isFreBinaryExpression(this._node.freOwnerDescriptor().owner)) {
            return BoxFactory.horizontalLayout(this._node, "brackets", "", [
                BoxUtil.labelBox(this._node, "(", "bracket-open", { selectable: true }),
                binBox,
                BoxUtil.labelBox(this._node, ")", "bracket-close", { selectable: true }),
            ]);
        } else {
            return binBox;
        }
    }
}
