// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory } from "@freon4dsl/core";

import { Part } from "../../language/gen/index.js";

/**
 * This class implements the box provider for a single node of type Part.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class PartBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default", "comments"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Part";
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
            } else if (projectionName === "comments") {
                return this.getComments();
            }
        }
        // in all other cases, return the default
        return this.getDefault();
    }

    private getDefault(): Box {
        return BoxUtil.getBoxOrAction(this._node as Part, "part", "BaseProduct", this.mainHandler);
    }

    private getComments(): Box {
        return BoxFactory.verticalLayout(this._node as Part, "Part-overall", "", [
            BoxUtil.labelBox(
                this._node as Part,
                "\/* This is a model unit that contains a part of an insurance product *\/",
                "top-1-line-0-item-0",
            ),
            BoxUtil.emptyLineBox(this._node as Part, "Part-empty-line-1"),
            BoxUtil.getBoxOrAction(this._node as Part, "part", "BaseProduct", this.mainHandler),
        ]);
    }
}
