// Generated by the Freon Language Generator.
import { Box, BoxUtil, FreBoxProvider, FreProjectionHandler, BoxFactory, FreNodeReference, LimitedDisplay } from "@freon4dsl/core";

import { GradeScore, Grade } from "../../language/gen/index.js";

import { EducationEnvironment } from "../../config/gen/EducationEnvironment.js";

/**
 * This class implements the box provider for a single node of type GradeScore.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class GradeScoreBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "GradeScore";
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
        return BoxFactory.verticalLayout(this._node as GradeScore, "GradeScore-overall", "", [
            BoxFactory.horizontalLayout(
                this._node as GradeScore,
                "GradeScore-hlist-line-0",
                "",
                [
                    BoxUtil.labelBox(this._node as GradeScore, "GradeScore", "top-1-line-0-item-0"),
                    BoxUtil.labelBox(this._node as GradeScore, "{", "top-1-line-0-item-1"),
                ],
                { selectable: false },
            ),
            BoxUtil.indentBox(
                this._node as GradeScore,
                4,
                "1",
                BoxFactory.horizontalLayout(
                    this._node as GradeScore,
                    "GradeScore-hlist-line-1",
                    "",
                    [
                        BoxUtil.labelBox(this._node as GradeScore, "expr", "top-1-line-1-item-0"),
                        BoxUtil.getBoxOrAction(this._node as GradeScore, "expr", "ScoreExpression", this.mainHandler),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.indentBox(
                this._node as GradeScore,
                4,
                "2",
                BoxFactory.horizontalLayout(
                    this._node as GradeScore,
                    "GradeScore-hlist-line-2",
                    "",
                    [
                        BoxUtil.labelBox(this._node as GradeScore, "grade", "top-1-line-2-item-0"),
                        BoxUtil.limitedBox(
                            this._node as GradeScore,
                            "grade",
                            (selected: string) => {
                                (this._node as GradeScore).grade = FreNodeReference.create<Grade>(selected, "Grade");
                            },
                            LimitedDisplay.SELECT,
                            EducationEnvironment.getInstance().scoper,
                        ),
                    ],
                    { selectable: false },
                ),
            ),
            BoxUtil.labelBox(this._node as GradeScore, "}", "top-1-line-3-item-0"),
        ]);
    }
}
