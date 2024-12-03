import { EntityModelWalker } from '../../utils/gen';
import { EntityModelSemanticAnalysisWalker } from './EntityModelSemanticAnalysisWalker';
import { FreLanguage } from '@freon4dsl/core';
export class EntityModelSemanticAnalyser {
	correct(modelunit) {
		let changesToBeMade = new Map();
		const myWalker = new EntityModelWalker();
		let myCorrector = new EntityModelSemanticAnalysisWalker(changesToBeMade);
		myWalker.myWorkers.push(myCorrector);
		myWalker.walk(modelunit, () => {
			return true;
		});
		for (const [toBeReplaced, newObject] of changesToBeMade) {
			const myType = FreLanguage.getInstance().concept(toBeReplaced.freLanguageConcept());
			myType.properties.forEach((prop) => {
				if (prop.type !== 'boolean' && !!toBeReplaced[prop.name]) {
					newObject[prop.name] = toBeReplaced[prop.name];
				}
			});
			let parent = toBeReplaced.freOwnerDescriptor().owner;
			const propName = toBeReplaced.freOwnerDescriptor().propertyName;
			const propIndex = toBeReplaced.freOwnerDescriptor().propertyIndex;
			if (propIndex !== undefined) {
				parent[propName].splice(propIndex, 1, newObject);
			} else {
				parent[propName] = newObject;
			}
		}
	}
}
//# sourceMappingURL=EntityModelSemanticAnalyser.js.map
