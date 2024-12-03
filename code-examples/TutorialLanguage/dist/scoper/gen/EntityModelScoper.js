import { FreScoperBase, FreLogger, FreNamespace } from '@freon4dsl/core';
import { AppliedFeature, Entity } from '../../language/gen';
const LOGGER = new FreLogger('EntityModelScoper');
export class EntityModelScoper extends FreScoperBase {
	getAlternativeScope(modelelement) {
		if (!!modelelement && modelelement instanceof AppliedFeature) {
			let owner = modelelement.freOwnerDescriptor().owner;
			if (!!owner) {
				let newScopeElement = this.myTyper.inferType(owner)?.toAstElement();
				if (!!newScopeElement) {
					return FreNamespace.create(newScopeElement);
				}
			}
		}
		return null;
	}
	hasAlternativeScope(modelelement) {
		if (!!modelelement && modelelement instanceof AppliedFeature) {
			return true;
		}
		return false;
	}
	additionalNamespaces(element) {
		const result = [];
		if (element instanceof Entity) {
			if (!this.currentRoleNames.includes('baseEntity')) {
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
//# sourceMappingURL=EntityModelScoper.js.map
