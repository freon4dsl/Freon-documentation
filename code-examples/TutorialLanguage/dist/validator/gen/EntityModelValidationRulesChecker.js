import { FreError, FreErrorSeverity, FreLanguageEnvironment } from '@freon4dsl/core';
import { AttributeType } from '../../language/gen';
import { EntityModelDefaultWorker } from '../../utils/gen';
import { reservedWordsInTypescript } from './ReservedWords';
export class EntityModelValidationRulesChecker extends EntityModelDefaultWorker {
	constructor() {
		super(...arguments);
		this.myWriter = FreLanguageEnvironment.getInstance().writer;
		this.typer = FreLanguageEnvironment.getInstance().typer;
		this.errorList = [];
	}
	execBeforeAttributeType(modelelement) {
		let hasFatalError = false;
		if (!(modelelement.extra >= 12)) {
			this.errorList.push(new FreError("'self.extra >= 12' is false", modelelement, modelelement.name, FreErrorSeverity.NONE));
		}
		if (!(modelelement.extra <= 30)) {
			this.errorList.push(new FreError("'self.extra <= 30' is false", modelelement, modelelement.name, FreErrorSeverity.NONE));
		}
		return hasFatalError;
	}
	execBeforeEntityModelUnit(modelelement) {
		let hasFatalError = false;
		if (modelelement.entities.length === 0) {
			this.errorList.push(
				new FreError("List 'self.entities' may not be empty", modelelement, modelelement.name, 'self.entities', FreErrorSeverity.NONE)
			);
		}
		let uniqueNameInEntities = [];
		modelelement.entities.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'entities' has no value`,
						modelelement.entities[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInEntities.includes(elem.name)) {
					uniqueNameInEntities.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'entities'`,
							modelelement.entities[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (modelelement.functions.length === 0) {
			this.errorList.push(
				new FreError("List 'self.functions' may not be empty", modelelement, modelelement.name, 'self.functions', FreErrorSeverity.NONE)
			);
		}
		let uniqueNameInFunctions = [];
		modelelement.functions.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'functions' has no value`,
						modelelement.functions[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInFunctions.includes(elem.name)) {
					uniqueNameInFunctions.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'functions'`,
							modelelement.functions[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeEntity(modelelement) {
		let hasFatalError = false;
		if (modelelement.attributes.length === 0) {
			this.errorList.push(
				new FreError("List 'self.attributes' may not be empty", modelelement, modelelement.name, 'self.attributes', FreErrorSeverity.NONE)
			);
		}
		let uniqueNameInAttributes = [];
		modelelement.attributes.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'attributes' has no value`,
						modelelement.attributes[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInAttributes.includes(elem.name)) {
					uniqueNameInAttributes.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'attributes'`,
							modelelement.attributes[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (modelelement.functions.length === 0) {
			this.errorList.push(
				new FreError("List 'self.functions' may not be empty", modelelement, modelelement.name, 'self.functions', FreErrorSeverity.NONE)
			);
		}
		let uniqueNameInFunctions = [];
		modelelement.functions.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'functions' has no value`,
						modelelement.functions[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInFunctions.includes(elem.name)) {
					uniqueNameInFunctions.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'functions'`,
							modelelement.functions[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeAttributeWithLimitedType(modelelement) {
		let hasFatalError = false;
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeVariable(modelelement) {
		let hasFatalError = false;
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeEntityFunction(modelelement) {
		let hasFatalError = false;
		if (!this.typer.conformsType(modelelement.expression, modelelement.$declaredType)) {
			this.errorList.push(
				new FreError(
					'Type ' +
						this.typer.inferType(modelelement.expression)?.toFreString(this.myWriter) +
						' of [' +
						this.myWriter.writeNameOnly(modelelement.expression) +
						'] does not conform to ' +
						this.myWriter.writeNameOnly(modelelement.$declaredType),
					modelelement.expression,
					modelelement.name,
					FreErrorSeverity.NONE
				)
			);
		}
		let uniqueNameInParameters = [];
		modelelement.parameters.forEach((elem, index) => {
			if (elem === undefined || elem === null) {
				this.errorList.push(
					new FreError(
						`Element[${index}] of property 'parameters' has no value`,
						modelelement.parameters[index],
						modelelement.name,
						'name',
						FreErrorSeverity.NONE
					)
				);
			} else {
				if (!uniqueNameInParameters.includes(elem.name)) {
					uniqueNameInParameters.push(elem.name);
				} else {
					this.errorList.push(
						new FreError(
							`The value of property 'name' ("${this.myWriter.writeNameOnly(elem)}") is not unique in list 'parameters'`,
							modelelement.parameters[index],
							modelelement.name,
							'name',
							FreErrorSeverity.NONE
						)
					);
				}
			}
		});
		if (!this.isValidName(modelelement.name)) {
			this.errorList.push(
				new FreError("'" + modelelement.name + "' is not a valid identifier", modelelement, modelelement.name, FreErrorSeverity.NONE)
			);
		}
		return hasFatalError;
	}
	execBeforeAbsExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.expr);
		const rightType0 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.expr) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.expr,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeMultiplyExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		const leftType1 = this.typer.inferType(modelelement.right);
		const rightType1 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType1, rightType1)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						leftType1?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType1?.toFreString(this.myWriter) +
						')',
					modelelement.right,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		if (!this.typer.conformsType(modelelement.left, modelelement.right)) {
			this.errorList.push(
				new FreError(
					'Type ' +
						this.typer.inferType(modelelement.left)?.toFreString(this.myWriter) +
						' of [' +
						this.myWriter.writeNameOnly(modelelement.left) +
						'] does not conform to ' +
						this.myWriter.writeNameOnly(modelelement.right),
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforePlusExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		const leftType1 = this.typer.inferType(modelelement.right);
		const rightType1 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType1, rightType1)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						leftType1?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType1?.toFreString(this.myWriter) +
						')',
					modelelement.right,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		if (!this.typer.conformsType(modelelement.left, modelelement.right)) {
			this.errorList.push(
				new FreError(
					'Type ' +
						this.typer.inferType(modelelement.left)?.toFreString(this.myWriter) +
						' of [' +
						this.myWriter.writeNameOnly(modelelement.left) +
						'] does not conform to ' +
						this.myWriter.writeNameOnly(modelelement.right),
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeDivideExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		const leftType1 = this.typer.inferType(modelelement.right);
		const rightType1 = this.typer.inferType(AttributeType.Integer);
		if (!this.typer.equals(leftType1, rightType1)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						leftType1?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Integer) +
						"' (" +
						rightType1?.toFreString(this.myWriter) +
						')',
					modelelement.right,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeAndExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(AttributeType.Boolean);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Boolean) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		const leftType1 = this.typer.inferType(modelelement.right);
		const rightType1 = this.typer.inferType(AttributeType.Boolean);
		if (!this.typer.equals(leftType1, rightType1)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						leftType1?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Boolean) +
						"' (" +
						rightType1?.toFreString(this.myWriter) +
						')',
					modelelement.right,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeOrExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(AttributeType.Boolean);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Boolean) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		const leftType1 = this.typer.inferType(modelelement.right);
		const rightType1 = this.typer.inferType(AttributeType.Boolean);
		if (!this.typer.equals(leftType1, rightType1)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						leftType1?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Boolean) +
						"' (" +
						rightType1?.toFreString(this.myWriter) +
						')',
					modelelement.right,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeComparisonExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.left);
		const rightType0 = this.typer.inferType(modelelement.right);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.left) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(modelelement.right) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.left,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	execBeforeIfExpression(modelelement) {
		let hasFatalError = false;
		const leftType0 = this.typer.inferType(modelelement.condition);
		const rightType0 = this.typer.inferType(AttributeType.Boolean);
		if (!this.typer.equals(leftType0, rightType0)) {
			this.errorList.push(
				new FreError(
					"Type of '" +
						this.myWriter.writeNameOnly(modelelement.condition) +
						"' (" +
						leftType0?.toFreString(this.myWriter) +
						") should equal the type of '" +
						this.myWriter.writeNameOnly(AttributeType.Boolean) +
						"' (" +
						rightType0?.toFreString(this.myWriter) +
						')',
					modelelement.condition,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		if (!this.typer.conformsType(modelelement.whenTrue, modelelement.whenFalse)) {
			this.errorList.push(
				new FreError(
					'Type ' +
						this.typer.inferType(modelelement.whenTrue)?.toFreString(this.myWriter) +
						' of [' +
						this.myWriter.writeNameOnly(modelelement.whenTrue) +
						'] does not conform to ' +
						this.myWriter.writeNameOnly(modelelement.whenFalse),
					modelelement.whenTrue,
					'unnamed',
					FreErrorSeverity.NONE
				)
			);
		}
		return hasFatalError;
	}
	isValidName(name) {
		if (!!!name) return false;
		if (/[0-9]/.test(name[0])) return false;
		if (/[.|,|!|?|@|~|%|^|&|*|-|=|+|(|)|{|}|"|'|:|;|<|>|?]/.test(name)) return false;
		if (/\\/.test(name)) return false;
		if (/[/|[|]]/.test(name)) return false;
		if (/[\t|\n|\r| ]/.test(name)) return false;
		return !reservedWordsInTypescript.includes(name);
	}
}
//# sourceMappingURL=EntityModelValidationRulesChecker.js.map
