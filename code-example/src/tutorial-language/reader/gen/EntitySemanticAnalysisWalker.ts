// Generated by the ProjectIt Language Generator.
import {
    EntityEveryConcept,
    PiElementReference,
    VariableRef,
    FunctionCallExpression,
    AttributeRef,
    Variable,
    EntityFunction,
    AttributeWithEntityType
} from "../../language/gen";
import { EntityWorker, EntityDefaultWorker } from "../../utils/gen";
import { EntityEnvironment } from "../../environment/gen/EntityEnvironment";
import { PiNamedElement } from "@projectit/core";

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
        let referredElem: PiElementReference<PiNamedElement> = null;
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
        let referredElem: PiElementReference<PiNamedElement> = null;
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
        let referredElem: PiElementReference<PiNamedElement> = null;
        referredElem = modelelement.attribute;
        if (!!modelelement.attribute && modelelement.attribute.referred === null) {
            // cannot find a 'attribute' with this name
            this.findReplacement(modelelement, referredElem);
        }
        return false;
    }

    private findReplacement(modelelement: EntityEveryConcept, referredElem: PiElementReference<PiNamedElement>) {
        const scoper = EntityEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleElements(modelelement).filter(elem => elem.name === referredElem.name);
        if (possibles.length > 0) {
            // element probably refers to something with another type
            let replacement: EntityEveryConcept = null;
            for (const elem of possibles) {
                const metatype = elem.piLanguageConcept();
                if (metatype === "Variable") {
                    replacement = VariableRef.create({ variable: PiElementReference.create<Variable>(referredElem.name, metatype) });
                } else if (metatype === "EntityFunction") {
                    replacement = FunctionCallExpression.create({
                        functionDefinition: PiElementReference.create<EntityFunction>(referredElem.name, metatype)
                    });
                } else if (metatype === "AttributeWithEntityType") {
                    replacement = AttributeRef.create({
                        attribute: PiElementReference.create<AttributeWithEntityType>(referredElem.name, metatype)
                    });
                } else {
                    throw new Error("Semantic analysis error: cannot replace reference.");
                }
            }
            this.changesToBeMade.set(modelelement, replacement);
        } else {
            // true error, or boolean "true" or "false"
        }
    }
}
