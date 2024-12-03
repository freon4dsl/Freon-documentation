import {
	SomeOtherModelUnit,
	EntityModelUnit,
	Entity,
	AttributeType,
	MockEnumeration,
	EntityFunction,
	AttributeWithLimitedType,
	AttributeWithEntityType,
	Variable
} from '../../language/gen';
var SeparatorType;
(function (SeparatorType) {
	SeparatorType['NONE'] = 'NONE';
	SeparatorType['Terminator'] = 'Terminator';
	SeparatorType['Separator'] = 'Separator';
	SeparatorType['Initiator'] = 'Initiator';
})(SeparatorType || (SeparatorType = {}));
export class EntityModelModelUnitWriter {
	constructor() {
		this.output = [];
		this.currentLine = 0;
	}
	writeToString(modelelement, startIndent, short) {
		this.writeToLines(modelelement, startIndent, short);
		return `${this.output
			.map((line) => `${line.trimEnd()}`)
			.join('\n')
			.trimEnd()}`;
	}
	writeToLines(modelelement, startIndent, short) {
		if (startIndent === undefined) {
			startIndent = 0;
		}
		if (short === undefined) {
			short = false;
		}
		this.output = [];
		this.currentLine = 0;
		let indentString = '';
		for (let _i = 0; _i < startIndent; _i++) {
			indentString += ' ';
		}
		this.output[this.currentLine] = indentString;
		this.unparse(modelelement, short);
		return this.output;
	}
	writeNameOnly(modelelement) {
		if (!modelelement) {
			return '';
		}
		if (modelelement instanceof SomeOtherModelUnit) {
			return modelelement.name;
		} else if (modelelement instanceof EntityModelUnit) {
			return modelelement.name;
		} else if (modelelement instanceof Entity) {
			return modelelement.name;
		} else if (modelelement instanceof AttributeType) {
			return modelelement.name;
		} else if (modelelement instanceof MockEnumeration) {
			return modelelement.name;
		} else if (modelelement instanceof EntityFunction) {
			return modelelement.name;
		} else if (modelelement instanceof AttributeWithLimitedType) {
			return modelelement.name;
		} else if (modelelement instanceof AttributeWithEntityType) {
			return modelelement.name;
		} else if (modelelement instanceof Variable) {
			return modelelement.name;
		} else {
			this.output = [];
			this.currentLine = 0;
			this.output[this.currentLine] = '';
			this.unparse(modelelement, true);
			return this.output[0].trimEnd();
		}
	}
	unparse(modelelement, short) {
		if (!modelelement) {
			return;
		}
		switch (modelelement.freLanguageConcept()) {
			case 'Entity':
				this.unparseEntity(modelelement, short);
				break;
			case 'AttributeType':
				this.unparseAttributeType(modelelement, short);
				break;
			case 'MockEnumeration':
				this.unparseMockEnumeration(modelelement, short);
				break;
			case 'AbsExpression':
				this.unparseAbsExpression(modelelement, short);
				break;
			case 'MultiplyExpression':
				this.unparseMultiplyExpression(modelelement, short);
				break;
			case 'EntityFunction':
				this.unparseEntityFunction(modelelement, short);
				break;
			case 'AttributeWithLimitedType':
				this.unparseAttributeWithLimitedType(modelelement, short);
				break;
			case 'Text':
				this.unparseText(modelelement, short);
				break;
			case 'Text2':
				this.unparseText2(modelelement, short);
				break;
			case 'Text3':
				this.unparseText3(modelelement, short);
				break;
			case 'Text4':
				this.unparseText4(modelelement, short);
				break;
			case 'AttributeWithEntityType':
				this.unparseAttributeWithEntityType(modelelement, short);
				break;
			case 'Variable':
				this.unparseVariable(modelelement, short);
				break;
			case 'EntityExpression':
				this.unparseEntityExpression(modelelement, short);
				break;
			case 'AppliedFeature':
				this.unparseAppliedFeature(modelelement, short);
				break;
			case 'AttributeRef':
				this.unparseAttributeRef(modelelement, short);
				break;
			case 'VariableRef':
				this.unparseVariableRef(modelelement, short);
				break;
			case 'LiteralExpression':
				this.unparseLiteralExpression(modelelement, short);
				break;
			case 'StringLiteralExpression':
				this.unparseStringLiteralExpression(modelelement, short);
				break;
			case 'NumberLiteralExpression':
				this.unparseNumberLiteralExpression(modelelement, short);
				break;
			case 'BooleanLiteralExpression':
				this.unparseBooleanLiteralExpression(modelelement, short);
				break;
			case 'BinaryExpression':
				this.unparseBinaryExpression(modelelement, short);
				break;
			case 'PlusExpression':
				this.unparsePlusExpression(modelelement, short);
				break;
			case 'DivideExpression':
				this.unparseDivideExpression(modelelement, short);
				break;
			case 'AndExpression':
				this.unparseAndExpression(modelelement, short);
				break;
			case 'OrExpression':
				this.unparseOrExpression(modelelement, short);
				break;
			case 'ComparisonExpression':
				this.unparseComparisonExpression(modelelement, short);
				break;
			case 'LessThenExpression':
				this.unparseLessThenExpression(modelelement, short);
				break;
			case 'GreaterThenExpression':
				this.unparseGreaterThenExpression(modelelement, short);
				break;
			case 'EqualsExpression':
				this.unparseEqualsExpression(modelelement, short);
				break;
			case 'FunctionCallExpression':
				this.unparseFunctionCallExpression(modelelement, short);
				break;
			case 'IfExpression':
				this.unparseIfExpression(modelelement, short);
				break;
			case 'SomeOtherModelUnit':
				this.unparseSomeOtherModelUnit(modelelement, short);
				break;
			case 'EntityModelUnit':
				this.unparseEntityModelUnit(modelelement, short);
				break;
			case 'BaseType':
				this.unparseBaseType(modelelement, short);
				break;
			case 'Type':
				this.unparseType(modelelement, short);
				break;
		}
	}
	unparseEntity(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Entity `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `isCompany `;
			this.output[this.currentLine] += `${modelelement.isCompany} `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `baseInterface_attr `;
			this.output[this.currentLine] += `${modelelement.baseInterface_attr} `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `simpleprop `;
			this.output[this.currentLine] += `"${modelelement.simpleprop}" `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `attributes `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.attributes,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `entAttributes `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.entAttributes,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `functions `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.functions,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `int_attrs `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.int_attrs,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `int_functions `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.int_functions,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			if (!!modelelement.baseEntity) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `baseEntity `;
				this._unparseReference(modelelement.baseEntity, short);
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `baseInterface `;
			this._unparseReference(modelelement.baseInterface, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseAbsExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `AbsExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `expr `;
			this.unparse(modelelement.expr, short);
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseEntityFunction(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `EntityFunction `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `aliases `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseListOfPrimitiveValues(
				modelelement.aliases,
				false,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `expression `;
			this.unparse(modelelement.expression, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `parameters `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.parameters,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `declaredType `;
			this._unparseReference(modelelement.declaredType, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseAttributeWithLimitedType(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `AttributeWithLimitedType `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `declaredType `;
			this._unparseReference(modelelement.declaredType, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseText(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Text `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseText2(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Text2 `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseText3(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Text3 `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseText4(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Text4 `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseAttributeWithEntityType(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `AttributeWithEntityType `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `declaredType `;
			this._unparseReference(modelelement.declaredType, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseVariable(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Variable `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `declaredType `;
			this._unparseReference(modelelement.declaredType, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseAttributeRef(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `AttributeRef `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `attribute `;
			this._unparseReference(modelelement.attribute, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseVariableRef(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `VariableRef `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `variable `;
			this._unparseReference(modelelement.variable, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseStringLiteralExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `StringLiteralExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `value `;
			this.output[this.currentLine] += `"${modelelement.value}" `;
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseNumberLiteralExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `NumberLiteralExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `value `;
			this.output[this.currentLine] += `"${modelelement.value}" `;
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseBooleanLiteralExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `BooleanLiteralExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `value `;
			this.output[this.currentLine] += `"${modelelement.value}" `;
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseFunctionCallExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `FunctionCallExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `functionDefinition `;
			this._unparseReference(modelelement.functionDefinition, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseIfExpression(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `IfExpression `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `condition `;
			this.unparse(modelelement.condition, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `whenTrue `;
			this.unparse(modelelement.whenTrue, short);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `whenFalse `;
			this.unparse(modelelement.whenFalse, short);
			if (!!modelelement.appliedfeature) {
				this.newlineAndIndentation(blockIndent + 0 + 4);
				this.output[this.currentLine] += `appliedfeature `;
				this.unparse(modelelement.appliedfeature, short);
			}
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseSomeOtherModelUnit(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `SomeOtherModelUnit `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `somePart `;
			this.unparse(modelelement.somePart, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseEntityModelUnit(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `EntityModelUnit `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `functions `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.functions,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `entities `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.entities,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparseType(modelelement, short) {
		const blockIndent = this.output[this.currentLine].length;
		this.output[this.currentLine] += `Type `;
		this.output[this.currentLine] += `${modelelement.name} `;
		this.output[this.currentLine] += `\{ `;
		if (!short) {
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `simpleprop `;
			this.output[this.currentLine] += `"${modelelement.simpleprop}" `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `baseInterface_attr `;
			this.output[this.currentLine] += `${modelelement.baseInterface_attr} `;
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `int_attrs `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.int_attrs,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `int_functions `;
			this.newlineAndIndentation(blockIndent + 8);
			this._unparseList(
				modelelement.int_functions,
				'',
				SeparatorType.Separator,
				true,
				this.output[this.currentLine].length,
				short,
				(modelelement, short) => this.unparse(modelelement, short)
			);
			this.newlineAndIndentation(blockIndent + 4);
			this.output[this.currentLine] += `baseInterface `;
			this._unparseReference(modelelement.baseInterface, short);
			this.newlineAndIndentation(blockIndent + 0);
			this.output[this.currentLine] += `} `;
		}
	}
	unparsePlusExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '+ ';
		this.unparse(modelelement.right, short);
	}
	unparseMultiplyExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '* ';
		this.unparse(modelelement.right, short);
	}
	unparseDivideExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '/ ';
		this.unparse(modelelement.right, short);
	}
	unparseLessThenExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += '< ';
		this.unparse(modelelement.right, short);
	}
	unparseOrExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += 'or ';
		this.unparse(modelelement.right, short);
	}
	unparseAndExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += 'AndExpression ';
		this.unparse(modelelement.right, short);
	}
	unparseGreaterThenExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += 'GreaterThenExpression ';
		this.unparse(modelelement.right, short);
	}
	unparseEqualsExpression(modelelement, short) {
		this.unparse(modelelement.left, short);
		this.output[this.currentLine] += 'EqualsExpression ';
		this.unparse(modelelement.right, short);
	}
	unparseAttributeType(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseMockEnumeration(modelelement, short) {
		if (!!modelelement) {
			this.output[this.currentLine] += modelelement.name + ' ';
		}
	}
	unparseEntityExpression(modelelement, short) {
		throw new Error('Method unparseEntityExpression should be implemented by its (concrete) subclasses.');
	}
	unparseAppliedFeature(modelelement, short) {
		throw new Error('Method unparseAppliedFeature should be implemented by its (concrete) subclasses.');
	}
	unparseLiteralExpression(modelelement, short) {
		throw new Error('Method unparseLiteralExpression should be implemented by its (concrete) subclasses.');
	}
	unparseBinaryExpression(modelelement, short) {
		throw new Error('Method unparseBinaryExpression should be implemented by its (concrete) subclasses.');
	}
	unparseComparisonExpression(modelelement, short) {
		throw new Error('Method unparseComparisonExpression should be implemented by its (concrete) subclasses.');
	}
	unparseBaseType(modelelement, short) {
		throw new Error('Method unparseBaseType should be implemented by the classes that implement it.');
	}
	_unparseReference(modelelement, short) {
		if (!!modelelement) {
			const type = modelelement?.referred;
			if (!!type) {
				if (type instanceof AttributeType) {
					this.unparseAttributeType(type, short);
				} else if (type instanceof MockEnumeration) {
					this.unparseMockEnumeration(type, short);
				} else {
					this.output[this.currentLine] += modelelement.pathnameToString('.') + ' ';
				}
			} else {
				this.output[this.currentLine] += modelelement.pathnameToString('.') + ' ';
			}
		}
	}
	_unparseList(list, sepText, sepType, vertical, indent, short, method) {
		list.forEach((listElem, index) => {
			const isLastInList = index === list.length - 1;
			this.doInitiator(sepText, sepType);
			method(listElem, short);
			this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
		});
	}
	_unparseReferenceList(list, sepText, sepType, vertical, indent, short) {
		list.forEach((listElem, index) => {
			const isLastInList = index === list.length - 1;
			this.doInitiator(sepText, sepType);
			this._unparseReference(listElem, short);
			this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
		});
	}
	_unparseListOfPrimitiveValues(list, isIdentifier, sepText, sepType, vertical, indent, short) {
		if (!!list) {
			list.forEach((listElem, index) => {
				const isLastInList = index === list.length - 1;
				if (typeof listElem === 'string' && !isIdentifier) {
					this.output[this.currentLine] += `"${listElem}"`;
				} else {
					this.output[this.currentLine] += `${listElem}`;
				}
				this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
			});
		}
	}
	doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent) {
		this.output[this.currentLine] = this.output[this.currentLine].trimEnd();
		if (!vertical && (!sepText || sepText.length == 0)) {
			sepText = ' ';
		}
		switch (sepType) {
			case SeparatorType.Separator: {
				if (!isLastInList) {
					this.output[this.currentLine] += sepText;
				}
				break;
			}
			case SeparatorType.Terminator: {
				this.output[this.currentLine] += sepText;
				break;
			}
			case SeparatorType.Initiator: {
				break;
			}
			case SeparatorType.NONE: {
				if (!vertical) {
					this.output[this.currentLine] += ' ';
				}
				break;
			}
		}
		if (vertical && !isLastInList) {
			if (!short) {
				this.newlineAndIndentation(indent);
			} else {
				this.output[this.currentLine] += ` ...`;
			}
		} else if (isLastInList) {
			if (this.output[this.currentLine][this.output[this.currentLine].length - 1] !== ' ') {
				this.output[this.currentLine] += ` `;
			}
		}
	}
	newlineAndIndentation(indent) {
		this.currentLine += 1;
		let indentation = '';
		for (let _i = 0; _i < indent; _i++) {
			indentation += ' ';
		}
		this.output[this.currentLine] = indentation;
	}
	doInitiator(sepText, sepType) {
		if (sepType === SeparatorType.Initiator) {
			this.output[this.currentLine] += sepText;
		}
	}
}
//# sourceMappingURL=EntityModelModelUnitWriter.js.map
