// Generated by the Freon Language Generator.
import {
    EntityEveryConcept,
    VariableRef,
    FunctionCallExpression,
    AttributeRef,
    Variable,
    EntityFunction,
    AttributeWithEntityType
} from "../../language/gen";
import { EntityWorker, EntityDefaultWorker } from "../../utils/gen";
import { FreNamedNode, FreLanguage, FreLanguageEnvironment, FreNodeReference } from "@freon4dsl/core";

export class EntitySemanticAnalysisWalker extends EntityDefaultWorker implements EntityWorker {
    changesToBeMade: Map<EntityEveryConcept, EntityEveryConcept> = null;

    constructor(changesToBeMade: Map<EntityEveryConcept, EntityEveryConcept>) {
        super();
        this.changesToBeMade = changesToBeMade;
    }

    /**
     * Test whether the references in 'modelelement' are correct.
     * If not, find possible replacements.
     * @param modelelement
     */
    public execBeforeVariableRef(modelelement: VariableRef): boolean {
        let referredElem: FreNodeReference<FreNamedNode>;
        referredElem = modelelement.variable;
        if (!!modelelement.variable && modelelement.variable.referred === null) {
            // cannot find a 'variable' with this name
            this.findReplacement(modelelement, referredElem);
        }
        return false;
    }

    /**
     * Test whether the references in 'modelelement' are correct.
     * If not, find possible replacements.
     * @param modelelement
     */
    public execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean {
        let referredElem: FreNodeReference<FreNamedNode>;
        referredElem = modelelement.functionDefinition;
        if (!!modelelement.functionDefinition && modelelement.functionDefinition.referred === null) {
            // cannot find a 'functionDefinition' with this name
            this.findReplacement(modelelement, referredElem);
        }
        return false;
    }

    /**
     * Test whether the references in 'modelelement' are correct.
     * If not, find possible replacements.
     * @param modelelement
     */
    public execBeforeAttributeRef(modelelement: AttributeRef): boolean {
        let referredElem: FreNodeReference<FreNamedNode>;
        referredElem = modelelement.attribute;
        if (!!modelelement.attribute && modelelement.attribute.referred === null) {
            // cannot find a 'attribute' with this name
            this.findReplacement(modelelement, referredElem);
        }
        return false;
    }

    private findReplacement(modelelement: EntityEveryConcept, referredElem: FreNodeReference<FreNamedNode>) {
        const scoper = FreLanguageEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleElements(modelelement).filter(elem => elem.name === referredElem.name);
        if (possibles.length > 0) {
            // element probably refers to something with another type
            let replacement: EntityEveryConcept = null;
            for (const elem of possibles) {
                const metatype = elem.freLanguageConcept();
                if (FreLanguage.getInstance().metaConformsToType(elem, "Variable")) {
                    replacement = VariableRef.create({ variable: FreNodeReference.create<Variable>(referredElem.name, metatype) });
                } else if (FreLanguage.getInstance().metaConformsToType(elem, "EntityFunction")) {
                    replacement = FunctionCallExpression.create({
                        functionDefinition: FreNodeReference.create<EntityFunction>(referredElem.name, metatype)
                    });
                } else if (FreLanguage.getInstance().metaConformsToType(elem, "AttributeWithEntityType")) {
                    replacement = AttributeRef.create({
                        attribute: FreNodeReference.create<AttributeWithEntityType>(referredElem.name, metatype)
                    });
                } else {
                    throw new Error(
                        "Semantic analysis error: cannot replace reference: " + referredElem.name + " of type " + metatype + "."
                    );
                }
            }
            this.changesToBeMade.set(modelelement, replacement);
        } else {
            // true error, or boolean "true" or "false"
        }
    }
}
