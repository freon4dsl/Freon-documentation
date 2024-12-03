import { FreError, FreErrorSeverity, FreLanguageEnvironment } from '@freon4dsl/core';
import { EntityModelDefaultWorker } from '../../utils/gen';
export class EntityModelReferenceChecker extends EntityModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.errorList = [];
		this.refSeparator = '/';
	}
	execBeforeEntity(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.baseEntity && modelelement.baseEntity.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.baseEntity, 'baseEntity', `${modelelement.name}`);
			hasFatalError = true;
		}
		if (!!modelelement.baseInterface && modelelement.baseInterface.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.baseInterface, 'baseInterface', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeEntityFunction(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.declaredType, 'declaredType', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeAttributeWithLimitedType(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.declaredType, 'declaredType', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeAttributeWithEntityType(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.declaredType, 'declaredType', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeVariable(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.declaredType, 'declaredType', `${modelelement.name}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeAttributeRef(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.attribute && modelelement.attribute.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.attribute, 'attribute', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeVariableRef(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.variable && modelelement.variable.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.variable, 'variable', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	execBeforeFunctionCallExpression(modelelement) {
		let hasFatalError = false;
		if (!!modelelement.functionDefinition && modelelement.functionDefinition.referred === null) {
			this.makeErrorMessage(modelelement, modelelement.functionDefinition, 'functionDefinition', `${'unnamed'}`);
			hasFatalError = true;
		}
		return hasFatalError;
	}
	makeErrorMessage(modelelement, referredElem, propertyName, locationDescription) {
		const scoper = FreLanguageEnvironment.getInstance().scoper;
		const possibles = scoper.getVisibleElements(modelelement).filter((elem) => elem.name === referredElem.name);
		if (possibles.length > 0) {
			this.errorList.push(
				new FreError(
					`Reference '${referredElem.pathnameToString(this.refSeparator)}' should have type '${
						referredElem.typeName
					}', but found type(s) [${possibles.map((elem) => `${elem.freLanguageConcept()}`).join(', ')}]`,
					modelelement,
					`${propertyName} of ${locationDescription}`,
					`${propertyName}`,
					FreErrorSeverity.Error
				)
			);
		} else {
			this.errorList.push(
				new FreError(
					`Cannot find reference '${referredElem.pathnameToString(this.refSeparator)}'`,
					modelelement,
					`${propertyName} of ${locationDescription}`,
					`${propertyName}`,
					FreErrorSeverity.Error
				)
			);
		}
	}
}
//# sourceMappingURL=EntityModelReferenceChecker.js.map
