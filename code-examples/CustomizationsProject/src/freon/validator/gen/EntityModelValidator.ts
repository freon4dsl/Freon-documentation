// Generated by the Freon Language Generator.
import { FreValidator, FreError, FreCompositeTyper, FreNode } from "@freon4dsl/core";
// import { FreNode } from "../../language/gen/index.js";
import { EntityModelNonOptionalsChecker } from "./EntityModelNonOptionalsChecker.js";
import { EntityModelValidationRulesChecker } from "./EntityModelValidationRulesChecker.js";
import { EntityModelReferenceChecker } from "./EntityModelReferenceChecker.js";
import { EntityModelWalker, EntityModelWorker } from "../../utils/gen/index.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";

/**
 * Interface 'EntityModelCheckerInterface' represents any object that traverses the model tree and checks
 * its nodes, where any errors are deposited in 'errorList'.
 * Every checker that is used by the validator 'EntityModelValidator' should implement this interface.
 */
export interface EntityModelCheckerInterface extends EntityModelWorker {
    errorList: FreError[];
}

/**
 * Class EntityModelValidator implements the validator generated from, if present, the validator definition,
 * otherwise this class implements the default validator.
 * The implementation uses the visitor pattern to traverse the tree. Class EntityModelWalker implements
 * the actual checking of each node in the tree.
 */
export class EntityModelValidator implements FreValidator {
    /**
     * Returns the list of errors found in 'modelelement'.
     * This method uses the visitor pattern to traverse the tree with 'modelelement' as top node,
     * where classes EntityModelNonOptionalsChecker, EntityModelReferenceChecker,  implements the actual checking of each node in the tree.
     *
     * @param modelelement
     * @param includeChildren if true, the children of 'modelelement' are also checked.
     * The default for 'includeChildren' is true.
     */
    public validate(modelelement: FreNode, includeChildren: boolean = true): FreError[] {
        // initialize the errorlist
        const errorlist: FreError[] = [];

        // create the walker over the model tree
        const myWalker = new EntityModelWalker();

        // create the checker on non-optional parts
        let myChecker = new EntityModelNonOptionalsChecker();
        myChecker.errorList = errorlist;
        // and add the checker to the walker
        myWalker.myWorkers.push(myChecker);

        // create the checker on references
        myChecker = new EntityModelReferenceChecker();
        myChecker.errorList = errorlist;
        // and add the checker to the walker
        myWalker.myWorkers.push(myChecker);

        // create the checker based on the rules in the validation definition (.valid file)
        myChecker = new EntityModelValidationRulesChecker();
        myChecker.errorList = errorlist;
        // and add the checker to the walker
        myWalker.myWorkers.push(myChecker);

        // add any custom validations
        for (let checker of freonConfiguration.customValidations) {
            checker.errorList = errorlist;
            myWalker.myWorkers.push(checker);
        }

        // do the work
        myWalker.walk(modelelement, () => {
            return includeChildren;
        });

        // return any errors
        return errorlist;
    }
}
