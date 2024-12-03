// Generated by the Freon Language Generator.
import {
    Box,
    BoxUtil,
    FreBoxProvider,
    FreProjectionHandler,
    BoxFactory,
    FreNodeReference,
    createDefaultExpressionBox,
} from "@freon4dsl/core";

import { QuestionReference, Question } from "../../language/gen/index.js";

import { EducationEnvironment } from "../../config/gen/EducationEnvironment.js";

/**
 * This class implements the box provider for a single node of type QuestionReference.
 * The box provider is able to create the (tree of) boxes for the node, based
 * on the projections that are currently selected by the user.
 * The top of the tree of boxes is always a box of type ElementBox, which is
 * a box that will never be rendered itself, only its content will. Thus, we
 * have a stable entry in the complete box tree for every FreNode node.
 */
export class QuestionReferenceBoxProvider extends FreBoxProvider {
    constructor(mainHandler: FreProjectionHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "QuestionReference";
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
            this._node as QuestionReference,
            [
                BoxFactory.verticalLayout(this._node as QuestionReference, "QuestionReference-overall", "", [
                    BoxFactory.horizontalLayout(
                        this._node as QuestionReference,
                        "QuestionReference-hlist-line-0",
                        "",
                        [
                            BoxUtil.labelBox(this._node as QuestionReference, "QuestionReference", "top-1-line-0-item-0"),
                            BoxUtil.labelBox(this._node as QuestionReference, "{", "top-1-line-0-item-1"),
                        ],
                        { selectable: false },
                    ),
                    BoxUtil.indentBox(
                        this._node as QuestionReference,
                        4,
                        "1",
                        BoxFactory.horizontalLayout(
                            this._node as QuestionReference,
                            "QuestionReference-hlist-line-1",
                            "",
                            [
                                BoxUtil.labelBox(this._node as QuestionReference, "question", "top-1-line-1-item-0"),
                                BoxUtil.referenceBox(
                                    this._node as QuestionReference,
                                    "question",
                                    (selected: string) => {
                                        (this._node as QuestionReference).question = FreNodeReference.create<Question>(
                                            selected,
                                            "Question",
                                        );
                                    },
                                    EducationEnvironment.getInstance().scoper,
                                ),
                            ],
                            { selectable: false },
                        ),
                    ),
                    BoxUtil.labelBox(this._node as QuestionReference, "}", "top-1-line-2-item-0"),
                ]),
            ],
            { selectable: false },
        );
    }
}
