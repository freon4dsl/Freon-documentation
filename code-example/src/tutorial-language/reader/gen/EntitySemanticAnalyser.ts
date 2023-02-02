// Generated by the Freon Language Generator.
import { EntityEveryConcept } from "../../language/gen";
import { EntityWalker } from "../../utils/gen";
import { EntitySemanticAnalysisWalker } from "./EntitySemanticAnalysisWalker";
import { Concept, FreLanguage, FreNode, FreNodeReference } from "@freon4dsl/core";

export class EntitySemanticAnalyser {
    public correct(modelunit: EntityEveryConcept) {
        let changesToBeMade: Map<EntityEveryConcept, EntityEveryConcept> = new Map<EntityEveryConcept, EntityEveryConcept>();
        // create the walker over the model tree
        const myWalker = new EntityWalker();

        // create the object that will find what needs ot be changed
        let myCorrector = new EntitySemanticAnalysisWalker(changesToBeMade);

        // and add the corrector to the walker
        myWalker.myWorkers.push(myCorrector);

        // do the work
        myWalker.walk(modelunit, () => {
            return true;
        });

        // now change all ref errors
        for (const [toBeReplaced, newObject] of changesToBeMade) {
            const myType: Concept = FreLanguage.getInstance().concept(toBeReplaced.freLanguageConcept());
            myType.properties.forEach(prop => {
                if (prop.type !== "boolean" && !!toBeReplaced[prop.name]) {
                    newObject[prop.name] = toBeReplaced[prop.name];
                }
            });
            let parent: FreNode = toBeReplaced.freOwnerDescriptor().owner;
            const propName: string = toBeReplaced.freOwnerDescriptor().propertyName;
            const propIndex: number = toBeReplaced.freOwnerDescriptor().propertyIndex;
            if (propIndex !== undefined) {
                parent[propName].splice(propIndex, 1, newObject);
            } else {
                parent[propName] = newObject;
            }
        }
    }
}
