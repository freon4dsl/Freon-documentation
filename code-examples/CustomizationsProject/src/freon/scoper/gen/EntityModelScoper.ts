// Generated by the Freon Language Generator.
import { FreScoperBase, FreLogger, FreNode, FreNamespace } from "@freon4dsl/core";
import { AppliedFeature, Entity } from "../../language/gen/index.js";

const LOGGER = new FreLogger("EntityModelScoper");

/**
 * Class EntityModelScoper implements the scoper generated from, if present, the scoper definition,
 * otherwise this class implements the default scoper.
 */
export class EntityModelScoper extends FreScoperBase {
    /**
     * Returns the namespace to be used as alternative scope for 'node'.
     * @param node
     */
    getAlternativeScope(node: FreNode): FreNamespace {
        if (!!node && node instanceof AppliedFeature) {
            // use alternative scope 'typeof( container )'
            let owner = node.freOwnerDescriptor()?.owner;
            if (!!owner) {
                let newScopeElement = this.myTyper.inferType(owner)?.toAstElement();
                // 'newScopeElement' could be null, when the type found by the typer does not correspond to an AST element
                if (!!newScopeElement) {
                    return FreNamespace.create(newScopeElement);
                }
            } else {
                console.log("AlternativeScoper for node " + node.freId() + " ");
            }
        }
        return null;
    }

    /**
     * Returns true if there is an alternative scope defined for this 'modelelement'.
     * @param hasAlternativeScope
     */
    hasAlternativeScope(node: FreNode): boolean {
        if (!!node && node instanceof AppliedFeature) {
            return true;
        }
        return false;
    }

    /**
     * Returns all FreNodes that are defined as additional namespaces for `element'.
     * @param element
     */
    public additionalNamespaces(element: FreNode): FreNode[] {
        const result: FreNode[] = [];
        // based on namespace addition for Entity
        if (element instanceof Entity) {
            // generated based on 'baseEntity'
            if (!this.currentRoleNames.includes("baseEntity")) {
                if (!!element.baseEntity) {
                    if (!this.additionalNamespacesVisited.includes(element.baseEntity)) {
                        this.additionalNamespacesVisited.push(element.baseEntity);
                        const referred = element.baseEntity.referred;
                        if (!!referred) {
                            result.push(element.baseEntity.referred);
                        }
                        this.additionalNamespacesVisited.pop();
                    }
                }
            }
        }

        return result;
    }
}
