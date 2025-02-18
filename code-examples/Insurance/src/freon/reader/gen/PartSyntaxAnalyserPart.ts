// Generated by the Freon Language Generator.
import { net } from "net.akehurst.language-agl-processor";
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import { Part, BaseProduct, InsurancePart, InsuranceTheme, PercentageLiteral, EuroLiteral } from "../../language/gen/index.js";
import { InsuranceModelSyntaxAnalyser } from "./InsuranceModelSyntaxAnalyser.js";
import { FreNodeReference } from "@freon4dsl/core";

export class PartSyntaxAnalyserPart {
    mainAnalyser: InsuranceModelSyntaxAnalyser;

    constructor(mainAnalyser: InsuranceModelSyntaxAnalyser) {
        this.mainAnalyser = mainAnalyser;
    }

    /**
     * Method to transform branches that match the following rule:
     * Part = BaseProduct ;
     * @param branch
     * @private
     */
    public transformPart(branch: SPPTBranch): Part {
        // console.log('transformPart called: ' + branch.name);
        let __part: BaseProduct;
        const children = this.mainAnalyser.getChildren(branch);
        __part = this.mainAnalyser.transformSharedPackedParseTreeNode(children[0]); // RHSPartEntry

        return Part.create({
            part: __part,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * BaseProduct = 'Base' 'Products' identifier 'for' InsuranceTheme
     *	 InsurancePart* ;
     * @param branch
     * @private
     */
    public transformBaseProduct(branch: SPPTBranch): BaseProduct {
        // console.log('transformBaseProduct called: ' + branch.name);
        let __name: string;
        let __theme: FreNodeReference<InsuranceTheme>;
        let __parts: InsurancePart[];
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        __theme = this.mainAnalyser.freNodeRef<InsuranceTheme>(children[4], "InsuranceTheme"); // RHSLimitedRefEntry
        // RHSPartListEntry
        if (children[5].name !== "InsurancePart") {
            __parts = this.mainAnalyser.transformSharedPackedParseTreeList<InsurancePart>(children[5]);
        } else {
            // special case: only when this entry is the single rhs entry of this rule
            __parts = [];
            for (const child of children) {
                __parts.push(this.mainAnalyser.transformSharedPackedParseTreeNode(child));
            }
        }
        return BaseProduct.create({
            name: __name,
            theme: __theme,
            parts: __parts,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }

    /**
     * Method to transform branches that match the following rule:
     * InsurancePart = 'Insurance' 'Part' identifier
     *	 'risk' 'assessment:' PercentageLiteral
     *	 'maximum' 'payout:' EuroLiteral
     *	 'is' 'approved:' ( 'JA' | 'NEE' ) ;
     * @param branch
     * @private
     */
    public transformInsurancePart(branch: SPPTBranch): InsurancePart {
        // console.log('transformInsurancePart called: ' + branch.name);
        let __name: string;
        let __statisticalRisk: PercentageLiteral;
        let __maximumPayOut: EuroLiteral;
        let __isApproved: boolean;
        const children = this.mainAnalyser.getChildren(branch);
        __name = this.mainAnalyser.transformSharedPackedParseTreeNode(children[2]); // RHSPrimEntry
        __statisticalRisk = this.mainAnalyser.transformSharedPackedParseTreeNode(children[5]); // RHSPartEntry
        __maximumPayOut = this.mainAnalyser.transformSharedPackedParseTreeNode(children[8]); // RHSPartEntry
        // RHSBooleanWithDoubleKeyWord
        if (children[11].nonSkipMatchedText === "JA") {
            __isApproved = true;
        } else if (children[11].nonSkipMatchedText === "NEE") {
            __isApproved = false;
        }
        return InsurancePart.create({
            name: __name,
            statisticalRisk: __statisticalRisk,
            maximumPayOut: __maximumPayOut,
            isApproved: __isApproved,
            parseLocation: this.mainAnalyser.location(branch),
        });
    }
}
