import { FreError, FreErrorSeverity, FreLanguageEnvironment } from '@freon4dsl/core';
import { EntityModelDefaultWorker } from '../../utils/gen';
export class EntityModelNonOptionalsChecker extends EntityModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.errorList = [];
	}
	execBeforeEntityModel(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.extraUnit === null || modelelement.extraUnit === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'extraUnit' must have a value", modelelement, modelelement.name, 'extraUnit', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeSomeOtherModelUnit(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.somePart === null || modelelement.somePart === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'somePart' must have a value", modelelement, modelelement.name, 'somePart', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeEntityModelUnit(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeEntity(modelelement) {
		let hasFatalError = false;
		if (modelelement.isCompany === null || modelelement.isCompany === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'isCompany' must have a value", modelelement, modelelement.name, 'isCompany', FreErrorSeverity.Error)
			);
		}
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.baseInterface_attr === null || modelelement.baseInterface_attr === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'baseInterface_attr' must have a value",
					modelelement,
					modelelement.name,
					'baseInterface_attr',
					FreErrorSeverity.Error
				)
			);
		}
		if (modelelement.simpleprop === null || modelelement.simpleprop === undefined || modelelement.simpleprop?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'simpleprop' must have a value", modelelement, modelelement.name, 'simpleprop', FreErrorSeverity.Error)
			);
		}
		if (modelelement.baseInterface === null || modelelement.baseInterface === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'baseInterface' must have a value", modelelement, modelelement.name, 'baseInterface', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.extra === null || modelelement.extra === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'extra' must have a value", modelelement, modelelement.name, 'extra', FreErrorSeverity.Error)
			);
		}
		if (modelelement.baseInterface_attr === null || modelelement.baseInterface_attr === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'baseInterface_attr' must have a value",
					modelelement,
					modelelement.name,
					'baseInterface_attr',
					FreErrorSeverity.Error
				)
			);
		}
		return hasFatalError;
	}
	execBeforeMockEnumeration(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAbsExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.expr === null || modelelement.expr === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'expr' must have a value", modelelement, 'unnamed', 'expr', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeMultiplyExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeEntityFunction(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.expression === null || modelelement.expression === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'expression' must have a value", modelelement, modelelement.name, 'expression', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeWithLimitedType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeWithEntityType(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeVariable(modelelement) {
		let hasFatalError = false;
		if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'name' must have a value", modelelement, modelelement.name, 'name', FreErrorSeverity.Error)
			);
		}
		if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'declaredType' must have a value", modelelement, modelelement.name, 'declaredType', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.attribute === null || modelelement.attribute === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'attribute' must have a value", modelelement, 'unnamed', 'attribute', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeVariableRef(modelelement) {
		let hasFatalError = false;
		if (modelelement.variable === null || modelelement.variable === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'variable' must have a value", modelelement, 'unnamed', 'variable', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
	execBeforeStringLiteralExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length === 0) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeNumberLiteralExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length === 0) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeBooleanLiteralExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length === 0) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'value' must have a value", modelelement, 'unnamed', 'value', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeBinaryExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforePlusExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeDivideExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeAndExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeOrExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeComparisonExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeLessThenExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeGreaterThenExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeEqualsExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.left === null || modelelement.left === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'left' must have a value", modelelement, 'unnamed', 'left', FreErrorSeverity.Error));
		}
		if (modelelement.right === null || modelelement.right === undefined) {
			hasFatalError = true;
			this.errorList.push(new FreError("Property 'right' must have a value", modelelement, 'unnamed', 'right', FreErrorSeverity.Error));
		}
		return hasFatalError;
	}
	execBeforeFunctionCallExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.functionDefinition === null || modelelement.functionDefinition === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError(
					"Property 'functionDefinition' must have a value",
					modelelement,
					'unnamed',
					'functionDefinition',
					FreErrorSeverity.Error
				)
			);
		}
		return hasFatalError;
	}
	execBeforeIfExpression(modelelement) {
		let hasFatalError = false;
		if (modelelement.condition === null || modelelement.condition === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'condition' must have a value", modelelement, 'unnamed', 'condition', FreErrorSeverity.Error)
			);
		}
		if (modelelement.whenTrue === null || modelelement.whenTrue === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'whenTrue' must have a value", modelelement, 'unnamed', 'whenTrue', FreErrorSeverity.Error)
			);
		}
		if (modelelement.whenFalse === null || modelelement.whenFalse === undefined) {
			hasFatalError = true;
			this.errorList.push(
				new FreError("Property 'whenFalse' must have a value", modelelement, 'unnamed', 'whenFalse', FreErrorSeverity.Error)
			);
		}
		return hasFatalError;
	}
}
//# sourceMappingURL=EntityModelNonOptionalsChecker.js.map
