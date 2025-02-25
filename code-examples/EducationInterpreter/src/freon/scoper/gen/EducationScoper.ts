// Generated by the Freon Language Generator.
import { FreScoperBase, FreLogger, FreNode, FreNamespace } from "@freon4dsl/core";
import { Step } from "../../language/gen/index.js";

const LOGGER = new FreLogger("EducationScoper");

/**
 * Class EducationScoper implements the scoper generated from, if present, the scoper definition,
 * otherwise this class implements the default scoper.
 */
export class EducationScoper extends FreScoperBase {
    /**
     * Returns the namespace to be used as alternative scope for 'node'.
     * @param node
     */
    getAlternativeScope(node: FreNode): FreNamespace {
        return null;
    }

    /**
     * Returns true if there is an alternative scope defined for this 'modelelement'.
     * @param hasAlternativeScope
     */
    hasAlternativeScope(node: FreNode): boolean {
        return false;
    }

    /**
     * Returns all FreNodes that are defined as additional namespaces for `element'.
     * @param element
     */
    public additionalNamespaces(element: FreNode): FreNode[] {
        const result: FreNode[] = [];
        // based on namespace addition for Step
        if (element instanceof Step) {
            // generated based on 'fromPage'
            if (!this.currentRoleNames.includes("fromPage")) {
                if (!!element.fromPage) {
                    if (!this.additionalNamespacesVisited.includes(element.fromPage)) {
                        this.additionalNamespacesVisited.push(element.fromPage);
                        const referred = element.fromPage.referred;
                        if (!!referred) {
                            result.push(element.fromPage.referred);
                        }
                        this.additionalNamespacesVisited.pop();
                    }
                }
            }
        }

        return result;
    }
}
