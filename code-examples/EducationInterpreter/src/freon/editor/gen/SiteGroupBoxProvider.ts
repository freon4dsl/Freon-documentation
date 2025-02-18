// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory } from "@freon4dsl/core";

import { SiteGroup } from "../../language/gen/index.js";

import { EducationEnvironment } from "../../config/gen/EducationEnvironment.js";

/**
 * This class implements the box provider for a single node of type SiteGroup.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class SiteGroupBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "SiteGroup";
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
        return BoxFactory.verticalLayout(this._node as SiteGroup, "SiteGroup-overall", "", [
            BoxUtil.labelBox(this._node as SiteGroup, "SiteGroup Overview", "top-1-line-0-item-0"),
            BoxUtil.emptyLineBox(this._node as SiteGroup, "SiteGroup-empty-line-1"),
            BoxUtil.indentBox(
                this._node as SiteGroup,
                4,
                "2",
                BoxFactory.horizontalLayout(
                    this._node as SiteGroup,
                    "SiteGroup-hlist-line-2",
                    "",
                    [
                        BoxUtil.labelBox(this._node as SiteGroup, "Name:", "top-1-line-2-item-0"),
                        BoxUtil.textBox(this._node as SiteGroup, "name"),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.emptyLineBox(this._node as SiteGroup, "SiteGroup-empty-line-3"),
            BoxUtil.indentBox(
                this._node as SiteGroup,
                4,
                "4",
                BoxFactory.horizontalLayout(
                    this._node as SiteGroup,
                    "SiteGroup-hlist-line-4",
                    "",
                    [
                        BoxUtil.labelBox(this._node as SiteGroup, "Description:", "top-1-line-4-item-0"),
                        BoxUtil.textBox(this._node as SiteGroup, "description"),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.emptyLineBox(this._node as SiteGroup, "SiteGroup-empty-line-5"),
            BoxUtil.indentBox(
                this._node as SiteGroup,
                4,
                "6",
                BoxFactory.horizontalLayout(
                    this._node as SiteGroup,
                    "SiteGroup-hlist-line-6",
                    "",
                    [
                        BoxUtil.labelBox(this._node as SiteGroup, "Topics:", "top-1-line-6-item-0"),
                        BoxUtil.verticalReferenceListBox(
                            this._node as SiteGroup,
                            "topics",
                            EducationEnvironment.getInstance().scoper,
                            null,
                        ),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.emptyLineBox(this._node as SiteGroup, "SiteGroup-empty-line-7"),
            BoxUtil.indentBox(
                this._node as SiteGroup,
                4,
                "8",
                BoxFactory.horizontalLayout(
                    this._node as SiteGroup,
                    "SiteGroup-hlist-line-8",
                    "",
                    [
                        BoxUtil.labelBox(this._node as SiteGroup, "Flows:", "top-1-line-8-item-0"),
                        BoxUtil.verticalReferenceListBox(this._node as SiteGroup, "flows", EducationEnvironment.getInstance().scoper, null),
                    ],
                    { selectable: false },
                ),
            ),
        ]);
    }
}
