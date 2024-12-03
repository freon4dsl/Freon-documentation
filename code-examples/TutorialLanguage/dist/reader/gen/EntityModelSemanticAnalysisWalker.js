import { VariableRef, FunctionCallExpression, AttributeRef } from '../../language/gen';
import { EntityModelDefaultWorker } from '../../utils/gen';
import { FreLanguage, FreLanguageEnvironment, FreNodeReference } from '@freon4dsl/core';
export class EntityModelSemanticAnalysisWalker extends EntityModelDefaultWorker {
	constructor(changesToBeMade) {
		super();
		this.changesToBeMade = null;
		this.changesToBeMade = changesToBeMade;
	}
	execBeforeVariableRef(modelelement) {
		let referredElem;
		referredElem = modelelement.variable;
		if (!!modelelement.variable && modelelement.variable.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	execBeforeFunctionCallExpression(modelelement) {
		let referredElem;
		referredElem = modelelement.functionDefinition;
		if (!!modelelement.functionDefinition && modelelement.functionDefinition.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	execBeforeAttributeRef(modelelement) {
		let referredElem;
		referredElem = modelelement.attribute;
		if (!!modelelement.attribute && modelelement.attribute.referred === null) {
			this.findReplacement(modelelement, referredElem);
		}
		return false;
	}
	findReplacement(modelelement, referredElem) {
		const scoper = FreLanguageEnvironment.getInstance().scoper;
		const possibles = scoper.getVisibleElements(modelelement).filter((elem) => elem.name === referredElem.name);
		if (possibles.length > 0) {
			let replacement = null;
			for (const elem of possibles) {
				const metatype = elem.freLanguageConcept();
				if (FreLanguage.getInstance().metaConformsToType(elem, 'Variable')) {
					replacement = VariableRef.create({ variable: FreNodeReference.create(referredElem.name, metatype) });
				} else if (FreLanguage.getInstance().metaConformsToType(elem, 'EntityFunction')) {
					replacement = FunctionCallExpression.create({
						functionDefinition: FreNodeReference.create(referredElem.name, metatype)
					});
				} else if (FreLanguage.getInstance().metaConformsToType(elem, 'AttributeWithEntityType')) {
					replacement = AttributeRef.create({
						attribute: FreNodeReference.create(referredElem.name, metatype)
					});
				} else {
					throw new Error('Semantic analysis error: cannot replace reference: ' + referredElem.name + ' of type ' + metatype + '.');
				}
			}
			this.changesToBeMade.set(modelelement, replacement);
		} else {
		}
	}
}
//# sourceMappingURL=EntityModelSemanticAnalysisWalker.js.map
